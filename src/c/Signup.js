import React, { Component } from "react";
import { Auth } from "aws-amplify";

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }
  validateForm() {
    return (
      this.state.email.lenth > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({
        newUser
      });
    } catch (e) {
      alert(e.message);
    }

    this.setState({ isLoading: false });
  };

  handleConfirmationSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch (e) {
      console.log(e.message);
      this.setState({ isLoading: false });
    }
  };

  handleChange = event => {
    console.log(`ID[${event.target.className}]:Value[${event.target.value}]`);
    this.setState({
      [event.target.className]: event.target.value
    });
  };

  //Create text input components for below
  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <input
          className="confirmationCode"
          type="tel"
          onChange={this.handleChange}
          value={this.state.confirmationCode}
        />
        <input type="submit" value="Verify" />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="email"
          type="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          className="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <input type="submit" value="Signup" />
      </form>
    );
  }
  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
