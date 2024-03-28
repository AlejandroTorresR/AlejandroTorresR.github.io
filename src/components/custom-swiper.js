import { LitElement, html, css } from 'lit';
import { Swiper } from 'swiper';
import { EffectCoverflow, EffectCards, EffectCube } from 'swiper/modules';
import 'swiper/css';

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
      transition: all 1s;
    }
    .swiper-slide-active{
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
            modules: [EffectCoverflow, EffectCards, EffectCube],
            centeredSlides: 'true',
            //direction: 'vertical',
            //effect: 'cube',
            coverflowEffect: {
                rotate: 50, // Slide rotate in degrees
                stretch: 0, // Stretch space between slides (in px)
                depth: 100, // Depth offset in px (slides translate in Z axis)
                modifier: 0, // Effect multipler
                slideShadows : true, // Enables slides shadows
            },
            initialSlide: 0,
            loop: false,
            slidesPerView: 3,
            grabCursor: true,
            keyboard: true,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 200,
                  },
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