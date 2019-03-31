const axios = require('axios');

class price {
    constructor(){
        this.prices = null
        this.getData();
    }
    async getData(){
        var btsWls=await axios.get("https://bitsharescan.com/api/buy-sell/BTS:RUDEX.WLS");
        var btsUsd=await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitshares");

        var bts_wls = btsWls.data;
        var bts_usd = btsUsd.data;
        this.prices = { bts_wls ,bts_usd }

        setTimeout(()=>{
            this.getData();
        },8*60*60*1000)
    }
    getPrices(){
        return this.prices;
    }
}

module.exports = price;