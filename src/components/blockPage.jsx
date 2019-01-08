import React, { Component } from 'react';
import wlsjs from 'wlsjs'
import './username.css'
import SwitchBlocks from './blocks/switchBlocks'
class BlockPage extends Component {
    constructor(){
        super()
        this.state={
            result:null
        }
    }
    componentWillMount() {
        var { match }=this.props
        wlsjs.api.setOptions({ url: 'https://wls.kennybll.com' });
        wlsjs.api.getBlockAsync(match.params.id)
        .then(result=>{
            this.setState({
                result
            })
        })
        .catch(err=>{
            let err1=localStorage.getItem("err");
            if(err1===3){
                return window.location.href="/err";
            }
            if(err1){
                localStorage.setItem("err", (err1+1) );
                return window.location.reload()
            }
            localStorage.setItem("err", 1 );
            window.location.reload()
        })

    }
    render() {
        if(this.state.result===null){
            return (
                <div className="container">
                    <center>
                        <img src="https://courts.ms.gov/images_folder/demo/loading.gif" width="50px" height="50px" alt="loading" />
                    </center>
                </div>
            );
        }
        else{
            return (
                <div className="container">
                    <div className="row">
                        <div id="blocksContainer" className="col-sm-12 col-lg-6">
                            <h2><span className="text-danger">witness</span> {this.state.result.witness}</h2>
                        </div>
                        <div id="blocksContainer" className="col-sm-12 col-lg-6">
                            <h2><span className="text-danger">block</span> {this.props.match.params.id}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div id="blocksContainer" className="col-12">
                            {this.state.result.transactions.length<=0 
                                ?  <div className="errCenter">
                                        <img src='https://media.discordapp.net/attachments/475265370878640128/502202181383094282/docker_monstro.png' className="imgenBlocknohace" alt="img block not have" />
                                        <h5>No Data In This Block</h5>
                                    </div>
                                : this.state.result.transactions.map((data,key)=>{ return <SwitchBlocks key={key} trx={this.state.result.transaction_ids[key]} data={data} /> } )}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default BlockPage;