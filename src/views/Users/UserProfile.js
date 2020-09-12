/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col, CardText
} from "reactstrap";
import axiosInstance from "../../helpers/axios";
import UserCard from "./UserCard";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.state = {
      user : [],
      editUser : {
        name : '',
        email : '',
        address : '',
        about : '',
        password : '',
        confirm_password : ''
      },
      toogleEdit : true,
      editName : 'Edit'
    }
  }

  user() {
    axiosInstance.get('loguser').then((response) => {
      this.setState({
        user : response.data
      })
    }).catch((error) => {
      window.location.reload(true)
    })
  }

  handleEdit(name, email, address, about, password, confirm_password) {
    this.setState({
      editUser : {name, email, address, about, password, confirm_password}
    })
  }
  updateUser() {

  }
  componentDidMount() {
    this.user()
    this.handleEdit()
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="7">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Name</label>
                          <Input
                              placeholder="Name"
                              type="text"
                              value={this.state.user.name}
                              onChange = {(e) => {
                                let {editUser} = this.state
                                editUser.name = e.target.value
                                this.setState({editUser})
                              }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>
                            Email address
                          </label>
                          <Input
                              placeholder="user@email.com"
                              type="email"
                              value={this.state.user.email}
                              onChange = {(e) => {
                              let {editUser} = this.state
                              editUser.email = e.target.value
                              this.setState({editUser})
                              }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Phone</label>
                          <Input
                            placeholder="Phone"
                            type="text"
                            value={this.state.user.phone}
                            onChange = {(e) => {
                              let {editUser} = this.state
                              editUser.phone = e.target.value
                              this.setState({editUser})
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            placeholder="Address"
                            type="text"
                            value={this.state.user.address}
                            onChange = {(e) => {
                              let {editUser} = this.state
                              editUser.address = e.target.value
                              this.setState({editUser})
                            }}
                            />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                              placeholder="New Password"
                              type="password"
                              value={this.state.user.password}
                              onChange = {(e) => {
                                let {editUser} = this.state
                                editUser.password = e.target.value
                                this.setState({editUser})
                              }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Confirm Password</label>
                          <Input
                              placeholder="Confirm Password"
                              type="text"
                              value={this.state.user.password}
                              onChange = {(e) => {
                                let {editUser} = this.state
                                editUser.confirm_password = e.target.value
                                this.setState({editUser})
                              }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            cols="80"
                            placeholder="Here can be your description"
                            rows="4"
                            type="textarea"
                            value={this.state.user.about}
                            onChange={(e) => {
                              let {editUser} = this.state
                              editUser.about = e.target.value
                              this.setState({editUser})
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill"
                          color="primary"
                          onClick={this.updateUser}>
                    Save
                  </Button>

                </CardFooter>
              </Card>
            </Col>
            <Col md="5">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                          alt="..."
                          className="avatar"
                          src={require("assets/img/emilyz.jpg")}
                      />
                    </a>
                  </div>
                  <Row>
                    <Col md="4">
                      <h5 className="title">Name</h5>
                    </Col>
                    <Col md="8">
                      <p className="description">{this.state.user.name}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <h5 className="title">Email</h5>
                    </Col>
                    <Col md="8">
                      <p className="description">{this.state.user.email}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <h5 className="title">Phone</h5>
                    </Col>
                    <Col md="8">
                      <p className="description">{this.state.user.phone}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <h5 className="title">Address</h5>
                    </Col>
                    <Col md="8">
                      <p className="description">{this.state.user.address}</p>
                    </Col>
                  </Row>
                  <div className="card-description">
                    {this.state.user.about}
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>

          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
