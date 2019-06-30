(()=>{customElements.define('cass-cade',class extends HTMLElement{
	static get observedAttributes(){return ['echo','code']};
	attributeChangedCallback(name,oldValue){
		let ID=x=>(document.getElementById(x)),
			gA=x=>(this.getAttribute(x)),
			code=gA('code'),
			v,i,o={};
		if(!code){code='<div></div>'};
		if(name=='echo'&&oldValue){
			v=oldValue.split(" ");
			for(i=0;i<v.length;i++){if(ID(v[i])){o[v[i]]=ID(v[i]).outerHTML}};
		}
		if(this.hasAttribute('echo')&&gA('echo')!==""){
			v=gA('echo').split(" ");
			this.innerHTML = '';
			for(i=0;i<v.length;i++){
				this.insertAdjacentHTML('beforeend',(o[v[i]]?o[v[i]]:code));
				this.lastElementChild.id = v[i];
			}
		}
	}
})})();
//Written by Tygari Katarana Davis
