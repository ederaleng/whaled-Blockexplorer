import React from 'react';
import Trxid from './trxid'

const Servicetrx = ({ match }) => {
    return (
        <Trxid trx={match.params.id} />
    );
};

export default Servicetrx;