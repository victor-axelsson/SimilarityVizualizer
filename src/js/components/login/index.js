import React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from 'core/colors'
import { CONSTANTS } from 'core/constants'
import styles from './index.css'
import { loginUser } from '../../api/userApi'

class Login extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {
            form: {},
            errors: false,
            isLoading: false
        };
    }

    componentDidMount() {

    }

    onFieldChange(name, val){
        let form = this.state.form; 
        form[name] = val; 
        this.setState({
            form: form
        });
    }

    isValidForm(){
        let username = this.state.form.username;
        let password = this.state.form.username;
        
        if(username && username.length > 0 && 
            password && password.length > 0){
            return true; 
        }else{
            return false; 
        }
    }

    onLogin(){
        if(this.isValidForm()){
            this.setState({errors: false, isLoading: true}); 

            this.props.login(this.state.form, () => {
                this.setState({isLoading: false});
            }); 
        }else{
            this.setState({errors: true, isLoading: false}); 
        }
    }

    render() {

        let subsection = (<div></div>);

        if(this.state.errors){
            subsection = (
                <div >
                    <p className={styles.error}>You must give a valid email and password</p>
                </div>
            );
        } 

        let spinner = (<div></div>); 
        if(this.state.isLoading){
            spinner = (
                <div className={styles.spinnerWrapper}>
                    <div className={styles.loader}>Loading...</div>
                </div>
            ); 
        }

        return (
            <div className={ styles.container }>
                <h3>Login</h3>
                <input type="text" placeholder="username" onChange={(e) => {
                    this.onFieldChange("username", e.target.value); 
                }}/>
                <input type="password" placeholder="password" onChange={(e) => {
                     this.onFieldChange("password", e.target.value); 
                }}/> 
                
                <button onClick={this.onLogin.bind(this)} >Login</button>
                {subsection}
                {spinner}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (payload, callback) => {
            loginUser(dispatch, payload, callback); 
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);