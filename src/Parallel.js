
import TAnim from './TAnim.js'
import Animator from './Animator.js'
import _ from 'lodash'

export default class AnimatorContainer {
    constructor(obj, animator) {
        this.animators = [];
        this.__current = animator ? animator : new Animator(obj);
        this.add(this.__current);
        this.run = false;
    }

    add(animator){
        TAnim.remove(animator);
        TAnim.add(this);
        this.animators.push(animator);
    }

    remove(animator) {
        _.remove(this.animators, animator);
    }

    count() { return this.animators.length; }

    update(df) { //TODO: All Stoped
        if (!this.run)
            return;
        _.forEach(this.animators, a => {
            a.update(df);
            //console.log("RUN", a);
        });
    }

    time(val=1) { this.__current.time(val); return this; }
    from(params) { this.__current.from(params); return this; }

    to(params) { this.__current.to(params); return this; }
    loop(val=true) { this.__current.loop(val); return this; }
    then(to, time=null) { this.__current.then(to, time); return this; }

    start() {
        this.run = true;
        _.forEach(this.animators, a => {
            a.start();
            //console.log("START", a);
        });
        return this;
    }

    stop(applyTo=true) {
        this.run = false;
        if (applyTo)
            _.forEach(this.animators, a => a.stop(applyTo));
        return this;
    }
}