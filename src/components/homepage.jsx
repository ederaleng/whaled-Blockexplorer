import React, { Component } from 'react';
import wlsjs from 'wlsjs'
import './username.css'
import Bloks from './bloksHomePage'
import OpenSource from './user/OpenSource'
class Homepage extends Component {
    constructor(){
        super()
        this.state={
            result:null,
            blockresult:null,
            blocksarr:[]
        }
    }
    BlockUpdate(block){
        wlsjs.api.getBlockAsync(block)
        .then(blockresult=>{
            this.setState({
                blockresult
            })
            return null
        })
        .catch(err=>{
            window.location.href="/err"
        })
    }
    DynamicGlobalProperties(){
        wlsjs.api.setOptions({ url: 'https://wls.kennybll.com' });
        wlsjs.api.getDynamicGlobalPropertiesAsync()
        .then(result=>{
            this.BlockUpdate(result.head_block_number)
            var dataBlocks=this.state.blocksarr
            if(this.state.blocksarr.length<=7){
                dataBlocks.push(result)
            }else{
                dataBlocks.pop();
                dataBlocks.push(result)
            }

            dataBlocks.sort((a, b)=>{  
                if (a.head_block_number < b.head_block_number) { return 1; }
                if (a.head_block_number > b.head_block_number) { return -1; }
                return 0;
            })

            this.setState({
                result,
                blocksarr:dataBlocks
            })
            return null
        })
        .catch(err=>{
            window.location.href="/err"
        })
    }
    componentWillMount() {
        setInterval(()=>{ 
            this.DynamicGlobalProperties()
        },3000)
    }
    render() {
        if(this.state.result===null || this.state.blockresult===null){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-6">
                            <center>
                                <img src="https://courts.ms.gov/images_folder/demo/loading.gif" width="50px" height="50px" alt="loading" />
                            </center>
                        </div>
                        <div className="col-sm-12 col-lg-6">
                            <center>
                                <img src="https://courts.ms.gov/images_folder/demo/loading.gif" width="50px" height="50px" alt="loading" />
                            </center>
                        </div>
                    </div>
                </div>
            );
        }else{
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-6">
                            <div className="row alert alert-primary" >
                                    <div className="col"><b>witness:</b><p>{this.state.blockresult.witness}</p> </div>
                                    <div className="col"><b>Number transaction:</b><p>{this.state.blockresult.transactions.length}</p></div>
                                    
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    {this.state.blocksarr.map((data,key)=>{ return  <Bloks key={key} data={data} /> })}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-6">
                            <table className="tablestyle">
                                <tbody id="tbodycenter">
                                    <tr className="trtitletable">
                                        <td colSpan="2" className="titletable"><b>Global Properties</b></td>
                                    </tr>
                                    <tr>
                                        <th>head block number:</th>
                                        <td>{this.state.result.head_block_number}</td>
                                    </tr>
                                    <tr>
                                        <th>head block id:</th>
                                        <td>{this.state.result.head_block_id}</td>
                                    </tr>
                                    <tr>
                                        <th>current witness:</th>
                                        <td>{this.state.result.current_witness}</td>
                                    </tr>
                                    <tr>
                                        <th>time:</th>
                                        <td>{this.state.result.time}</td>
                                    </tr>
                                    <tr>
                                        <th>current supply:</th>
                                        <td>{this.state.result.current_supply}</td>
                                    </tr>
                                    <tr>
                                        <th>total vesting fund WLS:</th>
                                        <td>{this.state.result.total_vesting_fund_steem}</td>
                                    </tr>
                                    <tr>
                                        <th>total vesting shares:</th>
                                        <td>{this.state.result.total_vesting_shares}</td>
                                    </tr>
                                    <tr>
                                        <th>total reward fund WLS:</th>
                                        <td>{this.state.result.total_reward_fund_steem}</td>
                                    </tr>
                                    <tr>
                                        <th>total reward shares2:</th>
                                        <td>{this.state.result.total_reward_shares2}</td>
                                    </tr>
                                    <tr>
                                        <th>pending rewarded vesting shares:</th>
                                        <td>{this.state.result.pending_rewarded_vesting_shares}</td>
                                    </tr>
                                    <tr>
                                        <th>pending rewarded vesting WLS:</th>
                                        <td>{this.state.result.pending_rewarded_vesting_steem}</td>
                                    </tr>
                                    <tr>
                                        <th>maximum block size:</th>
                                        <td>{this.state.result.maximum_block_size}</td>
                                    </tr>
                                    <tr>
                                        <th>current aslot:</th>
                                        <td>{this.state.result.current_aslot}</td>
                                    </tr>
                                    <tr>
                                        <th>recent slots filled:</th>
                                        <td>{this.state.result.recent_slots_filled}</td>
                                    </tr>
                                    <tr>
                                        <th>participation count:</th>
                                        <td>{this.state.result.participation_count}</td>
                                    </tr>
                                    <tr>
                                        <th>last irreversible block num:</th>
                                        <td>{this.state.result.last_irreversible_block_num}</td>
                                    </tr>
                                    <tr>
                                        <th>vote power reserve rate:</th>
                                        <td>{this.state.result.vote_power_reserve_rate}</td>
                                    </tr>
                                    <tr>
                                        <th>current reserve ratio:</th>
                                        <td>{this.state.result.current_reserve_ratio}</td>
                                    </tr>
                                    <tr>
                                        <th>average block size:</th>
                                        <td>{this.state.result.average_block_size}</td>
                                    </tr>
                                    <tr>
                                        <th>max virtual bandwidth:</th>
                                        <td>{this.state.result.max_virtual_bandwidth}</td>
                                    </tr>
                            </tbody>
                        </table>
                        <OpenSource />
                        </div>
                    </div>
                </div>
            );
        }
        
    }
}
export default Homepage;