
import Animator, {BaseAnimator} from "../src/Animator.js"
import TAnim from "../src/TAnim.js"

test('animator add into TAnim', () => {

    var obj = {
        x: 6,
        y: 6,
        frame: 0
    }

    var anim = new Animator(obj)
        .to({x:0, y:0}).then({x:6, y:6}).loop()
        .parallel()
        .to({frame: 20}).time(2)
        .start();
    expect(obj).toEqual({x: 6, y: 6, frame: 0});
    anim.update(0.5);
    console.log(anim);
    expect(obj).toEqual({x: 3, y: 3, frame: 5});
});
