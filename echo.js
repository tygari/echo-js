if (!!window.customElements){
	(()=>{customElements.define(`echo-`,class extends HTMLElement{
		static get observedAttributes(){return[`echo`,`code`]};
		attributeChangedCallback(name,oldValue){
			let ID =x=>(document.getElementById(x)),
				ATTR =x=>(this.getAttribute(x)),
				TRIM =x=>(x.trim().replace(/\s\s+|\r|\n|\t|\f|\v/g,` `)),
				EVAL =x=>{
					try {if (!!eval(ATTR(`code`))){return true}}
					catch(e){return false}
				},
				CODE = EVAL() ? TRIM(eval(ATTR(`code`)).innerHTML) : ATTR(`code`),
				VALUE,
				INC,
				OBJ = {};
			if (!CODE || !CODE.startsWith(`<`) || !CODE.endsWith(`>`)){
				console.log(this.outerHTML);
				let cr=`color:red`,
					cb=`color:blue`,
					co=`color:orange`;
				CODE ? console.log(`%cERROR: ATTRIBUTE "code" %c${CODE} %cis not a proper HTML code string.  %cDefaulting to: %c<div></div>%c.`,cr,cb,cr,co,cb,co)
					 : console.log(`%cERROR: TAG <echo-> is missing ATTRIBUTE "code". %cDefaulting to: %c<div></div>%c.`,cr,co,cb,co);
				CODE =`<div></div>`;
			}
			if (name == `echo` && oldValue){
				VALUE = TRIM(oldValue).split(` `);
				for(INC = 0; INC < VALUE.length; INC++){
					if(ID(VALUE[INC])){
						OBJ[VALUE[INC]]=ID(VALUE[INC]).outerHTML
					}
				};
			}
			if (this.hasAttribute(`echo`)){
				VALUE = TRIM(ATTR(`echo`)).split(` `);
				this.innerHTML = ``;
				if(VALUE[0] !== ``){
					for(INC = 0; INC < VALUE.length; INC++){
						this.insertAdjacentHTML( `beforeend` , (OBJ[VALUE[INC]] ? OBJ[VALUE[INC]] : CODE));
						this.lastElementChild.id = VALUE[INC];
					}
				}
			}
		}
	})})()
} else {console.log(`%cERROR%c: WEB COMPONENTS are Disabled`,`color:red`,`color:black`);}
//Written by Tygari Katarana Davis
