
import _ from 'lodash'
import Animator from './Animator.js';

export default class Parallel {
    constructor(params={}, obj=undefined) {
        this.params = _.extend({
            animators: [],
            run: false,
            autoAdd: true,
        }, params);

        if (obj !== undefined)
            this.params.obj = obj;

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
        if (this.params.onUpdate)
            this.params.onUpdate(this);

    }

    __onComplete() {
        if (this.params.onComplete && _.filter(this.params.animators, a => a.run === true).length === 0)
            this.params.onComplete(this);
    }

    start() {
        this.run = true;
        _.forEach(this.params.animators, a => a.start(() => this.__onComplete() ));
        return this;
    }

    stop(applyTo=true) {
        this.run = false;
        if (applyTo)
            _.forEach(this.params.animators, a => a.stop(applyTo));
        return this;
    }
}