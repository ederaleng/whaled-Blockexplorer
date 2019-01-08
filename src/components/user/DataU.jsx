import React, { Component } from 'react';
import wlsjs from 'wlsjs'
import SwitchPages from './switchPages'
class DataU extends Component {
    constructor(){
        super()
        this.state={
            historialPost:null
        }
    }
    componentWillMount() {
        wlsjs.api.setOptions({ url: 'https://wls.kennybll.com' });
        
        wlsjs.api.getAccountHistoryAsync(this.props.user,-1,1)
        .then(Response1=>{
            var restacion=Response1[0][0]-((this.props.page-1)*250)
            var maxv=restacion<250 ? restacion : 250
            return wlsjs.api.getAccountHistoryAsync(this.props.user, restacion ,maxv)
        })
        .then(Response=>{
            var post=Response.reverse().map(res=>{
                return res
            })
            this.setState({
                historialPost:post
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
        if(this.state.historialPost!==null){
            var ultitrax=this.state.historialPost[this.state.historialPost.length-1][0]
            var pa=this.props.page===1 ? 0 : this.props.page*250
            var maxp=Math.ceil( ((this.state.historialPost[0][0]+(pa))/250)-1)
            return (
                <div id="trxActives" className="col-lg-8 col-sm-12">
                    {this.state.historialPost.map((data,key)=>{ return <SwitchPages key={key} data={data} /> })}
                    <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">

                        {this.props.page<=1 ? null : <li className="page-item"><a className="page-link" href={`/@${this.props.user}?page=${1}`} >First Page</a></li>}

                        {this.props.page<=1 ? null :  <li className="page-item"><a className="page-link" href={`/@${this.props.user}?page=${Number(this.props.page)-1}`}>{Number(this.props.page)-1}</a></li>}

                        <li className="page-item active">
                            <span className="page-link">
                                {this.props.page}
                            </span>
                        </li>

                        {ultitrax===1 ? null : <li className="page-item"><a className="page-link" href={`/@${this.props.user}?page=${Number(this.props.page)+1}`}>{Number(this.props.page)+1}</a></li> }
                        {ultitrax===1 ? null : <li className="page-item"><a className="page-link" href={`/@${this.props.user}?page=${maxp}`}>Last Page</a></li>}
                    </ul>
                    </nav>

                    
                </div>
                
            );
        }else{
            return (
                <div className="col-lg-8 col-sm-12">
                    <center><img src="https://courts.ms.gov/images_folder/demo/loading.gif" width="10%" height="10%" alt="loading" /></center>
                </div>
            );
        }
    }
}


export default DataU;