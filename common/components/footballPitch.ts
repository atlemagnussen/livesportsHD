import { html, css, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"

@customElement('football-pitch')
export class FootballPitch extends LitElement {
    static styles = css`
        :host {
            display: block;
            border: solid 1px gray;
            padding: 16px;
            max-width: 800px;
        }
    `
    

    render() {
        return html`
            <p>Pitch</p>
            <canvas id="pitch">canvas?</canvas>
        `
    }

    
}

declare global {
    interface HTMLElementTagNameMap {
        'my-element': MyElement
    }
}
