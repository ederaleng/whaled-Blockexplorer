import React from 'react';
import '../username.css'
const OpenSource = () => {
    return (
        <div className="alert alert-primary opensourcecss">
            <center>
                <img className="imgOpensource" src="/icons/opensource.svg" alt="img open source" />
                <h4 className="project-title">
                    <span>We’re open source</span>
                </h4>
                <p>
                    <span>Check the GitHub repo and start contributing!</span>
                </p>
                <a href="https://github.com/chronopolis-dev/whaled" rel="noopener noreferrer" target="_blank" className="btn btn-primary">
                    <span>Check GitHub</span>
                </a>
            </center>
        </div>
    );
};

export default OpenSource;