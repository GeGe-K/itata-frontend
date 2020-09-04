import React from 'react'
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";

class Products extends React.Component {
    render() {
        return(
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Simple Table</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table className="tablesorter" responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Date</th>
                                            <th>Water Type</th>
                                            <th>Quantity(Bottles)</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Dakota Rice</td>
                                            <td>Niger</td>
                                            <td>Oud-Turnhout</td>
                                            <td className="text-center">$36,738</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

export default Products