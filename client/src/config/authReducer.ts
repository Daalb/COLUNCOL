interface AuthState {
    loggedIn: boolean,
    username: string | null
}

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

type Action = { type: 'LOGIN', payload: { username: string } } | { type: 'LOGOUT' }

const loginAction = (username: string): Action => ({type: LOGIN, payload: {username}});
const logoutAction = (): Action => ({type: LOGOUT});

const initialState: AuthState = {
    loggedIn: false,
    username: null
};

const authReducer = (state: AuthState = initialState, action: Action): AuthState => {
    switch (action.type) {
        case LOGIN:
            return {...state, loggedIn: true, username: action.payload.username};
        case LOGOUT:
            return {...state, loggedIn: false, username: null};
        default:
            return state;
    }
};

export {LOGIN, LOGOUT, loginAction, logoutAction, authReducer};