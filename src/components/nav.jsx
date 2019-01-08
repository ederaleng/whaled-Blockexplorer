import React from 'react';

const Nav = () => {
    return (
    <div className="container">
        <a className="navbar-brand" href="/">
            <img src="/icons/icon.svg" width="35" height="35" className="d-inline-block align-top" alt="img nav" />
            <b>WhaleD</b>
        </a>
        <form className="form-inline my-2 my-lg-0">
            <a href="https://whaleshares.io/~witnesses">Consider voting for witness @chronocrypto</a>
        </form>
    </div>
    );
};

export default Nav;