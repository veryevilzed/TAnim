
import _ from 'lodash'
import Animator from './Animator.js';

export default class Parallel {
    constructor(params={}) {
        this.params = _.extend({
            animators: [],
            run: false,
            autoAdd: true
        }, params);

        this.params.animators = _.map(this.params.animators, anim => {
            if (anim instanceof Animator || anim.params)
                return anim;
            else
                return new Animator(_.extend(anim, {obj: this.params.obj}));
        });
        this.run = this.params.run;
    }

    update(df) { //TODO: All Stoped
        if (!this.run)
            return;

        _.forEach(this.params.animators, a => a.update(df));
    }

    start() {
        this.run = true;
        _.forEach(this.params.animators, a => a.start());
        return this;
    }

    stop(applyTo=true) {
        this.run = false;
        if (applyTo)
            _.forEach(this.params.animators, a => a.stop(applyTo));
        return this;
    }
}