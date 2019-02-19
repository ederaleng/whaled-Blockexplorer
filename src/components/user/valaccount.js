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
    async componentWillMount() {
        try {
            wlsjs.api.setOptions({ url: 'https://wls.kennybll.com' });
            var wls=await wlsjs.api.getDynamicGlobalPropertiesAsync()
            var acc=await wlsjs.api.getAccountsAsync([this.props.user])
            var btsWls=await axios.get("https://bitsharescan.com/api/buy-sell/BTS:RUDEX.WLS")
            var btsUsd=await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitshares")
            var usdToWls=btsWls.data.market.price.BTS*btsUsd.data[0].current_price;
            var wpWoWls=wlsjs.formatter.vestToSteem(parseFloat(acc[0].vesting_shares), parseFloat(wls.total_vesting_shares),parseFloat(wls.total_vesting_fund_steem));
            this.setState({ Valaccount: (wpWoWls*usdToWls) })
        } catch (err) {
            console.log(err)
        }

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