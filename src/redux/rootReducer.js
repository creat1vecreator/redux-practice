import {combineReducers} from "redux";
import {CHANGE_THEME, DECREMENT, DISABLE_BUTTONS, ENABLE_BUTTONS, INCREMENT} from "./ActionTypes";

export function countReducer(state = 0 , action) {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
                return state - 1;
        default: return state;

    }
}

const initialTheme = {
    value: 'light',
    disabled: false,
}
export const themeReducer = (state = initialTheme, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return {...state, value: action.payload};
        case ENABLE_BUTTONS:
            return {...state, disabled: false};
        case DISABLE_BUTTONS:
            return {...state, disabled: true};
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    counter:countReducer,
    theme: themeReducer});
