

import _ from 'lodash';

import easing from '../src/easing.js'

test('test extend', () => {
    let param = {a: 5, to: {x: 10, scale: {x: 15}}};
    param = _.extend({
        a: 7,
        b: 11,
        to: { scale: {y: 11}}
    },param);
    expect(param).toEqual({a: 5, b: 11, to: {x: 10, scale: {x: 15}} });
});



test('test easing', () => {
    expect(easing.linear(0.5, 0, 10, 1)).toBe(5);
    expect(easing.linear(0.5, 10, -10, 1)).toBe(5);
});