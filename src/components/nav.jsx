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
        Whaled Hosting is sponsored for 3 months by <a href="https://whaleshares.io/@scipio" rel="noopener noreferrer" target="_blank">@scipio</a>
        </form>
    </div>
    );
};

export default Nav;