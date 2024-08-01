import { LitElement, html, css } from 'lit-element';
import '@material/mwc-fab/mwc-fab.js';
import '@material/mwc-icon/mwc-icon.js';

class CardStore extends LitElement {

    static get styles() {
        return [css`
        .checkbox{
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #dadada;
            box-shadow: 0 0 5px #000;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 6px;
            top: 6px;
        }
        .checkbox.active{
            background: #4CAF50;
            color: white;
        }
        .checkbox mwc-icon{
            font-size: 16px;
        }
        .mwc-fab-white {
            --mdc-theme-secondary: white;
            --mdc-theme-on-secondary: black;
        }
        .mwc-fab-red {
            --mdc-theme-secondary: rgb(205,0,0);
            --mdc-theme-on-secondary: white;
        }
        .handle-cont{
            position: absolute;
            display: flex;
            width: 100%;
            height: 100%;
            cursor: pointer;
            z-index: 1;
        }
        .edit:hover .edit-cont{
            opacity: 1;
            transform: scale(1,1);
            transition: opacity .5s;
        }
        .edit-cont{
            opacity: 0;
            transform: scale(0,0);
            background: rgba(0,0,0,.8);
            border-radius: 4px;
            position: absolute;
            display: flex;
            width: 100%;
            height: 100%;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            z-index: 2;
        }
        .custom-fab{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: yellow;
            border: none;
            cursor: pointer;
            margin: -10px auto 8px auto;
            position: relative;
        }
        .custom-fab.small{
            width: 16px;
            height: 16px;
            position: absolute;
            cursor: default;
            right: 8px;
            top: 8px;
            margin: 0;
        }
        .main-square{
            position: relative;
            border-radius: 4px;
            background: linear-gradient(180deg, rgba(19,40,108,1) 50%, var(--ion-color-primary) 100%);
            text-align: center;
            font-family: Roboto;
            max-width: 160px;
            width: 100%;
            box-sizing: border-box;
            box-shadow: 0 0 3px var(--ion-color-primary);
            margin: 8px;
        }
        .main-square .prod-cont{
            width: 100%;
            height: 120px;
            border-radius: 4px 4px 0 0;
            margin-bottom: 28px;
            overflow: hidden;
        }
        .prod-cont img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .title{
            margin: 8px;
            min-height: 40px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: var(--white100);
            font-weight: 500;
        }
        .text-prod{
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-bottom: 16px;
            height: 66px;
        }
        .price{
            background: var(--white100);
            color: var(--ion-color-primary);
            border-radius: 32px;
            font-weight: bold;
            min-width: 50%;
            height: 38px;
            transform: translate(-50%, -50px);
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            padding: 0 8px;
            left: 50%;
        }
        .currency{
            color: var(--white100);
            position: absolute;
            top: 65%;
            z-index: 1;
            left: 50%;
            transform: translateX(-50%) scale(.6);
            font-weight: bold;
            background: rgb(36 80 175);
        }
        .chip{
            padding: 6px;
            border-radius: 4px;
        }
        .w-100{ width: 100%; }
        .hidden{ display: none; }
        `]
    }

    static get properties() {
        return {
            data: { type: Object },
            path: {type: String},
            // Diferent types: select, edit, click
            clickType: { type: String },
        };
      }
    
      constructor() {
        super();
        this.active = false;
        this.clickType = '';
        this.path = 'https://images.ygoprodeck.com/images/cards_small';
      }

      _handleClick(key){
        switch (key) {
            case 'edit':
                this.dispatchCustomEvent('edit-item', this.data);
                break;
            case 'remove':
                this.dispatchCustomEvent('remove-item', this.data);
                break;
            default:
                this.dispatchCustomEvent('handle-item', this.data);
                break;
        }
      }

      _selectClick(){
        this.active = !this.active;
        this.dispatchCustomEvent('selected-item', this.data);
        this.requestUpdate();
      }

      ImgError(source) {
        return source.target.src = 'assets/img/card.jpg';
      }
      
      getTypeImage(){
        let img;
        if(this.data?.thumbnail) {
            img = this.data?.thumbnail;
        } else {
            img = this.data?.type === 'card' ? `${this.path}/${this.data?.artId}.jpg` : this.data?.photoURL;
        }
        return html`
            <img src="${img}" @error="${this.ImgError}">
        `
      }

      dispatchCustomEvent(event, detail) {
        const options = {
          detail: detail,
          bubbles: true,
          composed: true,
        };
        this.dispatchEvent(new CustomEvent(event, options));
      }

      render(){
        return html`
        <div class="main-square ${this.clickType === 'edit' ? 'edit' : ''}">
            <div class="edit-cont ${this.clickType === 'edit' ? '' : 'hidden'}">
                <mwc-fab class="mwc-fab-white" @click="${() => this._handleClick('edit')}">
                    <mwc-icon slot="icon">edit</mwc-icon>
                </mwc-fab>
                <mwc-fab class="mwc-fab-red" @click="${() => this._handleClick('remove')}">
                    <mwc-icon slot="icon">delete</mwc-icon>
                </mwc-fab>
            </div>
            
            <label for="cbox" class="handle-cont ${this.clickType === 'select' ? '' : 'hidden'}">
                <input type="checkbox" id="cbox" @input="${this._selectClick}" class="hidden" />
                <div class="checkbox ${this.active ? 'active' : ''}">
                    <mwc-icon slot="icon" class="${this.active ? '' : 'hidden'}">check</mwc-icon>
                </div>
            </label>
            <div class="handle-cont ${this.clickType === 'click' ? '' : 'hidden'}" @click="${() => this._handleClick('click')}"></div>
            <div class="custom-fab ${this.data.permalink ? 'small' : 'hidden'}">
                <img src="./assets/img/ml_icon.png" alt="" class="w-100" />
            </div>
            <div class="prod-cont">
                ${this.getTypeImage()}
            </div>
            <div class="currency chip">${this.data?.currency_id || this.data?.currency}</div>            
            <div class="price mx-auto">$${this.data?.price}</div>
            <div class="title">${this.data?.title}</div>
        </div>
        `;
      }

}

customElements.define('card-store', CardStore);
