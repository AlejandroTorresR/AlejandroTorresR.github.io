import { LitElement, html, css } from 'lit-element';

export class CardMaker extends LitElement {
  static styles = css`
    *{
        margin: 0;
        padding: 0;
    }
    #card{
        border-radius: 4px;
        width: 100%;
        box-sizing: border-box;
      }
  `;

  static properties = {
    isEditable: { type: Boolean },
    ctx: { type: Object },
    card: { type: Object },
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
      }
    ]
    this.card = this.cards[5];
  }

  firstUpdated(){
    this.draw();
  }

  draw() {
    var canvas = this.shadowRoot.getElementById("card");
    if (canvas.getContext) {
      this.ctx = canvas.getContext("2d");
      this.ctx.textRendering = "geometricPrecision";
      this.ctx.font = '11px matrix';
      const bg = new Image();
      bg.onload = () => {

        this.ctx.drawImage(bg, 0, 0, 300, 442);
        if(this.card.frameType === 'xyz' || this.card.frameType === 'link') this.ctx.fillStyle = "white";
        this.setNameCard();
        this.ctx.fillStyle = "black";
        this.setAttribute();
        if(this.card.frameType !== 'link') this.setLevel();
        this.setAtkDef();
        this.setRace(22, 346);
        let size = 12;
        if(this.card.desc.length > 100) size = 12 - this.firstDigit(this.card.desc.length);
        if(this.card.frameType === 'link') size -= 1.5;
        this.setDescription(this.ctx, this.card.desc, 22, 358, size, 256, `${size}px matrix`);
      };
      this.setImageCard();
      bg.src = `./assets/maker/bgs/${this.card.frameType}.png`;
    }
  }

  firstDigit(num) {
    const numStr = String(Math.abs(num));
    const firstChar = numStr[0];
    const firstDigitUnsigned = Number(firstChar);
    return (num < 0) ? -firstDigitUnsigned : firstDigitUnsigned;
  }

  setImageCard(){
    const img = new Image();
    img.onload = () => this.ctx.drawImage(img, 34, 80, 232, 232);
    img.src = `./assets/${this.card.id}.jpg`;
  }
  setNameCard(){
    this.ctx.font = `small-caps 600 28px matrix`;
    this.ctx.fillText(this.card.name, 25, 44, 220);
  }
  setAttribute(){
    const attribute = new Image();
    attribute.onload = () => this.ctx.drawImage(attribute, 252, 16, 32, 32);
    attribute.src = `./assets/filters/${this.card.attribute.toLowerCase()}.svg`;
  }
  setLevel(){
    const level = new Image();
    let frameType = {
      src: './assets/maker/star/Normal.png',
      x: 246
    }
    if(this.card.frameType === 'xyz'){
      frameType = {
        src: './assets/maker/star/Xyz.png',
        x: 25
      }
    }
    level.onload = () => {
      for(let i of [...Array(this.card.level)]){
        this.ctx.drawImage(level, frameType.x, 52, 20, 20);
        this.card.frameType === 'xyz' ? frameType.x += 22 : frameType.x -= 22;
      }
    };
    level.src = frameType.src;
  }
  setAtkDef(){
    this.ctx.font = `small-caps 600 13px matrix`;
    this.ctx.fillText(this.card.atk, 190, 415);
    if(this.card.def) this.ctx.fillText(this.card.def, 250, 415);
    if(this.card.linkval) this.ctx.fillText(this.card.linkval, 266, 415);
  }
  setRace(x, y){
    this.ctx.font = `small-caps 600 14px matrix`;
    let raceText = this.card.frameType === 'normal' || this.card.frameType === 'effect' ? `[${this.card.race} / ${this.capitalizeText(this.card.frameType)}]` : `[${this.card.race} / ${this.capitalizeText(this.card.frameType)} / Effect]`
    this.ctx.fillText(raceText, x, y);
  }
  setDescription(context , text, x, y, lineHeight, fitWidth, font){
    console.log(text.length, 'l')
    context.font = font;
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

  render() {
    return html`<canvas id="card" height="442"></canvas>`;
  }

}