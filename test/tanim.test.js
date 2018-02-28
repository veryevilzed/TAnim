
import TAnim from '../src/TAnim.js'
import TAnimator from '../src/Animator.js'
import _ from 'lodash'

test('a test', () => {
    TAnim.update(1);
    expect(TAnim.animators.totalDf).toBe(1);
});

test('test set object by path', () => {

    var targetObject = {
        x : 4,
        a : { b: 0, c: 9 },
        b : [1,2,3]
    }

    var obj = {
        x : 5,
        "a.b": 7,
        "a.e": 8,
        "a.f.b": 11,
        "b.1": 4
    };
    
    for(let key of Object.getOwnPropertyNames(obj)) {
        _.set(targetObject, key, obj[key]);
    }

    expect(targetObject.x).toBe(5);
    expect(targetObject.a.b).toBe(7);
    expect(targetObject.a.e).toBe(8);
    expect(targetObject.a.f.b).toBe(11);
    expect(targetObject.b[1]).toBe(4);
});