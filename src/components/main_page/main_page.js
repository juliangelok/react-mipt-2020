import React from 'react'
import { Link } from 'react-router-dom'
import ColorPicker from 'rc-color-picker'
import { connect } from 'react-redux'

import * as Actions from '../../actions'

import './main_page.css'

class MainPageUnwrapped extends React.Component {

    onFavouriteColorChanged = (new_color) => {
        this.props.color_change(new_color.color);
    }
    
    render() {
        const not_entered_interface = (
            <>
            <h2>Шутеечка дня: {this.props.meme}</h2>
            <div className="main_page">
                <h1>Привет! Здесь ты можешь выбрать свой любимый цвет!</h1>
                <div>
                    <Link to="/login"><button>Войти</button></Link>
                    <Link to="/register"><button>Регистрация</button></Link>
                </div>
            </div>
            </>
        );

        const username = this.props.authentication.current_username;
        const color = username ? this.props.users[username].favourite_color : "";

        const entered_interface = (
            <>
            <h2>Шутеечка дня: {this.props.meme}</h2>
            <div className="main_page" style={{backgroundColor: color}}>
            <h1>Привет, {this.props.authentication.current_username}!</h1>
                <h2>Твой любимый цвет: <ColorPicker animation="slide-up" color={color} onChange={this.onFavouriteColorChanged}/> {color} </h2>
                <button onClick={this.props.logout}> Выйти </button>
            </div>
            </>
        );

        return username ? entered_interface : not_entered_interface ;
    }
};



function mapState(state) {
    const { users, authentication, meme } = state;
    return { users, authentication, meme };
}

const actionCreators = {
    logout: Actions.logout,
    color_change: Actions.change_favourite_color
};

const MainPage = connect(mapState, actionCreators)(MainPageUnwrapped);

export default MainPage;
