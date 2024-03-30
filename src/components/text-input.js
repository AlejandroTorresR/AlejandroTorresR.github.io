import { LitElement, html, css } from 'lit';
import '@material/mwc-textfield/mwc-textfield.js';
import '@material/mwc-textarea/mwc-textarea.js';
import '@material/mwc-slider/slider.js';
import '@material/mwc-icon/mwc-icon.js';
import '@material/mwc-select/mwc-select.js';
import '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-button/mwc-button.js';
import '@material/mwc-icon/mwc-icon.js';
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
      slides: {
        type: Array
      }
    }
  }

  static get styles() {
    return css`
      .container-toolbar{
        position: absolute;
        bottom: 64px;
        left: 0;
        z-index: 3;
        width: 100%;
        display: flex;
        justify-content: center;
      }
      .custom-toolbar{
        height: 48px;
        background-color: rgba(0,0,0,.9);
        border-radius: 4px;
        display: flex;
        position: inherit;
      }
      .custom-toolbar .item-toolbar{
        color: white;
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .custom-toolbar .item-toolbar:hover{
        background-color: rgba(0,0,0,.5);
      }
      mwc-select,
      mwc-textarea.rounded,
      mwc-textfield.rounded {
        --mdc-shape-small: 4px;
        background: rgba(255,255,255,.8)
      }
      .close-container{
        position: fixed;
        right: 0px;
        top: 16px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        z-index: 4;
        color: rgba(0,0,0,.38);;
      }
      .mwc-slider-container{
        position: relative;
        background: rgba(255,255,255,.8);
        border-radius: 4px;
        border: solid 1px rgba(0,0,0,.38);
      }
      .mwc-slider-container label{
        font-size: 11px;
        background-color: rgba(255, 255, 255, .95);
        padding: 4px 4px 0 4px;
        color: rgba(0, 0, 0, .8);
        border-radius: 4px;
        position: absolute;
        top: -12px;
        left: 10px;
      }
      .hidden{ display: none;}
      .text-center{ text-align: center; }
      .w-100{ width: 100%; }
      .p-relative{ position: relative; }
      .p-absolute{ position: absolute; }
      .z-2 { z-index: 2; }
      .z-3 { z-index: 3; }
      .d-block{ display: block; }
      .d-flex{ display: flex; }
      .center-img{
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
      }
      .content-center{ justify-content: center; align-items: center; }
      .content-start{ justify-content: start; align-items: center; }
      .content-end{ justify-content: end; align-items: center; }
      .ml{ margin-left: 4px;}
      .mr{ margin-right: 4px;}
      .mb-16{ margin-bottom: 16px;}
      .mb-32{ margin-bottom: 32px;}
      .mt-16{ margin-top: 16px;}
      .mt-32{ margin-top: 32px;}
      .wrapper{
          background: rgba(255,255,255,.9);
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
          transition: all .3s ease-in;
      }
      .length{
          width: 100%;
          text-align: right;
          font-size: .8rem;
          margin: 8px 0 16px 0;
          opacity: .8;
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
      .item:target{
        color: white;
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
    this.swiperOptions = {
      centeredSlides: 'true',
      initialSlide: 0,
      loop: false,
      slidesPerView: 4,
      spaceBetween: 10,
      grabCursor: true,
    };
    this.notLevel = false;
    this.spells = [
      'Normal',
      'Quick-Play',
      'Continuous',
      'Ritual',
      'Field',
      'Equip',
    ]
    this.traps = [
      'Normal',
      'Continuous',
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
    this.slides = [
      'dark',
      'earth',
      'fire',
      'divine',
      'light',
      'water',
      'wind',
    ]
    this.extraInfo = {
      url: './assets/filters/',
      extension: '.svg'
    }
  }
  closeInput() {
    this.show = false;
  }
  submitInput() {
    this.show = false;
    this.dispatchCustomEvent('checkinput', this.params);
  }
  openInput() {
    this.show = true;
    this.checkLevel();
    this.requestUpdate();
    setTimeout(() => {
      this.getClearInput('name');
      this.getClearInput('atk');
      this.getClearInput('def');
    }, 500);
  }
  checkLevel() {
    this.notLevel = ['link', 'spell', 'trap'].includes(this.params.frameType) ? true : false;
    if (['spell', 'trap'].includes(this.params.frameType)) this.params.race = 'Normal';
  }
  openFile() {
    let img = this.shadowRoot.getElementById('img');
    img.click();
  }
  openCrop(e) {
    if (e.target.files[0] && e.target.files[0].size) {
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
  getClearInput(name) {
    let input = this.shadowRoot.getElementById(name).shadowRoot.querySelector('i');
    input.style = 'pointer-events: unset; cursor: pointer';
    input.addEventListener('click', (e) => {
      this.params[name] = '';
      this.requestUpdate();
    });
  }
  dispatchCustomEvent(event, detail) {
    const options = {
      detail: detail,
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent(event, options));
  }

  setEventTemplate(ev) {
    this.params.attribute = ev.detail[0].toUpperCase();
    this.requestUpdate();
  }

  saveCanvas(){
    this.dispatchCustomEvent('savecanvas', {})
  }

  render() {
    return this.show ? html`
    <div class="close-container" @click="${this.closeInput}">
      <mwc-icon>close</mwc-icon>
    </div>
    <div class="wrapper d-flex z-3">
        <div class="container">

          <custom-swiper
            class="mb-32 ${this.notLevel ? 'hidden' : 'd-block'}" isSquare
            .selected="${this.params.attribute}"
            @bgtemplate="${this.setEventTemplate}"
            .slides="${this.slides}" 
            .swiperOptions="${this.swiperOptions}"
            .extraInfo="${this.extraInfo}">
          </custom-swiper>

          <div class="mwc-slider-container ${this.notLevel ? 'hidden' : ''}">
            <label>Level</label>
            <mwc-slider
                @input="${(ev) => this.checkInput(ev, 'level')}"
                discrete
                step="1"
                min="1"
                max="12"
                value="${this.params.level}">
            </mwc-slider>
          </div>
          <div class="length ${this.notLevel ? 'hidden' : ''}">${this.params.level}/12</div>

          <mwc-textfield 
            @input="${(ev) => this.checkInput(ev, 'name')}" 
            class="w-100 rounded" label="Title" maxLength="30"
            iconTrailing="close" id="name" outlined
            value="${this.params.name}">
          </mwc-textfield>
          <div class="length">${this.params.name.length}/30</div>

          <mwc-textarea @input="${(ev) => this.checkInput(ev, 'desc')}"
              class="w-100 rounded" outlined
              label="Description"
              value="${this.params.desc}"
              maxLength="350">
          </mwc-textarea>
          <div class="length">${this.params.desc.length}/350</div>

          <mwc-select label="Race" outlined class="w-100 mb-16 ${this.params.frameType === 'spell' || this.params.frameType === 'trap' ? 'hidden' : ''}">
            ${this.race.map(item => html`
              <mwc-list-item .selected="${item === this.params.race}" value="${item}" @click="${(ev) => this.checkInput(ev, 'race')}">${item}</mwc-list-item>
            `)}
          </mwc-select>

          <mwc-select label="Type" outlined class="w-100 mb-16 ${this.params.frameType === 'spell' ? '' : 'hidden'}">
            ${this.spells.map(item => html`
              <mwc-list-item .selected="${item === this.params.race}" value="${item}" @click="${(ev) => this.checkInput(ev, 'race')}">${item}</mwc-list-item>
            `)}
          </mwc-select>

          <mwc-select label="Type" outlined class="w-100 mb-16 ${this.params.frameType === 'trap' ? '' : 'hidden'}">
            ${this.traps.map(item => html`
              <mwc-list-item .selected="${item === this.params.race}" value="${item}" @click="${(ev) => this.checkInput(ev, 'race')}">${item}</mwc-list-item>
            `)}
          </mwc-select>

          <div class="${this.notLevel ? 'hidden' : 'd-flex'}">
            <mwc-textfield 
              @input="${(ev) => this.checkInput(ev, 'atk')}" 
              class="w-100 mr rounded" label="Attack" type="tel"
              iconTrailing="close" id="atk" outlined
              maxLength="4" value="${this.params.atk}">
            </mwc-textfield>
            <mwc-textfield 
              @input="${(ev) => this.checkInput(ev, 'def')}" 
              class="w-100 ml rounded" label="Defense" type="tel"
              iconTrailing="close" id="def" outlined
              maxLength="4" value="${this.params.def}">
            </mwc-textfield>
          </div>

          <mwc-button class="w-100 mb-32 mt-16" raised label="Confirm" @click="${this.submitInput}"></mwc-button>
        </div>
    </div>
    ` : html`
    <div class="container-toolbar">
      <div class="custom-toolbar">
        <div class="item-toolbar" @click="${this.openInput}">
          <mwc-icon>edit</mwc-icon>
        </div>
        <div class="item-toolbar" @click="${this.openFile}">
          <mwc-icon>image</mwc-icon>
        </div>
        <div class="item-toolbar" @click="${this.saveCanvas}">
          <mwc-icon>save</mwc-icon>
        </div>
      </div>
    </div>

    <input id="img" class="hidden" type="file" #banner @change="${this.openCrop}" accept="image/jpeg, image/jpg, image/png" />
    <!-- <div class="d-flex content-center p-relative z-3">
        <div class="item d-flex content-center" @click="${this.openInput}">
          <mwc-icon>edit</mwc-icon>
        </div>
        <div class="circle" style="animation-delay: 0s"></div>
        <div class="circle" style="animation-delay: 1s"></div>
        <div class="circle" style="animation-delay: 2s"></div>
        <div class="circle" style="animation-delay: 3s"></div>
    </div>
    <div class="center-img">
      <div class="d-flex content-center p-relative z-3">
          <div class="item d-flex content-center" @click="${this.openFile}">
            <mwc-icon>image</mwc-icon>
          </div>
          <div class="circle" style="animation-delay: 0s"></div>
          <div class="circle" style="animation-delay: 1s"></div>
          <div class="circle" style="animation-delay: 2s"></div>
          <div class="circle" style="animation-delay: 3s"></div>
      </div>
    </div> -->
    `;
  }
}
customElements.define('text-input', TextInput);