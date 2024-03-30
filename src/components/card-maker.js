import { LitElement, html, css } from 'lit';

export class CardMaker extends LitElement {
  static styles = css`
    *{
        margin: 0;
        padding: 0;
    }
    #card{
        border-radius: 4px;
        max-width: 320px;
        width: 100%;
        box-sizing: border-box;
        z-index: 1;
      }
  `;

  static properties = {
    ctx: { type: Object },
    card: { type: Object },
    img: { type: String },
  };

  constructor() {
    super();
    this.img = './assets/img/duelist.svg';
    this.card = {};
  }

  firstUpdated(){
    this.matrixFont();
    this.draw();
  }
  matrixFont(){
    const myFont = new FontFace('matrix', 'url(../assets/fonts/matrix.ttf)');
    myFont.load().then((font) => {
      document.fonts.add(font);
    });
  }

  draw() {
    var canvas = this.shadowRoot.getElementById("card");
    if (canvas.getContext) {
      this.ctx = canvas.getContext("2d");
      this.ctx.textRendering = "geometricPrecision";
      const bg = new Image();
      bg.onload = () => {

        this.ctx.drawImage(bg, 0, 0, 600, 884);
        if (['link', 'xyz', 'spell', 'trap', 'skill'].includes(this.card.frameType)) this.ctx.fillStyle = "white";
        this.setNameCard();
        this.ctx.fillStyle = "black";
        if (this.card.frameType !== 'skill') this.setAttribute();
        if(this.card.frameType !== 'link' && this.card.frameType !== 'spell' && this.card.frameType !== 'trap' && this.card.frameType !== 'skill') this.setLevel();
        this.setAtkDef();
        this.setRace();
        let size = 19.5;
        if(this.card.desc.length > 100) size = size - this.firstDigit(this.card.desc.length);
        //if(this.card.frameType === 'link') size -= 3;
        let y = 716;
        if (['spell', 'trap'].includes(this.card.frameType)) y = 694;
        this.setDescription(this.ctx, this.card.desc, 44, y, size, 512, `${size}px matrix`);
      };
      this.setImageCard({detail: this.img});
      bg.src = `./assets/maker/bgs/${this.card.frameType}.png`;
    }
  }
  firstDigit(num) {
    const numStr = String(Math.abs(num));
    const firstChar = numStr[0];
    const firstDigitUnsigned = Number(firstChar);
    return (num < 0) ? -firstDigitUnsigned : firstDigitUnsigned;
  }
  setImageCard(ev){
    const img = new Image();
    img.onload = () => this.ctx.drawImage(img, 68, 160, 464, 464);
    img.src = ev.detail;
  }
  setNameCard(){
    this.ctx.font = 'small-caps 46px matrix'; //'ultra-expanded';
    this.ctx.fillText(this.card.name, 42, 82, 440);
  }
  setAttribute(){
    this.card.attribute = ['spell', 'trap'].includes(this.card.frameType) ? this.card.frameType : (['spell', 'trap'].includes(this.card.attribute) ? 'DARK' : this.card.attribute);
    const attribute = new Image();
    attribute.onload = () => this.ctx.drawImage(attribute, 504, 38, 58, 58);
    let att = this.card.attribute ? this.card.attribute.toLowerCase() : this.card.frameType;
    attribute.src = `./assets/filters/${att}.svg`;
  }
  setLevel(){
    const level = new Image();
    let frameType = {
      src: './assets/maker/star/Normal.png',
      x: 492
    }
    if(this.card.frameType === 'xyz'){
      frameType = {
        src: './assets/maker/star/Xyz.png',
        x: 70
      }
    }
    level.onload = () => {
      for(let i of [...Array(this.card.level)]){
        this.ctx.drawImage(level, frameType.x, 106, 36, 36);
        this.card.frameType === 'xyz' ? frameType.x += 38 : frameType.x -= 38;
      }
    };
    level.src = frameType.src;
  }
  setAtkDef(){
    this.ctx.font = `small-caps 600 26px matrix`;
    if(this.card.frameType !== 'spell' && this.card.frameType !== 'trap' && this.card.frameType !== 'skill') this.ctx.fillText(this.card.atk, 380, 830);
    if(this.card.frameType !== 'spell' && this.card.frameType !== 'trap' && this.card.frameType !== 'skill' && this.card.frameType !== 'link') this.ctx.fillText(this.card.def, 500, 830);
    if(this.card.frameType === 'link') {
      if(!this.card.linkval) {
        this.card.linkval = 0;
        this.card.linkmarkers = []
      }
      this.ctx.fillText(this.card.linkval, 532, 830);
      this.setArrows(this.card.linkmarkers);
    };
  }
  setArrows(params){
    for(let item of params){
      let small = new Image();
      let name = item.toLowerCase();
      small.src = `./assets/maker/star/${name}.png`;
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
      small.onload = () => this.ctx.drawImage(small, data[name][0], data[name][1], data[name][2], data[name][3]);
    }
    
  }
  setRace(){
    let x = 44, y = 692;
    this.ctx.font = `small-caps 600 26px matrix`;
    let raceText = ['normal', 'effect', 'skill'].includes(this.card.frameType) ? `[${this.card.race} / ${this.capitalizeText(this.card.frameType)}]` : `[${this.card.race} / ${this.capitalizeText(this.card.frameType)} / Effect]`;
    if (['spell', 'trap'].includes(this.card.frameType)) {
      this.ctx.font = 'small-caps 600 36px matrix'; //ultra-expanded
      this.ctx.textAlign = 'right';
      if(this.card.frameType === 'spell') this.card.type = 'Spell Card';
      if(this.card.frameType === 'trap') this.card.type = 'Trap Card';
      x = 540;
      y = 136;
      if(['Quick-Play', 'Continuous', 'Ritual', 'Field', 'Equip', 'Counter'].includes(this.card.race)){
        raceText = `[${this.card.type}      ]`
        this.setTypeIcon();
      } else {
        raceText = `[${this.card.type}]`
      }
    } else {
      if(['Spell Card', 'Trap Card'].includes(this.card.type)) {
        this.card.race = 'Aqua';
        this.card.type = '';
        this.draw();
      }
    }
    this.ctx.fillText(raceText, x, y);
  }
  setTypeIcon(){
    this.ctx.arc(510, 124, 14, 0, Math.PI * 2);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.fillStyle = 'black';
    fetch(`./assets/filters/${this.card.race.toLowerCase()}.svg`)
    .then(res => res.text())
    .then(svgXml => {
      var img = new Image();
      var coloredSvgXml = svgXml.replace(/width/g,"fill='black' width");
      img.onload = () => this.ctx.drawImage(img, 494, 110, 30, 30);
      img.src = "data:image/svg+xml;charset=utf-8,"+coloredSvgXml;
    });
  }
  setDescription(context , text, x, y, lineHeight, fitWidth, font){
    context.font = font;
    context.textAlign = 'left';
    fitWidth = fitWidth || 0;
    if (fitWidth <= 0) {
        context.fillText( text, x, y );
        return;
    }
    for (var idx = 1; idx <= text.length; idx++) {
        var str = text.substr(0, idx);
        if (context.measureText(str).width > fitWidth || text.substr(0, idx-1).includes('\r\n')) {
            context.fillText( text.substr(0, idx-1), x, y );
            this.setDescription(context, text.substr(idx-1), x, y + lineHeight, lineHeight,  fitWidth, font);
            return;
        }
    }
    context.fillText( text, x, y );
  }

  capitalizeText(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  setEventTemplate(ev){
    if(ev.detail[1]) {
      this.card.frameType = ev.detail[0]
      this.draw();
    }
  }

  setEventParams(ev){
    this.card.name = ev.detail.name;
    this.card.desc = ev.detail.desc;
    this.card.atk = ev.detail.atk;
    this.card.def = ev.detail.def;
    this.card.level = ev.detail.level;
    this.card.race = ev.detail.race;
    this.card.attribute = ev.detail.attribute;
    this.draw();
  }

  setEventCard(ev){
    this.img = ev.detail;
    this.draw();
  }

  saveCanvasFile(){
    var canvas = this.shadowRoot.getElementById("card");
    let canvasUrl = canvas.toDataURL("image/jpeg");
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = "download-this-canvas";
    createEl.click();
    createEl.remove();

  }

  render() {
    return html`
      <div @savecanvas="${this.saveCanvasFile}" @bgtemplate="${this.setEventTemplate}" @checkinput=${this.setEventParams} @croppedevent="${this.setEventCard}"><slot></slot></div>
      <canvas id="card" height="884" width="600"></canvas>`;
  }

}
customElements.define('card-maker', CardMaker);