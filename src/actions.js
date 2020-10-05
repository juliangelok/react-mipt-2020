const axios = require('axios');


export function login(username, password) {
    return dispatch => {
        dispatch( { type: 'LOGIN', username, password } );
    };
}

export function logout() {
    return dispatch => {
        dispatch( { type: 'LOGOUT' } );
    };
}

export function register(username, password, favourite_color) {
    return dispatch => {
        dispatch( { type: 'REGISTER', username, password, favourite_color } );
    };
}

export function change_favourite_color(favourite_color) {
    return dispatch => {
        dispatch( { type: 'CHANGE_FAVOURITE_COLOR', favourite_color } );
    };
}

export function get_random_meme() {
    return dispatch => {
        axios.get('https://icanhazdadjoke.com/', {headers: {'Accept': 'application/json'}})
        .then((response) => {
            dispatch( { type: 'MEME_RECEIVED', joke: response.data.joke } );
        })
    }
}

