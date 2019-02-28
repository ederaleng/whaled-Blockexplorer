import React from 'react';
const Nav = () => {
    return (
    <div className="container">
        <div>
            <a className="navbar-brand" href="/">
                <img src="/icons/icon.svg" width="35" height="35" className="d-inline-block align-top" alt="img nav" />
                <b>WhaleD</b>
            </a>
            <a href="/witnesses" ><span style={{ marginLeft:12 }}>witnesses</span></a>
        </div>
        <form className="form-inline my-2 my-lg-0">
        WhaleD server hosting is sponsored by <a href="https://whaleshares.io/@scipio" style={{ marginLeft:3,marginRight:3 }} rel="noopener noreferrer" target="_blank">@scipio</a> and developer <a href="https://whaleshares.io/@ederaleng" style={{ marginLeft:3 }} rel="noopener noreferrer" target="_blank">@ederaleng</a>
        </form>
    </div>
    );
};

export default Nav;