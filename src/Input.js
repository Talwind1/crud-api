import React, { Component } from "react";

export default class Input extends Component {
  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input
          type="text"
          placeholder="Enter..."
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}
