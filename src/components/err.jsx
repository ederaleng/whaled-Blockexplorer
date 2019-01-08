import React from 'react';
import './username.css'
const Err = () => {
    localStorage.removeItem("err");
    return (
        <div className="container errCenter">
            <img src="http://1.bp.blogspot.com/-bExbf_h_H2I/UfbPQuW6F3I/AAAAAAAACPA/IpGB_WvI5uQ/s1600/404+error+page+by+pcbots+(9).jpg" className="imgenBlocknohace" alt="robo err" />
        </div>
    );
};

export default Err;