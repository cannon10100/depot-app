import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';

export class Config extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        // TODO
        <div className="config">Placeholder for {this.props.match.params.config}</div>
    );
  }
}
