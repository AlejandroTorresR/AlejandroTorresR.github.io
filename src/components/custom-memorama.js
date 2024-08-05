import { LitElement, html, css } from 'lit';
import 'aframe';
import 'aframe-event-set-component';
import mexico from '../json/mexico.json';

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
            },
            canMove: {
                type: Boolean,
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
        // this.cards = ['74677422', '74677423', '74677424']
        this._init();
    }

    _init() {
        this.cards = Object.keys(mexico);
        this.opened = [];
        this.turn = 0;
        this.canMove = true;
        this.shuffle();
    }

    _handleClick(e) {
        if(this.canMove){
            if(!this.opened.length || this.opened.length < 2 && this.opened[0].index !== e.target.id){
                this.opened.push({
                    card: e.target.getAttribute('card'),
                    id: e.target.id,
                    rotation: e.target.getAttribute('att-rotate')
                });
                console.log(this.opened, 'opened');
            }
            if (this.opened.length === 2) {
                this._played();
            }
            console.log(e.target.id, 'ev', e.target.getAttribute('card'), e.target.getAttribute('att-rotate'));
            let el = this.shadowRoot.getElementById(e.target.id);
            let back = this.shadowRoot.getElementById('back-' + e.target.id);
            back.setAttribute('animation', `property: rotation; to: 0 ${e.target.getAttribute('att-rotate') - 180} 0; dur: 1000; easing: linear;`);
            el.setAttribute('animation', `property: rotation; to: 0 ${e.target.getAttribute('att-rotate') - 180} 0; dur: 1000; easing: linear;`);
            this.canMove = false;
            setTimeout(()=> this.canMove = true, 2000)
        }
    }

    _played() {
        this.canMove = false;
        this.turn += 1;
        if (this.opened[0].card === this.opened[1].card) {
          this._closeCards('hide');
        } else {
          this._closeCards('open');
        }
    }

    _closeCards(event) {
        return new Promise(resolve => {
          setTimeout(() => {
            if(event === 'open'){
                this.shadowRoot.getElementById(this.opened[0].id).setAttribute('animation', `property: rotation; to: 0 ${this.opened[0].rotation} 0; dur: 500; easing: linear;`);
                this.shadowRoot.getElementById('back-' + this.opened[0].id).setAttribute('animation', `property: rotation; to: 0 ${this.opened[0].rotation} 0; dur: 500; easing: linear;`);
                this.shadowRoot.getElementById(this.opened[1].id).setAttribute('animation', `property: rotation; to: 0 ${this.opened[1].rotation} 0; dur: 500; easing: linear;`);
                this.shadowRoot.getElementById('back-' + this.opened[1].id).setAttribute('animation', `property: rotation; to: 0 ${this.opened[1].rotation} 0; dur: 500; easing: linear;`);
            }
            this.opened = [];
            setTimeout(()=> this.canMove = true, 1100)
            resolve();
          }, 1500);
        });
      }

    shuffle() {
        this.deck = this.cards.concat(this.cards).sort(() => Math.random() - 0.5);
    }

    createPlaneArray() {
        let x = -120, y = 35, z = -60, rotate = 240;
        return this.deck.map((card, index) => {            
            if (x === 100) {
                x = -100; // reset horizontal
                y -= 22; // baja vertical
                z = -60; //profundidad
                rotate = 230; // reset rotacion
            } else {
                x += 20; 
                rotate -= 10;
            }
            x >= 10 ? z += 10 : z -= 10;
            return html`
            <a-plane 
                @click="${this._handleClick}"
                id="${index}"
                card="${card}"
                position="${x} ${y} ${z}"
                width="20" height="20"
                side="back"
                color="#000"
                att-rotate="${rotate}"
                rotation="0 ${rotate} 0">
            </a-plane>
            <a-plane
                id="back-${index}"
                card="${card}"
                position="${x} ${y} ${z}"
                width="20" height="20"
                side="front"
                color="#fff"
                text="value: ${mexico[card][0]}; width:40; align:center;"
                src="./assets/mx/${card}.svg"
                rotation="0 ${rotate} 0">
            </a-plane>
            `
        });
    }

    async createAssets(){
        return html`
            <a-assets>
                <img src="./assets/card.jpg" id="bg-card" />
            </a-assets>
        `;
    }

    async createSky(){
        return html`
            <a-sky color="#f9f9f9"></a-sky>
        `;
    }

    render() {
        return html`
            <a-scene xr-mode-ui="enabled: true">
                ${this.createPlaneArray()}
                <!-- <a-camera>
                  <a-cursor></a-cursor>
                </a-camera> -->
                <a-camera look-controls="magicWindowTrackingEnabled: false, mouseEnabled: false, touchEnabled: false">
                    <a-entity laser-controls="hand: left"></a-entity>
                    <a-entity laser-controls="hand: right"></a-entity>
                </a-camera>
                <a-sky color="#ECECEC"></a-sky>
            </a-scene>
        `;
    }
}
customElements.define('custom-memorama', CustomMemorama);