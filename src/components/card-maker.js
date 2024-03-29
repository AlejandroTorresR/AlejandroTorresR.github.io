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
    isEditable: { type: Boolean },
    ctx: { type: Object },
    card: { type: Object },
    img: { type: String },
  };

  constructor() {
    super();
    this.isEditable = false;
    this.cards = [{
        id: '38033121',
        attribute: 'DARK',
        name: 'Dark Magician Girl',
        desc: 'This card gains 300 ATK for every "Dark Magician" or "Magician of Black Chaos" in either player´s Graveyard.',
        race: 'Spellcaster',
        level: 6,
        atk: 2000,
        def: 1700,
        frameType: "effect",
      }, {
        id: '73580471',
        attribute: 'FIRE',
        name: 'Black Rose Dragon',
        desc: "1 Tuner + 1+ non-Tuner monsters\r\nWhen this card is Synchro Summoned: You can destroy all cards on the field. Once per turn: You can banish 1 Plant monster from your GY, then target 1 Defense Position monster your opponent controls; change that target to face-up Attack Position, and if you do, its ATK becomes 0 until the end of this turn.",
        race: 'Dragon',
        level: 7,
        atk: 2400,
        def: 1800,
        frameType: "synchro",
      }, {
        id: '33652635',
        attribute: 'DARK',
        name: 'Gladiator Beast Domitianus',
        desc: "\"Gladiator Beast Vespasius\" + 2 \"Gladiator Beast\" monsters\r\nMust first be Special Summoned (from your Extra Deck) by shuffling the above cards you control into the Deck. (You do not use \"Polymerization\".) Once per turn, when your opponent activates a monster effect (Quick Effect): You can negate the activation, and if you do, destroy it. You choose the attack targets for your opponent's attacks. At the end of the Battle Phase, if this card battled: You can return this card to the Extra Deck; Special Summon 1 \"Gladiator Beast\" monster from your Deck.",
        race: 'Sea Serpent',
        level: 10,
        atk: 3500,
        def: 1200,
        frameType: "fusion",
      }, {
        id: '78156759',
        attribute: 'FIRE',
        name: 'Wind-Up Zenmaines',
        desc: "2 Level 3 monsters\r\nIf this face-up card on the field would be destroyed, you can detach 1 Xyz Material from this card instead. Once per turn, during the End Phase, if this effect was used this turn: Target 1 card on the field; destroy it.",
        race: 'Machine',
        level: 3,
        atk: 1500,
        def: 2100,
        frameType: "xyz",
      }, {
        id: '89631139',
        attribute: 'LIGHT',
        name: 'Blue-Eyes White Dragon',
        desc: "This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.",
        race: 'Dragon',
        level: 8,
        atk: 3000,
        def: 2500,
        frameType: "normal",
      }, {
        id: 1735088,
        name: "Wind-Up Zenmaintenance",
        type: "Link Monster",
        frameType: "link",
        desc: "2 \"Wind-Up\" monsters\r\nIf this card is destroyed and sent to the GY: You can target 1 \"Wind-Up\" Xyz Monster you control; attach this card to it as material. You can only use each of the following effects of \"Wind-Up Zenmaintenance\" once per turn.\r\n● If this card is Link Summoned: You can add 1 \"Wind-Up\" card from your Deck to your hand.\r\n● You can banish 1 face-up \"Wind-Up\" monster you control, face-down; Special Summon 1 monster from your Deck with the same name that card had on the field.",
        atk: 1800,
        race: "Machine",
        attribute: "LIGHT",
        archetype: "Wind-Up",
        linkval: 2,
        linkmarkers: [
            "Bottom-Left",
            "Bottom-Right"
        ],
      }, {
        id: 69123138,
        name: "Zera the Mant",
        type: "Ritual Monster",
        frameType: "ritual",
        desc: "This card can only be Ritual Summoned with the Ritual Spell Card, \"Zera Ritual\".",
        atk: 2800,
        def: 2300,
        level: 8,
        race: "Fiend",
        attribute: "DARK",
      }, {
        id: 12580477,
        name: "Raigeki",
        type: "Spell Card",
        frameType: "spell",
        desc: "Destroy all monsters your opponent controls.",
        race: "Normal",
      }, {
        id: 44095762,
        name: "Mirror Force",
        type: "Trap Card",
        frameType: "trap",
        desc: "When an opponent's monster declares an attack: Destroy all your opponent's Attack Position monsters.",
        race: "Normal",
      }, {
        id: 48017809,
        name: "Mirage Tube",
        type: "Spell Card",
        frameType: "spell",
        desc: "This card cannot be activated from your hand. Activate only when a face-up monster you control is selected as an attack target. Inflict 1000 damage to your opponent.",
        race: "Quick-Play",
      }, {
        id: 22359980,
        name: "Mirror Wall",
        type: "Trap Card",
        frameType: "trap",
        desc: "Each of your opponent's monsters that conducted an attack while this card was face-up on the field has its ATK halved as long as this card remains on the field. During each of your Standby Phases, pay 2000 LP or destroy this card.",
        race: "Continuous",
      }, {
        id: 30194529,
        name: "Ningirsu the World Chalice Warrior",
        type: "Link Monster",
        frameType: "link",
        desc: "2+ Link Monsters\r\nIf this card is Link Summoned: Draw cards equal to the number of \"World Chalice\" monsters this card points to. You can only use this effect of \"Ningirsu the World Chalice Warrior\" once per turn. Once per turn: You can send 1 card from each player's field to the GYs. If this card is sent from the field to the GY: You can Special Summon 1 \"World Chalice\" monster from your hand.",
        atk: 2500,
        race: "Warrior",
        attribute: "EARTH",
        archetype: "World Chalice",
        linkval: 3,
        linkmarkers: [
            "Left",
            "Top",
            "Right",
        ],
      }, {
        id: 15394084,
        name: "Nordic Beast Token",
        type: "Token",
        frameType: "token",
        desc: "Special Summoned with the effect of \"Tanngrisnir of the Nordic Beasts\".",
        atk: 0,
        def: 0,
        level: 3,
        race: "Beast",
        attribute: "EARTH",
        archetype: "Nordic",
      }, {
        id: 300302069,
        name: "Order of the Queen",
        type: "Skill Card",
        frameType: "skill",
        desc: "While you control \"Amazoness Queen\", negate the effects of Effect Monsters destroyed by battle with attacking \"Amazoness\" monsters you control.",
        race: "Tania",
      }
    ]
    this.img = './assets/img/duelist.svg';
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
    this.card.attribute = ['spell', 'trap'].includes(this.card.frameType) ? this.card.frameType : 'LIGHT';
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
    this.card.frameType = ev.detail;
    if(this.card.frameType.includes('bgs/')) this.card.frameType = ev.detail.split('bgs/')[1].split('.')[0];
    this.draw();
  }

  setEventParams(ev){
    this.card.name = ev.detail.name;
    this.card.desc = ev.detail.desc;
    this.card.atk = ev.detail.atk;
    this.card.def = ev.detail.def;
    this.card.level = ev.detail.level;
    this.card.race = ev.detail.race;
    this.draw();
  }

  setEventCard(ev){
    this.img = ev.detail;
    this.draw();
  }

  render() {
    return html`
      <div @bgtemplate=${this.setEventTemplate} @checkinput=${this.setEventParams} @croppedevent="${this.setEventCard}"><slot></slot></div>
      <canvas id="card" height="884" width="600"></canvas>`;
  }

}
customElements.define('card-maker', CardMaker);