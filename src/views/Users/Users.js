import React from 'react'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    FormGroup, Input, Label,
    Modal,
    ModalBody, ModalFooter,
    ModalHeader,
    Row, Table
} from "reactstrap";
import Spin from "../../services/Spin";
import axiosInstance from "../../helpers/axios";
import isLoggedIn from "../../helpers/isLoggedIn";
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";
import Pagination from 'react-js-pagination'

toast.configure()

class User extends React.Component {
    constructor(props) {
        super(props);
        this.toogleNewUserModal = this.toogleNewUserModal.bind(this)
        this.toogleEditUserModal = this.toogleEditUserModal.bind(this)
        this.addUser = this.addUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.state = {
            users : [],
            current_page : '',
            total : '',
            per_page : '',
            loading : true,
            toastNotice : '',
            newUserModal : false,
            addUserData : {
                name : '',
                email : '',
                phone : '',
                address : '',
                password : '',
            },
            editUserModal : false,
            editUserData : {
                name : '',
                email : '',
                phone : '',
                address : '',
                password : '',
            }
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
    _refreshUsers(pageNumber = 1) {
        axiosInstance.get(`/users?page=${pageNumber}`).then((response) => {
            this.setState({
                users : response.data.data,
                current_page : response.data.current_page,
                total : response.data.total,
                per_page : response.data.per_page,
                loading : false,
                toastNotice : 'Successfully fetched users list'
            })
            this.notifyInfo()
        }).catch((error) => {
        })
    }
    addUser() {
            let { name, email, phone, address, password, confirm_password} = this.state.addUserData
            axiosInstance.post('/users', { 
                name, email, phone, address, password, confirm_password 
                }).then((response) => {
                let { users } = this.state
                    users.push(response.data)
                    this.setState({
                        users,
                        toastNotice : 'Successfully added new user',
                        newUserModal : !this.state.newUserModal,
                        addUserData : {
                            name : '',
                            email : '',
                            phone : '',
                            address : '',
                            password : '',
                            confirm_password:  ''
                        },
                        editUserData : {
                            name : '',
                            email : '',
                            phone : '',
                            address : '',
                            password : '',
                            confirm_password:  ''
                        },
                        editUserModal : false,
                    })
                    this.notifySuccess()
            }).catch((error) => {
                this.setState({
                    toastNotice : 'Error occured during addition of user'
                })
                this.notifyError()
            })
    }

    toogleEditUserModal() {
        this.setState({
            editUserModal : !this.state.editUserModal
        })
    }

    editUser(id, name, email, phone, address, password) {
        this.setState({
            editUserData : {id, name, email, phone, address, password},
            editUserModal : !this.state.editUserModal
        })
    }
    updateUser() {
        let { name, email, phone, address, password='', confirm_password='' } = this.state.editUserData
        axiosInstance.put('/users/'+ this.state.editUserData.id, {
            name, email, phone, address, password, confirm_password
        }).then((response) => {
            this._refreshUsers()
            this.setState({
                editUserModal : !this.state.editUserModal,
                toastNotice : 'Successfully updated the user',
                editUserData : {
                    name : '',
                    email : '',
                    phone : '',
                    address : '',
                    password : '',
                    confirm_password:  ''
                }
            })
            this.notifySuccess()
        }).catch(() => {
            this.setState({
                toastNotice : 'Error occured during user updation'
            })
        })
    }

    deleteUser(id) {
        axiosInstance.delete('/users/' + id).then((response) => {
            this.setState({
                toastNotice : 'Successfully deleted the user'
            })
            this.notifySuccess()
            this._refreshUsers()
        }).catch((error) => {
            this.setState({
                toastNotice : 'Error occured during user deletion'
            })
            this.notifyError()
        })
    }
    toogleNewUserModal() {
        this.setState({
            newUserModal : !this.state.newUserModal
        })
    }

    componentDidMount() {
        this._refreshUsers()
    }

    render() {
        if(!isLoggedIn()) {
            return <Redirect to="/login" />
        }
        const { loading } = this.state
        let count = 1
        const users = this.state.users.map((user,index) => {
            return(
                <tr key={`users-list-key ${index}`}>
                    <td>{count++}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2" onClick={this.editUser.bind(this, user.id, user.name,
                            user.email, user.phone,
                            user.address, user.password)}>Edit</Button>
                        <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, user.id)}>Delete</Button>
                    </td>
                </tr>
            )
        })

        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Users List Table</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Button color="primary" onClick={this.toogleNewUserModal}>Add User</Button>
                                <Modal isOpen={this.state.newUserModal} toggle={this.toogleNewUserModal}>
                                    <ModalHeader toggle={this.toogleNewUserModal}>Add a new Product</ModalHeader>
                                    <ModalBody>
                                        <FormGroup>
                                            <Label for="name">Name</Label>
                                            <Input style={{color: 'black'}} type="text" name="name" id="name"
                                                   value={this.state.addUserData.name}
                                                   placeholder="Name of user"
                                                   onChange={(e) => {
                                                       let { addUserData } = this.state;
                                                       addUserData.name = e.target.value
                                                       this.setState({ addUserData })
                                                   }} required/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="email">email</Label>
                                            <Input style={{color: 'black'}} type="email" name="email" id="email"
                                                   value={this.state.addUserData.email}
                                                   placeholder="Valid Email"
                                                   onChange={(e) => {
                                                       let { addUserData } = this.state;
                                                       addUserData.email = e.target.value
                                                       this.setState({ addUserData })
                                                   }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password">New Password</Label>
                                            <Input style={{color: 'black'}} type="password" name="password" id="password"
                                                   value={this.state.addUserData.password}
                                                   placeholder="Password for the user"
                                                   onChange={(e) => {
                                                       let { addUserData } = this.state;
                                                       addUserData.password = e.target.value
                                                       this.setState({ addUserData })
                                                   }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="confirm_password">Confirm Password</Label>
                                            <Input style={{color: 'black'}} type="password" name="confirm_password" id="confirm_password"
                                                   value={this.state.addUserData.confirm_password}
                                                   placeholder="Confirm Password"
                                                   onChange={(e) => {
                                                       let { addUserData } = this.state;
                                                       addUserData.confirm_password = e.target.value
                                                       this.setState({ addUserData })
                                                   }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="phone">Phone</Label>
                                            <Input style={{color: 'black'}} type="text" name="phone" id="phone"
                                                   value={this.state.addUserData.phone}
                                                   placeholder="Phone Number"
                                                   onChange={(e) => {
                                                       let { addUserData } = this.state;
                                                       addUserData.phone = e.target.value
                                                       this.setState({ addUserData })
                                                   }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="address">Address</Label>
                                            <Input style={{color: 'black'}} type="text" name="address" id="address"
                                                   value={this.state.addUserData.address}
                                                   placeholder="Address"
                                                   onChange={(e) => {
                                                       let { addUserData } = this.state;
                                                       addUserData.address = e.target.value
                                                       this.setState({ addUserData })
                                                   }} />
                                        </FormGroup>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.addUser}>Save</Button>{' '}
                                        <Button color="secondary" onClick={this.toogleNewUserModal}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>


                                <Modal isOpen={this.state.editUserModal} toggle={this.toogleEditUserModal}>
                                    <ModalHeader toggle={this.toogleEditUserModal}>Edit User</ModalHeader>
                                    <ModalBody>
                                        <FormGroup>
                                            <Label for="name">Name</Label>
                                            <Input style={{color: 'black'}} type="text" name="name" id="name"
                                                   value={this.state.editUserData.name}
                                                   placeholder="Name of user"
                                                   onChange={(e) => {
                                                       let { editUserData } = this.state;
                                                       editUserData.name = e.target.value
                                                       this.setState({ editUserData })
                                                   }} required/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="email">email</Label>
                                            <Input style={{color: 'black'}} type="email" name="email" id="email"
                                                   value={this.state.editUserData.email}
                                                   placeholder="Valid Email"
                                                   onChange={(e) => {
                                                       let { editUserData } = this.state;
                                                       editUserData.email = e.target.value
                                                       this.setState({ editUserData })
                                                   }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password">New Password</Label>
                                            <Input style={{color: 'black'}} type="password" name="password" id="password"
                                                   value={this.state.editUserData.password}
                                                   placeholder="Password for the user"
                                                   onChange={(e) => {
                                                       let { editUserData } = this.state;
                                                       editUserData.password = e.target.value
                                                       this.setState({ editUserData })
                                                   }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="phone">Phone</Label>
                                            <Input style={{color: 'black'}} type="text" name="phone" id="phone"
                                                   value={this.state.editUserData.phone}
                                                   placeholder="Phone Number"
                                                   onChange={(e) => {
                                                       let { editUserData } = this.state;
                                                       editUserData.phone = e.target.value
                                                       this.setState({ editUserData })
                                                   }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="address">Address</Label>
                                            <Input style={{color: 'black'}} type="text" name="address" id="address"
                                                   value={this.state.editUserData.address}
                                                   placeholder="Address"
                                                   onChange={(e) => {
                                                       let { editUserData } = this.state;
                                                       editUserData.address = e.target.value
                                                       this.setState({ editUserData })
                                                   }} />
                                        </FormGroup>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.updateUser}>Update</Button>{' '}
                                        <Button color="secondary" onClick={this.toogleEditUserModal}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>



                                <Table className="tablesorter" responsive>
                                    <thead className="text-primary">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/*{customers}*/}
                                    {loading ? <Spin loading = {loading}/> : users}
                                    </tbody>
                                </Table>
                            </CardBody>
                            <Pagination
                                activePage={this.state.current_page}
                                totalItemsCount={this.state.total}
                                itemsCountPerPage={this.state.per_page}
                                onChange={(pageNumber) => this._refreshUsers(pageNumber)}
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

export default User