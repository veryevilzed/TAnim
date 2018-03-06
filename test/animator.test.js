

import Animation from "./TAnimation.js"
import Animator from "./TAnimator.js"


test('test animator creation', () => {
    let obj = {
        x: 10,
        y: 15,
        scale: { x: 1, y: 1}
    };

    const anim = new Animator({
        animations: [
            new Animation(obj, {
               to: {
                   x: 0,
                   "scale.x": 2
               }
            }),
            new Animation(obj, {
                to: {
                    x: 10,
                    "scale.x": 1
                }
            }),
        ],
        loop: true
    }).start();
    expect(obj).toEqual({x: 10, y: 15, scale: {x: 1, y:1}});
    anim.update(0.5);
    expect(obj).toEqual({x: 5, y: 15, scale: {x: 1.5, y:1}});
    anim.update(0.5);
    expect(obj).toEqual({x: 0, y: 15, scale: {x: 2, y:1}});
    anim.update(0.5);
    expect(obj).toEqual({x: 5, y: 15, scale: {x: 1.5, y:1}});
    anim.update(0.5);
    expect(obj).toEqual({x: 10, y: 15, scale: {x: 1, y:1}});
    anim.update(0.5);
    expect(obj).toEqual({x: 5, y: 15, scale: {x: 1.5, y:1}});
});


test('test animator events', () => {
    let obj = {
        x: 10,
        y: 15,
        scale: { x: 1, y: 1}
    };
    let updated = 0;
    let complete = 0;
    const anim = new Animator({
        animations: [
            new Animation(obj, {
                to: {
                    x: 0,
                    "scale.x": 2
                }
            }),
            new Animation(obj, {
                to: {
                    x: 10,
                    "scale.x": 1
                }
            }),
        ],
        loop: false,
        onUpdate: () => updated++,
        onComplete: () => complete++,
    }).start();

    expect(obj).toEqual({x: 10, y: 15, scale: {x: 1, y:1}});
    anim.update(0.5);
    expect(obj).toEqual({x: 5, y: 15, scale: {x: 1.5, y:1}});
    expect(updated).toBe(1);
    expect(complete).toBe(0);
    anim.update(100);
    expect(obj).toEqual({x: 10, y: 15, scale: {x: 1, y:1}});
    expect(updated).toBe(3);
    expect(complete).toBe(1);

});


test('test leak', () => {
    var obj = {x: 10};
    var anim = new Animator({
        obj: obj,
        animations: [
            {from: {x: 0}, to: { x: 10 } },
            {to: { x: 15 } },
            {to: { x: 0 } }
        ],
        loop: true
    }).start();

    anim.start();
    anim.update(1);
    anim.update(1);
    anim.update(1);
    anim.update(1);
    anim.update(1);
    anim.update(1);
    anim.update(1);
    anim.update(1);
    anim.update(1);
    console.log(anim);
});