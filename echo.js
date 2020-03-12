if (!!window.customElements){
	(()=>{customElements.define(`echo-`,class extends HTMLElement{
		static get observedAttributes(){return[`echo`,`code`,`test`]};
		attributeChangedCallback(name,oldValue){
			let CR=`color:red`,
				CB=`color:blue`,
				CO=`color:orange`,
				VALUE,
				INC,
				CHK,
				ID =x=>(document.getElementById(x)),
				GET =x=>(this.getAttribute(x)),
				ARR =x=>(Array.isArray(x)),
				TRIM =x=>(x.trim().replace(/\s\s+|\r|\n|\t|\f|\v|[,]/g,` `)),
				WIN =x=>(window[TRIM(x)]),
				EVAL =x=>{
					try {if (!!eval(x)){return true}}
					catch(e){return false}
				},
				CODE = EVAL(GET(`code`)) ? TRIM(eval(GET(`code`)).innerHTML) : GET(`code`),
				ECHO =x=>{
					if (!!WIN(x)){
						CHK = WIN(x);
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
				OBJ = {};
			if (GET(`echo`) != '[object Object]'){
				if (!CODE || !CODE.startsWith(`<`) || !CODE.endsWith(`>`)){
					console.log(this.outerHTML);
					CODE ? console.log(`%cERROR: ATTRIBUTE "code" %c${CODE} %cis not a proper HTML code string.  %cDefaulting to: %c<div></div>%c.`,CR,CB,CR,CO,CB,CO)
						 : console.log(`%cERROR: TAG <echo-> is missing ATTRIBUTE "code". %cDefaulting to: %c<div></div>%c.`,CR,CO,CB,CO);
					CODE =`<div></div>`;
				}
				if (name == `echo` && oldValue){
					VALUE = ECHO(oldValue);
					for(INC = 0; INC < VALUE.length; INC++){
						if(ID(VALUE[INC])){
							OBJ[VALUE[INC]] = ID(VALUE[INC]).outerHTML
						}
					}
				}
				if (this.hasAttribute(`echo`)){
					VALUE = ECHO(GET(`echo`));
					this.innerHTML = ``;
					if(VALUE[0] !== ``){
						for(INC = 0; INC < VALUE.length; INC++){
							if (typeof VALUE[INC] !== 'object' && typeof VALUE[INC] !== undefined){
								this.insertAdjacentHTML( `beforeend` , (OBJ[VALUE[INC]] ? OBJ[VALUE[INC]] : CODE));
								this.lastElementChild.id = ``+VALUE[INC];
							} else {console.log(`%cERROR%c: Invalid ID Data Type.`,CR,CO)}
						}
					}
				}
				window.addEventListener(`load`,()=>{
					if (!!WIN(GET(`echo`))){
						CHK = WIN(GET(`echo`));
						if (CHK !== null && CHK !== undefined){
							if (typeof CHK == 'string' || ARR(CHK) || (typeof CHK == 'object' && !(CHK instanceof Element))){
								this.setAttribute(`echo` , GET(`echo`));
							}
						}
					}
				})
			} else {
				console.log(`%cERROR%c: An object literal was passed as a string, resulting in echo="[object Object]".  HTML cannot process object literals.`,CR,CO);
			}
		}
	})})()
//Written by Tygari Katarana Davis
