import React from 'react'
import ColorPicker from 'rc-color-picker'
import 'rc-color-picker/assets/index.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as Actions from '../../actions'

import './register_form.css'

class RegisterFormUnwrapped extends React.Component {
    state = {
        display_invalid_credentials: "none",
        color: "#fff000",
        login_field_value: "",
        password_field_value: ""
    };

    onColorPicked = (new_color) => {
        this.setState({ color: new_color.color});
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        const user = this.props.users[this.state.login_field_value];
        if (user) {
            this.setState({display_invalid_credentials: "block"});
        } else {
            this.setState({display_invalid_credentials: "none"});
            this.props.register(this.state.login_field_value, this.state.password_field_value, this.state.color);
            this.props.history.push("/");
        }
    };

    render() {
        return (
            <>
            <h2>Шутеечка дня: {this.props.meme}</h2>
            <form className="register_form" onSubmit={this.onFormSubmit}>
                <div style={{display: this.state.display_invalid_credentials, color: "red" }}>Пользователь с таким логином уже существует!</div>

                <div>Логин:<input name="login" value={this.state.login_field_value} onChange={(e) => this.setState({login_field_value: e.target.value})}/></div> <br />
                <div>Пароль: <input type="password" name="password" value={this.state.password_field_value} onChange={(e) => this.setState({password_field_value: e.target.value})} /></div> <br />
                <div>Любимый цвет <ColorPicker color={this.state.color} onChange={this.onColorPicked} /> {this.state.color} </div> <br />
                <div>
                    <button type="submit">Зарегистрироваться</button> 
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
    register: Actions.register,
};

const RegisterForm = connect(mapState, actionCreators)(RegisterFormUnwrapped);

export default RegisterForm;