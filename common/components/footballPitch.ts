import { html, css, LitElement } from "lit"
import { customElement } from "lit/decorators.js"
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
            width: 400px;
            height: 600px;
        }
        div {
            width: 100%;
            height: 100%;
        }
        canvas {
            
            /* position: absolute; */
        }
    `

    canvas = createRef<HTMLCanvasElement>()

    @query("#wrapper")
    wrapper: HTMLDivElement | undefined

    length = 100
    width = 60
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
        const wLim = this.wrapper?.clientWidth
        const hLim = this.wrapper?.clientHeight

        const wFactor = wLim / this.width
        const hFactor = hLim / this.length

        const factor = Math.min(wFactor, hFactor)

        const width = this.width * factor
        const height = this.length * factor
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")!
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#060";
        ctx.fillRect(0, 0, width, height);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'football-pitch': FootballPitch
    }
}
