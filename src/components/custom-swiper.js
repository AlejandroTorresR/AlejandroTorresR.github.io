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
        isAllone: { type: Boolean },
        isSquare: { type: Boolean },
        selected: { type: String },
        offsetArray: { type: Array },
    };

    static get styles() {
        return [css`
            .swiper{
                overflow: hidden;
                width: 100%;
                z-index: 2;
            }
            .swiper-horizontal .swiper-wrapper{
                display: inline-flex;
            }
            .swiper-slide{
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 1;
                transition: opacity 1s;
            }
            .swiper-slide-active.square{
                border: solid 1px #6200ee;
                background-color: rgba(255,255,255.8);
                padding: 8px;
                border-radius: 4px;
            }
            .swiper-slide-active.opacity{
                transition: all 1s;
                opacity: 0;
            }
            .select-bg{
                max-width: 320px;
                border-radius: 4px;
            }
            #swiper2{
                position: absolute;
                top: 1%;
            }
            .select-bg2{
                max-width: 56px;
                border-radius: 4px;
            }
            .hidden{
                display: none;
            }
            `,
        ];
    }

    constructor() {
        super();
        this.swiperOptions = {};
        this.extraInfo = {};
        this.customOpacity = false;
        this.isAllone = false;
        this.selected = '';

        this.swiperOptions2 = {
            initialSlide: 0,
            loop: false,
            slidesPerView: 5,
            freeMode: true,
            watchSlidesProgress: true,
        };
    }

    firstUpdated() {
        this.createSwiper();
        this._checkIndex();
        if(this.selected) {
            let index = this.slides.indexOf(this.selected.toLowerCase());
            this._handleClick(index)
        };
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
            this.dispatchCustomEvent('bgtemplate', [this.slides[res.activeIndex], this.isAllone])
        });
    }

    clickLinkArrows(e, index, current){
        let params = [];
        let data = {
            'bottom-left': [45, 590, 60, 60],
            'top-left': [45, 134, 60, 60],
            'bottom-right': [495, 590, 60, 60],
            'top-right': [495, 134, 60, 60],
            'bottom': [235, 625, 125, 30],
            'left': [35, 330, 30, 125],
            'right': [535, 330, 30, 125],
            'top': [235, 130, 125, 30],
        }
        if((Number(index) === this.swiperEl.realIndex) && (current === 'link')){
            let w = this.offsetArray[2]/600;
            let h = this.offsetArray[3]/884;
            let clickedX = e.pageX - this.offsetArray[0];
            let clickedY = e.pageY - this.offsetArray[1];
            Object.entries(data).map((i)=>{
                let item = {
                    left: i[1][0]*w - i[1][2]*w,
                    top: i[1][1]*h - i[1][3]*h,
                    right: i[1][0]*w + i[1][2]*w,
                    bottom: i[1][1]*h + i[1][3]*h
                }
                params.push(item);
                data[i[0]] = [i[1][0]*w, i[1][1]*h, i[1][2]*w, i[1][3]*h];
            })
            for(let i = 0; i < params.length; i++){
                if(clickedX < params[i].right &&
                   clickedX > params[i].left &&
                   clickedY > params[i].top &&
                   clickedY < params[i].bottom){
                    this.dispatchCustomEvent('linkarrows', Object.keys(data)[i]);
                }
            }
        }
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
        this.swiperEl2 = new Swiper( this.shadowRoot.getElementById('swiper2'), this.swiperOptions2 );
    }

    render() {
        return html`
        <div class="swiper" id="swiper">
            <div class="swiper-wrapper">
                ${this.slides.map( (current, index) => html`
                <div class="swiper-slide ${this.isSquare ? 'square' : ''}  ${this.customOpacity ? 'opacity' : ''}" @click="${() => this._handleClick(index)}">
                    <img src="${this.extraInfo ? this.extraInfo.url + current + this.extraInfo.extension : current}" id="${index}" class="select-bg" @click="${(e) => this.clickLinkArrows(e, index, current)}" />
                </div>`)}
            </div>
        </div>


        <div class="swiper ${this.isAllone ? '' : 'hidden'}" id="swiper2">
            <div class="swiper-wrapper">
                ${this.slides.map( (current, index) => html`
                    <div class="swiper-slide" @click="${() => this._handleClick(index)}">
                        <img src="${this.extraInfo ? this.extraInfo.url + current + this.extraInfo.extension : current}" id="${index}" class="select-bg2" />
                    </div>
                `)}
            </div>
        </div>
    `;
    }
}
customElements.define('custom-swiper', CustomSwiper);