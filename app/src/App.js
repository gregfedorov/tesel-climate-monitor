import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import { LineChart, Line } from 'recharts';

class App extends Component {
  state = {
    data: []
  }
  componentDidMount() {
    axios.get('/api/readings')
    .then(res => {
      const data = res.data;
      this.setState({ data });
    })
  }
  render() {
    return (
      <div className="App">
        <LineChart width={800} height={400} data={this.state.data}>
          <Line type="monotone" dataKey="temperature" stroke="red" />
          <Line type="monotone" dataKey="humidity" stroke="blue" />
        </LineChart>
      </div>
    );
  }
}

export default App;
