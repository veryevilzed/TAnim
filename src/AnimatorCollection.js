

export default class AnimatorCollection {

    constructor() {
        this.totalDf = 0;
        this.animators = [];
    }

    add(animator){
        this.animators.push(animator);
    }

    count() {
        return this.animators.length;
    }

    update(df) {
        this.totalDf += df;
    }
}