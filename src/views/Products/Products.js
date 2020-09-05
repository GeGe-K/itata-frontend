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
    Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, ModalFooter,
} from "reactstrap";

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products : [],
            watertypes : [],
            addProductModal : false,
            addProductData : {
                date : '',
                watertype_id : '',
                quantity : ''
            },
            editProductModal : false,
            editProductData : {
                id : '',
                date : '',
                watertype_id : '',
                quantity : ''
            }
        }
    }
    toogleNewProductModal() {
        this.setState({
            addProductModal : !this.state.addProductModal
        })
    }
    addProduct() {
        let { date, watertype_id, quantity} = this.state.addProductData
        axios.post('http://itata.test/api/products', {
            date, watertype_id, quantity
        }).then((response) => {
            let { products } = this.state
            products.push(response.data)
            this.setState({
                products,
                addProductModal : !this.state.addProductModal,
                addProductData : {
                    date : '',
                    watertype_id: '',
                    quantity : ''
                }
            })
        })
    }
    toogleEditProductModal() {
        this.setState({
            editProductModal : !this.state.editProductModal
        })
    }
    editProduct(id, date, watertype_id, quantity) {
        this.setState({
            editProductData : { id, date, watertype_id, quantity },
            editProductModal : !this.state.editProductModal
        })
    }
    updateProduct() {
        let { date, watertype_id, quantity } = this.state.editProductData
        axios.put('http://itata.test/api/products/' + this.state.editProductData.id , {
            date, watertype_id, quantity
        }).then((response) => {
            this._refreshProducts()
            this.setState({
                editProductModal : !this.state.editProductModal,
                editProductData : {
                    id : '',
                    date: '',
                    watertype_id : '',
                    quantity : ''
                }
            })
        })
    }
    deleteProduct(id) {
        axios.delete('http://itata.test/api/products/' + id).then((response) => {
            this._refreshProducts()
        })
    }
    watertypes() {
        axios.get('http://itata.test/api/watertypes').then((response) => {
            this.setState({
                watertypes : response.data
            })
        })
    }
    _refreshProducts() {
        axios.get('http://itata.test/api/products').then((response) => {
            this.setState({
                products : response.data
            })
        })
    }
    componentDidMount() {
        this.watertypes()
        this._refreshProducts()
    }

    render() {
        let count = 1
        let products = this.state.products.map((product, index) => {
            return (
                <tr key={`products-list-key ${index}`}>
                    <td>{count++}</td>
                    <td>{product.date}</td>
                    <td>{product.watertype_id}</td>
                    <td>{product.quantity}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2" onClick={this.editProduct.bind(this, product.id, product.date, product.watertype_id, product.quantity)}>Edit</Button>
                        <Button color="danger" size="sm" className="mr-2" onClick={this.deleteProduct.bind(this, product.id)}>Delete</Button>
                        <Button color="secondary" size="sm">Show</Button>
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
                                    <CardTitle tag="h4">Products List</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Button color="primary" onClick={this.toogleNewProductModal.bind(this)}>Add Product</Button>
                                    <Modal isOpen={this.state.addProductModal} toggle={this.toogleNewProductModal.bind(this)}>
                                        <ModalHeader toggle={this.toogleNewProductModal.bind(this)}>Add a new Product</ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                                <Label for="Date">Date</Label>
                                                <Input
                                                    style = {{color: 'black'}}
                                                    type="date"
                                                    name="date"
                                                    id="date"
                                                    placeholder="Input the date"
                                                    value={this.state.addProductData.date}
                                                    onChange={(e) => {
                                                        let { addProductData } = this.state
                                                        addProductData.date = e.target.value
                                                        this.setState({ addProductData })
                                                    }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="Customer">Water Type</Label>
                                                <Input style={{color: 'black'}} type="select" name="watertype_id" id="watertype_id" onChange={(e) => {
                                                    let { addProductData } = this.state
                                                    addProductData.watertype_id = e.target.value
                                                    this.setState({ addProductData})
                                                }}>
                                                    <option value="">Select water type</option>
                                                    {this.state.watertypes.map((watertype, index) => {
                                                        return <option key={`water-key ${index}`} value={watertype.id}> {watertype.name}</option>
                                                    })}
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="name">Quantity(Bottles)</Label>
                                                <Input style={{color: 'black'}} type="number" name="quantity" id="quantity" value={this.state.addProductData.quantity}
                                                       placeholder="Quantity in crates"
                                                       onChange={(e) => {
                                                           let { addProductData } = this.state;
                                                           addProductData.quantity = e.target.value
                                                           this.setState({ addProductData })
                                                       }} />
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.addProduct.bind(this)}>Save</Button>{' '}
                                            <Button color="secondary" onClick={this.toogleNewProductModal.bind(this)}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>

                                    <Modal isOpen={this.state.editProductModal} toggle={this.toogleEditProductModal.bind(this)}>
                                        <ModalHeader toggle={this.toogleEditProductModal.bind(this)}>Edit Product</ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                                <Label for="Date">Date</Label>
                                                <Input
                                                    style = {{color: 'black'}}
                                                    type="date"
                                                    name="date"
                                                    id="date"
                                                    placeholder="Input the date"
                                                    value={this.state.editProductData.date}
                                                    onChange={(e) => {
                                                        let { editProductData } = this.state
                                                        editProductData.date = e.target.value
                                                        this.setState({ editProductData })
                                                    }}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="Customer">Water Type</Label>
                                                <Input style={{color: 'black'}} type="select" name="watertype_id" id="watertype_id" onChange={(e) => {
                                                    let { editProductData } = this.state
                                                    editProductData.watertype_id = e.target.value
                                                    this.setState({ editProductData})
                                                }}>
                                                    <option value="">Select water type</option>
                                                    {this.state.watertypes.map((watertype, index) => {
                                                        return <option key={`water-key ${index}`} value={watertype.id}> {watertype.name}</option>
                                                    })}
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="name">Quantity(Bottles)</Label>
                                                <Input style={{color: 'black'}} type="number" name="quantity" id="quantity" value={this.state.editProductData.quantity}
                                                       placeholder="Quantity in crates"
                                                       onChange={(e) => {
                                                           let { editProductData } = this.state;
                                                           editProductData.quantity = e.target.value
                                                           this.setState({ editProductData })
                                                       }} />
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.updateProduct.bind(this)}>Update</Button>{' '}
                                            <Button color="secondary" onClick={this.toogleEditProductModal.bind(this)}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>

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
                                        {products}
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