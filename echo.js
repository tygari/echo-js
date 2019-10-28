(()=>{customElements.define('echo-',class extends HTMLElement{
	static get observedAttributes(){return['echo','code']};
	attributeChangedCallback(name,oldValue){
		let I=x=>(document.getElementById(x)),
			G=x=>(this.getAttribute(x)),
			R=x=>(x.trim().replace(/\s\s+|\r|\n|\t|\f|\v/g,' ').split(' ')),
			c=G('code'),v,i,o={};
		if(!c||!c.startsWith('<')||!c.endsWith('>')){
			console.log(this.outerHTML);
			let cr='color:red',cb='color:black',co='color:orange';
			c?console.log('%cERROR: %c'+c+'%c is not a proper HTML code string.  %cDefaulting to: %c<div></div>%c.',cr,cb,cr,co,cb,co)
			:console.log('%cERROR: TAG <echo-> has no code attribute.  '+'%cDefaulting to: %c<div></div>%c.',cr,co,cb,co);
			c='<div></div>';
		}
		if(name=='echo'&&oldValue){
			v=R(oldValue);
			for(i=0;i<v.length;i++){if(I(v[i])){o[v[i]]=I(v[i]).outerHTML}};
		}
		if(this.hasAttribute('echo')){
			v=R(G('echo'));
			this.innerHTML='';
			if(v[0]!==""){
				for(i=0;i<v.length;i++){
					this.insertAdjacentHTML('beforeend',(o[v[i]]?o[v[i]]:c));
					this.lastElementChild.id=v[i];
				}
			}
		}
	}
})})();
//Written by Tygari Katarana Davis
