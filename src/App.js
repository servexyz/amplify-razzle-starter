import React, { Component, Fragment } from "react";
import { Auth } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";
import Routes from "./routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }
  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
      }
    } catch (e) {
      if (e !== "No current user") {
        console.log(`No current user`);
      }
    }
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  };

  render() {
    //TODO: Replace with Context API
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating && (
        <Fragment>
          <h1>App</h1>
          <div className="nav">
            {this.state.isAuthenticated ? (
              <button onClick={this.handleLogout}>Logout</button>
            ) : (
              <Fragment>
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
              </Fragment>
            )}
          </div>
          <Routes childProps={childProps} />
        </Fragment>
      )
    );
  }
}

export default withRouter(App);
