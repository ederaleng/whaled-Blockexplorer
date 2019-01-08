import React from 'react';
import './username.css'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Bloks = ({ data }) => {
    return (
        <div className="row" id="cardHeed">
            <div className="col" id="cardsBlocks">
                <b>BLOCK {data.head_block_number}</b><br />
                <span>{moment(moment.utc(data.time).valueOf()).fromNow()}</span><br />
                <Link to={`/block/${data.head_block_number}`}>Check Block</Link>
            </div>
            <div className="col" id="infoWitness">
                <b>Witness : {data.current_witness}</b><br />
                <span>Block reward</span><br />
                <span>0.181999 VESTS</span>
            </div>
        </div>
    );
};

export default Bloks;