import React from 'react'
import axios from 'axios'
import {Row, Col, Table, CardHeader, CardTitle, CardBody, Card, Button} from 'reactstrap'

class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers : []
        }
    }

    componentDidMount() {
        axios.get('http://itata.test/api/customers').then((response) => {
            this.setState({
                customers : response.data
            })
        });
    }

    render() {
        let customers = this.state.customers.map((customer, index) => {
            return (
                <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2">Edit</Button>
                        <Button color="danger" size="sm">Delete</Button>
                    </td>
                </tr>
            )
        })
     return(
         <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Customer List Table</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter" responsive>
                                <thead className="text-primary">
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th className="text-center">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {customers}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
         </div>
     )
    }
}

export default Customers