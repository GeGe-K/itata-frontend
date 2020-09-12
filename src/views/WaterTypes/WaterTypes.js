import React from 'react'
import axiosInstance from "../../helpers/axios";
import { Redirect } from 'react-router-dom'

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
import Spin from "../../services/Spin";
import {toast} from "react-toastify";

class WaterTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            waterTypes : [],
            addWaterTypeModal : false,
            newWaterTypeData : {
                name: ''
            },
            editWaterTypeModal : false,
            editWaterTypeData : {
                id: '',
                name: ''
            },
            loading: true
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
    _refreshWaterTypes() {
        axiosInstance.get('/watertypes').then((response) => {
            this.setState({
                waterTypes : response.data,
                toastNotice : 'Successfully fetched water-type list',
                loading : false
            })
            this.notifyInfo()
        }).catch((error) => {
            window.location.reload(true)
        })
    }
    toogleNewWaterTypeModal() {
        this.setState({
            addWaterTypeModal : !this.state.addWaterTypeModal
        })
    }
    addWaterType() {
        axiosInstance.post('/watertypes',this.state.newWaterTypeData).then((response) => {
            let { waterTypes } = this.state
            waterTypes.push(response.data)
            this.setState({
                waterTypes,
                toastNotice : 'Successfully added water-type',
                addWaterTypeModal : !this.state.addWaterTypeModal,
                newWaterTypeData : {
                    name: ''
                }
            })
            this.notifySuccess()
        }).catch((error) => {
            this.setState({
                toastNotice : 'Error occured during water-type addition'
            })
            this.notifyError()
        })
    }
    toogleEditWaterTypeModal() {
        this.setState({
            editWaterTypeModal : !this.state.editWaterTypeModal
        })
    }
    editWaterType(id, name) {
        this.setState({
            editWaterTypeData : {id , name},
            editWaterTypeModal : !this.state.editWaterTypeModal
        })
    }
    updateWaterType() {
        let { name } = this.state.editWaterTypeData
        axiosInstance.put('/watertypes/'+this.state.editWaterTypeData.id, {
            name
        }).then((response) => {
            this._refreshWaterTypes()
            this.setState({
                editWaterTypeModal : !this.state.editWaterTypeModal,
                toastNotice : 'Successfully upddated the water-type',
                editWaterTypeData : {
                    name: ''
                }
            })
            this.notifySuccess()
        }).catch((error) => {
            this.setState({
                toastNotice : 'Error occured during water-type updation'
            })
            this.notifyError()
        })
    }
    deleteWaterType(id) {
        axiosInstance.delete('/watertypes/'+id).then((response) => {
            this.setState({
                toastNotice : 'Successfully deleted the water-type'
            })
            this.notifySuccess()
            this._refreshWaterTypes()
        }).catch(() => {
            this.setState({
                toastNotice : 'Error occured during deletion'
            })
            this.notifyError()
        })
    }

    componentDidMount() {
        this._refreshWaterTypes()
    }

    render() {
        if(!isLoggedIn()) {
            return <Redirect to="/login" />
        }
        let { loading } = this.state
        let count = 1
        let waterTypes = this.state.waterTypes.map((watertype, index) => {
            return (
                <tr key={`watertype-list-key ${index}`}>
                    <td>{count++}</td>
                    <td>{watertype.name}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2" onClick={this.editWaterType.bind(this, watertype.id, watertype.name)}>Edit</Button>
                        <Button color="danger" size="sm" onClick={this.deleteWaterType.bind(this, watertype.id)}>Delete</Button>
                    </td>
                </tr>
            )
        })
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Water-Types List</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Button color="primary" onClick={this.toogleNewWaterTypeModal.bind(this)}>Add Water-Type</Button>
                                    <Modal isOpen={this.state.addWaterTypeModal} toggle={this.toogleNewWaterTypeModal.bind(this)}>
                                        <ModalHeader toggle={this.toogleNewWaterTypeModal.bind(this)}>Add a new water-type</ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                                <Label for="name">Name</Label>
                                                <Input style={{color: 'black'}} type="text" name="name" id="name"
                                                       placeholder="Enter water-type name"
                                                       value={this.state.newWaterTypeData.name}
                                                       onChange={(e) => {
                                                           let { newWaterTypeData } = this.state
                                                           newWaterTypeData.name = e.target.value
                                                           this.setState({ newWaterTypeData })
                                                       }} />
                                            </FormGroup>

                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.addWaterType.bind(this)}>Save</Button>{' '}
                                            <Button color="secondary" onClick={this.toogleNewWaterTypeModal.bind(this)}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>

                                    <Modal isOpen={this.state.editWaterTypeModal} toggle={this.toogleEditWaterTypeModal.bind(this)}>
                                        <ModalHeader toggle={this.toogleEditWaterTypeModal.bind(this)}>Edit water-type</ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                                <Label for="name">Name</Label>
                                                <Input style={{color: 'black'}} type="text" name="name" id="name"
                                                       placeholder="Enter water-type name"
                                                       value={this.state.editWaterTypeData.name}
                                                       onChange={(e) => {
                                                           let { editWaterTypeData } = this.state
                                                           editWaterTypeData.name = e.target.value
                                                           this.setState({ editWaterTypeData })
                                                       }} />
                                            </FormGroup>

                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.updateWaterType.bind(this)}>Update</Button>{' '}
                                            <Button color="secondary" onClick={this.toogleEditWaterTypeModal.bind(this)}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>

                                    <Table className="tablesorter" responsive>
                                        <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Water Type</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {loading ? <Spin loading={loading}/> : waterTypes}
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

export default WaterTypes