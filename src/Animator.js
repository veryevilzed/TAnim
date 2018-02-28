'use strict';

import TAnim from './TAnim.js'
import easing from './easing.js'
import _ from 'lodash'


export default class Animator {
    constructor(object, from={}, time=null){
        this.animators = [];
        this.__current = new BaseAnimator(object, from, time);
        this.animators.push(this.__current);
        this.run = false;
        this.__loop = false;
        
    }



    update(dt) {
        if (!this.run || this.animators.lenght == 0)
            return;
        var ddt = this.queue[0].update(dt);
        if (ddt > 0){
            this.__shift()
            this.update(ddt);
        }
    }

    __shift() {
        var a = this.queue.shift();
        if (this.__loop)
            this.queue.push(a);
        if (this.queue.lenght > 0)
            this.queue[0].start();
        else
            this.run = false;
    }

    from(params) { this.__current.from(params); return this; }
    to(params) { this.__current.to(params); return this; }
    then(to, time=null) {
        time = time ? time : this.__current.__time;
        this.__current = new BaseAnimator(this.__current.obj, {}, time).to(to);
        this.animators.push(this.__current);
        return this;
    }

    start() {
        if (this.animators.lenght == 0)
            return;
        this.queue = _.map(this.animators, a => a);
        this.run = true;
        this.queue[0].start();
        return this;
    }

    stop(applyTo=true) {
        this.run = false;
        this.__loop = false;
        if (applyTo)
            _.forEach(this.animators, a => a.stop(true));
    }



}


export class BaseAnimator {
    constructor(object, from={}, time=null){
        this.obj=object;
        this.__from = from;
        this.__to = {};
        this.__es = easing.linear
        this.run = false;
        this.__time = time ? time : 1;
        this.__dt = 0;
        this.__parent == null;
        TAnim.add(this);
    }

    from(params) {
        this.__from = params;
        return this;
    }

    to(params, time) {
        this.__to = params;
        if (time) this.__time = time;
        return this;
    }

    start() {
        this.__apply(this.__from);
        this.__prepare();
        this.__clearSame();
        this.run = true;
        return this;
    }

    stop(applyTo=true) {
        this.run = false;
        if (applyTo)
            this.__apply(this.__to);     
        return this;
    }



    update(dt) {
        this.__dt += dt;
        var _dt = this.__dt;
        if (_dt > this.__time)
            _dt = this.__time;
        _.forEach(this.__from, (value, key) => _.set(this.obj, key, this.__es(_dt, value, this.__to[key]-value, this.__time)));
        return this.__dt - _dt;
    }

    __getValues(obj, params, result={}) {
        return _.reduce(params, (r, value, key) => { r[key] = _.get(obj, key); return r; }, result)
    }

    __prepare() {
        this.__from = this.__getValues(this.__from, this.__from,  this.__getValues(this.obj, this.__to, {}) );
        this.__to = this.__getValues(this.__to, this.__to, this.__getValues(this.__from, this.__from, {}));
    }

    __clearSame() {
        this.__from = _.reduce(this.__from, (res, val, key)=> {
            if (this.__to[key] == val){
                delete this.__to[key];
                return res;
            }else{
                res[key] = val;
                return res;
            }
        }, {});
    }

    __apply(params) {
        _.forEach(params, (value,key) => _.set(this.obj, key, value));
    }
}


