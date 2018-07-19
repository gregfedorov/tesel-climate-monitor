import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import { LineChart, Line } from 'recharts';

class App extends Component {
  state = {
    data: [],
    limit: 20
  }
  handleLimitChange = (limit) => {
    this.fetchData(limit);
  }
  fetchData = (limit) => {
    axios.get('/api/readings?items='+limit)
    .then(res => {
      const data = res.data;
      this.setState({ data, limit });
    })
  }
  componentWillMount() {
    this.fetchData(this.state.limit);
  }
  render() {
    return (
      <div className="App">
        <LineChart width={800} height={400} data={this.state.data}>
          <Line type="monotone" dot={false} dataKey="temperature" stroke="red" />
          <Line type="monotone" dot={false} dataKey="humidity" stroke="blue" />
        </LineChart>
        {
          [5, 20, 100, 500].map(value => <button onClick={()=>this.handleLimitChange(value)}>{value}</button>)
        }
      </div>
    );
  }
}

export default App;
