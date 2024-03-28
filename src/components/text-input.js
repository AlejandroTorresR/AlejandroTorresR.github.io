import { LitElement, html, css } from 'lit';
import '@material/mwc-textfield/mwc-textfield.js';
import '@material/mwc-textarea/mwc-textarea.js';
import '@material/mwc-slider/slider.js';
import '@material/mwc-icon/mwc-icon.js';
import '@material/mwc-select/mwc-select.js';
import '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-button/mwc-button.js';
export class TextInput extends LitElement {

  static get properties() {
    return {
      params: {
        type: Object,
      },
      show: {
        type: Boolean,
      },
      myImage: {
        type: Object,
      },
      race: {
        type: Array
      },
      attribute: {
        type: Array
      },
      notLevel: {
        type: Boolean
      },
    }
  }

  static get styles() {
    return css`
            .hidden{ display: none;}
            .text-center{ text-align: center; }
            .w-100{ width: 100%; }
            .p-relative{ position: relative; }
            .p-absolute{ position: absolute; }
            .z-2 { z-index: 2; }
            .d-flex{ display: flex; }
            .content-center{ justify-content: center; align-items: center; }
            .content-start{ justify-content: start; align-items: center; }
            .content-end{ justify-content: end; align-items: center; }
            .ml{ margin-left: 4px;}
            .mr{ margin-right: 4px;}
            .mb-16{ margin-bottom: 16px;}
            .wrapper{
                background: rgba(0,0,0,.9);
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100vh;
                position: absolute;
                left: 0;
                top: 0;
                margin: 0;
                padding: 0;
                z-index: 2;
                transition: all .3s ease-in;
            }
            .length{
                color: white;
                width: 100%;
                text-align: right;
                font-size: .8rem;
                margin: 8px 0 16px 0;
                opacity: .5;
            }
            .close-container{
                position: fixed;
                right: 16px;
                top: 16px;
                width: 40px;
                height: 40px;
                cursor: pointer;
                z-index: 2;
              }
              .leftright{
                height: 4px;
                width: 40px;
                position: absolute;
                margin-top: 24px;
                background-color: white;
                border-radius: 2px;
                transform: rotate(45deg);
                transition: all .3s ease-in;
              }
              .rightleft{
                height: 4px;
                width: 40px;
                position: absolute;
                margin-top: 24px;
                background-color: white;
                border-radius: 2px;
                transform: rotate(-45deg);
                transition: all .3s ease-in;
              }
              .btn-check svg{
                cursor: pointer;
                margin: 16px auto;
              }
              .container{
                width: 100%;
                max-width: 340px;
                position: relative;
            }

            .show{
              display: flex;
              visibility: visible;
            }
            .circle {
              border-radius: 50%;
              background-color: deepskyblue;
              width: 50px;
              height: 50px;
              position: absolute;
              opacity: 0;
              animation: scaleIn 4s infinite cubic-bezier(.36, .11, .89, .32);
            }
            .item {
              z-index: 1;
              width: 48px;
              height: 48px;
              position: absolute;
              cursor: pointer;
              color: white;
            }
            .item img {
              width: 50px;
            }
            @keyframes scaleIn {
              from {
                transform: scale(.5, .5);
                opacity: .5;
              }
              to {
                transform: scale(2.5, 2.5);
                opacity: 0;
              }
            }
        `;
  }

  constructor() {
    super();
    this.notLevel = false;
    this.params = {
      attribute: '',
      name: '',
      desc: '',
      race: '',
      atk: 0,
      def: 0,
      level: 1,
      frameType: ''
    }
    this.spells = [
      'Normal',
			'Quick-Play',
			'Continuous',
			'Ritual',
			'Field',
			'Equip',
			'Counter',
    ]
    this.race = [
			'Aqua',
			'Beast',
			'Beast-Warrior',
			'Creator-God',
			'Cyberse',
			'Dinosaur',
			'Divine-Beast',
			'Dragon',
			'Fairy',
			'Fiend',
			'Fish',
			'Insect',
			'Machine',
			'Plant',
			'Psychic',
			'Pyro',
			'Reptile',
			'Rock',
			'Sea Serpent',
			'Spellcaster',
			'Thunder',
			'Warrior',
			'Winged Beast', 
			'Wyrm', 
			'Zombie',
		]
		this.attribute = [
      'dark',
      'earth',
      'fire',
      'divine',
      'light',
      'water',
      'wind',
		]
  }

  closeInput() {
    this.show = false;
    this.dispatchCustomEvent('checkinput', this.params)
    this.requestUpdate()
  }
  openInput() {
    this.show = true;
    this.checkLevel();
    this.requestUpdate();
  }
  checkLevel(){
    this.notLevel = ['link', 'spell', 'trap'].includes(this.params.frameType) ? true : false;
    if(['spell', 'trap'].includes(this.params.frameType)) this.params.race = 'Normal';
  }
  openFile(){
    let img = this.shadowRoot.getElementById('img');
    img.click();
  }
  openCrop(e){
    if(e.target.files[0] && e.target.files[0].size){
      let reader = new FileReader;
      reader.onload = (ev) => {
        this.myImage = ev.target.result;
        this.dispatchCustomEvent('opencrop', ev.target.result);
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  checkInput(ev, name) {
    this.params[name] = ev.target.value;
    this.requestUpdate();
  }
  dispatchCustomEvent(event, detail) {
    const options = {
      detail: detail,
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent(event, options));
  }

  render() {
    return this.show ? html`
    <div class="wrapper d-flex">
        <div class="close-container" @click="${this.closeInput}">
            <div class="leftright"></div>
            <div class="rightleft"></div>
        </div>

        <div class="container">
          <mwc-textfield @input="${(ev)=> this.checkInput(ev, 'name')}" class="w-100" label="Title" maxLength="30"  value="${this.params.name}"></mwc-textfield>
          <div class="length">${this.params.name.length}/30</div>

          <mwc-slider
              @input="${(ev)=> this.checkInput(ev, 'level')}"
              class="mb-16 ${this.notLevel ? 'hidden' : ''}"
              discrete
              withTickMarks
              step="1"
              min="1"
              max="12"
              value="${this.params.level}">
          </mwc-slider>

          <mwc-textarea @input="${(ev)=> this.checkInput(ev, 'desc')}"
              class="w-100"
              label="Description"
              value="${this.params.desc}"
              maxLength="350">
          </mwc-textarea>
          <div class="length">${this.params.desc.length}/350</div>

          <mwc-select label="Race" class="w-100 mb-16 ${this.params.frameType === 'spell' || this.params.frameType === 'trap' ? 'hidden' : ''}">
            ${this.race.map(item => html`
              <mwc-list-item .selected="${item === this.params.race}" value="${item}" @click="${(ev)=> this.checkInput(ev, 'race')}">${item}</mwc-list-item>
            `)}
          </mwc-select>

          <mwc-select label="Type" class="w-100 mb-16 ${this.params.frameType === 'spell' ? '' : 'hidden'}">
            ${this.spells.map(item => html`
              <mwc-list-item .selected="${item === this.params.race}" value="${item}" @click="${(ev)=> this.checkInput(ev, 'race')}">${item}</mwc-list-item>
            `)}
          </mwc-select>

          <div class="d-flex mb-16">
            <mwc-textfield @input="${(ev)=> this.checkInput(ev, 'atk')}" class="w-100 mr" label="Attack" type="tel" maxLength="4" value="${this.params.atk}"></mwc-textfield>
            <mwc-textfield @input="${(ev)=> this.checkInput(ev, 'def')}" class="w-100 ml" label="Defense" type="tel" maxLength="4" value="${this.params.def}"></mwc-textfield>
          </div>

          <mwc-button class="w-100" raised label="Confirm" @click="${this.closeInput}"></mwc-button>
        </div>
    </div>
    ` : html`
    <input id="img" class="hidden" type="file" #banner @change="${this.openCrop}" accept="image/jpeg, image/jpg, image/png" />
    <div class="d-flex content-end p-relative z-2">
        <div class="item d-flex content-center" @click="${this.openFile}">
          <mwc-icon>image</mwc-icon>
        </div>
        <div class="circle" style="animation-delay: 0s"></div>
        <div class="circle" style="animation-delay: 1s"></div>
        <div class="circle" style="animation-delay: 2s"></div>
        <div class="circle" style="animation-delay: 3s"></div>
    </div>
    <div class="d-flex content-start p-relative z-2">
        <div class="item d-flex content-center" @click="${this.openInput}">
          <mwc-icon>edit</mwc-icon>
        </div>
        <div class="circle" style="animation-delay: 0s"></div>
        <div class="circle" style="animation-delay: 1s"></div>
        <div class="circle" style="animation-delay: 2s"></div>
        <div class="circle" style="animation-delay: 3s"></div>
    </div>
    `;
  }
}
customElements.define('text-input', TextInput);