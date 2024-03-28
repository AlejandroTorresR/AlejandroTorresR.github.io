import { LitElement, html, css } from 'lit-element';
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
        autoCropArea: 0.1,
        wheelZoomRatio: 0.03,
        autoCrop: false,
    }
  }

  firstUpdated(){
    //this.createCropper();
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
      <div>
          <img id="cropperjs" src="${this.img}">
      </div>
      <button @click="${this.submit}">Confirm</button>
    </div>
    ` : html`<div @opencrop="${this.setEventCard}"><slot></slot></div>`;
  }

}
customElements.define('custom-cropper', CustomCropper);