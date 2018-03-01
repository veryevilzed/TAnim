

import Animation from "../src/Animation.js"
import Animator from "../src/Animator.js"
import Parallel from "../src/Parallel.js"

test('test parallel update', () => {
    let obj = {
        x: 10,
        frame: 0
    };

    const anim = new Parallel(
        {
            animators: [
                new Animator({
                    animations: [
                        new Animation(obj, {
                            to: {x: 0}
                        }),
                        new Animation(obj, {
                            to: {x: 10}
                        })
                    ],
                    loop: true
                }),
                new Animator({
                    animations: [
                        new Animation(obj, {
                            to: {frame: 80},
                            time: 4
                        })
                    ],
                    loop: true
                }),
            ]
        }
    ).start();

    expect(obj).toEqual({x: 10, frame: 0});
    anim.update(0.5);
    expect(obj).toEqual({x: 5, frame: 10});
    anim.update(0.5);
    expect(obj).toEqual({x: 0, frame: 20});
    anim.update(0.5);
    expect(obj).toEqual({x: 5, frame: 30});
    anim.update(0.5);
    expect(obj).toEqual({x: 10, frame: 40});
    anim.update(0.5);
    expect(obj).toEqual({x: 5, frame: 50});

});


test('test parallel object creation', () => {

    let obj = {
        x: 10,
        frame: 0
    };

    const anim = new Parallel({
        obj: obj,
        animators: [
            {
                animations: [
                    { to: {x: 0} },
                    { to: {x: 10} },
                ],
                loop: true
            },
            {
                animations: [
                    { to: {frame: 80}, time: 4 }
                ],
                loop: true
            }
        ]
    }).start();

    expect(obj).toEqual({x: 10, frame: 0});
    anim.update(0.5);
    expect(obj).toEqual({x: 5, frame: 10});
    anim.update(0.5);
    expect(obj).toEqual({x: 0, frame: 20});
    anim.update(0.5);
    expect(obj).toEqual({x: 5, frame: 30});
    anim.update(0.5);
    expect(obj).toEqual({x: 10, frame: 40});
    anim.update(0.5);
    expect(obj).toEqual({x: 5, frame: 50});

});