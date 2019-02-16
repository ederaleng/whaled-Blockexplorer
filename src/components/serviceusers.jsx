import React from 'react';
import Useuario from './usuario'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom'
const Serviceusers = ({ match,location }) => {
    let query=queryString.parse(location.search)
    let user=match.url.replace(/[^A-Za-z0-9]/g, '')
    if(!user){
        return(
            <Redirect to={"/err"} />
        )
    }
    return (
        <Useuario user={user} page={query.page ? query.page : 1} />
    );
};

export default Serviceusers;