import { LitElement, html, css } from 'lit';

export class CustomContainer extends LitElement {

    static properties = {
        slides: { type: Array },
    };

    static get styles() {
        return [css`
        .absolute{
            width: 100%; 
            position: absolute; 
            left:0;
        }
        `,
        ];
    }

    constructor() {
        super();
        this.card = {
            id: '89631139',
            attribute: 'LIGHT',
            name: 'Card Name',
            desc: "Write a description.",
            race: 'Aqua',
            level: 1,
            atk: 0,
            def: 0,
            frameType: "normal",
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
        this.slides = [
            './assets/maker/bgs/normal.png',
            './assets/maker/bgs/effect.png',
            './assets/maker/bgs/fusion.png',
            './assets/maker/bgs/xyz.png',
            './assets/maker/bgs/ritual.png',
            './assets/maker/bgs/synchro.png',
            './assets/maker/bgs/link.png',
            './assets/maker/bgs/token.png',
            './assets/maker/bgs/spell.png',
            './assets/maker/bgs/trap.png',
            './assets/maker/bgs/skill.png'
        ]
    }

    render() {
        return html`
        <card-maker .card="${this.card}">
            <custom-cropper>
                <text-input .params="${this.card}"></text-input>
            </custom-cropper>
            <custom-swiper class="absolute" customOpacity .slides="${this.slides}" .swiperOptions="${this.swiperOptions}"></custom-swiper>
        </card-maker>
        `;
    }
}
customElements.define('custom-container', CustomContainer);