/*! For license information please see index.js.LICENSE.txt */
            button[aframe-injected]{
                display: none;
            }
            .a-enter-vr button{
                display: block;
                position: absolute;
                width: 80px;
                height: 40px;
                z-index: 1;
                bottom: 32px;
                border: none;
                border-radius: 4px;
                font-weight: bold;
                color: rgba(0,0,0,.5);
                cursor: pointer;
                left: calc(50% - 40px);
            }
            .a-enter-vr button:after{
                content: 'Enter VR';
            }
        `}constructor(){super(),this.cards=["74677422","74677423","74677424","74677422","74677423","74677424","74677422","74677423","74677424","74677422","74677422","74677423","74677424","74677422","74677423","74677424","74677422","74677423","74677424","74677422","74677422","74677423","74677424","74677422","74677423","74677424","74677422","74677423","74677424","74677422","74677422","74677423","74677424","74677422","74677423","74677424","74677422","74677423","74677424","74677422"]}createPlaneArray(){let e=-60,t=35,n=20;return this.cards.map((i=>(40===e?(e=-50,t-=15,n=20):(e+=10,n-=5),H`
            <a-plane 
                position="${e} ${t} ${-55}"
                width="9.5" height="14" 
                color="#fff"
                rotation="0 ${n} 0" 
                src="./assets/${i}.jpg"></a-plane>
            `)))}render(){return H`
            <a-scene xr-mode-ui="enabled: true">
                ${this.createPlaneArray()}
                <a-sky color="#f9f9f9"></a-sky>
            </a-scene>
        `}})})()})();