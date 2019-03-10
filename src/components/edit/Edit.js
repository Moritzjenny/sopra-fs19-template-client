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

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Edit extends React.Component {

    constructor() {
        super();
        this.state = {
            user: null
        };
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        localStorage.setItem(key, value);
        this.setState({[key]: value});
    }



    return(){
        this.props.history.push(`/game`)
    }

    submit(){
        fetch(`${getDomain()}/users/${localStorage.getItem("id")}?token=${localStorage.getItem("token")}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                username: this.state.username,
                birthday: this.state.birthday
            })
        })
            .then(() => {
                this.props.history.push(`/game`);
            })
            .catch(err => {
                console.log(err);
            });

        localStorage.setItem("username", this.state.username);
        localStorage.setItem("birthday", this.state.birthday);
    }

    render() {
        return (
            <Container>
                <p>{'User: ' +localStorage.getItem("username")}</p>
                <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange("username", e.target.value);
                            }}
                />
                <br/>
                <p>{localStorage.getItem("birthday")=== null ? localStorage.getItem("birthday") :'Birthday: ' +  new Date(localStorage.getItem("birthday")).toLocaleDateString("de-DE")}</p>
                <InputField
                    type="date"
                    placeholder="Enter here.."
                    onChange={e => {
                        this.handleInputChange("birthday", e.target.value);
                    }}
                />
                <ButtonContainer>
                    <Button
                        width="20%"
                        onClick={() => {
                            this.return();
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        disabled={!this.state.username && !this.state.birthday}
                        width="20%"
                        onClick={() => {
                            this.state.username = localStorage.getItem("username");
                            this.state.birthday = localStorage.getItem("birthday");
                            this.submit();
                        }}
                    >
                        submit
                    </Button>
                </ButtonContainer>
            </Container>
        );
    }
}

export default withRouter(Edit);
