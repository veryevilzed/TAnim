
import _ from 'lodash'

export default class Parallel {
    constructor(params={}) {
        this.params = _.extend({
            animators: [],
            run: false,
            autoAdd: true
        }, params);
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