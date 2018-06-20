import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Container, Subscribe } from "unstated";

export class SignupContainer extends Container {
  state = {
    isLoading: false,
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
    newUser: null
  };

  validateForm() {
    return (
      this.state.email.lenth > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.props.history.push("/");
      this.setState({
        newUser
      });
    } catch (e) {
      alert(e.message);
    }

    this.setState({ isLoading: false });
  };

  handleChange = event => {
    this.setState({
      [event.target.className]: event.target.value
    });
  };
}

export class Signup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Subscribe to={[SignupContainer]}>
        {signup => (
          <form onSubmit={() => signup.handleSubmit}>
            <input
              className="email"
              type="email"
              value={signup.email}
              onChange={signup.handleChange}
            />
            <input
              className="password"
              type="password"
              value={signup.state.password}
              onChange={signup.handleChange}
            />
            <input type="submit" value="Signup" />
          </form>
        )}
      </Subscribe>
    );
  }
}
