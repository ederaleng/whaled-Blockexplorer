import React from 'react';
import DataU from './user/DataU'
import InfoU from './user/InfoU'
const usuario = ({ user,page }) => {
    
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="titleUsername">{`@${user}`}</h1>
                </div>
                <div className="col">
                </div>
            </div>
            <div className="row">
                <InfoU user={user} />
                <DataU user={user} page={page} />
            </div>
        </div>
    );
};

export default usuario;