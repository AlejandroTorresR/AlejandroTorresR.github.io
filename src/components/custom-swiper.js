import { LitElement, html, css } from 'lit-element';
//import Swiper, { Mousewheel, EffectCoverflow } from 'swiper';
import { Swiper } from 'swiper';

export class CustomSwiper extends LitElement {

    static properties = {
        slides: { type: Array },
        swiperEl: { type: Object },
        swiperOptions: { type: Object },
    };

    static get styles() {
        return [css`
    :host{
      width: 100%;
      position: absolute;
      left:0;
    }
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
    }
    .swiper-slide-active{
      transition: all .5s;
      opacity: 0;
      background: rgba(0,255,0,0);
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
        //this.slides = [...Array(14)];
        this.slides = [
            'normal',
            'effect',
            'fusion',
            'xyz',
            'ritual',
            'synchro',
            'link',
            'token',
            'spell',
            'trap',
            'skill'
        ]
        this.swiperOptions = {
            //modules: [Mousewheel, EffectCoverflow],
            mousewheel: {
                forceToAxis: true,
            },
            pagination: {
                clickable: true,
            },
            centeredSlides: 'true',
            //direction: 'vertical',
            effect: 'coverflow',
            initialSlide: 0,
            loop: false,
            slidesPerView: 3,
            /* coverflowEffectRotate: '50',
            coverflowEffectStretch: '0',
            coverflowEffectDepth: '100',
            coverflowEffectModifier: '1',
            coverflowEffectSlideShadows: 'true', */
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 280,
                  },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 320,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 200,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 270,
                },
              },
        };
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
                <div class="swiper-slide" @click="${() => this._handleClick(index)}">
                    <img src="./assets/maker/bgs/${current}.png" class="select-bg" />
                </div>`)}
            </div>
        </div>
    `;
    }
}
customElements.define('custom-swiper', CustomSwiper);