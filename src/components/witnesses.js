import React, { Component } from 'react';
import wlsjs from 'wlsjs'
import moment from 'moment'
class Witnesses extends Component {
    constructor(props){
        super(props)
        this.state={
            witnessWLS:null,
            Global:null
        }
    }
    async componentWillMount() {
        try {

            wlsjs.api.setOptions({ url: 'https://wls.kennybll.com' });
            var Global=await wlsjs.api.getDynamicGlobalPropertiesAsync();
            var r=await wlsjs.api.getWitnessesByVoteAsync("", 100)
            console.log(Global)
            this.setState({ witnessWLS: r,Global })
        } catch (err) {
            console.log("err")
        }
    }
    _blockGap(head_block, last_block){
        if (!last_block || last_block < 1) return 'forever';
        const secs = (head_block - last_block) * 3;
        if (secs < 120) return 'recently';
        const mins = Math.floor(secs / 60);
        if (mins < 120) return mins + ' mins ago';
        const hrs = Math.floor(mins / 60);
        if (hrs < 48) return hrs + ' hrs ago';
        const days = Math.floor(hrs / 24);
        if (days < 14) return days + ' days ago';
        const weeks = Math.floor(days / 7);
        if (weeks < 104) return weeks + ' weeks ago';
    }
    render() {
        var { witnessWLS }=this.state
        if(!witnessWLS){
            return (
                <div className="container">
                    <center>
                        <img src="https://courts.ms.gov/images_folder/demo/loading.gif" width="50px" height="50px" alt="loading" />
                    </center>
                </div>
            )
        }
        return (
            <div className="container">
            <div className="witness">
                <table className="table table-witness" style={{ border:"solid 1px",borderRadius:"5px" }}>
                <thead >
                    <tr>
                    <td>Rank</td>
                    <td>Testigos</td>
                    <td>created</td>
                    <td>Miss</td>
                    <td>Running Version</td>
                    </tr>
                </thead>
                <tbody>
                {
                    witnessWLS.map((w,key)=>{
                        
                        return (
                            <tr key={key}>
                                <td>{key+1}</td>
                                <td>
                                    <div className="media-body">

                                        <div className="div-imagen-witness">
                                            <img src={`https://imgp.whaleshares.io/profileimage/${w.owner}/64x64`} alt={`img perfil ${w.owner}`} className="rounded-circle imagen-witness" />
                                        </div>
                                        <div>
                                            <a href={`/@${w.owner}`} style={{ marginRight:"5px" }}>{w.owner}</a>
                                            <br />
                                            {
                                                w.signing_key!=="WLS1111111111111111111111111111111114T1Anm" ? 
                                                <span className="badge badge-success">{"Enabled"}</span>
                                                : 
                                                <span className="badge badge-danger">{`Disabled (${this._blockGap(this.state.Global.head_block_number,w.last_confirmed_block_num)})`}</span>
                                            }
                                            <a href={w.url}><img src="/icons/enlace.svg" alt="link url" className="link-witness" /></a>
                                        </div>
                                    </div>
                                </td>
                                <td>{moment(moment.utc(w.created).valueOf()).fromNow()}</td>
                                <td>{w.total_missed}</td>
                                <td><span className="badge badge-primary">{w.running_version}</span></td>
                            </tr>
                        )
                    })
                }
                </tbody>
                </table>
            </div>
            </div>
        );
    }
}

export default Witnesses;