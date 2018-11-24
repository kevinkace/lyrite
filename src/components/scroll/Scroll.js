import { throttle } from "throttle-debounce";
export default class Scroll {
    constructor() {
        this.init = true;
        this.heightDelta = 0;
        this.heightRatio = 1;
        this.scrollAmt = 0;
        this.barAmt = 0;

        // this.content // height of content dom
        // this.scroll // height of scroll dom

        // this.barHeight = 1;
        // this.barDelta = 0;

        // todo: debounce
        this.scrollListener = throttle(100, this.scroll.bind(this));

        document.addEventListener("wheel", this.scrollListener, { passive : true });
        window.scroll = this;
    }

    destructor() {
        document.removeEventListener("wheel", this.scrollListener);
    }

    createDom(key, dom) {
        this[key] = dom.getBoundingClientRect().height;

        this.updateBarHeight();
    }

    updateDom(key, dom) {
        const oldVal = this[key];

        this[key] = dom.getBoundingClientRect().height;

        if (oldVal !== this[key]) {
            this.updateBarHeight();
        }
    }

    updateBarHeight() {
        if (!this.content || !this.scroll) {
            return;
        }

        this.heightDelta = this.content - this.scroll;
        this.heightRatio = this.scroll / this.content;
        this.barHeight   = this.scroll * this.heightRatio;
        this.barDelta    = this.scroll - this.barHeight;

        m.redraw();
    }

    scroll(e) {
        const change = parseInt(e.deltaY, 10) / 2;
        const _barAmt = this.barAmt;
        const _scrollAmt = this.scrollAmt;

        if (this.heightDelta < 0) {
            this.scrollAmt = 0;

            return;
        }

        this.scrollAmt += change;

        if (this.scrollAmt < 0) {
            this.scrollAmt = 0;
        }

        if (this.scrollAmt > this.heightDelta) {
            this.scrollAmt = this.heightDelta;
        }

        this.barAmt = this.barDelta * (this.scrollAmt / this.heightDelta);

        if (this.barAmt === _barAmt && this.scrollAmt === _scrollAmt) {
            return;
        }

        m.redraw();
    }
}
