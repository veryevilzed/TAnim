
import Animator from "../src/Animator.js"

test('then update', () => {
    var obj = {x:0, y:0};
    var anim = new Animator(obj).to({x:10}).then({y:10}).start();
    expect(obj).toEqual({x: 0, y: 0});
    anim.update(0.5);
    expect(obj).toEqual({x: 5, y: 0});
    anim.update(0.5);
    expect(obj).toEqual({x: 10, y: 0});
    anim.update(0.5);
    expect(obj).toEqual({x: 10, y: 5});
    anim.update(0.5);
    expect(obj).toEqual({x: 10, y: 10});
});


test('then loop', () => {
    var obj = {x:0, y:0};
    var anim = new Animator(obj,{x:0, y: 0}).to({x:10, y: 0}).then({y:10}).loop().start();
    expect(obj).toEqual({x: 0, y: 0});
    anim.update(0.5);
    expect(obj).toEqual({x: 5, y: 0});
    anim.update(0.5);
    expect(obj).toEqual({x: 10, y: 0});
    anim.update(0.5);
    expect(obj).toEqual({x: 10, y: 5});
    anim.update(0.5);
    expect(obj).toEqual({x: 0, y: 0});
});

test('then stop', () => {
    var obj = {x:0, y:0};
    var anim = new Animator(obj,{x:0, y:0}).to({x:10}).then({y:10}).start();
    expect(obj).toEqual({x: 0, y: 0});
    anim.update(0.5);
    expect(obj).toEqual({x: 5, y: 0});
    anim.stop();
    expect(obj).toEqual({x: 10, y: 10});
});