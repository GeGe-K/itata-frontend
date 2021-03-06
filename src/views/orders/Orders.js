import React from 'react'
import axiosInstance from "../../helpers/axios";

import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Row,
    Table,
    Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, ModalFooter
} from "reactstrap";
import isLoggedIn from "../../helpers/isLoggedIn";
import {Redirect} from "react-router-dom";
import Spin from "../../services/Spin";
import {toast} from "react-toastify";
import Pagination from "react-js-pagination";

toast.configure()
class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders : [],
            customers : [],
            watertypes : [],
            newOrderModal : false,
            newOrderData : {
                date_ordered : '',
                customer_id : '',
                watertype_id : '',
                quantity : ''
            },
            editOrderModal : false,
            editOrderData : {
                id: '',
                date_ordered: '',
                customer_id : '',
                watertype_id : '',
                quantity : ''
            },
            loading : true,
            toastNotice : '',
            current_page : '',
            total : '',
            per_page : '',
        }
    }
    notifySuccess() {
        toast.success(this.state.toastNotice)
    }
    notifyInfo() {
        toast.info(this.state.toastNotice)
    }
    notifyWarn() {
        toast.warn(this.state.toastNotice)
    }
    notifyError() {
        toast.error(this.state.toastNotice)
    }
    _refreshOrders(pageNumber) {
        axiosInstance.get(`/orders?page=${pageNumber}`).then((response) => {
            this.setState({
                orders : response.data.data,
                current_page : response.data.current_page,
                total : response.data.total,
                per_page : response.data.per_page,
                toastNotice : 'Successfully fetched orders list'
            })
            this.notifyInfo()
        }).catch((error) => {
            window.location.reload(true)
        })
    }
    toogleNewOrderModal() {
        this.setState({
            newOrderModal : !this.state.newOrderModal
        })
    }
    addOrder() {
        let { date_ordered, customer_id, watertype_id, quantity } = this.state.newOrderData
        axiosInstance.post('/orders', {
            date_ordered, customer_id, watertype_id, quantity
        }).then((response) => {
            let { orders } = this.state
            orders.push(response.data)
            this.setState({
                orders,
                newOrderModal : !this.state.newOrderModal,
                toastNotice : 'Successfully added the order',
                newOrderData : {
                    customer_id : '',
                    watertype_id : '',
                    quantity : ''
                }
            })
            this.notifySuccess()
        }).catch(() => {
            this.setState({
                toastNotice : 'Error occured during order addition'
            })
            this.notifyError()
        })
    }
    toogleEditOrderModal() {
        this.setState({
            editOrderModal : !this.state.editOrderModal
        })
    }
    updateOrder() {
        let { date_ordered, customer_id, watertype_id, quantity } = this.state.editOrderData
        axiosInstance.put('/orders/'+ this.state.editOrderData.id, {
            date_ordered, customer_id, watertype_id, quantity
        }).then((response) => {
            this._refreshOrders()
            this.setState({
                editOrderModal : !this.state.editOrderModal,
                toastNotice : 'Successfully updated the order',
                editOrderData : {
                    id : '',
                    customer_id : '',
                    watertype_id : '',
                    quantity : ''
                }
            })
            this.notifySuccess()
        }).catch(() => {
            this.setState({
                toastNotice : 'Error occured during order updation'
            })
        })
    }
    editOrder(id, date_ordered, customer_id, watertype_id, quantity) {
        this.setState({
            editOrderData : {id, date_ordered, customer_id, watertype_id, quantity},
            editOrderModal : !this.state.editOrderModal
        })
    }
    deleteOrder(id) {
        axiosInstance.delete('/orders'+ id).then(() => {
            this.setState({
                toastNotice : 'Successfully deleted the order'
            })
            this.notifySuccess()
            this._refreshOrders()
        }).catch((error) => {
            this.setState({
                toastNotice : 'Error occured dufing product deletion'
            })
        })
    }
    customers() {
        axiosInstance.get('/allCustomers').then((response) => {
            this.setState({
                customers : response.data
            })
        })
    }
    watertypes() {
        axiosInstance.get('/watertypes').then((res) => {
            this.setState({
                watertypes : res.data,
                loading : false
            })
        })
    }
    componentDidMount() {
        this.customers()
        this.watertypes()
        this._refreshOrders()
    }

    render() {
        if(!isLoggedIn()) {
            return <Redirect to="/login" />
        }
        let { loading } = this.state
        let count = 1
        const orders = this.state.orders.map((order, index) => {
            return (
                <tr key={`order-list-key ${index}`}>
                    <td>{count++}</td>
                    <td>{order.date_ordered}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.watertype_name}</td>
                    <td>{order.quantity}</td>
                    <td>
                        <Button color="primary" size="sm" className="mr-2"
                                onClick={this.editOrder.bind(this, order.id, order.date_ordered, order.customer_id, order.watertype_id, order.quantity)}>
                            Edit
                        </Button>
                        <Button color="danger" size="sm" className="mr-2" onClick={this.deleteOrder.bind(this, order.id)}>Delete</Button>
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
                                    <Button color="primary" onClick={this.toogleNewOrderModal.bind(this)}>Add Order</Button>
                                    <Modal isOpen={this.state.newOrderModal} toggle={this.toogleNewOrderModal.bind(this)}>
                                        <ModalHeader toggle={this.toogleNewOrderModal.bind(this)}>Add a new Order</ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                                <Label for="Date Ordered">Date Ordered</Label>
                                                <Input
                                                    style = {{color: 'black'}}
                                                    type="date"
                                                    name="date_ordered"
                                                    id="date_ordered"
                                                    placeholder="Input the date"
                                                    value={this.state.newOrderData.date_ordered}
                                                    onChange={(e) => {
                                                        let { newOrderData } = this.state
                                                        newOrderData.date_ordered = e.target.value
                                                        this.setState({ newOrderData })
                                                    }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="Customer">Customer Name</Label>
                                                <Input style={{color: 'black'}} type="select" name="customer_id" id="customer_id" onChange={(e) => {
                                                    let { newOrderData } = this.state
                                                    newOrderData.customer_id = e.target.value
                                                    this.setState({newOrderData})
                                                }}>
                                                    <option value="">Select customer name</option>
                                                    {this.state.customers.map((customer,index) => {
                                                        return <option key={`customer-key ${index}`} value={customer.id}> {customer.name}</option>
                                                    })}
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="Customer">Water Type</Label>
                                                <Input style={{color: 'black'}} type="select" name="watertype_id" id="watertype_id" onChange={(e) => {
                                                    let { newOrderData } = this.state
                                                    newOrderData.watertype_id = e.target.value
                                                    this.setState({ newOrderData})
                                                }}>
                                                    <option value="">Select water type</option>
                                                    {this.state.watertypes.map((watertype, index) => {
                                                        return <option key={`water-key ${index}`} value={watertype.id}> {watertype.name}</option>
                                                    })}
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="name">Quantity</Label>
                                                <Input style={{color: 'black'}} type="number" name="quantity" id="quantity" value={this.state.newOrderData.quantity}
                                                       placeholder="Quantity"
                                                       onChange={(e) => {
                                                           let { newOrderData } = this.state;
                                                           newOrderData.quantity = e.target.value
                                                           this.setState({ newOrderData })
                                                       }} />
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.addOrder.bind(this)}>Save</Button>{' '}
                                            <Button color="secondary" onClick={this.toogleNewOrderModal.bind(this)}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>

                                    <Modal isOpen={this.state.editOrderModal} toggle={this.toogleEditOrderModal.bind(this)}>
                                        <ModalHeader toggle={this.toogleEditOrderModal.bind(this)}>Edit an order</ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                                <Label for="Date Ordered">Date Ordered</Label>
                                                <Input
                                                    style = {{color: 'black'}}
                                                    type="date"
                                                    name="date_ordered"
                                                    id="date_ordered"
                                                    placeholder="Input the date"
                                                    value={this.state.editOrderData.date_ordered}
                                                    onChange={(e) => {
                                                        let { editOrderData } = this.state
                                                        editOrderData.date_ordered = e.target.value
                                                        this.setState({ editOrderData })
                                                    }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="Customer">Customer Name</Label>
                                                <Input style={{color: 'black'}} type="select" name="customer_id" id="customer_id" onChange={(e) => {
                                                    let { editOrderData } = this.state
                                                    editOrderData.customer_id = e.target.value
                                                    this.setState({editOrderData})
                                                }}>
                                                    <option value="">Select customer name</option>
                                                    {this.state.customers.map((customer,index) => {
                                                        return <option key={`customer-key ${index}`} value={customer.id}> {customer.name}</option>
                                                    })}
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="Customer">Water Type</Label>
                                                <Input style={{color: 'black'}} type="select" name="watertype_id" id="watertype_id" onChange={(e) => {
                                                    let { editOrderData } = this.state
                                                    editOrderData.watertype_id = e.target.value
                                                    this.setState({ editOrderData})
                                                }}>
                                                    <option value="">Select water type</option>
                                                    {this.state.watertypes.map((watertype, index) => {
                                                        return <option key={`water-key ${index}`} value={watertype.id}> {watertype.name}</option>
                                                    })}
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="name">Quantity</Label>
                                                <Input style={{color: 'black'}} type="number" name="quantity" id="quantity" value={this.state.editOrderData.quantity}
                                                       placeholder="Quantity"
                                                       onChange={(e) => {
                                                           let { editOrderData } = this.state;
                                                           editOrderData.quantity = e.target.value
                                                           this.setState({ editOrderData })
                                                       }} />
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.updateOrder.bind(this)}>Update</Button>{' '}
                                            <Button color="secondary" onClick={this.toogleEditOrderModal.bind(this)}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>

                                    <Table className="tablesorter" responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Date of Order</th>
                                            <th>Customer Name</th>
                                            <th>Water Type</th>
                                            <th>Quantity</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {loading ? <Spin loading= { loading }/> : orders}
                                        </tbody>
                                    </Table>
                                </CardBody>
                                <Pagination
                                    activePage={this.state.current_page}
                                    totalItemsCount={this.state.total}
                                    itemsCountPerPage={this.state.per_page}
                                    onChange={(pageNumber) => this._refreshOrders(pageNumber)}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    firstPageText="First"
                                    lastPageText="Last"
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

export default Orders