const wlsjs = require('wlsjs')
wlsjs.api.setOptions({ url: 'https://rpc.wls.services' });
wlsjs.api.getAccountsAsync(['ederaleng'])
.then(result=> console.log(result) )
.catch(err=>console.log(err))