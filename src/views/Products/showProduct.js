import React from 'react'
import axiosInstance from "../../helpers/axios";

import {Table} from "reactstrap";

class ShowProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product : [],
        }
    }
    componentDidMount() {
        axiosInstance.get('/products/1').then((response) => {
            this.setState({
                product : response.data
            })
        })
        console.log(this.state.product)
    }

    render() {
        return (
            <Table className="tablesorter" responsive>
                <thead className="text-primary">
                <tr>
                    <th>Date</th>
                    <th>Water Type</th>
                    <th>Quantity(Bottles)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{this.state.product.date}</td>
                    <td>{this.state.product.watertype_id}</td>
                    <td>{this.state.product.quantity}</td>
                </tr>
                </tbody>
            </Table>
        )
    }
}

export default ShowProduct