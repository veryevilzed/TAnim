

import Animation from "./TAnimation.js"
import Animator from "./TAnimator.js"
import Parallel from "./TParallel.js"
import _ from 'lodash'

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


test('test parallel complete', () => {

    let obj = {
        x: 10,
        frame: 0
    };
    let complete = 0;
    const anim = new Parallel({
        obj: obj,
        animators: [
            {
                animations: [
                    { to: {x: 0} },
                    { to: {x: 10} },
                ],
                loop: false
            },
            {
                animations: [
                    { to: {frame: 80}, time: 4 }
                ],
                loop: false
            }
        ],
        onComplete: () => complete++
    }).start();


    anim.update(1);
    expect(complete).toBe(0);
    anim.update(1);
    expect(complete).toBe(0);
    anim.update(1);
    expect(complete).toBe(0);
    anim.update(1);
    expect(complete).toBe(1);

});

test('test parallel leek', () => {
    var obj = {
        x: 0,
        y: 0,
        scale: {x: 1, y: 1},
        frame: 0,
        texture: ""
    };

    var anim = new Parallel({
        obj: obj,
        animators: [
            {
                animations: [
                    { to: {x:0, y:0}, from: {x:-300, y: -150 }},
                    { to: {x: 300, y: 150} },
                    { to: {x: 0, y: 0} },
                    { to: {x: -300, y: -150} },
                ],
                loop: true
            },
            {
                animations: [
                    { to: { "scale.x": 1.5, "scale.y": 1.5}, time: 0.5, },
                    { to: { "scale.x": 1, "scale.y": 1}, time: 0.5, }
                ],

                loop: true
            },
            {
                animations: [
                    { from: {frame: 1}, to: {frame: 69}, time: 1 },

                ],
                onUpdate: (animator) => {
                    animator.params.obj.texture = `symbol_6_${_.padStart(Math.floor(animator.params.obj.frame), 5, "0")}.png`;
                },
                loop: true
            }

        ]
    }).start();


    for(var i=0;i<1000;i++){
        anim.update(0.5);
    }


});