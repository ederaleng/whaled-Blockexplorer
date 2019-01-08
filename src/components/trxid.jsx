import React, { Component } from 'react';
import wlsjs from 'wlsjs'
import './username.css'
import { Link } from 'react-router-dom'
class Trxid extends Component {
    constructor(){
        super()
        this.state={
            result:null
        }
    }
    componentWillMount() {
        wlsjs.api.setOptions({ url: 'https://wls.kennybll.com' });
        wlsjs.api.getTransactionAsync(this.props.trx)
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
    TrxIdSwitch(data){
        switch(data[0]) {
            case 'vote':
                return (
                    <div>
                        <b>Type Operations:</b><span> {data[0]} </span><br />
                        <b>Author:</b><Link to={`/@${data[1].author}`}> {data[1].author} </Link><br />
                        <b>Permlink:</b><a href={`https://whaleshares.io/@${data[1].author}/${data[1].permlink}`}> {data[1].permlink} </a><br />
                        <b>Voter:</b><Link to={`/@${data[1].voter}`}> {data[1].voter} </Link><br />
                        <b>Weight:</b><span> {`${data[1].weight/100}%`} </span><br />
                    </div>
                );
            case 'withdraw_vesting':
                return (
                    <div>
                        <b>Type Operations:</b><span> {data[0]} </span><br />
                        <b>Account:</b><Link to={`/@${data[1].account}`}> {data[1].account} </Link><br />
                        <b>Vesting Shares:</b><span> {`${data[1].vesting_shares}`} </span><br />
                    </div>
                );
            case 'account_create':
                return (
                    <div>
                        <b>Type Operations:</b><span> {data[0]} </span><br />
                        <b>Creator Account:</b><Link to={`/@${data[1].creator}`}> {data[1].creator} </Link><br />
                        <b>New Account Name:</b><Link to={`/@${data[1].new_account_name}`}> {data[1].new_account_name} </Link><br />
                        <b>Fee:</b><span> {data[1].fee} </span><br />
                    </div>
                );
            case 'account_update':
                return (
                    <div>
                        <b>Type Operations:</b><span> {data[0]} </span><br />
                        <b>Account:</b><Link to={`/@${data[1].account}`} > {data[1].account} </Link><br />
                        <b>JSON data:</b><span className="text-danger textoajust"> {data[1].json_metadata} </span><br />
                    </div>
                )
            case 'account_witness_vote':
                return (
                    <div>
                        <b>Type Operations:</b><span> {data[0]} </span><br />
                        <b>Account:</b><Link to={`/@${data[1].account}`} > {data[1].account} </Link><br />
                        <b>Witness:</b><Link to={`/@${data[1].witness}`} > {data[1].witness} </Link><br />
                        <b>Approve:</b><span> {data[1].approve===true ? 'Voted' : 'Unvoted'} </span><br />
                    </div>
                )
            case 'claim_reward_balance':
                return (
                    <div>
                        <b>Type Operations:</b><span> {data[0]} </span><br />
                        <b>Account:</b><Link to={`/@${data[1].account}`} > {data[1].account} </Link><br />
                        <b>Reward WLS:</b><span> {data[1].reward_steem} </span><br />
                        <b>Reward Vests:</b><span> {data[1].reward_vests} </span><br />
                    </div>
                )
            case 'transfer':
                return (
                    <div>
                        <b>Type Operations:</b><span> {data[0]} </span><br />
                        <b>Amount:</b><span> {data[1].amount} </span><br />
                        <b>From:</b><Link to={`/@${data[1].from}`} > {data[1].from} </Link><br />
                        <b>To:</b><Link to={`/@${data[1].to}`} > {data[1].to} </Link><br />
                    </div>
                )
            case 'transfer_to_vesting':
                return (
                    <div>
                        <b>Type Operations:</b><span> {data[0]} </span><br />
                        <b>Amount:</b><span> {data[1].amount} </span><br />
                        <b>From:</b><Link to={`/@${data[1].from}`} > {data[1].from} </Link><br />
                        <b>To:</b><Link to={`/@${data[1].to}`} > {data[1].to} </Link><br />
                    </div>
                )
            case 'comment':
                if(data[1].parent_author===''){
                    return(
                        <div>
                            <b>Type Operations:</b><span> Authored A Post </span><br />
                            <b>Parent Author:</b> {data[1].parent_author ? <Link to={`/@${data[1].parent_author}`}>{data[1].parent_author}</Link> : <span>{'null'}</span>} <br />
                            <b>Parent Permlink:</b>{data[1].parent_permlink ? <a href={`https://whaleshares.io/@${data[1].parent_author}/${data[1].parent_permlink}`}>{data[1].parent_permlink}</a> : <span> {'null'}</span> } <br />
                            <b>Author:</b><Link to={`/@${data[1].author}`}> {data[1].author} </Link><br />
                            <b>Permlink:</b><a href={`https://whaleshares.io/@${data[1].author}/${data[1].permlink}`}> {data[1].permlink} </a><br />
                            <b>Title:</b><span> {data[1].title ? data[1].title : 'null'} </span><br />
                        </div>    
                    )
                }else{
                    return (
                        <div>
                            <b>Type Operations:</b><span> replied  </span><br />
                            <b>Parent Author:</b><Link to={`/@${data[1].parent_author}`}> {data[1].parent_author} </Link><br />
                            <b>Parent Permlink:</b><a href={`https://whaleshares.io/@${data[1].parent_author}/${data[1].parent_permlink}`}> {data[1].parent_permlink} </a><br />
                            <b>Author:</b><Link to={`/@${data[1].author}`}>{data[1].author} </Link><br />
                            <b>Permlink:</b><a href={`https://whaleshares.io/@${data[1].author}/${data[1].permlink}`}> {data[1].permlink} </a><br />
                            <b>Title:</b><span> {data[1].title ? data[1].title : 'null'} </span><br />
                        </div>
                    )
                }
            case 'custom_json':
                var typetrx=JSON.parse(data[1].json)
                if(typetrx[0]==='reblog'){
                    return(
                        <div>
                            <b>Type Operations:</b><span> {typetrx[0]} </span><br />
                            <b>Account:</b><Link to={`/@${typetrx[1].account}`} > {typetrx[1].account} </Link><br />
                            <b>Author:</b><Link to={`/@${typetrx[1].author}`}> {typetrx[1].author} </Link><br />
                            <b>Permlink:</b><a href={`https://whaleshares.io/@${typetrx[1].author}/${typetrx[1].permlink}`}> {typetrx[1].permlink} </a><br />
                        </div>
                    )
                }
                if(typetrx[0]==='follow'){
                    return(
                        <div>
                            <b>Type Operations:</b><span> {typetrx[0]} </span><br />
                            <b>Follower:</b><Link to={`/@${typetrx[1].follower}`}> {typetrx[1].follower} </Link><br />
                            <b>Following:</b><Link to={`/@${typetrx[1].following}`}> {typetrx[1].following} </Link><br />
                            <b>What:</b><span> {typetrx[1].what[0]==='blog' ? 'Follow' : 'Unfollow' } </span><br />
                        </div>
                    )
                }else{
                    return (
                        <p className="textoajust">
                        this type of transaction has not been defined please notify chronocrypto #7035 or ederaleng #0471 in discord to be able to implement it as soon as possible
                        </p>
                    )
                }
            default: 
                return (
                    <p>this type of transaction has not been defined please notify chronocrypto #7035 or ederaleng #0471 in discord to be able to implement it as soon as possible</p>
                )
                
        }
    }
    render() {
        if(this.state.result!=null){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 colorTrxIdPage">
                            <b>TRX ID</b>
                            {` ${this.state.result.transaction_id} `}
                            <b>BLOCK NUMBER</b> 
                            <Link to={`/block/${this.state.result.block_num}`}>{` ${this.state.result.block_num} `}</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div id="infoTrx" className="col-lg-12 col-sm-12 colorTrxIdPage">
                            {this.TrxIdSwitch(this.state.result.operations[0])}
                        </div>
                    </div>
                </div>
            );
        }else{
            return (
                <div className="container">
                    <center>
                        <img className="centerImageL" src="https://courts.ms.gov/images_folder/demo/loading.gif" alt="loading" />
                    </center>
                </div>
            )
        }
    }
}

export default Trxid;