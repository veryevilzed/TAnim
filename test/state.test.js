"use strict";

import State from '../src/State.js';

test('test state switch', () => {

    var obj = {
        x: 10
    };

    const anim = new State({
        default: {
            animators: [
                { animations: [ { from: {x: 0}, time: 0 } ] }
            ]
        },
        state1: {
            animators: [
                { animations: [ { from: {x: 100}, time: 0 } ] }
            ]
        }
    }, obj).change("default");

    expect(obj).toEqual({x: 0});
    anim.change("state1");
    expect(obj).toEqual({x: 100});

});


test('test state animations', () => {

    var obj = {
        x: 10
    };

    const anim = new State({
        default: {
            animators: [
                { animations: [ { to: {x: 0},  time: 1 } ] }
            ]
        },
        state1: {
            animators: [
                { animations: [ { to: {x: 100}, time: 1 } ] }
            ]
        }
    }, obj).change("default");

    expect(obj).toEqual({x: 10});
    anim.update(0.5);
    expect(obj).toEqual({x: 5});
    anim.update(0.5);
    expect(obj).toEqual({x: 0});
    anim.update(1);
    expect(obj).toEqual({x: 0});

    anim.change("state1");

    expect(obj).toEqual({x: 0});
    anim.update(0.5);
    expect(obj).toEqual({x: 50});
    anim.update(0.5);
    expect(obj).toEqual({x: 100});
    anim.update(0.5);
    expect(obj).toEqual({x: 100});
    anim.change("default");
    expect(obj).toEqual({x: 100});
    anim.update(0.5);
    expect(obj).toEqual({x: 50});
    anim.update(0.5);
    expect(obj).toEqual({x: 0});


});

test('test simple state switch', () => {
    var obj = {
        x: 10
    };
    const anim = new State({
        default: {
            state: {x: 0}
        },
        state1: {
            state: {x: 100}
        }
    }, obj).change("default");

    expect(obj).toEqual({x: 0});
    anim.change("state1");
    expect(obj).toEqual({x: 100});

});



test('test simple state animations', () => {

    var obj = {
        x: 10
    };

    const anim = new State({
        default: {
            animations: [ { to: {x: 0},  time: 1 } ]
        },
        state1: {
            animations: [ { to: {x: 100}, time: 1 } ]
        }
    }, obj).change("default");

    expect(obj).toEqual({x: 10});
    anim.update(0.5);
    expect(obj).toEqual({x: 5});
    anim.update(0.5);
    expect(obj).toEqual({x: 0});
    anim.update(1);
    expect(obj).toEqual({x: 0});

    anim.change("state1");

    expect(obj).toEqual({x: 0});
    anim.update(0.5);
    expect(obj).toEqual({x: 50});
    anim.update(0.5);
    expect(obj).toEqual({x: 100});
    anim.update(0.5);
    expect(obj).toEqual({x: 100});
    anim.change("default");
    expect(obj).toEqual({x: 100});
    anim.update(0.5);
    expect(obj).toEqual({x: 50});
    anim.update(0.5);
    expect(obj).toEqual({x: 0});


});