import React from 'react';
import Useuario from './usuario'
import queryString from 'query-string'

const Serviceusers = ({ match,location }) => {
    let query=queryString.parse(location.search)
    let user=match.url.substring(2,match.url.length)
    return (
        <Useuario user={user} page={query.page ? query.page : 1} />
    );
};

export default Serviceusers;