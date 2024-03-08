import { LitElement, html, css } from 'lit';
import 'aframe';
import 'aframe-event-set-component';
export class CustomMemorama extends LitElement {

    static get properties() {
        return {
            cards: { 
                type: Array 
            },
            deck: { 
                type: Array 
            },
            opened: {
                type: Array,
            },
            turn: {
                type: Number,
            }
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
        this.cards = ['74677422', '74677423', '74677424']
        this._init();
    }

    _init() {
        this.opened = [];
        this.turn = 0;
        this.shuffle();
    }

    _handleClick(e) {
        if(!this.opened.length || this.opened.length < 2 && this.opened[0].index !== e.target.id){
            this.opened.push({
                card: e.target.getAttribute('card'),
                id: e.target.id,
            });
            console.log(this.opened, 'opened');
        }
        if (this.opened.length === 2) {
            this._played();
        }
        console.log(e.target.id, 'ev', e.target.getAttribute('card'), e.target.id);
        let el = this.shadowRoot.getElementById(e.target.id);
        let back = this.shadowRoot.getElementById('back-' + e.target.id);
        back.setAttribute('animation', 'property: rotation; to: 0 0 0; dur: 1000; easing: linear;');
        el.setAttribute('animation', 'property: rotation; to: 0 0 0; dur: 1000; easing: linear;');
    }

    _played() {
        //this.canMove = false;
        this.turn += 1;
        if (this.opened[0].card === this.opened[1].card) {
          this._closeCards('hide');
          //this.score[this.turn % 2] += 1;
        } else {
          this._closeCards('open');
        }
    }

    _closeCards(event) {
        return new Promise(resolve => {
          setTimeout(() => {
            if(event === 'open'){
                this.shadowRoot.getElementById(this.opened[0].id).setAttribute('animation', 'property: rotation; to: 0 180 0; dur: 500; easing: linear;');
                this.shadowRoot.getElementById('back-' + this.opened[0].id).setAttribute('animation', 'property: rotation; to: 0 180 0; dur: 500; easing: linear;');
                this.shadowRoot.getElementById(this.opened[1].id).setAttribute('animation', 'property: rotation; to: 0 180 0; dur: 500; easing: linear;');
                this.shadowRoot.getElementById('back-' + this.opened[1].id).setAttribute('animation', 'property: rotation; to: 0 180 0; dur: 500; easing: linear;');
            }
            this.opened = [];
            //this.canMove = true;
            resolve();
          }, 1500);
        });
      }

    shuffle() {
        this.deck = this.cards.concat(this.cards).sort(() => Math.random() - 0.5);
        console.log(this.deck, 'deck')
    }

    createPlaneArray() {
        let x = -60, y = 35, z = -55, rotate = 200;
        return this.deck.map((card, index) => {
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
                @click="${this._handleClick}"
                id="${index}"
                card="${card}"
                position="${x} ${y} ${z}"
                width="9.5" height="14"
                side="back"
                color="#fff"
                src="./assets/card.jpg"
                rotation="0 ${rotate} 0">
            </a-plane>
            <a-plane
                id="back-${index}"
                card="${card}"
                position="${x} ${y} ${z}"
                width="9.5" height="14"
                side="front"
                color="#fff"
                src="https://images.ygoprodeck.com/images/cards/${card}.jpg"
                rotation="0 ${rotate} 0">
            </a-plane>
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