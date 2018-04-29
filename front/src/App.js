import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { Base64 } from 'js-base64';

const API_URL = 'http://localhost:3001'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailTo: '',
      address: '',
      amount: 0,
      currency: 'USD',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(`${API_URL}/send_mail`, this.state)
      .then(function (response) {
        if (response.data.status === 'OK') {
          alert('Sent request')
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.data.status !== 'OK') {
          alert('Request failed')
        }
      });
  }

  render() {
    const params = JSON.parse(Base64.decode(window.location.search.substr(6)));
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form>
        { params &&
          <p style={{maxWidth: "300px", margin: "10px auto", backgroundColor: "#ecc", border: "1px solid #900", padding: "10px", borderRadius: "5px"}}
          >You've been asked to send <b>{params.amount}{params.currency}</b> to address <b>{params.address}</b></p>}
        { params && window.sendTransaction && window.sendTransaction(params) }
          <label>
            Email to:
            <input
              name="emailTo"
              type="text"
              placeholder="Email of the sponsor"
              value={this.state.emailTo}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            CryptoAddress:
            <input
              name="address"
              type="text"
              placeholder="Your wallet address"
              value={this.state.address}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Amount:
            <input
              name="amount"
              type="number"
              placeholder="Amount to be asked"
              value={this.state.amount}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Currency:
            <input
              name="currency"
              type="text"
              value={this.state.currency}
              placeholder="USD"
              onChange={this.handleInputChange} />
          </label>
          <br />
          <button type="submit" onClick={this.handleSubmit}>Ask for money!</button>
        </form>
      </div>
    );
  }
}

export default App;
