/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Row,
} from "reactstrap";
import axiosInstance from "../../helpers/axios";
import UserCard from "./UserCard";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : [],
      toogleEdit : true,
      editName : 'Edit'
    }
  }

  user() {
    axiosInstance.get('loguser').then((response) => {
      this.setState({
        user : response.data
      })
    }).catch((error) => {
      window.location.reload(true)
    })
  }
  componentDidMount() {
    this.user()
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <UserCard
                name={this.state.user.name}
                email={this.state.user.email}
                phone={this.state.user.phone}
                address={this.state.user.address}
                about={this.state.user.about}
                />

          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
