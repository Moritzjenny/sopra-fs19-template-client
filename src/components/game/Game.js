import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import Unity, { UnityContent } from "react-unity-webgl";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  width: 80%;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    };

    this.unityContent = new UnityContent(
        "../Unity/Build/Desktop.json",
        "../Unity/Build/UnityLoader.js"
    );
  }

  logout() {
    this.props.history.push("/login");
    fetch(`${getDomain()}/users/${localStorage.getItem("id")}/logout?token=${localStorage.getItem("token")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("birthday");
    localStorage.removeItem("id");
  }

  showProfile(user) {
    this.props.history.push("/profile/" + user.id)
  }

  componentDidMount() {
    fetch(`${getDomain()}/users?token=${localStorage.getItem("token")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json(), error =>
      {
        this.props.history.push("/login");
      })
      .then( users => {
        // delays continuous execution of an async operation for 0.8 seconds.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
          try { this.setState({users}); }
          catch {
            alert("Sorry something went wrong!");
            this.logout();
          }

      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
    return (
      <Container>
        <Unity unityContent={this.unityContent} />
        <h2>Users</h2>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {
                return (
                  <PlayerContainer key={user.id} onClick={() => {
                    this.showProfile(user)
                  }} >
                    <Player user={user}/>
                  </PlayerContainer>
                );
              })}
            </Users>
            <Button
              width="100%"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
