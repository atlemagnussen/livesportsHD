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
    edge = 2

    midCircleR = 9.1

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

        const pitchWidth = this.width + 2*this.edge
        const pitchHeight = this.length + 2*this.edge

        const wFactor = wLim / pitchWidth
        const hFactor = hLim / pitchHeight

        const factor = Math.min(wFactor, hFactor)

        const width =  pitchWidth * factor
        const height = pitchHeight * factor
        const edge = this.edge * factor

        const fieldWidth = width - (2*edge)
        const fieldHeight = height - (2*edge)

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")!

        const computedStyle = getComputedStyle(this)
        const colorPitch = computedStyle.getPropertyValue("--ls-pitch")
        const colorLines = computedStyle.getPropertyValue("--ls-lines")

        ctx.clearRect(0, 0, width, height)
        // color background
        ctx.fillStyle = colorPitch
        ctx.fillRect(0, 0, width, height)

        // sidelines
        ctx.beginPath()
        ctx.rect(edge, edge, fieldWidth, fieldHeight)
        ctx.lineWidth = 1
        ctx.strokeStyle = colorLines
        ctx.stroke()
        ctx.closePath()

        // Mid line
        ctx.beginPath()
        ctx.moveTo(edge, height / 2)
        ctx.lineTo(edge+fieldWidth, height / 2)
        ctx.stroke()
        ctx.closePath()

        //Mid circle
        const radiusMid = this.midCircleR * factor
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, radiusMid, 0, 2*(Math.PI), false)
        ctx.stroke()
        ctx.closePath()
        //Mid point
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2*Math.PI, false)
        ctx.fillStyle = colorLines
        ctx.fill()
        ctx.closePath()
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'football-pitch': FootballPitch
    }
}
