import { LitElement, html, css } from 'lit';
import { Swiper } from 'swiper';
//import { EffectCoverflow, EffectCards, EffectCube } from 'swiper/modules';

export class CustomSwiper extends LitElement {

    static properties = {
        slides: { type: Array },
        swiperEl: { type: Object },
        swiperOptions: { type: Object },
        customOpacity: { type: Boolean },
        extraInfo: { type: Object },
    };

    static get styles() {
        return [css`
    .swiper{
      overflow: hidden;
      width: 100%;
    }
    .swiper-horizontal .swiper-wrapper{
      display: inline-flex;
    }
    .swiper-slide{
      display: flex;
      width:100%;
      align-items: center;
      justify-content: center;
      opacity: 1;
      transition: 'opacity' 1s;
    }
    .swiper-slide-active.opacity{
      transition: all 1s;
      opacity: 0;
    }
    .select-bg{
        width: 320px;
        border-radius: 4px;
    }
    `,
        ];
    }

    constructor() {
        super();
        this.customOpacity = false;
    }

    firstUpdated() {
        this.createSwiper();
        this._checkIndex();
    }

    _handleClick(index) {
        this.swiperEl.slideTo(index);
    }

    getSlideDataIndex(activeIndex, slidesLen){
        if(this.swiperEl.params.loop){
            switch(activeIndex){
                case 0:
                    activeIndex = slidesLen-3;
                    break;
                case slidesLen-1:
                    activeIndex = 0;
                    break;
                default:
                    --activeIndex;
            }
        }
        return  activeIndex;
    }

    getUrlAttributes(name, params){
        return `${params.url}${name}${params.extension}`;
    }

    _checkIndex() {
        this.swiperEl.on('slideChange', (res) => {
            //console.log(this.swiperEl.realIndex, 'real');
            this.dispatchCustomEvent('bgtemplate', this.slides[res.activeIndex])
        });
    }

    dispatchCustomEvent(event, detail){
        const options = {
            detail: detail,
            bubbles: true,
            composed: true,
          };
        this.dispatchEvent(new CustomEvent(event, options));
    }

    createSwiper() {
        this.swiperEl = new Swiper( this.shadowRoot.getElementById('swiper'), this.swiperOptions );
    }

    render() {
        return html`
        <div class="swiper" id="swiper">
            <div class="swiper-wrapper">
                ${this.slides.map( (current, index) => html`
                <div class="swiper-slide  ${this.customOpacity ? 'opacity' : ''}" @click="${() => this._handleClick(index)}">
                    <img src="${this.extraInfo ? this.extraInfo.url + current + this.extraInfo.extension : current}" class="select-bg" />
                </div>`)}
            </div>
        </div>
    `;
    }
}
customElements.define('custom-swiper', CustomSwiper);