
import Animator, {BaseAnimator} from "../src/Animator.js"
import TAnim from "../src/TAnim.js"

test('amimator add into TAnim', () => {
    var anim = new Animator({});
    expect(TAnim.animators.count()).toBeGreaterThan(0);
});


test('amimator apply "from" object after start', () => {
    var obj = {
        x: 5,
        scale: {x:1, y:1}
    }

    var anim = new Animator(obj, {x: 10, "scale.x": 0.5 }).start();
    expect(obj.x).toBe(10);
    expect(obj.scale.x).toBe(0.5);
});


test('amimator stop "to" value', () => {
    var obj = {
        x: 5,
        scale: {x:1, y:1}
    }

    var anim = new Animator(obj, {x: 10, "scale.x": 0.5 }).to({"scale.x": 7}).start().stop();
    expect(obj.x).toBe(10);
    expect(obj.scale.x).toBe(7);
});


test('amimator prepare', () => {
    var obj = {
        x: 5,
        scale: {x:1, y:1},
        d: 7
    }

    var anim = new BaseAnimator(obj, {"scale.x": 0}).to({"scale.y": 2, d: 1});
    anim.__prepare();
    expect(anim.__from).toEqual({"scale.x": 0, "scale.y": 1, d: 7});
    expect(anim.__to).toEqual(  {"scale.x": 0, "scale.y": 2, d: 1});
    anim.__clearSame();
    expect(anim.__to).toEqual(  {"scale.y": 2, d: 1});
    expect(anim.__from).toEqual({"scale.y": 1, d: 7});
});


test('amimator update value', () => {
    var obj = {
        x: 5,
        scale: {x:1, y:1}
    }
    var anim = new Animator(obj, {x: 10, "scale.x": 0 }).to({"scale.x": 10}).start();
    expect(obj.scale.x).toBe(0);
    anim.update(0.5);
    expect(obj.scale.x).toBe(5);
    anim.update(0.6);
    expect(obj.scale.x).toBe(10);
});
