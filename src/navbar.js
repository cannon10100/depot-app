import React from 'react';

export class Navbar extends React.Component {
    burgerToggle() {
        let linksEl = document.querySelector('.narrowLinks');
        if (linksEl.style.display === 'block') {
            linksEl.style.display = 'none';
        } else {
            linksEl.style.display = 'block';
        }
    }

    render() {
        return (
			<nav>
              <div className="navWide">
                    <div className="wideDiv">
                        <a href="/">Overview</a>
                        <a href="/upload_config">Upload</a>
                    </div>
                </div>
                <div className="navNarrow">
                    <i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
                    <div className="narrowLinks">
                        <a href="/" onClick={this.burgerToggle}>Overview</a>
                        <a href="/upload_config" onClick={this.burgerToggle}>Upload</a>
                    </div>
              </div>
            </nav>
        )
    }
}
