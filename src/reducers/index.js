import { combineReducers } from 'redux';
import gaveUp from './gaveUpReducer';
import guessedWords from './guessedWordsReducer';
import secretWord from './secretWordReducer';
import serverError from './serverErrorReducer';
import success from './successReducer';
import userEnter from './userEnterReducer';

export default combineReducers({
    success,
    guessedWords,
    secretWord,
    serverError,
    gaveUp,
    userEnter,
})