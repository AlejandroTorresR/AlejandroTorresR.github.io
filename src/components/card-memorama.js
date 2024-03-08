import { LitElement, css, html } from 'lit-element';
import 'aframe';
import 'aframe-event-set-component';

export class Card extends LitElement {
    static get styles() {
        return css`
      .card {
        border-radius: 8px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        font-size: 4rem;
        margin: 8px;
        cursor: pointer;
        background: #fff;
        box-shadow: 0px 0px 15px #888888;
      }
      .transparent {
        opacity: 0;
      }
      .card.hide {
        display: none;
      }
    `;
    }

    static get properties() {
        return {
            card: {
                type: String,
            },
            index: {
                type: Number,
            },
            position: {
                type: String,
            },
            rotate: {
                type: String,
            },
            open: {
                type: Boolean,
            },
            hide: {
                type: Boolean,
            },
        };
    }

    constructor() {
        super();
        this.card = '';
        this.index = '';
        this.position = '0 0 0';
        this.rotate = '0 0 0';
        this.open = false;
        this.hide = false;
    }

    _handleClick(e) {
        console.log(e.target.id, 'ev');
        let el = this.shadowRoot.getElementById(e.target.id);
        let back = this.shadowRoot.getElementById('back-' + e.target.id);
        back.setAttribute('animation', 'property: rotation; to: 0 180 0; dur: 1000; easing: linear;');
        el.setAttribute('animation', 'property: rotation; to: 0 180 0; dur: 1000; easing: linear;');
    }

    firstUpdated() {
        this.addEventListener('hide', () => {
            this.hide = true;
        });
        this.addEventListener('open', () => {
            this.open = !this.open;
        });
        this.addEventListener('reset', () => {
            this.hide = false;
            this.open = false;
        });
    }

    render() {
        return html`
      <!-- <div class="card ${this.hide ? 'hide' : ''}">
        <span class="${this.open ? '' : 'transparent'}">${this.icon}</span>
      </div> -->

      <a-plane 
            id="back-${this.index}"
            position="${this.position}"
            width="9.5" height="14"
            side="back"
            color="#fff"
            src="./assets/${this.card}.jpg"
            rotation="${this.rotate}">
        </a-plane>
        <a-plane
            id="${this.index}"
            @click="${this._handleClick}"
            position="${this.position}"
            width="9.5" height="14"
            side="front"
            color="#fff"
            src="./assets/card.jpg"
            rotation="${this.rotate}">
        </a-plane>
    `;
    }
}
