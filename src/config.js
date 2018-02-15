import React from 'react'
import './index.css';
import { Navbar } from './navbar';

export class Config extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: []
        };
        this.tick = this.tick.bind(this);
    }


    tick() {
        fetch("http://rrl-exp.duckdns.org:4000/config/" + this.props.match.params.config)
        .then((results) => {
            console.log(results);
            return results.json();
        }).then((data) => {
            let properties = Object.keys(data).map(property => {
                let value = data[property];
                if (value !== null && typeof value === 'object') {
                    return;
                }

               return make_prop(property, value)
            });

            Object.keys(data["status"]).map(property => {
                let value = data["status"][property];
                if (value == null) {
                    properties.push(make_prop(property, "Null"));
                } else if (value === false) {
                    properties.push(make_prop(property, "False"));
                } else if (value === true) {
                    properties.push(make_prop(property, "True"));
                } else {
                    properties.push(make_prop(property, value));
                }
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
                <section className="config">
                    <h1>Config Information</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th>Config Property</th>
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

function make_prop(property, value) {
    return (
        <tr>
            <td>{property}</td>
            <td>{value}</td>
        </tr>
    )
}
