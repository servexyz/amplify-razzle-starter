import React, { Component } from "react";
import { Auth } from "aws-amplify";

export class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      confirmationCode: ""
    };
  }

  validateForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (e) {
      console.log(e.message);
      this.setState({ isLoading: false });
    }
  };
  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <input
            name="email"
            type="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <input
            name="password"
            type="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
