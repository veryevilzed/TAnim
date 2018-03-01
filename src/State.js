'use strict';

import _ from 'lodash'
import Parallel from './Parallel.js'
import Animation from "./Animation.js";
import Animator from "./Animator";

export default class State {

    constructor(params={}, obj) {
        this.states = _.reduce(params, (res, value, key) => {
            if (value instanceof Parallel || value.params)
                res[key] = value;
            else {
                if (value.animators)
                    res[key] = new Parallel(value, obj);
                else if (value.animations)
                    res[key] = new Animator(value, obj);
                else if (value.state)
                    res[key] = new Animation(obj, { from: value.state });

            }
            return res;
        }, {});

        this.current = undefined;
        this.state = null;
    }

    change(name) {
        if (!this.states[name])
            return;
        if (this.state && this.state.run)
            this.state.stop();
        this.state = this.states[name];
        this.state.start();
        this.current = name;
        return this;
    }

    update(df) {
        if (this.state)
            this.state.update(df);
    }
}