'use strict';

import TAnim from './TAnim.js'
import easing from './easing.js'
import AnimatorContainer from './AnimatorContainer.js';
import _ from 'lodash'

/** Animator class. */
export default class Animator {
    constructor(object, from={}, time=null){
        this.obj = object;
        this.animators = [];
        this.__current = new BaseAnimator(object, from, time);
        this.animators.push(this.__current);
        this.run = false;
        this.__loop = false;
    }

    /** main update method */
    update(dt) {
        if (!this.run || this.animators.length === 0)
            return;

        console.log("--update--");

        let {stop: stop, dt: ddt} = this.queue[0].update(dt);
        if (stop) {
            this.__shift();
            this.update(ddt);
        }

    }

    __shift() {
        var a = this.queue.shift();
        if (this.__loop)
            this.queue.push(a);
        if (this.queue.length > 0)
            this.queue[0].start();
        else {
            this.run = false;
        }
    }

    /** set time */
    time(val=1) { this.__current.__time=val; return this; }

    /** set from */
    from(params) { this.__current.from(params); return this; }

    /** set to */
    to(params) { this.__current.to(params); return this; }

    /** set loop */
    loop(val=true) { this.__loop=val; return this; }

    /** add one more animator */
    then(to, time=null) {
        time = time ? time : this.__current.__time;
        this.__current = new BaseAnimator(this.__current.obj, {}, time).to(to);
        this.animators.push(this.__current);
        return this;
    }

    /** start animators */
    start() {
        if (this.animators.length === 0)
            return;
        this.queue = _.map(this.animators, a => a);
        this.run = true;
        this.queue[0].start();
        return this;
    }

    parallel() {
        var ac = new AnimatorContainer(this.obj, this);
        ac.add(new Animator(this.obj));
        return ac;
    }

    /** stop animators */
    stop(applyTo=true) {
        this.run = false;
        this.__loop = false;
        if (applyTo)
            _.forEach(this.animators, a => a.stop(applyTo));
    }
}


export class BaseAnimator {
    constructor(object, from={}, time=null){
        this.obj=object;
        this.__from = from;
        this.__to = {};
        this.__es = easing.linear;
        this.run = false;
        this.__time = time ? time : 1;
        this.__dt = 0;
        this.__parent == null;
        this.__prepared = false;
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
        this.__dt = 0;
        if (!this.__prepared){
            this.__prepare();
            this.__clearSame();
            this.__prepared = true;
        }
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

        _.forEach(this.__from, (value, key) => {
            if (this.__to[key]) _.set(this.obj, key, this.__es(_dt, value, this.__to[key]-value, this.__time))
        });
        
        return {stop: this.__dt >= this.__time, dt: this.__dt - _dt};
    }


    __getValues(obj, params, result={}) {
        return _.reduce(params, (r, value, key) => { r[key] = _.get(obj, key); return r; }, result)
    }


    __prepare() {
        this.__from = this.__getValues(this.__from, this.__from,  this.__getValues(this.obj, this.__to, {}) );
        this.__to = this.__getValues(this.__to, this.__to, this.__getValues(this.__from, this.__from, {}));
    }


    __clearSame() {
        this.__to = _.reduce(this.__to, (res, val, key)=> {
            if (this.__from[key] === val){
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


