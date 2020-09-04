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
    Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, ModalFooter
} from "reactstrap";

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
            }
        }
    }
    _refreshWaterTypes() {
        axios.get('http://itata.test/api/watertypes').then((response) => {
            this.setState({
                waterTypes : response.data
            })
        })
    }
    toogleNewWaterTypeModal() {
        this.setState({
            addWaterTypeModal : !this.state.addWaterTypeModal
        })
    }
    addWaterType() {
        axios.post('http://itata.test/api/watertypes',this.state.newWaterTypeData).then((response) => {
            let { waterTypes } = this.state
            waterTypes.push(response.data)
            this.setState({
                waterTypes,
                addWaterTypeModal : !this.state.addWaterTypeModal,
                newWaterTypeData : {
                    name: ''
                }
            })
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
        axios.put('http://itata.test/api/watertypes/'+this.state.editWaterTypeData.id, {
            name
        }).then((response) => {
            this._refreshWaterTypes()
            this.setState({
                editWaterTypeModal : !this.state.editWaterTypeModal,
                editWaterTypeData : {
                    name: ''
                }
            })
        })
    }
    deleteWaterType(id) {
        axios.delete('http://itata.test/api/watertypes/'+id).then((response) => {
            this._refreshWaterTypes()
        })
    }

    componentDidMount() {
        this._refreshWaterTypes()
    }

    render() {
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
                                        {waterTypes}
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