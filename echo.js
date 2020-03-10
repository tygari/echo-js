if (!!window.customElements){
	(()=>{customElements.define(`echo-`,class extends HTMLElement{
		static get observedAttributes(){return[`echo`,`code`]};
		attributeChangedCallback(name,oldValue){
			let VALUE,
				INC,
				CHK,
				ID =x=>(document.getElementById(x)),
				ATTR =x=>(this.getAttribute(x)),
				ARR =x=>(Array.isArray(x)),
				TRIM =x=>(x.trim().replace(/\s\s+|\r|\n|\t|\f|\v/g,` `)),
				EVAL =x=>{
					try {if (!!eval(x)){return true}}
					catch(e){return false}
				},
				ECHO =x=>{
					if (!!window[TRIM(x)]){
						CHK = window[TRIM(x)];
						if (CHK !== null && CHK !== undefined){
							if (typeof CHK == 'string'){x = TRIM(CHK).split(` `)}
							else if (ARR(CHK)){x = CHK}
							else if (typeof CHK == 'object' && !(CHK instanceof Element)){
								VALUE = [];
								for (INC in CHK){
									VALUE.push(``+INC);
								}
								x = VALUE;
							}
						}
					}
					else if (EVAL(x) && ARR(eval(x))){x = eval(x)}
					if (!ARR(x)){x = TRIM(x).split(` `)}
					return x;
				},
				CODE = EVAL(ATTR(`code`)) ? TRIM(eval(ATTR(`code`)).innerHTML) : ATTR(`code`),
				OBJ = {};
			if (!CODE || !CODE.startsWith(`<`) || !CODE.endsWith(`>`)){
				console.log(this.outerHTML);
				let cr=`color:red`,
					cb=`color:blue`,
					co=`color:orange`;
				CODE ? console.log(`%cERROR: ATTRIBUTE "code" %c${CODE} %cis not a proper HTML code string.  %cDefaulting to: %c<div></div>%c.`,cr,cb,cr,co,cb,co)
					 : console.log(`%cERROR: TAG <echo-> is missing ATTRIBUTE "code". %cDefaulting to: %c<div></div>%c.`,cr,co,cb,co);
				CODE =`<div></div>`;
			};
			if (name == `echo` && oldValue){
				VALUE = ECHO(oldValue);
				for(INC = 0; INC < VALUE.length; INC++){
					if(ID(VALUE[INC])){
						OBJ[VALUE[INC]] = ID(VALUE[INC]).outerHTML
					}
				}
			};
			if (this.hasAttribute(`echo`)){
				VALUE = ECHO(ATTR(`echo`));
				this.innerHTML = ``;
				if(VALUE[0] !== ``){
					for(INC = 0; INC < VALUE.length; INC++){
						if (typeof VALUE[INC] !== 'object' && typeof VALUE[INC] !== undefined){
							this.insertAdjacentHTML( `beforeend` , (OBJ[VALUE[INC]] ? OBJ[VALUE[INC]] : CODE));
							this.lastElementChild.id = ``+VALUE[INC];
						} else {console.log(`%cERROR%c: Invalid ID Data Type.`,`color:red`,`color:black`)}
					}
				}
			};
			window.addEventListener(`load`,()=>{
				if (!!window[TRIM(ATTR(`echo`))]){
					CHK = window[TRIM(ATTR(`echo`))];
					if (CHK !== null && CHK !== undefined){
						if (typeof CHK == 'string' || ARR(CHK) || (typeof CHK == 'object' && !(CHK instanceof Element))){
							this.setAttribute(`echo` , ATTR(`echo`));
						}
					}
				}
			});
		}
	})})()
} else {console.log(`%cERROR%c: WEB COMPONENTS are Disabled`,`color:red`,`color:black`);}
//Written by Tygari Katarana Davis
