import { combineReducers } from 'redux';
import guessedWords from './guessedWordsReducer';
import success from './successReducer';

export default combineReducers({
    success,
    guessedWords,
})