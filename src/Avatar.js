import React, { Component } from "react";

export default class Avatar extends Component {
  render() {
    return (
      <div>
        <img src={this.props.imgURL} alt="" />
        <h3>{this.props.name}</h3>
      </div>
    );
  }
}
