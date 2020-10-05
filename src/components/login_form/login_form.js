import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as Actions from '../../actions'

import './login_form.css'

class LoginFormUnwrapped extends React.Component {

    state = {
        display_invalid_credentials: "none",
        login_field_value: "",
        password_field_value: ""
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        const user = this.props.users[this.state.login_field_value];
        if (!user || user.password !== this.state.password_field_value) {
            this.setState({display_invalid_credentials: "block"});
        } else {
            this.setState({display_invalid_credentials: "none"});
            this.props.login(this.state.login_field_value, this.state.password_field_value);
            this.props.history.push("/");
        }
    };

    render() {
        return (
            <>
            <h2>Шутеечка дня: {this.props.meme}</h2>
            <form onSubmit={this.onFormSubmit} className="login_form">
                <div style={{display: this.state.display_invalid_credentials, color: "red" }}> Неправильное имя пользователя или пароль!</div>

                <div>Логин:<input name="login" value={this.state.login_field_value} onChange={(e) => this.setState({login_field_value: e.target.value})}/></div> <br />
                <div>Пароль: <input type="password" name="password" value={this.state.password_field_value} onChange={(e) => this.setState({password_field_value: e.target.value})} /> </div> <br />
                <div>
                    <button type="submit" >Войти</button>
                    <Link to="/"><button>На главную</button></Link> 
                </div>
            </form>
            </>
        );
    }
}

function mapState(state) {
    const { users, authentication, meme } = state;
    return { users, authentication, meme };
}

const actionCreators = {
    login: Actions.login,
};

const LoginForm = connect(mapState, actionCreators)(LoginFormUnwrapped);

export default LoginForm;