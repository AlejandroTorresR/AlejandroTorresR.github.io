import { LitElement, html, css } from 'lit-element';
import '@material/mwc-button/mwc-button.js';
import Cropper from 'cropperjs';
import cropperStyles from 'cropperjs/dist/cropper.css';

export class CustomCropper extends LitElement {

  static get styles(){
    return [cropperStyles, css`
    #cropperjs {
      display: block;
      max-width: 100%;
      min-width: 300px;
      min-height: 320px;
      max-height: 520px;
    }
    .wrapper{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      border: solid 3px #000;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: rgba(0,0,0,.9);
      z-index: 1;
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
    `];
  }

  static properties = {
    img: { type: String },
    options: { type: Array },
    cropper: { type: String },
    show: { type: Boolean },
  };

  constructor() {
    super();
    this.show = false;
    this.img = './assets/img/duelist.svg';
    this.options = {
        viewMode: 0,
        dragMode: 'crop',
        zoomable: true,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: true,
        aspectRatio: 1,
        modal: true,
        guides: true,
        highlight: false,
        wheelZoomRatio: 0.03,
        autoCropArea: 0.5,
        autoCrop: true,
    }
  }

  updated(params){
    params.forEach((oldValue, propName) => {
      if(propName === 'show' && oldValue === false) this.createCropper();
    })
  }

  createCropper(){
    const image = this.shadowRoot.getElementById('cropperjs');
    this.cropper = new Cropper(image, this.options);
  }

  submit(){
    this.cropper.crop();
    const croppedCanvas = this.cropper.getCroppedCanvas().toDataURL();
    this.show = false;
    this.dispatchCustomEvent('croppedevent', croppedCanvas);
  }

  closeInput(){
    this.show = false;
  }

  setEventCard(ev){
    this.img = ev.detail;
    this.show = true;
  }

  dispatchCustomEvent(event, detail){
    const options = {
        detail: detail,
        bubbles: true,
        composed: true,
      };
    this.dispatchEvent(new CustomEvent(event, options));
  }

  render() {
    return this.show ? html`
    <div class="wrapper">
      <div class="close-container" @click="${this.closeInput}">
        <div class="leftright"></div>
        <div class="rightleft"></div>
      </div>
      <div>
          <img id="cropperjs" src="${this.img}">
      </div>
      <mwc-button raised label="Confirm" @click="${this.submit}"></mwc-button>
    </div>
    ` : html`<div @opencrop="${this.setEventCard}"><slot></slot></div>`;
  }

}
customElements.define('custom-cropper', CustomCropper);