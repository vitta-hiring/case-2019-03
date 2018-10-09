import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-fluid bg-info text-center text-white font-weight-bold">
        <div className="container">
          <h1 className="display-4">Vitta - Prescrição Médica</h1>
        </div>
      </div>
    )
  }
}
