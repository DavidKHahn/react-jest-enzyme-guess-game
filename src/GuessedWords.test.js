import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { checkProps, findByTestAttr } from '../test/testUtils';
import GuessedWords from './GuessedWords';

const defaultProps = {
    guessedWords: [{ guessedWord: 'train', letterMatchCount: 3 }],
};

/**
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */

const setup = (props={}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<GuessedWords {...setupProps} />);
}

test('does not throw warning with expected props', () => {
    checkProps(GuessedWords, defaultProps);
});

describe('if there are no words guessed', () => {
    let wrapper
    beforeEach(() => {
        wrapper = setup({ guessedWords: [] });
    })
    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });
    test('renders instructions to guess a word', () => {
        const instructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(instructions.text().length).not.toBe(0);
    })
});
describe('if there are words guessed', () => {
    let wrapper;
    const guessedWords = [
        { guessedWord: 'train', letterMatchCount: 3 },
        { guessedWord: 'agile', letterMatchCount: 1 },
        { guessedWord: 'party', letterMatchCount: 5 },
    ];
    beforeEach(() => {
        wrapper = setup({ guessedWords });
    })
    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });
    test('renders "guessed words" section', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
        expect(guessedWordsNode.length).toBe(1);
    });
    test('correct number of guessed words', () => {
        const guessedWordsNodes = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsNodes.length).toBe(guessedWords.length);
    })
    // Challenge #1: Number of Guesses
    test('includes guess word index for each word', () => {
        const guessWordIndexes = findByTestAttr(wrapper, 'guessed-word-index');
        const indexTextSet = new Set(guessWordIndexes.map(wrapper => wrapper.text()));
        const expectedSet = new Set(guessedWords.map((word, index) => (index + 1).toString()));
        expect(indexTextSet).toEqual(expectedSet);
    });
    // END: Chellenge #1 - Number of Guesses
});
