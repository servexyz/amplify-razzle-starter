import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      tmp: {},
      localTmp: {
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body:
          "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
      }
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(response => response.json())
        .then(json => this.setState({ tmp: json }));
    } catch (e) {
      console.log(e);
    }

    this.setState({ isLoading: false });
  }

  welcome = () => (
    <div className="welcome">
      <h1>You are welcomed but not welcomed. Na'mean?</h1>
    </div>
  );

  home = () => {
    // tmp is pulling from remote API
    // const { tmp } = this.state;
    //ltmp is pulling from local state
    const { localTmp: ltmp } = this.state;
    console.log();
    return (
      <Fragment>
        <h1>Welcome Home</h1>
        <h3>Tmp Data</h3>
        <ul>
          <Fragment>
            <li>title: {ltmp.title}</li>
            <li>value: ${ltmp.body}</li>
          </Fragment>
        </ul>
        <Link to="/private">Private</Link>
      </Fragment>
    );
  };

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.home() : this.welcome()}
      </div>
    );
  }
}
