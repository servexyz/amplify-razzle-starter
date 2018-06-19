import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Subscribe } from "unstated";
import { SignupContainer } from "./Signup";

export class Verify extends Component {
  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }
  handleConfirmationSubmit = async event => {
    event.preventDefault();
    //does this inherit signup container's state after refresh ?
    //ie. if it was true for signupcontainer, is it true for verify?
    //or does it reset to isLoading: false ?
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
  render() {
    return (
      <Subscribe to={[SignupContainer]}>
        {signup => (
          <form onSubmit={signup.handleConfirmationSubmit}>
            <input
              className="confirmationCode"
              type="tel"
              onChange={signup.handleChange}
              value={signup.state.confirmationCode}
            />
            <input type="submit" value="Verify" />
          </form>
        )}
      </Subscribe>
    );
  }
}
