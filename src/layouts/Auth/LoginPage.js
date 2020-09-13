import React from 'react'
import axiosInstance from "../../helpers/axios";
// import { FormGroup, Label, Input, Form, Button} from 'reactstrap'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import isLoggedIn from "../../helpers/isLoggedIn";
import { Redirect } from 'react-router-dom'
import "../../assets/App.css";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

toast.configure()
const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach( val => {
        val.length > 0 && (valid=false)
    })
    return valid;
}
class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            token: '',
            loading: false,
            toastNotice : '',
            formErrors: {
              email: "",
              password: ""
            }

        }
    }
    notifyError() {
        toast.error(this.state.toastNotice)
    }
    notifyInfo() {
        toast.info(this.state.toastNotice)
    }

    handleSubmit = event => {
        event.preventDefault()
        const { history } = this.props
        if(formValid(this.state.formErrors)) {
            console.log(`
                ---SUBMITTING--
                Email : ${this.state.email}
                Password : ${this.state.password}
            `)
            const { email, password } = this.state
            axiosInstance.post('/login', { email, password }).then((response) => {
                this.setState({
                    token: response.data,
                    toastNotice : 'Loading Page'
                })
                this.notifyInfo()
                localStorage.setItem('token', this.state.token)
                history.push('/admin')
            }).catch((error) => {
                if(error.response)
                {
                    this.setState({
                        toastNotice : 'Invalid login credentials'
                    })
                    this.notifyError()
                    history.push('/login')
                }
            })
        }
        else {
            console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
        }
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : "invalid email address";
            break;
          case "password":
            formErrors.password =
              value.length < 3 ? "minimum 3 characaters required" : "";
            break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value });
      };

    render() {
        if(isLoggedIn()) {
            return <Redirect to="/admin" />
        }
        const { formErrors } = this.state
        return (

            <div className="wrapper">
            <div className="form-wrapper">
              <h3 style={{ color: 'black', textAlign: 'center'}}>Itata Fresh Limited</h3>
              <form onSubmit={this.handleSubmit} noValidate>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <input
                    className={formErrors.email.length > 0 ? "error" : ""}
                    placeholder="Email"
                    type="email"
                    name="email"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.email.length > 0 && (
                      <span className="errorMessage">{formErrors.email}</span>
                  )}
                </div>
                <div className="password">
                  <label htmlFor="password">Password</label>
                  <input
                    className={formErrors.password.length > 0 ? "error" : ""}
                    placeholder="Password"
                    type="password"
                    name="password"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.password.length > 0 && (
                      <span className="errorMessage">{formErrors.password}</span>
                  )}
                </div>
                <div className="createAccount">
                  <button type="submit">Login</button>
                  <small>Already Have an Account?</small>
                </div>
              </form>
            </div>
          </div>


        )
    }
}

export default LoginPage