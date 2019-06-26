(()=>{customElements.define('cass-cade',class extends HTMLElement{
	static get observedAttributes(){return ['echo','code']};
	attributeChangedCallback(name,oldValue){
		let ID =x=>(document.getElementById(x));
		let code = this.getAttribute('code');
		if(!code){code='<div></div>'};
		let o,n,i,obj={};
		if(name=='echo'&&oldValue){
			o = oldValue.split(" ");
			for(i=0;i<o.length;i++){if(ID(o[i])){obj[o[i]]=ID(o[i]).outerHTML}};
		}
		if(this.hasAttribute('echo')){
			n = this.getAttribute('echo').split(" ");
			this.innerHTML = '';
			for(i=0;i<n.length;i++){
				this.insertAdjacentHTML('beforeend',(obj[n[i]]?obj[n[i]]:code));
				this.lastElementChild.id = n[i];
			}
		}
	}
})})();
//Written by Tygari Katarana Davis
