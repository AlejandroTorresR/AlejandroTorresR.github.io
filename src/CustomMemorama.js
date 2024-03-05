import { LitElement, html, css } from 'lit-element';
import * as AFRAME from 'aframe';
AFRAME;
export class CustomMemorama extends LitElement {

    static get properties() {
        return {
            cards: { type: Array }
        }
    }

    static get styles() {
        return css`
            button[aframe-injected]{
                display: none;
            }
            .a-enter-vr button{
                display: block;
                position: absolute;
                width: 80px;
                height: 40px;
                z-index: 1;
                bottom: 32px;
                border: none;
                border-radius: 4px;
                font-weight: bold;
                color: rgba(0,0,0,.5);
                cursor: pointer;
                left: calc(50% - 40px);
            }
            .a-enter-vr button:after{
                content: 'Enter VR';
            }
        `;
    }

    constructor() {
        super();
        this.cards = ['74677422', '74677423', '74677424', '74677422', '74677423', '74677424', '74677422', '74677423', '74677424', '74677422',
            '74677422', '74677423', '74677424', '74677422', '74677423', '74677424', '74677422', '74677423', '74677424', '74677422',
            '74677422', '74677423', '74677424', '74677422', '74677423', '74677424', '74677422', '74677423', '74677424', '74677422',
            '74677422', '74677423', '74677424', '74677422', '74677423', '74677424', '74677422', '74677423', '74677424', '74677422']
    }

    createPlaneArray() {
        let x = -60, y = 35, z = -55, rotate = 20;
        return this.cards.map((card) => {
            if (x === 40) {
                x = -50;
                y -= 15;
                rotate = 20;
            } else {
                x += 10
                rotate -= 5;
            }
            return html`
            <a-plane 
                position="${x} ${y} ${z}"
                width="9.5" height="14" 
                color="#fff"
                rotation="0 ${rotate} 0" 
                src="./assets/${card}.jpg"></a-plane>
            `
        });
    }

    render() {
        return html`
            <a-scene xr-mode-ui="enabled: true">
                ${this.createPlaneArray()}
                <a-sky color="#91d5f2"></a-sky>
            </a-scene>
        `;
    }
}