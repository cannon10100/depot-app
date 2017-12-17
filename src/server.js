import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';

export class Server extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        // TODO
        <div className="server">Placeholder for {this.props.match.params.server}</div>
    );
  }
}
