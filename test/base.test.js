

import _ from 'lodash';
import Parallel from '../src/Parallel.js';
import easing from '../src/easing.js'
import formatUnicorn from 'format-unicorn/safe'

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


test('test unicorn', () => {
    expect(formatUnicorn("{t}", {t: 5}) ).toBe("5");
});


test('test template es6', () => {
    var obj = {
        x: 100
    };

    var a = () => `hello ${obj.x}!`;

    expect(a()).toBe("hello 100!");
    obj.x = 500;
    expect(a()).toBe("hello 500!");
});



test('test class', () => {
    var anim = new Parallel({});
    var obj = {x:5, y:3};

    expect(anim instanceof Parallel).toBe(true);
    expect(obj instanceof Parallel).toBe(false);
});