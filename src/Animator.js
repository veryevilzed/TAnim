'use strict';

import _ from 'lodash'

/** Animator class. */
export default class Animator {
    constructor(params={}){
        this.params = _.extend({
            animations: [],
            run: false,
            loop: false,
            autoAdd: true
        }, params);
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
        }
    }

    /** start animations */
    start() {
        if (this.params.animations.length === 0)
            return;
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



