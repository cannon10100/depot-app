import React from 'react'
import './index.css';
import { Navbar } from './navbar';

export class Server extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: []
        };
        this.tick = this.tick.bind(this);
    }

    tick() {
        fetch("http://rrl-exp.duckdns.org:4000/server/" + this.props.match.params.server)
        .then((results) => {
            return results.json();
        }).then((data) => {
            let properties = Object.keys(data).map(property => {
                let value = data[property];
                if (value == null) {
                    value = "Null";
                } else if (value === false) {
                    value = "False";
                } else if (value === true) {
                    value = "True";
                }
                return (
                    <tr>
                        <td>{property}</td>
                        <td>{value}</td>
                    </tr>
                )
            });
            this.setState({properties: properties});
        })
    }

    componentWillMount() {
        // Set tick to 5s
        this.interval = setInterval(this.tick, 5000);
        this.tick();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="total">
                <Navbar />
                <section className="server">
                    <h1>Server Information</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th>Server Property</th>
                                <th>Value</th>
                            </tr>
                            {this.state.properties}
                        </tbody>
                    </table>
                </section>
            </div>
        );
    }
}
