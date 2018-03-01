
import Animation from "../src/Animation.js"

test('test animation creation', () => {
    var anim = new Animation({}, {
        to: {
            x: 10,
            y: 10
        },
        time: 5
    });
    expect(anim.params.to).toEqual({x: 10, y: 10});
    expect(anim.params.time).toBe(5);

});

test('test animation update', () => {
    var obj = {x: 0, y: 0};
    var anim = new Animation(obj, {
        to: {
            x: 10
        },
        time: 1
    }).start();
    expect(obj).toEqual({x: 0, y: 0});
    anim.update(0.5);
    expect(obj).toEqual({x: 5, y: 0});
    anim.update(0.5);
    expect(obj).toEqual({x: 10, y: 0});
    anim.update(0.5);
    expect(obj).toEqual({x: 10, y: 0});
});


test('test animation update+from', () => {
    var obj = {x: 0, y: 0};
    var anim = new Animation(obj, {
        to: {
            x: 10
        },
        from: {
            y: 5,
            x: 4
        },
        time: 1
    }).start();
    expect(obj).toEqual({x: 4, y: 5});
    anim.update(0.5);
    expect(obj).toEqual({x: 7, y: 5});
    anim.update(0.5);
    expect(obj).toEqual({x: 10, y: 5});
    anim.update(0.5);
    expect(obj).toEqual({x: 10, y: 5});
});



test('test animation back', () => {
    var obj = {x: 10};
    var anim = new Animation(obj, {
        to: {
            x: 0
        },
        time: 1
    }).start();
    expect(obj.x).toEqual(10);
    anim.update(0.5);
    expect(obj.x).toEqual(5);
    anim.update(0.5);
    expect(obj.x).toEqual(0);
});


test('test string', () => {
    var obj = {x: 10};
    var anim = new Animation(obj, {
        to: {
            x: 0
        },
        strings: {
            xVal: "x value is {x}"
        },
        time: 1
    }).start();
    expect(obj.x).toBe(10);
    expect(obj.xVal).toBe("x value is 10");
    anim.update(0.5);
    expect(obj.x).toBe(5);
    expect(obj.xVal).toBe("x value is 5");
    anim.update(0.5);
    expect(obj.x).toEqual(0);
    expect(obj.xVal).toBe("x value is 0");
});


test('test string es6', () => {
    var obj = {x: 10};
    var anim = new Animation(obj, {
        to: {
            x: 0
        },
        strings: {
            xVal: (obj) => `x value is ${obj.x}`
        },
        time: 1
    }).start();
    expect(obj.x).toBe(10);
    expect(obj.xVal).toBe("x value is 10");
    anim.update(0.5);
    expect(obj.x).toBe(5);
    expect(obj.xVal).toBe("x value is 5");
    anim.update(0.5);
    expect(obj.x).toEqual(0);
    expect(obj.xVal).toBe("x value is 0");
});