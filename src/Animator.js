'use strict';

import _ from 'lodash'
import Animation from './animation.js';

/** Animator class. */
export default class Animator {
    constructor(params={}){
        this.params = _.extend({
            animations: [],
            run: false,
            loop: false,
            autoAdd: true
        }, params);

        this.params.animations = _.map(this.params.animations, anim => {
            if (anim instanceof Animation || anim.params)
                return anim;
            else
                return new Animation(this.params.obj, anim);
        });

        this.queue = [];
        this.run = this.params.run;
    }

    /** main update method */
    update(dt) {
        if (!this.run || this.params.animations.length === 0)
            return;

        let {stop: stop, dt: ddt} = this.queue[0].update(dt);

        if (stop) {
            this.__shift();
            this.update(ddt);
        }
        if (this.params.onUpdate && this.params.onUpdate instanceof Function)
            this.params.onUpdate(this);
    }

    __shift() {
        const a = this.queue.shift();
        a.stop();
        if (this.params.loop)
            this.queue.push(a);
        if (this.queue.length > 0)
            this.queue[0].start();
        else {
            this.run = false;
            if (this.params.onComplete && this.params.onComplete instanceof Function)
                this.params.onComplete(this);
        }
    }

    /** start animations */
    start(onComplete) {
        if (this.params.animations.length === 0)
            return;
        if (onComplete)
            this.params.onComplete = onComplete;
        this.queue = _.map(this.params.animations, a => a);
        this.run = true;
        this.queue[0].start();
        return this;
    }

    /** stop animations */
    stop(applyTo=true) {
        this.run = false;
        this.__loop = false;
        if (applyTo)
            _.forEach(this.params.animations, a => a.stop(applyTo));
    }
}



