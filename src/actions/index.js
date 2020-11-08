import axios from 'axios';
import { getLetterMatchCount } from '../helpers';


export const actionTypes = {
    CORRECT_GUESS: 'CORRECT_GUESS',
    GUESS_WORD: 'GUESS_WORD',
    SET_SECRET_WORD: 'SET_SECRET_WORD',
    SERVER_ERROR: 'SERVER_ERROR',
    GIVE_UP: 'GIVE_UP',
    USER_ENTERING: 'USER_ENTERING',
    USER_ENTERED: 'USER_ENTERED',
    RESET_GAME: 'RESET_GAME',
};

/**
 * Returns Redux Thunk function that dispatches GUESS_WORD action
 *      and (conditionally) CORRECT_GUESS action
 * @function guessWord
 * @param {string} guessedWord - Guessed word.
 * @returns {function} - Redux Thunk function.
 */
export const guessWord = (guessedWord) => {
    return function(dispatch, getState) {
        const secretWord = getState().secretWord;
        const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

        dispatch({
            type: actionTypes.GUESS_WORD,
            payload: { guessedWord, letterMatchCount }
        });

        if (guessedWord === secretWord) {
            dispatch({ type: actionTypes.CORRECT_GUESS });
        }
    };
}

export const getSecretWord = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3030')
            .then((response => {
                dispatch({
                    type: actionTypes.SET_SECRET_WORD,
                    payload: response.data
                });
            }))
            // Challenge #5: Server Error
            // note: axios rejects promise if status is 4xx or 5xx
            .catch(error => {
                dispatch({ type: actionTypes.SERVER_ERROR });
            })
            // END: Challenge #5: Server Error
    }
}

// Challenge #4: Enter Secret Word
/**
 * Action creator to dispatch USER_ENTERED and SET_SECRET_WORD actions.
 * @function setUserSecretWord
 * @param {string} userSecretWord - Secret Word entered by user.
 * @returns {function} - Redux Thunk function.
 */
export const setUserSecretWord = (userSecretWord) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_SECRET_WORD, payload: userSecretWord });
        dispatch({ type: actionTypes.USER_ENTERED });
    }
};

/**
 * Action creator that returns USER_ENTERING action type.
 * @function setUserEntering
 * @returns {object} - Action with type USER_ENTERING.
 */
export const setUserEntering = () => {
    { type: actionTypes.USER_ENTERING }
};

// END: Challenge #4: Enter Secret Word