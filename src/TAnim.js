//Main Point

import _ from 'lodash'
export Animation from './Animation';
export Animator from './Animator';
export Parallel from './Parallel';
export State from './State';


class AnimatorPool {

    constructor() {
        this.totalDf = 0;
        this.animators = [];
    }

    add(animator){
        this.animators.push(animator);
        _.uniq(this.animators);
    }


    remove(animator){
        _.remove(this.animators, animator);
    }

    count() {
        return this.animators.length;
    }

    update(dt) {
        this.totalDf += dt;
        _.forEach(this.animators, a => a.update(dt));
    }
}


export class TAnim {
    constructor(){
        this.animators = new AnimatorPool();
    }

    update(df) {
        this.animators.update(df);
    }

    add(animator) {
        this.animators.add(animator);
    }

    remove(animator) {
        this.animators.remove(animator);
    }
}



export default new TAnim();
