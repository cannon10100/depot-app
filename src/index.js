import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';

import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ConfigForm } from './upload';
import { Config } from './config';
import { Server } from './server';
import { Navbar } from './navbar';

class Servers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            servers: [],
        };
        this.tick = this.tick.bind(this);
    }

    tick() {
        // Fetch servers
        fetch("http://localhost:4000/servers")
        .then((results) => {
            return results.json();
        }).then((data) => {
            let servers = Object.keys(data).map(server_uuid => {
                var status_color = data[server_uuid].status === "ONLINE" ? "green" : "red";
                return (
                    <tr id={server_uuid}>
                        <td>
                            <a href={"server/" + server_uuid}>{server_uuid}</a>
                        </td>
                        <td>{data[server_uuid].name}</td>
                        <td>{data[server_uuid].ip}</td>
                        <td style={{color:status_color}}>{data[server_uuid].status}</td>
                    </tr>
                )
            });
            this.setState({servers: servers});
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
        if (this.state.servers.length === 0) {
            return (
                <section className="servers">
                    <h1>No Servers Found</h1>
                </section>
            )
        } else {
            return (
                <section className="servers">
                    <h1>Servers</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>IP</th>
                                <th>Status</th>
                            </tr>
                            {this.state.servers}
                        </tbody>
                    </table>
                </section>
            )
        }
    }
}

class Configs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            configs: [],
        }
        this.tick = this.tick.bind(this);
        this.deleteButton = this.deleteButton.bind(this);
    }
    

    tick() {
        // Fetch servers
        fetch("http://localhost:4000/configs")
        .then((results) => {
            return results.json();
        }).then((data) => {
            let configs = Object.keys(data).map(config_uuid => {
                let status = data[config_uuid].status;
                return (
                    <tr id={config_uuid}>
                        <td>
                            <i className="fa fa-minus-circle" id={config_uuid} onClick={this.deleteButton}></i>
                        </td>
                        <td>
                            <a href={"config/" + config_uuid}>{config_uuid}</a>
                        </td>
                        <td>{data[config_uuid].name}</td>
                        <td>{status.done ? "True" : "False"}</td>
                        <td>{status.ep_num}</td>
                        <td>
                            <a href={status.server ? "server/" + status.server : "#"}>{status.server ? status.server : "None"}</a>
                        </td>
                    </tr>
                )
            });
            this.setState({configs: configs});
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

    deleteButton(event) {
        if (window.confirm("Are you sure you want to delete config " + event.target.id + "?")) {
            let form = new FormData();
            form.append("config_id", event.target.id);
            fetch("http://localhost:4000/config/delete", {
                method: "POST",
                body: form
            }).then(() => {
                this.tick();  
            });
        } else {
            return;
        }
    }

    render() {
        if (this.state.configs.length === 0) {
            return (
                <section className="configs">
                    <h1>No Configs Found</h1>
                </section>
            )
        } else {
            return (
                <section className="configs">
                    <h1>Configs</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th>Delete</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Done</th>
                                <th>Ep #</th>
                                <th>Server</th>
                            </tr>
                            {this.state.configs}
                        </tbody>
                    </table>
                </section>
            )
        }
    }
}

export class Depot extends React.Component {
    render() {
        return (
            <div className="depot">
                <Navbar />
                <Servers />
                <Configs />
            </div>
        )
    }
}

// ========================================
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Depot} />
            <Route exact path='/upload_config' component={ConfigForm} />
            <Route path="/server/:server" component={Server} />
            <Route path="/config/:config" component={Config} />
            <Route path="*" component={Depot} />
        </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

//ReactDOM.render(
//  <Depot />,
//  document.getElementById('root')
//);
