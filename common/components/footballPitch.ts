import { html, css, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { createRef, ref } from "lit/directives/ref.js"
import {query} from 'lit/decorators/query.js';

@customElement('football-pitch')
export class FootballPitch extends LitElement {
    static styles = css`
        :host {
            box-sizing: border-box;
            display: block;
            border: solid 1px gray;
            padding: 5px;
            width: 800px;
            height: 600px;
        }
        div {
            width: 100%;
            height: 100%;
        }
        canvas {
            position: absolute;
        }
    `

    canvas = createRef<HTMLCanvasElement>()

    @query("#wrapper")
    wrapper: HTMLDivElement | undefined

    render() {
        return html`
        <div id="wrapper">
            <canvas id="pitch" ${ref(this.canvas)}>canvas?</canvas>
        </div>
        `
    }

    async firstUpdated() {
        this.paintBackground()    
    }
    paintBackground() {
        if (!this.canvas.value || !this.wrapper)
            return

        const canvas = this.canvas.value
        const w = this.wrapper?.clientWidth
        const h = this.wrapper?.clientHeight

        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext("2d")!
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#060";
        ctx.fillRect(0, 0, w, h);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'my-element': MyElement
    }
}
