import React from 'react'
import axiosInstance from "../../helpers/axios";
import Spin from "../../services/Spin";
import isLoggedIn from "../../helpers/isLoggedIn";
import { Redirect } from 'react-router-dom'
import Pagination from "react-js-pagination"
import { toast } from "react-toastify";
import  'react-toastify/dist/ReactToastify.css'


import {
    Row,
    Col,
    Table,
    CardHeader,
    CardTitle,
    CardBody,
    Card,
    Button,
    Modal,
    ModalFooter,
    ModalBody,
    ModalHeader,
    FormGroup,
    Label,
    Input
} from 'reactstrap'

toast.configure()

class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.toogleNewCustomerModal = this.toogleNewCustomerModal.bind(this)
        this.addCustomer = this.addCustomer.bind(this)
        this.toogleEditCustomerModal = this.toogleEditCustomerModal.bind(this)
        this.editCustomer = this.editCustomer.bind(this)
        this.updateCustomer = this.updateCustomer.bind(this)
        this.state = {
            customers : [],
            addCustomerModal : false,
            editCustomerModal : false,
            newCustomerData : {
              name : '',
              phone : '',
              address : ''
            },
            editCustomerData : {
                name : '',
                phone : '',
                address : ''
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
    toogleNewCustomerModal() {
        this.setState({
            addCustomerModal : !this.state.addCustomerModal
        })
    }
    toogleEditCustomerModal() {
        this.setState({
            editCustomerModal : !this.state.editCustomerModal
        })
    }
    addCustomer() {
        axiosInstance.post('/customers',this.state.newCustomerData).then((response) => {
            let { customers } = this.state
            customers.push(response.data)
            this.setState({
                customers,
                addCustomerModal : !this.state.addCustomerModal,
                toastNotice : 'Customer added successfully',
                newCustomerData : {
                    name: '',
                    phone: '',
                    address: ''
                }
            })
            this.notifySuccess()
        }).catch((error) => {
            this.setState({
                toastNotice : 'An error has occured during add'
            })
            this.notifyError()
        })
    }
    updateCustomer() {
        let { name, phone, address } = this.state.editCustomerData
        axiosInstance.put('/customers/' + this.state.editCustomerData.id, {
            name, phone, address
        }).then((response) => {
            this._refreshCustomers()
            this.setState({
                editCustomerModal : !this.state.editCustomerModal,
                toastNotice : 'Updated Customer data',
                editCustomerData : {
                    id: '',
                    name: '',
                    phone: '',
                    address: ''
                }
            })
            this.notifySuccess()
        }).catch((error) => {
            this.setState({
                toastNotice : 'An error has occured during edit'
            })
            this.notifyError()
        })
    }
    _refreshCustomers(pageNumber=1) {
        axiosInstance.get(`/customers?page=${pageNumber}`).then((response) => {
            this.setState({
                customers : response.data.data,
                current_page : response.data.current_page,
                total : response.data.total,
                per_page : response.data.per_page,
                loading : false,
                toastNotice : 'fetched customer data'
            })
            this.notifyInfo()
        }).catch((error) => {
            window.location.reload(true)
        })
    }
    editCustomer(id, name, phone, address) {
        this.setState({
            editCustomerData: { id, name, phone, address},
            editCustomerModal: !this.state.editCustomerModal
        })
    }
    deleteCustomer(id) {
        axiosInstance.delete('/customers/' + id).then((response) => {
            this.setState({
                toastNotice : 'Deleted Customer data'
            })
            this.notifySuccess()
            this._refreshCustomers()
        }).catch(() => {
            this.setState({
                toastNotice : 'Error occured during deletion'
            })
            this.notifyError()
        })
    }


    componentDidMount() {
        this._refreshCustomers()
    }

    render() {
        if(!isLoggedIn()) {
            return <Redirect to="/login" />
        }
        let { loading } = this.state
        let count = 1
        let customers = this.state.customers.map((customer, index) => {
            return (
                <tr key={customer.id}>
                    <td>{count++}</td>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2" onClick={this.editCustomer.bind(this, customer.id, customer.name, customer.phone, customer.address)}>Edit</Button>
                        <Button color="danger" size="sm" onClick={this.deleteCustomer.bind(this, customer.id)}>Delete</Button>
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
                            <Button color="primary" onClick={this.toogleNewCustomerModal}>Add Customer</Button>
                            <Modal isOpen={this.state.addCustomerModal} toggle={this.toogleNewCustomerModal}>
                                <ModalHeader toggle={this.toogleNewCustomerModal}>Add a new Customer</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label for="name">Name</Label>
                                        <Input style={{color: 'black'}} type="text" name="name" id="name" value={this.state.newCustomerData.name}
                                               placeholder="name of the customer"
                                               onChange={(e) => {
                                                   let { newCustomerData } = this.state;
                                                   newCustomerData.name = e.target.value
                                                   this.setState({ newCustomerData })
                                               }} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="phone">Phone</Label>
                                        <Input style={{color: 'black'}} type="text" name="phone" id="phone" value={this.state.newCustomerData.phone}
                                               placeholder="contact of the customer"
                                               onChange={(e) => {
                                                   let { newCustomerData } = this.state
                                                   newCustomerData.phone = e.target.value
                                                   this.setState({ newCustomerData })
                                        }}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="address">Address</Label>
                                        <Input style={{color: 'black'}} type="text" name="address" id="address" value={this.state.newCustomerData.address}
                                               placeholder="address of the customer"
                                               onChange={(e) => {
                                                   let { newCustomerData } = this.state
                                                   newCustomerData.address = e.target.value
                                                   this.setState({ newCustomerData })
                                        }}/>
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.addCustomer}>Save</Button>{' '}
                                    <Button color="secondary" onClick={this.toogleNewCustomerModal}>Cancel</Button>
                                </ModalFooter>
                            </Modal>

                            <Modal isOpen={this.state.editCustomerModal} toggle={this.toogleEditCustomerModal}>
                                <ModalHeader toggle={this.toogleEditCustomerModal}>Edit Customer Details</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label for="name">Name</Label>
                                        <Input style={{color: 'black'}} type="text" name="name" id="name" value={this.state.editCustomerData.name}
                                               placeholder="name of the customer"
                                               onChange={(e) => {
                                                   let { editCustomerData } = this.state;
                                                   editCustomerData.name = e.target.value
                                                   this.setState({ editCustomerData })
                                               }} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="phone">Phone</Label>
                                        <Input style={{color: 'black'}} type="text" name="phone" id="phone" value={this.state.editCustomerData.phone}
                                               placeholder="contact of the customer"
                                               onChange={(e) => {
                                                   let { editCustomerData } = this.state
                                                   editCustomerData.phone = e.target.value
                                                   this.setState({ editCustomerData })
                                               }}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="address">Address</Label>
                                        <Input style={{color: 'black'}} type="text" name="address" id="address" value={this.state.editCustomerData.address}
                                               placeholder="address of the customer"
                                               onChange={(e) => {
                                                   let { editCustomerData } = this.state
                                                   editCustomerData.address = e.target.value
                                                   this.setState({ editCustomerData })
                                               }}/>
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.updateCustomer}>Update</Button>{' '}
                                    <Button color="secondary" onClick={this.toogleEditCustomerModal}>Cancel</Button>
                                </ModalFooter>
                            </Modal>

                            <Table className="tablesorter" responsive>
                                <thead className="text-primary">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/*{customers}*/}
                                {loading ? <Spin loading = {loading}/> : customers}
                                </tbody>
                            </Table>
                        </CardBody>
                        <Pagination
                            activePage={this.state.current_page}
                            totalItemsCount={this.state.total}
                            itemsCountPerPage={this.state.per_page}
                            onChange={(pageNumber) => this._refreshCustomers(pageNumber)}
                            itemClass="page-item"
                            linkClass="page-link"
                            firstPageText="First"
                            lastPageText="Last"
                        />
                    </Card>
                </Col>
            </Row>
         </div>
     )
    }
}

export default Customers