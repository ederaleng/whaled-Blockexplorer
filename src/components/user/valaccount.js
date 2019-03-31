import React, { Component } from 'react';
import wlsjs from 'wlsjs';
import axios from 'axios'

class Valaccount extends Component {
    constructor(props){
        super(props)
        this.state={
            Valaccount:null
        }
    }
    async price(){
        try {
            wlsjs.api.setOptions({ url: 'https://wls.kennybll.com' });
            var wls=await wlsjs.api.getDynamicGlobalPropertiesAsync()
            var acc=await wlsjs.api.getAccountsAsync([this.props.user])
            var dataprices=await axios.get("/pricesdata")
            var wls = dataprices.data.bts_wls.market.price.BTS;
            var usd = dataprices.data.bts_usd[0].current_price;
            var usdToWls=wls*usd;
            var wpWoWls=wlsjs.formatter.vestToSteem(parseFloat(acc[0].vesting_shares), parseFloat(wls.total_vesting_shares),parseFloat(wls.total_vesting_fund_steem));
            this.setState({ Valaccount: (wpWoWls*usdToWls) })
        } catch (err) {
            console.log(err)
            setTimeout(this.price,2000)
        }
    }
    componentWillMount() {
        this.price();
    }
    
    render() {
        return (
            <span>
               Est. Account Value: ${this.state.Valaccount!==null ? (this.state.Valaccount).toFixed(2) : "Loading..."}
            </span>
        );
    }
}

export default Valaccount;