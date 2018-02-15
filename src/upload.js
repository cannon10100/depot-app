import React from 'react'
import './index.css';
import { Navbar } from './navbar';

export class ConfigForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'default.yaml', 
            body:'\
agent:\n\
  discount_factor: 0.98\n\
  buffer_size: 1000000\n\
  batch_size: 64\n\
  num_motion_planned: 0\n\
  num_demonstrations: 0\n\
  num_joints: 6\n\
  exploration_rate: 0.01\n\
  tau: 0.05\n\
  actor_learning_rate: 0.0001\n\
  critic_learning_rate: 0.001\n\
  use_random_goal: True\n\
  planning_group: manipulator\n\
  critic_hidden_layers:\n\
  actor_hidden_layers:\n\
    - 300\n\
    \n\
experiment:\n\
  name: default\n\
  computer_name: unspecified\n\
  num_episodes: 5000\n\
  episode_length: 100\n\
  slack_webhook: https://hooks.slack.com/services/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\n\
  num_tests: 100\n\
  test_frequency: 50\n\
            '};

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value, body: this.state.body});
    }
    
    handleBodyChange(event) {
        this.setState({name: this.state.name, body: event.target.value});
    }

    handleSubmit(event) {
        alert('A name and body were submitted: ' + this.state.name + ", " + this.state.body);
    }

    render() {
        return (
            <div className="total">
                <Navbar />
                <div className="upload">
                    <h1>Upload Config</h1>
                    <form onSubmit={this.handleSubmit} action="http://rrl-exp.duckdns.org:4000/config/upload" method="post">
                        <label>
                          Name:
                          <input type="text" value={this.state.name} onChange={this.handleNameChange} name="name"/>
                        </label>
                        <label>
                            Config Body:
                            <textarea rows="20" cols="80" value={this.state.body} onChange={this.handleBodyChange} name="body"/>
                        </label>
                        <input type="submit" value="Submit" className="btn btn-1 btn-1a"/>
                    </form>
                </div>
            </div>
        );
    }
}
