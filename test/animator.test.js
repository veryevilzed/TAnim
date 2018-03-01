

import Animation from "../src/Animation.js"
import Animator from "../src/Animator.js"

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
