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
        this.state = {
            users : [],
            current_page : '',
            total : '',
            per_page : '',
            loading : true,
            toastNotice : '',
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
    editUser() {

    }
    deleteUser() {

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
        let data = this.state.users
        const users = this.state.users.map((user,index) => {
            return(
                <tr key={`users-list-key ${index}`}>
                    <td>{count++}</td>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2" onClick={this.editUser.bind(this, user.id, user.name,
                            user.email, user.password,
                            user.confirm_password, user.phone,
                            user.address)}>Edit</Button>
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