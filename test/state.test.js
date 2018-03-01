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


