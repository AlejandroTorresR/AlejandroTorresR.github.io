import { LitElement, html, css } from 'lit';

export class TextInput extends LitElement {

    static get properties() {
        return {
            text: {
                type: String,
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
            .wrapper{
                display: none;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: rgba(0,0,0,.9);
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                margin: 0;
                padding: 0;
                z-index: 1;
            }
            .wrapper.open{
                display: flex;
            }
            textarea{
                width: 100%;
                max-width: 320px;
                max-height: 280px;
                border-radius: 4px;
                padding: 8px;
                resize: none;
                font-size: 1.3rem;
                border: none;
            }
            .length{
                color: white;
                width: 100%;
                max-width: 320px;
                text-align: right;
                font-size: .8rem;
                margin-top: 8px;
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
              .btn-check{
                cursor: pointer;
                margin: 8px;
              }
        `;
    }

    constructor() {
        super();
        this.text = '';
        this.maxlength = 30;
        this.rows = 2;
        this.close = true;
    }

    closeInput(){
        console.log('close')
        this.close = false;
        this.requestUpdate()
    }

    checkInput(ev){
        this.text = ev.target.value;
    }

    render() {
        return html`        
        <div class="wrapper ${this.close ? 'open' : ''}">
            <div class="close-container" @click="${this.closeInput}">
                <div class="leftright"></div>
                <div class="rightleft"></div>
            </div>
            <textarea name="textarea" 
                @input="${this.checkInput}"
                rows="${this.rows}" 
                placeholder="..."
                maxlength="${this.maxlength}">${this.text}</textarea>
            <div class="length">${this.text.length}/${this.maxlength}</div>

            <div class="btn-check" @click="${this.closeInput}">
                <svg height="48px" width="48px" fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-171.5 -171.5 833.00 833.00" xml:space="preserve" transform="rotate(0)" stroke="#ffffff" stroke-width="3.9200000000000004"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"><rect x="-171.5" y="-171.5" width="833.00" height="833.00" rx="416.5" fill="#00cd60" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.9800000000000001"></g><g id="SVGRepo_iconCarrier"> <polygon points="452.253,28.326 197.831,394.674 29.044,256.875 0,292.469 207.253,461.674 490,54.528 "></polygon> </g></svg>
            </div>
        </div>
        `;
    }
}
customElements.define('text-input', TextInput);