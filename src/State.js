'use strict';

import _ from 'lodash'
import Parallel from '../src/Parallel.js'

export default class State {

    constructor(params={}, obj) {
        this.states = _.reduce(params, (res, value, key) => {
            if (value instanceof Parallel || value.params)
                res[key] = value;
            else
                res[key] = new Parallel(value, obj);
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