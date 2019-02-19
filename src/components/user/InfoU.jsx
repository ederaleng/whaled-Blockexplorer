import React, { Component } from 'react';
import wlsjs from 'wlsjs'
import '../username.css'
import Valaccount from './valaccount'
import moment from 'moment'
import OpenSource from './OpenSource'
class InfoU extends Component {
    constructor(){
        super()
        this.state={
            data:null,
            stake:'loading...'
        }
    }
    getStyleVp(vp,lastVote){
        const secondsago = (new Date().getTime() - new Date(lastVote + "Z").getTime()) / 1000;
        const votingPower=vp + (10000 * secondsago / 432000);
        var style={
            width: `${Math.min((votingPower/100).toFixed(2),100)}%`
        }
        return style
    }
    getVotingPower(vp,lastVote){
        const secondsago = (new Date().getTime() - new Date(lastVote + "Z").getTime()) / 1000;
        const votingPower=vp + (10000 * secondsago / 432000);
        return Math.min((votingPower/100).toFixed(2),100)
    }
    stake(vt){
        wlsjs.api.getDynamicGlobalPropertiesAsync()
        .then(result =>{
            var stake=(wlsjs.formatter.vestToSteem(parseFloat(vt), parseFloat(result.total_vesting_shares), parseFloat(result.total_vesting_fund_steem))).toFixed(3)
            this.setState({
                stake
            })
        })
        .catch(error =>{
            let err1=localStorage.getItem("err");
            if(err1===3){
                return window.location.href="/err";
            }
            if(err1){
                return localStorage.setItem("err", (err1+1) );
            }
            localStorage.setItem("err", 1 );
            window.location.reload()
        }); 
        
    }
    componentDidMount(){
        wlsjs.api.setOptions({ url: 'https://wls.kennybll.com' });
        wlsjs.api.getAccountsAsync([this.props.user])
        .then(async Response =>{
            this.stake(Response[0].vesting_shares)
            this.setState({
                data:Response
            })
        })
        .catch(error => {
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
        if(this.state.data==null){
            return(
                <div className="col-lg-4 col-sm-12">
                    
                    <div className="alert alert-primary" role="alert">
                        <center>
                            <img src="https://courts.ms.gov/images_folder/demo/loading.gif" width="20%" height="20%" alt="loading" />
                        </center>
                    </div>
                    <div className="alert alert-primary" role="alert">
                        <center>
                            <img src="https://courts.ms.gov/images_folder/demo/loading.gif" width="20%" height="20%" alt="loading" />
                        </center>
                    </div>
                    <div className="alert alert-primary" role="alert">
                        <center>
                            <img src="https://courts.ms.gov/images_folder/demo/loading.gif" width="20%" height="20%" alt="loading" />
                        </center>
                    </div>
                    <div className="alert alert-primary" role="alert">
                        <center>
                            <img src="https://courts.ms.gov/images_folder/demo/loading.gif" width="20%" height="20%" alt="loading" />
                        </center>
                    </div>
                </div>
            )
        }else{
            var data=this.state.data[0]
            return (
                <div className="col-lg-4 col-sm-12">
                    <div className="alert alert-primary" role="alert">
                        <div className="row">
                            <div className="col">

                                <center>
                                    <span>Reward Weight</span>
                                    <h4>{this.state.stake!=='loading...' ? `${this.state.stake} WP` : this.state.stake}</h4>
                                    <Valaccount user={this.props.user} /><br />
                                    <span><small>Next Powerdown: {data.vesting_withdraw_rate}</small></span>
                                </center>
                                <div className="progress">
                                    <div className="progress-bar progress-bar-striped" role="progressbar" style={this.getStyleVp(data.voting_power,data.last_vote_time)} aria-valuemin="0" aria-valuemax="100">
                                        {`${this.getVotingPower(data.voting_power,data.last_vote_time)}%`}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col">
                                <center>
                                    <p className="mboton">Reputation</p>
                                    <h5 className="mboton">{wlsjs.formatter.reputation(data.reputation)}</h5>
                                    <span className="miniature">{`${data.post_count} posts`}</span>
                                </center>
                            </div>
                            <div className="col">
                                <center>
                                    <p className="mboton">age</p>
                                    <h5 className="mboton">{moment(moment.utc(data.created).valueOf()).fromNow()}</h5>
                                    <span className="miniature">{moment(data.created).format('MMMM YYYY')}</span>
                                </center>
                            </div>
                        </div>
                            <center>
                                <span className="mb-0 spanOpacity">
                                    view on:<a href={`https://whaleshares.io/@${this.props.user}`}>whaleshares.io</a>
                                </span>
                            </center>
                    </div>
                    <div className="alert alert-primary" role="alert">
                        <table className="col-12 col-sm-12">
                            <tbody>
                                {data.id ? <tr><th>id:</th><td>{data.id}</td></tr> : null}
                                {data.name ? <tr><th>Name:</th><td>{data.name}</td></tr> : null}
                                {data.proxy ? <tr>proxy:<th></th><td>{data.proxy}</td></tr> : null}
                                {data.created ? <tr><th>created:</th><td>{data.created}</td></tr> : null}
                                {data.last_owner_update ? <tr><th>last owner update:</th><td>{data.last_owner_update}</td></tr> : null}
                                {data.last_account_update ? <tr><th>last account update:</th><td>{data.last_account_update}</td></tr> : null}
                                {data.recovery_account ? <tr><th>recovery account:</th><td>{data.recovery_account}</td></tr> : null}
                                {data.post_count ? <tr><th>post count:</th><td>{data.post_count}</td></tr> : null}
                                {data.last_vote_time ? <tr><th>last vote time:</th><td>{data.last_vote_time}</td></tr> : null}
                                {data.balance ? <tr><th>balance:</th><td>{data.balance}</td></tr> : null}
                                {data.reward_steem_balance ? <tr><th>reward WLS balance:</th><td>{data.reward_steem_balance}</td></tr> : null}
                                {data.reward_vesting_balance ? <tr><th>reward vesting balance:</th><td>{data.reward_vesting_balance}</td></tr> : null}
                                {data.reward_vesting_steem ? <tr><th>reward vesting WLS:</th><td>{data.reward_vesting_steem}</td></tr> : null}
                                {data.vesting_shares ? <tr><th>vesting shares:</th><td>{data.vesting_shares}</td></tr> : null}
                                {data.vesting_withdraw_rate ? <tr><th>vesting withdraw rate:</th><td>{data.vesting_withdraw_rate}</td></tr> : null}
                                {data.next_vesting_withdrawal ? <tr><th>next vesting withdrawal:</th><td>{data.next_vesting_withdrawal}</td></tr> : null}
                                {data.withdrawn ? <tr><th>withdrawn:</th><td>{data.withdrawn}</td></tr> : null}
                                {data.to_withdraw ? <tr><th>to withdraw:</th><td>{data.to_withdraw}</td></tr> : null}
                                {data.withdraw_routes ? <tr><th>withdraw routes:</th><td>{data.withdraw_routes}</td></tr> : null}
                                {data.curation_rewards ? <tr><th>curation rewards:</th><td>{data.curation_rewards}</td></tr> : null}
                                {data.posting_rewards ? <tr><th>posting rewards:</th><td>{data.posting_rewards}</td></tr> : null}
                                {data.average_bandwidth ? <tr><th>average bandwidth:</th><td>{data.average_bandwidth}</td></tr> : null}
                                {data.lifetime_bandwidth ? <tr><th>lifetime bandwidth:</th><td>{data.lifetime_bandwidth}</td></tr> : null}
                                {data.last_bandwidth_update ? <tr><th>last bandwidth update:</th><td>{data.last_bandwidth_update}</td></tr> : null}
                                {data.last_post ? <tr><th>last post:</th><td>{data.last_post}</td></tr> : null}
                                {data.last_root_post ? <tr><th>last root post:</th><td>{data.last_root_post}</td></tr> : null}
                                {data.witnesses_voted_for ? <tr><th>witnesses voted for:</th><td>{data.witnesses_voted_for}</td></tr> : null}
                            </tbody>
                        </table>
                    </div>
                    <div className="alert alert-primary" role="alert">
                        <center><h4 className="alert-heading">json metadata</h4></center>
                        <p className="text-danger textoajust">{data.json_metadata}</p>
                    </div>
                    <div className="alert alert-primary" role="alert">
                        <center><h4 className="alert-heading">witness votes</h4></center>
                        <ol>
                        { data.witness_votes.map( (witness,key)=>{ return <li key={key}>{witness}</li>  } ) }
                        </ol>
                        <hr />
                        <b>witness votes free:</b>{ 30-(data.witness_votes.length) }
                    </div>
                    <OpenSource />
                </div>
            );
        }
    }
}

export default InfoU;