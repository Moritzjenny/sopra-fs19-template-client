import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import User from "../shared/models/User";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
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

class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            user: new User()
        };
    }

    componentWillMount() {
        let id = this.props.match.params.id;
        fetch(`${getDomain()}/users/${id}?token=${localStorage.getItem("token")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then( user => {
                this.setState({ user: user });
            });
    }

    return(){
        this.props.history.push(`/game`)
    }

    render() {
        return (
            <Container>
                <h2>{'User: ' +this.state.user.username}</h2>
                <p>{'Status: ' + this.state.user.status}</p>
                <p>{'Creation Date: ' +this.state.user.creationDate === null ? this.state.user.creationDate : new Date(this.state.user.creationDate).toLocaleDateString("de-DE")}</p>
                <p>{'Birthday: ' +this.state.user.birthday === null ? this.state.user.birthday : new Date(this.state.user.birthday).toLocaleDateString("de-DE")}</p>
                <Button
                    width="20%"
                    onClick={() => {
                        this.return();
                    }}
                >
                    Back
                </Button>

            </Container>
        );
    }
}

export default withRouter(Profile);
