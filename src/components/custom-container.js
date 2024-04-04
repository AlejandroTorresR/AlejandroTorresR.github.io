import { LitElement, html, css } from 'lit';

export class CustomContainer extends LitElement {

    static properties = {
        slides: { type: Array },
        swiperOptions: { type: Object },
        card: { type: Object },
        extraInfo: { type: Object },
        offsetArray: { type: Array },
    };

    static get styles() {
        return [css`
        .absolute{
            width: 100%; 
            height: 100%;
            position: absolute; 
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .card{
            top: 0;
            left: 0;
        }
        `,
        ];
    }

    constructor() {
        super();
        this.card = {
            id: '',
            attribute: 'DARK',
            name: 'Card Name',
            desc: "Write a description.",
            race: 'Aqua',
            level: 1,
            atk: 0,
            def: 0,
            frameType: "normal",
            linkmarkers: []
        }
        this.swiperOptions = {
            //modules: [EffectCoverflow, EffectCards, EffectCube],
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
            grabCursor: true,
            keyboard: true,
            thumbsSwiper: '.mySwiper2',
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
        this.extraInfo = {
            url: './assets/maker/bgs/',
            extension: '.png'
        }
    }

    setEventTemplate(ev){
        if(!ev.detail[1]) this.card.attribute = ev.detail[0];
      }

    setOffset(e){
        this.offsetArray = e.detail;
    }

    render() {
        return html`
            <card-maker class="absolute" .card="${this.card}" @offsetarray="${this.setOffset}">
                <custom-cropper>
                    <text-input .params="${this.card}"></text-input>
                </custom-cropper>
                <custom-swiper
                    isAllone customOpacity
                    @bgtemplate="${this.setEventTemplate}"
                    class="absolute card"
                    .offsetArray="${this.offsetArray}"
                    .slides="${this.slides}" 
                    .swiperOptions="${this.swiperOptions}"
                    .extraInfo="${this.extraInfo}">
                </custom-swiper>
            </card-maker>
        `;
    }
}
customElements.define('custom-container', CustomContainer);