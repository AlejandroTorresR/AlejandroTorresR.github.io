import { LitElement, html, css } from 'lit';
import 'aframe';
import 'aframe-event-set-component';
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

    _handleClick(e){
        console.log(e.target.id, 'ev');
        let el = this.shadowRoot.getElementById(e.target.id);
        console.log(el, 'el')
        el.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 2000; easing: linear;');
    }

    createPlaneArray() {
        let x = -60, y = 35, z = -55, rotate = 20;
        return this.cards.map((card, index) => {
            if (x === 40) {
                x = -50;
                y -= 15;
                rotate = 20;
            } else {
                x += 10
                rotate -= 5;
            }
            return html`
            <a-box 
                id="${index}"
                @click="${this._handleClick}"
                position="${x} ${y} ${z}"
                width="9.5" height="14" 
                color="#fff"
                rotation="0 ${rotate} 0" 
                src="./assets/${card}.jpg"></a-box>
            `
        });
    }

    render() {
        return html`
            <a-scene xr-mode-ui="enabled: true">
                ${this.createPlaneArray()}
                <a-sky color="#f9f9f9"></a-sky>
                <a-camera>
                  <a-cursor></a-cursor>
                </a-camera>
            </a-scene>
        `;
    }
}