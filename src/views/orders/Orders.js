import React from 'react'
import axios from 'axios'

import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Row,
    Table,
    Button} from "reactstrap";

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders : [],
            newOrderData : {
                customer_id : '',
                watertype_id : '',
                quantity : ''
            }
        }
    }
    _refreshOrders() {
        axios.get('http://itata.test/api/orders').then((response) => {
            this.setState({
                newOrderData : response.data
            })
        })
    }
    componentDidMount() {
        this._refreshOrders()
    }

    render() {
        let count = 1
        const {orders} = this.state.orders.map((order, index) => {
            return (
                <tr key={`order-list-key ${index}`}>
                    <td>{count++}</td>
                    <td>{order.customer_id}</td>
                    <td>{order.watertype_id}</td>
                    <td>{order.quantity}</td>
                    <td>
                        <Button color="primary" size="sm" className="mr-2">Edit</Button>
                        <Button color="danger" size="sm" className="mr-2">Delete</Button>
                        <Button color="secondary" size="sm">View</Button>
                    </td>
                </tr>
            )
        })
        return(
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Orders List</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table className="tablesorter" responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Customer Name</th>
                                            <th>Water Type</th>
                                            <th>Quantity</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {orders}
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

export default Orders