import React from 'react'
import {Button, Card, CardBody, CardFooter, CardText, Col, Row} from "reactstrap";

function UserCard (props) {
    return(
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
                            <p className="description">{props.name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <h5 className="title">Email</h5>
                        </Col>
                        <Col md="8">
                            <p className="description">{props.email}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <h5 className="title">Phone</h5>
                        </Col>
                        <Col md="8">
                            <p className="description">{props.phone}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <h5 className="title">Address</h5>
                        </Col>
                        <Col md="8">
                            <p className="description">{props.address}</p>
                        </Col>
                    </Row>
                    <div className="card-description">
                        {props.about}
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
    )
}

export default UserCard