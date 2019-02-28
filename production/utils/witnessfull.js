const wlsjs = require('steem')
const WitnessSave = require('./../models/witnesfull')

class Witness{
    constructor(){
        this.currenteNode=0,
        this.nodes=["https://rpc3.wls.services/","https://wls.kennybll.com/", ]
    }
    async init(){
        try {
            wlsjs.api.setOptions({ url: this.nodes[this.currenteNode] });
            var r=await wlsjs.api.getWitnessesByVoteAsync("", 100)
            this.routewitness(r.reverse())
        } catch (err) {

            this.changeNode(()=>{

            })
        }
    }
    routewitness(r){
        console.log(r.length)
        if(r.length>0){
            var WitnessData=r.pop()
            var FullData={
                totalBlockProducer:0, 
                totalUpdatedWitness:0, 
                totalVotes:0 , 
                votosWitnessProxy:0,
            }
            this.searchData(WitnessData.owner, -1 ,FullData, ()=>{
                this.routewitness(r)
            })
        }else{
            console.log("inicio conteo para nueva busqueda")
            setTimeout(()=>{
                this.init()
            },24*60*60*1000)
        }
    }
    searchData(witness,start,total,callback){
        var totalH=total;
        wlsjs.api.getAccountHistory(witness, start, (start < 0) ? 10000 : Math.min(start, 10000), (err, result)=>{
            if(err){
                console.log(err)
                return this.changeNode(()=>{
                    this.searchData(witness,start,data,callback)
                })
            }
            var op=result.reverse()
            var lastrxid
            for(var i = 0; i < op.length; i++){
                if(op[i][1].op[0]==='producer_reward'){
                    totalH.totalBlockProducer=total.totalBlockProducer+1
                }
                if(op[i][1].op[0]==="account_witness_vote"){
                    totalH.totalVotes=op[i][1].op[1].approve===true ? totalH.totalVotes+1 : totalH.totalVotes-1
                }
                if(op[i][1].op[0]==="account_witness_proxy"){
                    if(op[i][1].op[1].proxy===witness){
                        totalH.votosWitnessProxy=totalH.votosWitnessProxy+1;
                    }
                }
                if(op[i][1].op[0]==="witness_update"){
                    totalH.totalUpdatedWitness=totalH.totalUpdatedWitness+1;
                }
                lastrxid=op[i][0]
            }

            if(op[0][0]>0 && lastrxid!==start){
                return this.searchData(witness,lastrxid,totalH,callback)
            }
            this.saveFullWitness(totalH,witness,callback)
        })
    }
    saveFullWitness(total,witnessOwner,callback){

        WitnessSave.findOne({ Witness:witnessOwner } ,(err,result)=>{
            if(err){
                return this.saveFullWitness(total,witnessOwner,callback)
            }
            if(result){
                let update={
                    Witness:witnessOwner,
                    Blocks:total.totalBlockProducer,
                    Votes:total.totalVotes,
                    Updateds:total.totalUpdatedWitness,
                    WitnessProxy:total.votosWitnessProxy
                }
                return WitnessSave.findOneAndUpdate({ Witness:witnessOwner }, update ,{new: true}, (err,doc)=>{
                    if(err){
                        return console.log("se produjo un error al actualizar")
                    }
                    callback()
                })
            }
            let witnessx = new WitnessSave({
                Witness:witnessOwner,
                Blocks:total.totalBlockProducer,
                Votes:total.totalVotes,
                Updateds:total.totalUpdatedWitness,
                WitnessProxy:total.votosWitnessProxy
            })
            witnessx.save((err)=>{
                if(err){
                    console.log("se genero un error")
                    return console.log(err)
                }
                
                callback()
            })
        })
    }
    changeNode(callback){
        if(this.currenteNode>=(this.nodes.length-1)){
            this.currenteNode=0;
            wlsjs.api.setOptions({ url: this.nodes[this.currenteNode] });
            if(callback)
                callback
        }else{
            this.currenteNode+=1;
            wlsjs.api.setOptions({ url: this.nodes[this.currenteNode] });
            if(callback)
                callback
        }
    }
}

module.exports = Witness;