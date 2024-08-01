import { LitElement, html, css } from 'lit-element';
import '@material/mwc-textfield/mwc-textfield.js';
import '@material/mwc-button/mwc-button.js';
//import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import axios from 'axios';

class ProductInfo extends LitElement {

  static get styles() {
    return [css`
    .d-flex{
      display: flex;
    }
    .flex-wrap{
      flex-wrap: wrap;
    }
    .space-around{
      justify-content: space-around;
    }
    .white-cont{
      background: white;
      padding: 8px;
      border-radius: 4px;
    }
    .wrapper{
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100vh;
      max-width: 300px;
      margin: 0 auto;
    }
    .close-container{
      position: absolute;
      right: 0px;
      top: 16px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      z-index: 4;
      color: white;
    }
    .p-relative{
      position: relative;
      height: 48px;
    }
    .w-100{
      width: 100%;
    }
    .ml{ margin-left: 4px;}
    .mr{ margin-right: 4px;}
    .mb-16{ margin-bottom: 16px;}
    .mb-32{ margin-bottom: 32px;}
    .mt-16{ margin-top: 16px;}
    .mt-32{ margin-top: 32px;}
    .empty{
      color: white;
      text-align: center;
    }
    `]
  }

  static get properties() {
    return {
      products: { type: Array },
      show: { type: Boolean },
      name: { type: String },
      selected: { type: Array }
    };
  }

  constructor() {
    super();
    this.name = 'otyk-card-trader';
    this.show = false;
    this.products = [];
    this.selected = [];
  }

  closeList() {
    this.show = false;
    this.name = '';
    setTimeout(() => {
      this.getClearInput('name');
    }, 500);
  }
  checkInput(ev, name) {
    this[name] = ev.target.value;
    this.requestUpdate();
  }
  submitInput() {
    this.show = true;
    this.getMercadoLibre();
  }

  async getMercadoLibre(){
    try {
      const response = await axios.get(`https://api.mercadolibre.com/sites/MLM/search?nickname=${this.name}`);
      this.products = response.data.results;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  itemClicked(e){
    window.open(e.detail.permalink, '_blank');
  }
  itemSelected(e){
    let exist = this.selected.find((item) => item.id === e.detail.id );
    if(!exist) {
      this.selected.push(e.detail)
    } else {
      let index = this.selected.findIndex(item => item.id === e.detail.id);
      this.selected.splice(index, 1);
    }
  }

  getProducts(){
    return this.products.length ? html`
      <div class="d-flex flex-wrap space-around">
        ${this.products.map(product => html`
          <card-store @handle-item="${this.itemClicked}"
                      @selected-item="${this.itemSelected}"
                      clickType="edit"
                      .data="${product}"></card-store>
        `)}
      </div>
    ` : html`<h1 class="empty">No hay productos</h1>`
  }

  getClearInput(name) {
    let input = this.shadowRoot.getElementById(name).shadowRoot.querySelector('i');
    input.style = 'pointer-events: unset; cursor: pointer';
    input.addEventListener('click', (e) => {
      this[name] = '';
      this.requestUpdate();
    });
  }

  async connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      this.getClearInput('name');
    }, 500);
  }

  render() {
    return this.show ? html`
      <div class="p-relative">
        <div class="close-container" @click="${this.closeList}">
          <mwc-icon>close</mwc-icon>
        </div>
      </div>
      ${this.getProducts()}
    ` : html`
      <div class="wrapper">
        <div class="white-cont">
          <mwc-textfield 
              @input="${(ev) => this.checkInput(ev, 'name')}" 
              class="w-100 rounded" label="Name" maxLength="30"
              iconTrailing="close" id="name" outlined
              value="${this.name}">
          </mwc-textfield>
          <mwc-button class="w-100 mt-16" raised label="Search" @click="${this.submitInput}" .disabled="${!this.name}"></mwc-button>
        </div>
      </div>
    `;
  }
}

customElements.define('product-info', ProductInfo);
