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

    }

    componentDidMount() {
        this._refreshWaterTypes()
    }

    render() {
        let count = 1
        let { waterTypes } = this.state.waterTypes.map((watertype, index) => {
            return (
                <tr key={`watertype-list-key ${index}`}>
                    <td>{count++}</td>
                    <td>{watertype.name}</td>
                    <td>
                        <Button color="primary" size="sm" className="mr-2">Edit</Button>
                        <Button color="danger" size="sm">Delete</Button>
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
                                        <ModalHeader toggle={this.toogleNewWaterTypeModal.bind(this)}>Add a new Customer</ModalHeader>
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