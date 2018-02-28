//Main Point

import AnimatorCollection from './AnimatorCollection.js'

export class TAnim {
    constructor(){
        this.animators = new AnimatorCollection();
    }

    update(df) {
        this.animators.update(df);
    }

    add(animator) {
        this.animators.add(animator);
    }

    remove(aminator) {
        this.animators.remove(animator);
    }
}

export default new TAnim();
