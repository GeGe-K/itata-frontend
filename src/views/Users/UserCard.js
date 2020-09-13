import React from 'react'
import { Card, CardBody, CardFooter, CardText, Col, Row} from "reactstrap";

function UserCard (props) {
    return(
        <Col md="7">
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
                                src={require("assets/img/ts.png")}
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

                </CardFooter>
            </Card>
        </Col>
    )
}

export default UserCard