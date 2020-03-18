if (!!window.customElements){
	(()=>{customElements.define(`echo-`,class extends HTMLElement{
		static get observedAttributes(){return[`echo`,`code`,`auto`]};
		attributeChangedCallback(name,oldValue){
			let E = {
				CR:`color:red`,
				CB:`color:blue`,
				CO:`color:orange`,
				NULL:x=>(x !== null && x !== undefined),
				NOT:x=>(name !== x),
				ID:x=>(document.getElementById(x)),
				GET:x=>(this.getAttribute(x)),
				SET:(x,y)=>(this.setAttribute(x,y)),
				ARR:x=>(Array.isArray(x)),
				TRIM:x=>(x.trim().replace(/\s\s+|\r|\n|\t|\f|\v|[,]/g,` `)),
				SPLIT:x=>(E.TRIM(x).split(` `)),
				WIN:x=>{
					try {return E.TRIM(x).split('.').reduce((y,z)=>y[z],window)}
					catch(e){return false}
				},
				EVAL:x=>{
					try {if (!!eval(x)){return true}}
					catch(e){return false}
				},
				CODE:x=>{
					E.CHK = false;
					if (!!E.WIN(x)){
						x = E.WIN(x);
						E.CHK = true;
					}
					else if (E.EVAL(x)){x = E.TRIM(eval(x).innerHTML)}
					else {x = E.GET(`code`)}
					x = ``+x;
					if (!x.startsWith(`<`) || !x.endsWith(`>`)){
						console.log(this.outerHTML);
						x ? console.log(`%cERROR: ATTRIBUTE "code" %c${x} %cis not a proper HTML code string.  %cDefaulting to: %c<div></div>%c.`,E.CR,E.CB,E.CR,E.CO,E.CB,E.CO)
							 : console.log(`%cERROR: TAG <echo-> is missing ATTRIBUTE "code". %cDefaulting to: %c<div></div>%c.`,E.CR,E.CO,E.CB,E.CO);
						x =`<div></div>`;
						E.CHK = false;
					}
					if (E.CHK){E.LOOP(`code`,x)}
					return x;
				},
				ECHO:(x,y=false)=>{
					E.CHK = false;
					if (!!E.WIN(x)){E.CHK = E.WIN(x);}
					if (typeof E.CHK == `string`){
						x = E.SPLIT(E.CHK);
						y = true;
					}
					else if (E.ARR(E.CHK)){
						x = E.CHK;
						y = true;
					}
					else if (typeof E.CHK === `object` && E.NULL(E.CHK) && !(E.CHK instanceof Element)){
						E.VALUE = [];
						for (E.INC in E.CHK){E.VALUE.push(``+E.INC)}
						x = E.VALUE;
						y = true;
					}
					else if (E.EVAL(x) && E.ARR(eval(x))){x = eval(x)}
					if (!E.ARR(x)){x = E.SPLIT(x)}
					if (y == true){E.LOOP(`echo`,E.CHK)}
					return x;
				},
				OBJ:{},
				LOOP:(x,y)=>{
					if (E.GET(`auto`) === `true` && E.NULL(x) && E.WIN(E.GET(x)) !== y){
						y = E.WIN(E.GET(x));
						E.SET(x ,E.GET(x));
					}
					this[x] = setTimeout(E.LOOP,25,x,y);
				},
			}
			if (E.GET(`echo`) !== `[object Object]`){
				if (name == `echo` && oldValue){
					E.VALUE = E.ECHO(oldValue);
					for(E.INC = 0; E.INC < E.VALUE.length; E.INC++){
						E.CHK = E.VALUE[E.INC];
						if(E.ID(E.CHK)){E.OBJ[E.CHK] = E.ID(E.CHK).outerHTML}
					}
				}
				if (this.hasAttribute(`echo`)){
					E.VALUE = E.ECHO(E.GET(`echo`));
					this.innerHTML = ``;
					if(E.VALUE[0] !== ``){
						E.CODE = E.CODE(E.GET(`code`));
						for(E.INC = 0; E.INC < E.VALUE.length; E.INC++){
							E.CHK = E.VALUE[E.INC];
							if (typeof E.CHK !== `object` && E.NULL(E.CHK)){
								this.insertAdjacentHTML( `beforeend` , (E.OBJ[E.CHK] ? E.OBJ[E.CHK] : E.CODE));
								this.lastElementChild.id = ``+E.CHK;
							} else {console.log(`%cERROR%c: Invalid ID Data Type.`,E.CR,E.CO)}
						}
					}
				}
				window.addEventListener(`load`,()=>{
					if (!!E.WIN(E.GET(name)) && E.NOT(`auto`)){
						E.CHK = E.WIN(E.GET(name));
						if (E.NULL(E.CHK)){
							if (typeof E.CHK === `string` || (E.NOT(`code`) && E.ARR(E.CHK)) || (E.NOT(`code`) && typeof E.CHK === `object` && !(E.CHK instanceof Element))){
								E.SET(name ,E.GET(name));
								E.LOOP(name,E.CHK);
							}
						}
					}
				});
			} else {
				console.log(`%cERROR%c: An object literal was passed as a string, resulting in echo="[object Object]".  HTML cannot process object literals.`,E.CR,E.CO);
			}
		}
	})})()
} else {console.log(`%cERROR%c: WEB COMPONENTS are Disabled`,E.CR,E.CO);}
//Written by Tygari Katarana Davis
