import React,{ Component } from 'react';
import '../username.css'
import moment from 'moment'
import { Link } from 'react-router-dom'

class SwitchBlocks extends Component {
    SwitchBlocks1(data,trx){
        console.log(data)
        switch(data.operations[0][0]) {
            case 'vote':
                return (
                    <p>
                        <Link to={`/trx/${trx}`}><span className="trxtag" >{trx.substring(0,8)}</span></Link>
                        <Link to={`/@${data.operations[0][1].voter}`} >{data.operations[0][1].voter}</Link> 
                        {' '}<b>reward</b>{' '}
                        <Link to={`/@${data.operations[0][1].author}`}>{data.operations[0][1].author}</Link><br />
                        <a href={`https://whaleshares.io/@${data.operations[0][1].author}/${data.operations[0][1].permlink}`} >{data.operations[0][1].permlink}</a>({`${data.operations[0][1].weight/100}%`}) - ({moment(moment.utc(data.expiration).valueOf()).fromNow()})
                    </p>
                    );
                case 'account_create':
                    return (
                        <p>
                            <Link to={`/trx/${trx}`}><span className="trxtag" >{trx.substring(0,8)}</span></Link>
                            <Link to={`/@${data.operations[0][1].creator}`} >{data.operations[0][1].creator}</Link> 
                            {' '}<b>Create Account</b>{' '}
                            <Link to={`/@${data.operations[0][1].new_account_name}`} >{data.operations[0][1].new_account_name}</Link><br />
                            ({moment(moment.utc(data.expiration).valueOf()).fromNow()})
                        </p>
                        );
                case 'account_update':
                    return (
                        <p>
                            <Link to={`/trx/${trx}`}><span className="trxtag" >{trx.substring(0,8)}</span></Link>
                            <Link to={`/@${data.operations[0][1].creator}`} >{data.operations[0][1].creator}</Link> 
                            {' '}<b>account update</b>{' '}<br />
                            <span className="text-danger textoajust">{data.operations[0][1].json_metadata}</span>
                            ({moment(moment.utc(data.expiration).valueOf()).fromNow()})
                        </p>
                        );
                case 'witness_update':
                    return (
                        <p>
                            <Link to={`/trx/${trx}`}><span className="trxtag" >{trx.substring(0,8)}</span></Link>
                            <span>{data.operations[0][1].owner}</span> - ({moment(moment.utc(data.expiration).valueOf()).fromNow()})
                            {' '}<b>witness update</b>{' '}<br />
                            <ul>
                                <li>url:{data.operations[0][1].url}</li>
                                <li>block signing key:{data.operations[0][1].block_signing_key}</li>
                                <li>
                                    <span className="text-danger">fee:{data.operations[0][1].props.fee}</span>
                                    <span className="text-danger">account creation fee:{data.operations[0][1].props.account_creation_fee}</span>
                                    <span className="text-danger">maximum block size:{data.operations[0][1].props.maximum_block_size}</span>
                                </li>
                            </ul>
                        </p>
                    );
                case 'account_witness_vote':
                    return (
                        <p>
                            <Link to={`/trx/${trx}`}><span className="trxtag" >{trx.substring(0,8)}</span></Link>
                            <Link to={`/@${data.operations[0][1].account}`} >{data.operations[0][1].account}</Link> 
                            {' '}<b>{data.operations[0][1].approve===true ? 'vote witness' : 'unvoted witness' }</b>{' '}
                            <Link to={`/@${data.operations[0][1].witness}`} >{data.operations[0][1].witness}</Link> 
                            ({moment(moment.utc(data.expiration).valueOf()).fromNow()})
                        </p>
                        );
                case 'claim_reward_balance':
                    return (
                        <p>
                            <Link to={`/trx/${trx}`}><span className="trxtag" >{trx.substring(0,8)}</span></Link>
                            <Link to={`/@${data.operations[0][1].account}`} >{data.operations[0][1].account}</Link> 
                            {' '}<b>claim reward balance</b>{' '}
                            <span>{data.operations[0][1].reward_vests}</span> - 
                            ({moment(moment.utc(data.expiration).valueOf()).fromNow()})
                        </p>
                    );
                case 'withdraw_vesting':
                    return (
                        <p>
                            <Link to={`/trx/${trx}`}><span className="trxtag" >{trx.substring(0,8)}</span></Link>
                            <Link to={`/@${data.operations[0][1].account}`} >{data.operations[0][1].account}</Link> 
                            {' '}<b>Power down</b>{' '}
                            <span>{data.operations[0][1].vesting_shares}</span> - 
                            ({moment(moment.utc(data.expiration).valueOf()).fromNow()})
                        </p>
                        );
                case 'transfer':
                    return (
                        <p>
                            <Link to={`/trx/${trx}`}><span className="trxtag" >{trx.substring(0,8)}</span></Link>
                            <Link to={`/@${data.operations[0][1].from}`} >{data.operations[0][1].from}</Link> 
                            {' '}<b>transfer</b>{' '}
                            <span>{data.operations[0][1].amount}</span>
                            {' '}<b>to</b>{' '}
                            <Link to={`/@${data.operations[0][1].to}`} >{data.operations[0][1].to}</Link> - 
                            ({moment(moment.utc(data.expiration).valueOf()).fromNow()})<br />
                            <span>memo:{data.operations[0][1].memo ? data.operations[0][1].memo : '  '}</span>
                        </p>
                        );
                case 'transfer_to_vesting':
                    return (
                        <p>
                            <Link to={`/trx/${trx}`}><span className="trxtag" >{trx.substring(0,8)}</span></Link>
                            <Link to={`/@${data.operations[0][1].from}`} >{data.operations[0][1].from}</Link >
                            {' '}<b>Transfer To Vesting</b>{' '}
                            <Link to={`/@${data.operations[0][1].to}`} >{data.operations[0][1].to}</Link>
                            <b>amount:</b>
                            <span>{data.operations[0][1].amount}</span>- 
                            ({moment(moment.utc(data.expiration).valueOf()).fromNow()})
                        </p>
                        );
                case 'comment':
                    if(data.operations[0][1].parent_author!==''){
                        return (
                        <p>
                            <Link to={`/trx/${trx}`}><span className="trxtag" >{trx.substring(0,8)}</span></Link>
                            <Link to={`/@${data.operations[0][1].author}`} >{data.operations[0][1].author}</Link>
                            {' '}<b>replied to</b>{' '}
                            <Link to={`/@${data.operations[0][1].parent_author}`} >{data.operations[0][1].parent_author}</Link> - 
                            ({moment(moment.utc(data.expiration).valueOf()).fromNow()}) <br />
                            <a href={`https://whaleshares.io/@${data.operations[0][1].author}/${data.operations[0][1].permlink}`}>{data.operations[0][1].permlink}</a> 
                            
                        </p>    
                    )}else{
                        return (
                        <p>
                            <Link to={`/trx/${trx}`}><span className="trxtag" >{trx.substring(0,8)}</span></Link>
                            <Link to={`/@${data.operations[0][1].author}`} >{data.operations[0][1].author}</Link>
                            {' '}<b>Author A Post</b>{' '}
                            <a href={`https://whaleshares.io/@${data.operations[0][1].author}/${data.operations[0][1].permlink}`}>{`${data.operations[0][1].permlink.substring(0,25)}...`}</a> - 
                            ({moment(moment.utc(data.expiration).valueOf()).fromNow()}) 
                        </p>
                    )}
                case 'custom_json':
                    var trxjsonccustom=JSON.parse(data.operations[0][1].json)
                    if(trxjsonccustom[0]==='reblog'){
                        return (
                            <p>
                                <Link to={`/trx/${trx}`}><span className="trxtag" >{trx.substring(0,8)}</span></Link>
                                <Link to={`/@${trxjsonccustom[1].account}`} >{trxjsonccustom[1].account}</Link> 
                                {' '}<b>Shared</b>{' '}
                                <Link to={`/@${trxjsonccustom[1].author}`} >{trxjsonccustom[1].author}</Link> - 
                                ({moment(moment.utc(data.expiration).valueOf()).fromNow()})  <br />
                                <a href={`https://whaleshares.io/@${trxjsonccustom[1].author}/${trxjsonccustom[1].permlink}`}>{trxjsonccustom[1].permlink}</a>
                            </p>
                        )
                    }
                    if(trxjsonccustom[0]==='follow'){
                        return (
                            <p>
                                <Link to={`/trx/${trx}`}><span className="trxtag" >{trx.substring(0,8)}</span></Link>
                                <Link to={`/@${trxjsonccustom[1].follower}`} >{trxjsonccustom[1].follower}</Link> 
                                {' '}<b>{trxjsonccustom[1].what[0]==='blog' ? 'Follow' : 'Unfollow' }</b>{' '}
                                <Link to={`/@${trxjsonccustom[1].following}`} >{trxjsonccustom[1].following}</Link> - 
                                ({moment(moment.utc(data.expiration).valueOf()).fromNow()}) 
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
                    return (
                        <p className="textoajust">
                        {`${data.operations[0][0]} is not defined yet please notify chronocrypto#7035 or ederaleng#0471 in discord of whaleshares to be able to implement it as soon as possible`} 
                        </p>
                    )
        }
    }
    render(){
        return (
            <div className="alertp alert-primary" role="alert">
                {this.SwitchBlocks1(this.props.data,this.props.trx)}
            </div>
        );
    }
};

export default SwitchBlocks;