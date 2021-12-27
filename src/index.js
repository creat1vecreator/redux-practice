import './styles.css'
import {applyMiddleware, createStore, compose} from "redux";
import {rootReducer} from "./redux/rootReducer";
import {asyncIncrement, changeTheme, decrement, increment} from "./redux/actionCreators";
import thunk from "redux-thunk";
import {logger} from "redux-logger/src";

const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const changeThemeBtn = document.getElementById('theme');
let counter = document.getElementById('counter');

let state = 0;

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

store.subscribe(() => {
    const currState = store.getState();
    counter.textContent = currState.counter;
    document.body.className = currState.theme.value;
    [addBtn, subBtn, asyncBtn, changeThemeBtn].forEach(btn => {
        btn.disabled = store.getState().theme.disabled;
    })
});

store.dispatch({type: 'INIT_APP'});

addBtn.addEventListener('click', () => {
    store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement());
})
asyncBtn.addEventListener("click", () => {
    store.dispatch(asyncIncrement())
})
changeThemeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark')?
       'light':
        'dark';
    store.dispatch(changeTheme(newTheme));
})

asyncBtn.addEventListener('click', () => {
    setTimeout(() => {
        state++;
    },1500);
})

// function logger(state) {
//     return function (next) {
//         return function (action) {
//             console.log('STATE: ', state.getState());
//             const newState = next(action);
//             console.log('NEXT: ', newState);
//             console.log('ACTION: ', action);
//             return next(action)
//         }
//     }
// }
