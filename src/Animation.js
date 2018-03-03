'use strict';

import easing from './easing.js'
import _ from 'lodash'
import formatUnicorn from 'format-unicorn/safe'

export default class Animation {
    constructor(obj, params={}){
        this.obj=obj;
        this.params = _.extend({
            time: 1,
            to: {},
            from: {},
            easing: easing.linear,
            run: false,
            autoAdd: true,
            strings: {}
        }, params);
        this.run = this.params.run;
        this.__dt = 0;
        this._from = {};
        this._to = {};
    }

    start() {
        this.__apply(this.params.from);
        this.__dt = 0;
        this.__prepare();
        this.__clearSame();
        this.run = true;
        return this;
    }

    stop(applyTo=true) {
        this.run = false;
        if (applyTo)
            this.__apply(this.params.to);
        return this;
    }

    update(dt) {
        this.__dt += dt;
        let _dt = this.__dt;
        if (_dt > this.params.time)
            _dt = this.params.time;
        _.forEach(this._from, (value, key) => {
                if (typeof this.params.to[key] === "number") {
                    if (this.params.to[key] !== undefined) _.set(this.obj, key, this.params.easing(_dt, value, this._to[key] - value, this.params.time));
                }else if (this.__dt >= this.params.time && this.params.to[key] !== undefined)
                    _.set(this.obj, key, this.params.to[key]);
        });

        _.forEach(this.params.strings, (value, key) => {
            if (typeof value === "string")
                _.set(this.obj, key, formatUnicorn(value, this.obj));
            if (typeof value === "function")
                _.set(this.obj, key, value(this.obj));
        });

        return {stop: this.__dt >= this.params.time, dt: this.__dt - _dt};
    }

    __getValues(obj, params, result={}) {
        return _.reduce(params, (r, value, key) => { r[key] = _.get(obj, key); return r; }, result)
    }

    __prepare() {
        this._from = this.__getValues(this.params.from, this.params.from,  this.__getValues(this.obj, this.params.to, {}) );
        this._to = this.__getValues(this.params.to, this.params.to, this.__getValues(this.params.from, this.params.from, {}));
    }

    __clearSame() {
        this._to = _.reduce(this._to, (res, val, key)=> {
            if (this._from[key] === val){
                return res;
            }else{
                res[key] = val;
                return res;
            }
        }, {});
    }

    __apply(params) {
        _.forEach(params, (value,key) => _.set(this.obj, key, value));
        _.forEach(this.params.strings, (value, key) => {
            if (typeof value === "string")
                _.set(this.obj, key, formatUnicorn(value, this.obj));
            if (typeof value === "function")
                _.set(this.obj, key, value(this.obj));
        });
    }
}
