import React, { Component } from 'react';
import '../username.css'
import moment from 'moment'
import { Link } from 'react-router-dom'


class SwitchPages extends Component {
    SwitchPage1(obj){
        
        switch(obj[1].op[0]) {
            case 'vote':
                return (
                    <p>
                        <Link to={`/trx/${obj[1].trx_id}`}><span className="trxtag" >{obj[1].trx_id.substring(0,8)}</span></Link>
                        <a href={`/@${obj[1].op[1].voter}`} >{obj[1].op[1].voter}</a> 
                        {' '}<b>reward</b>{' '}
                        <a href={`/@${obj[1].op[1].author}`}>{obj[1].op[1].author}</a><br />
                        <a href={`https://whaleshares.io/@${obj[1].op[1].author}/${obj[1].op[1].permlink}`} >{obj[1].op[1].permlink}</a>({`${obj[1].op[1].weight/100}%`}) - ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()})
                    </p>
                    );
            case 'account_create':
                return (
                    <p>
                        <Link to={`/trx/${obj[1].trx_id}`}><span className="trxtag" >{obj[1].trx_id.substring(0,8)}</span></Link>
                        <a href={`/@${obj[1].op[1].creator}`} >{obj[1].op[1].creator}</a> 
                        {' '}<b>Create Account</b>{' '}
                        <a href={`/@${obj[1].op[1].new_account_name}`} >{obj[1].op[1].new_account_name}</a><br />
                        ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()})
                    </p>
                    );
            case 'account_update':
                return (
                    <p>
                        <Link to={`/trx/${obj[1].trx_id}`}><span className="trxtag" >{obj[1].trx_id.substring(0,8)}</span></Link>
                        <a href={`/@${obj[1].op[1].creator}`} >{obj[1].op[1].creator}</a> 
                        {' '}<b>account update</b>{' '}<br />
                        <span className="text-danger textoajust">{obj[1].op[1].json_metadata}</span>
                        ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()})
                    </p>
                    );
            case 'witness_update':
                return (
                    <p>
                        <Link to={`/trx/${obj[1].trx_id}`}><span className="trxtag" >{obj[1].trx_id.substring(0,8)}</span></Link>
                        <span>{obj[1].op[1].owner}</span> - ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()})
                        {' '}<b>witness update</b>{' '}<br />
                        <ul>
                            <li>url:{obj[1].op[1].url}</li>
                            <li>block signing key:{obj[1].op[1].block_signing_key}</li>
                            <li>
                                <span className="text-danger">fee:{obj[1].op[1].props.fee}</span>
                                <span className="text-danger">account creation fee:{obj[1].op[1].props.account_creation_fee}</span>
                                <span className="text-danger">maximum block size:{obj[1].op[1].props.maximum_block_size}</span>
                            </li>
                        </ul>
                    </p>
                    );
            case 'account_witness_vote':
                return (
                    <p>
                        <Link to={`/trx/${obj[1].trx_id}`}><span className="trxtag" >{obj[1].trx_id.substring(0,8)}</span></Link>
                        <a href={`/@${obj[1].op[1].account}`} >{obj[1].op[1].account}</a> 
                        {' '}<b>{obj[1].op[1].approve===true ? 'vote witness' : 'unvoted witness' }</b>{' '}
                        <a href={`/@${obj[1].op[1].witness}`} >{obj[1].op[1].witness}</a> 
                        ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()})
                    </p>
                    );
            case 'claim_reward_balance':
                return (
                    <p>
                        <Link to={`/trx/${obj[1].trx_id}`}><span className="trxtag" >{obj[1].trx_id.substring(0,8)}</span></Link>
                        <a href={`/@${obj[1].op[1].account}`} >{obj[1].op[1].account}</a> 
                        {' '}<b>claim reward balance</b>{' '}
                        <span>{obj[1].op[1].reward_vests}</span> - 
                        ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()})
                    </p>
                    );
            case 'producer_reward':
                return (
                    <p>
                        <span className="trxtag" >virtual</span>
                        <span>{obj[1].op[1].producer}</span> 
                        {' '}<b>produced</b>{' '}
                        <span>{obj[1].op[1].vesting_shares}</span> - 
                        ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()})
                    </p>
                    );
            case 'withdraw_vesting':
                return (
                    <p>
                        <Link to={`/trx/${obj[1].trx_id}`}><span className="trxtag" >{obj[1].trx_id.substring(0,8)}</span></Link>
                        <a href={`/@${obj[1].op[1].account}`} >{obj[1].op[1].account}</a> 
                        {' '}<b>Power down</b>{' '}
                        <span>{obj[1].op[1].vesting_shares}</span> - 
                        ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()})
                    </p>
                    );
            case 'transfer':
                return (
                    <p>
                        <Link to={`/trx/${obj[1].trx_id}`}><span className="trxtag" >{obj[1].trx_id.substring(0,8)}</span></Link>
                        <a href={`/@${obj[1].op[1].from}`} >{obj[1].op[1].from}</a> 
                        {' '}<b>transfer</b>{' '}
                        <span>{obj[1].op[1].amount}</span>
                        {' '}<b>to</b>{' '}
                        <a href={`/@${obj[1].op[1].to}`} >{obj[1].op[1].to}</a> - 
                        ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()})<br />
                        <span>memo:{obj[1].op[1].memo ? obj[1].op[1].memo : '  '}</span>
                    </p>
                    );
            case 'transfer_to_vesting':
                return (
                    <p>
                        <Link to={`/trx/${obj[1].trx_id}`}><span className="trxtag" >{obj[1].trx_id.substring(0,8)}</span></Link>
                        <a href={`/@${obj[1].op[1].from}`} >{obj[1].op[1].from}</a> 
                        {' '}<b>Transfer To Vesting</b>{' '}
                        <a href={`/@${obj[1].op[1].to}`} >{obj[1].op[1].to}</a>
                        <b>amount:</b>
                        <span>{obj[1].op[1].amount}</span>- 
                        ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()}) 
                    </p>
                    );
            case 'author_reward':
                return (
                    <p>
                        <span className="trxtag" >virtual</span>
                        <a href={`/@${obj[1].op[1].author}`} >{obj[1].op[1].author}</a> 
                        {' '}<b>Author Reward</b>{' '}
                        <span>{`${obj[1].op[1].steem_payout}, ${obj[1].op[1].vesting_payout} of`}</span> <br />
                        <a href={`https://whaleshares.io/@${obj[1].op[1].author}/${obj[1].op[1].permlink}`} >{obj[1].op[1].permlink}</a> -  
                        ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()}) 
                    </p>
                    );
            case 'curation_reward':
                return (
                    <p>
                        <span className="trxtag" >virtual</span>
                        <a href={`/@${obj[1].op[1].curator}`} >{obj[1].op[1].curator}</a> 
                        {' '}<b>Curation Reward</b>{' '}
                        <span>{`${obj[1].op[1].reward} `}</span><b>From Post</b><br />
                        <a href={`https://whaleshares.io/@${obj[1].op[1].comment_author}/${obj[1].op[1].comment_permlink}`}>{obj[1].op[1].comment_permlink}</a> <b>Of</b> <a href={`/@${obj[1].op[1].comment_author}`}>{obj[1].op[1].comment_author}</a> -  
                        ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()}) 
                    </p>
                    );
            case 'shutdown_witness':
                return (
                    <p>
                        <span className="trxtag" >virtual</span>
                        <a href={`/@${obj[1].op[1].owner}`} >{obj[1].op[1].owner}</a> 
                        {' '}<b>Block Producer Down</b>{' '}
                        ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()}) 
                    </p>
                    );
            case 'account_witness_proxy':
                return (
                    <p>
                        <span className="trxtag" >virtual</span>
                        <a href={`/@${obj[1].op[1].account}`} >{obj[1].op[1].account}</a> 
                        {' '}<b>Add As Proxy To</b>{' '}
                        <a href={`/@${obj[1].op[1].proxy}`} >{obj[1].op[1].proxy}</a> 
                        ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()}) 
                    </p>
                    );

            case 'fill_vesting_withdraw':
                    return (
                        <p>
                            <span className="trxtag" >virtual</span>
                            <a href={`/@${obj[1].op[1].from_account}`} >{obj[1].op[1].from_account}</a> 
                            {' '}<b>Withdraw</b>{' '}
                            {obj[1].op[1].withdrawn}
                            {' '}<b>As</b>{' '}
                            {obj[1].op[1].deposited}
                            {' '}<b>In The Account</b>{' '}
                            <a href={`/@${obj[1].op[1].to_account}`} >{obj[1].op[1].to_account}</a> 
                            ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()}) 
                        </p>
                        );
            case 'comment':
                if(obj[1].op[1].parent_author!==''){
                    return (
                    <p>
                        <Link to={`/trx/${obj[1].trx_id}`}><span className="trxtag" >{obj[1].trx_id.substring(0,8)}</span></Link>
                        <a href={`/@${obj[1].op[1].author}`} >{obj[1].op[1].author}</a>
                        {' '}<b>replied to</b>{' '}
                        <a href={`/@${obj[1].op[1].parent_author}`} >{obj[1].op[1].parent_author}</a> - 
                        ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()}) <br />
                        <a href={`https://whaleshares.io/@${obj[1].op[1].author}/${obj[1].op[1].permlink}`}>{obj[1].op[1].permlink}</a> 
                        
                    </p>    
                )}else{
                    return (
                    <p>
                        <Link to={`/trx/${obj[1].trx_id}`}><span className="trxtag" >{obj[1].trx_id.substring(0,8)}</span></Link>
                        <a href={`/@${obj[1].op[1].author}`} >{obj[1].op[1].author}</a>
                        {' '}<b>Author A Post</b>{' '}
                        <a href={`https://whaleshares.io/@${obj[1].op[1].author}/${obj[1].op[1].permlink}`}>{`${obj[1].op[1].permlink.substring(0,25)}...`}</a> - 
                        ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()}) 
                    </p>
                )}
            case 'custom_json':
                var trxjsonccustom=JSON.parse(obj[1].op[1].json)
                if(trxjsonccustom[0]==='reblog'){
                    return (
                        <p>
                            <Link to={`/trx/${obj[1].trx_id}`}><span className="trxtag" >{obj[1].trx_id.substring(0,8)}</span></Link>
                            <a href={`/@${trxjsonccustom[1].account}`} >{trxjsonccustom[1].account}</a> 
                            {' '}<b>Shared</b>{' '}
                            <a href={`/@${trxjsonccustom[1].author}`} >{trxjsonccustom[1].author}</a> - 
                            ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()}) <br />
                            <a href={`https://whaleshares.io/@${trxjsonccustom[1].author}/${trxjsonccustom[1].permlink}`}>{trxjsonccustom[1].permlink}</a>
                        </p>
                    )
                }
                if(trxjsonccustom[0]==='follow'){
                    return (
                        <p>
                            <Link to={`/trx/${obj[1].trx_id}`}><span className="trxtag" >{obj[1].trx_id.substring(0,8)}</span></Link>
                            <a href={`/@${trxjsonccustom[1].follower}`} >{trxjsonccustom[1].follower}</a> 
                            {' '}<b>{trxjsonccustom[1].what[0]==='blog' ? 'Follow' : 'Unfollow' }</b>{' '}
                            <a href={`/@${trxjsonccustom[1].following}`} >{trxjsonccustom[1].following}</a> - 
                            ({moment(moment.utc(obj[1].timestamp).valueOf()).fromNow()}) 
                        </p>
                    )
                }else{
                    return (
                        <p className="textoajust">
                        this type of transaction has not been defined please notify chronocrypto #7035 or ederaleng #0471 in discord of whaleshares to be able to implement it as soon as possible
                        </p>
                    )
                }
            default:
                console.log(obj[1].op)
                return (
                    <p className="textoajust">
                    {`${obj[1].op[0]} is not defined yet please notify chronocrypto#7035 or ederaleng#0471 in discord of whaleshares to be able to implement it as soon as possible`} 
                    </p>
                )
        }
    }
    render() {
        return (
            <div className="alertp alert-primary" role="alert">
                {this.SwitchPage1(this.props.data)}
            </div>
        );
    }
}



export default SwitchPages;