const initialState = {
    users: {},

    authentication: {
        current_username: '',
    },
    
    meme: 'Загрузка...'
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN': {
            const user = state.users[action.username];
            if (user) {
                return {
                    ...state,
                    authentication: {
                        current_username: user.username
                    }
                };
            } else {
                return state;
            }
        }

        case 'LOGOUT': {
            return {
                ...state,
                authentication: {
                    current_username: ''
                },
            };
        }

        case 'REGISTER': {
            let users = {... state.users};
            users[action.username] = {
                username: action.username,
                password: action.password,
                favourite_color: action.favourite_color
            };

            return { ...state, users };
        }

        case 'CHANGE_FAVOURITE_COLOR': {
            if (state.authentication.current_username) {
                let users = {...state.users};
                users[state.authentication.current_username].favourite_color = action.favourite_color;
                return { ...state, users };
            } else {
                return state;
            }
        }

        case 'MEME_RECEIVED': {
            return { ...state, meme: action.joke}
        }

        default:
            return state;
    }
}