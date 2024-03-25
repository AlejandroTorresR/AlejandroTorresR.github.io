import { LitElement, html, css } from 'lit';
import '@material/mwc-textfield/mwc-textfield.js';
import '@material/mwc-textarea/mwc-textarea.js';
import '@material/mwc-slider/slider.js';
export class TextInput extends LitElement {

  static get properties() {
    return {
      params: {
        type: Array,
      },
      maxlength: {
        type: Number,
      },
      rows: {
        type: Number,
      },
      open: {
        type: Boolean
      }
    }
  }

  static get styles() {
    return css`
            .text-center{ text-align: center; }
            .w-100{ width: 100%; }
            .d-flex{ display: flex; }
            .ml{ margin-left: 4px;}
            .mr{ margin-right: 4px;}
            .wrapper{
                visibility: hidden;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: rgba(0,0,0, 0);
                width: 100%;
                height: 100vh;
                position: absolute;
                left: 0;
                top: 0;
                margin: 0;
                padding: 0;
                z-index: 1;
                transition: all .3s ease-in;
            }
            .wrapper.open{
                visibility: visible;
                background: rgba(0,0,0,.9);
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
              
              .open .close-container .leftright{
                transform: rotate(45deg);
                transition: all .2s ease-in;
              }
              .open .close-container .rightleft{
                transform: rotate(-45deg);
                transition: all .2s ease-in;
              }
              .leftright{
                height: 4px;
                width: 40px;
                position: absolute;
                margin-top: 24px;
                background-color: white;
                border-radius: 2px;
                transform: rotate(0deg);
                transition: all .3s ease-in;
              }
              
              .rightleft{
                height: 4px;
                width: 40px;
                position: absolute;
                margin-top: 24px;
                background-color: white;
                border-radius: 2px;
                transform: rotate(0deg);
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
              padding: 5px;
              width: 48px;
              height: 48px;
              position: absolute;
              cursor: pointer;
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
    this.params = {
      name: '',
      desc: '',
      atk: 0,
      def: 0,
      level: 1
    }
    this.maxlength = 30;
    this.rows = 2;
  }

  closeInput() {
    this.close = false;
    this.dispatchCustomEvent('checkinput', this.params)
    this.requestUpdate()
  }
  openInput() {
    this.close = true;
    this.requestUpdate();
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
    return html`    
        <div class="container">
            <div class="item" @click="${this.openInput}"></div>
            <div class="circle" style="animation-delay: 0s"></div>
            <div class="circle" style="animation-delay: 1s"></div>
            <div class="circle" style="animation-delay: 2s"></div>
            <div class="circle" style="animation-delay: 3s"></div>
        </div>
        <div class="wrapper d-flex ${this.close ? 'open' : ''}">
            <div class="close-container" @click="${this.closeInput}">
                <div class="leftright"></div>
                <div class="rightleft"></div>
            </div>

            <div class="container">
              <mwc-slider
                  @input="${(ev)=> this.checkInput(ev, 'level')}"
                  discrete
                  withTickMarks
                  step="1"
                  min="1"
                  max="12"
                  value="${this.params.level}">
              </mwc-slider>

              <mwc-textfield @input="${(ev)=> this.checkInput(ev, 'name')}" class="w-100" label="Card Name" maxLength="${this.maxlength}"  value="${this.params.name}"></mwc-textfield>
              <div class="length">${this.params.name.length}/${this.maxlength}</div>

              <mwc-textarea @input="${(ev)=> this.checkInput(ev, 'desc')}"
                  class="w-100"
                  label="Write a description"
                  value="${this.params.desc}"
                  maxLength="300">
              </mwc-textarea>
              <div class="length">${this.params.desc.length}/200</div>

              <div class="d-flex">
                <mwc-textfield @input="${(ev)=> this.checkInput(ev, 'atk')}" class="w-100 mr" label="Attack" type="tel" maxLength="4" value="${this.params.atk}"></mwc-textfield>
                <mwc-textfield @input="${(ev)=> this.checkInput(ev, 'def')}" class="w-100 ml" label="Defense" type="tel" maxLength="4" value="${this.params.def}"></mwc-textfield>
              </div>

              <div class="btn-check text-center" @click="${this.closeInput}">
                  <svg height="48px" width="48px" fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-171.5 -171.5 833.00 833.00" xml:space="preserve" transform="rotate(0)" stroke="#ffffff" stroke-width="3.9200000000000004"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"><rect x="-171.5" y="-171.5" width="833.00" height="833.00" rx="416.5" fill="#00cd60" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.9800000000000001"></g><g id="SVGRepo_iconCarrier"> <polygon points="452.253,28.326 197.831,394.674 29.044,256.875 0,292.469 207.253,461.674 490,54.528 "></polygon> </g></svg>
              </div>
            </div>

        </div>
        `;
  }
}
customElements.define('text-input', TextInput);