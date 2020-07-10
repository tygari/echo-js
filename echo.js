if (!!window.MutationObserver){//Checks if Mutation Observer is supported by Browser
	(new MutationObserver(M=>{//Sets an Observer on the HTML tag to watch for all new tags added and initialize an Observer on all tags with the ECHO attribute.
		let O = {
			CR:`color:red`,
			CB:`color:blue`,
			CO:`color:orange`,
			NULL:x=>(x !== null && x !== undefined),
			GET:(E,x)=>(E.getAttribute(x)),
			SET:(E,x,y)=>(E.setAttribute(x,y)),
			ARR:x=>(Array.isArray(x)),
			TRIM:x=>(x.trim().replace(/\s\s+|\r|\n|\t|\f|\v|[,]/g,` `)),//Replaces all white space with a single space
			SPLIT:x=>(O.TRIM(x).split(` `)),
			WIN:x=>{//Searches the Window Object for a passed pathway
				try {
					return x.replace(/['"`]/g,'').split('.').reduce(
						(o,r)=>(!r ? o : r.split('[').reduce(
							(o,r,i)=>(!r ? o : (o[r.slice(0, i ? -1 : r.length)])),o)),window);
				}
				catch(e){return false}
			},
			EVAL:x=>{//Warning!!! Becareful!!!
				try {if (!!eval(x)){return true}}
				catch(e){return false}
			},
			CODE:(E,x)=>{//Reads and converts the Code attribute code string
				O.CHK = false;
				if (!!O.WIN(x)){//Searches the Window Object for a varaible stored Code resource.
					x = O.WIN(x);
					O.CHK = true;
				}
				else if (O.EVAL(x)){x = O.TRIM(eval(x).innerHTML)}//Checks if the Code string is readable Javascript Code and converts it if it is.
				else {x = O.GET(E,`code`)}
				x = ``+x;
				if (!x.startsWith(`<`) || !x.endsWith(`>`)){//Verifies that the final HTML code is properly opened and closed.
					console.log(E.outerHTML);
					x ? console.log(`%cERROR: ATTRIBUTE "code" %c${x} %cis not a proper HTML code string.  %cDefaulting to: %c<div></div>%c.`,O.CR,O.CB,O.CR,O.CO,O.CB,O.CO)
						 : console.log(`%cERROR: TAG <echo-> is missing ATTRIBUTE "code". %cDefaulting to: %c<div></div>%c.`,O.CR,O.CO,O.CB,O.CO);
					x =`<div></div>`;
					O.CHK = false;
				}
				if (O.CHK){O.AUTO(E,`code`,x)}//Initiates the Auto function for watched varaibles
				return x;
			},
			ECHO:(E,x,y=false)=>{
				O.CHK = false;
				if (x !== `` && !!O.WIN(x)){O.CHK = O.WIN(x);}//Searches the Window Object for a varaible stored Echo resource.
				if (typeof O.CHK == `string`){
					x = O.SPLIT(O.CHK);
					y = true;
				}
				else if (O.ARR(O.CHK)){//Checks if the ECHO attribute is passed an array by a varaible
					x = O.CHK;
					y = true;
				}
				else if (typeof O.CHK === `object` && O.NULL(O.CHK) && !(O.CHK instanceof Element)){//Checks if the ECHO attribute is passed an object by a varaible
					O.VALUE = [];
					for (O.INC in O.CHK){O.VALUE.push(``+O.INC)}
					x = O.VALUE;
					y = true;
				}
				else if (x.startsWith(`[`) && x.endsWith(`]`)){//Checks if the ECHO attribute is SET with an array. and converts it
					x = x.replace(/[,]/g,' ').replace(/['"\[\]]/g,'');
					x = O.SPLIT(x);
				}
				if (!O.ARR(x)){x = O.SPLIT(x)}//Converts a word string list to an array
				if (y == true){O.AUTO(E,`echo`,O.CHK)}//Initiates the Auto function for watched varaibles
				return x;//Returns the final array
			},
			AUTO:(E,x,y)=>{//Sets up a timer to auto detect for changes for a varable stored ECHO attribute target
				if (O.GET(E,`auto`) === `true` && O.WIN(O.GET(E,x)) !== y){
					y = O.WIN(O.GET(E,x));
					O.SET(E,x,O.GET(E,x));
				}
				else {E[`${x}Auto`] = setTimeout(O.AUTO,25,E,x,y)}
			},
			WATCH:E=>{
				(new MutationObserver(R=>{
					R = R[0];
					O.OBJ = {};
					E.echoAuthor = `Tygari Katarana Davis`; //Author's Signature, Please Do Not Remove
					E.echoWatch = true; // Boolean to prevent multiple Observers on an element
					E.echoSet =x=>(O.SET(E,`echo`,x));//Retrieves the ECHO attribute string
					E.echo = O.GET(E,`echo`); // HTML Echo Attribute Retrival
					if (E.echo !== `[object Object]`){  //Check that HTML Echo Attribtue was not passed an Object directly
						if (R.attributeName === `echo` && E.oldArray){//Check that both requirements to store prechange values are present
							E.oldArray.forEach(v=>{if (!!E.children[v]){O.OBJ[v] = E.children[v].outerHTML}});//Store OldValue Data within an Object
						}
						if (E.hasAttribute(`echo`)){
							O.CHK = O.ECHO(E,E.echo);//Converts the ECHO attribute string to an array
							O.CHK.forEach((v,i,a)=>{a[i] = O.TRIM(v).replace(/ /g,``)});//removes all white space within the array
							O.CHK = O.CHK.filter(x=>{return x.length > 0});// filters out all zero lenth array values
							if (JSON.stringify(O.CHK) !== JSON.stringify(E.echoArray)){//Checks for changes from the old Array and the new Array.
								E.oldArray = E.echoArray = O.CHK;//Stores the final Array within the Element Object and a backup
								E.code = O.GET(E,`code`);//Retrieves the CODE attribute string
								E.codeHTML = O.CODE(E,E.code);//Store a the finalized HTML CODE attribute string within the Element Object
								E.innerHTML = ``;//Deletes all Children
								for(O.INC = 0; O.INC < E.echoArray.length; O.INC++){//Adds all Children based on NewValue and OldValue
									O.CHK = E.echoArray[O.INC];
									if (typeof O.CHK !== `object` && O.NULL(O.CHK)){
										O.CHK = ``+O.CHK
										if (!!document.getElementById(O.CHK)){
											console.log(`%cERROR%c: ID ${O.CHK} has multiple instances.`,O.CR,O.CO)
										}
										E.insertAdjacentHTML( `beforeend` , (O.OBJ[O.CHK] ? O.OBJ[O.CHK] : E.codeHTML));
										E.lastElementChild.id = O.CHK;
									} else {console.log(`%cERROR%c: Invalid ID Data Type.`,O.CR,O.CO)}
								}
								for (O.INC of R.target.querySelectorAll(`[echo]`)){//Checks all children for ECHO Attribute and initiates Observer
									if (O.INC.echoWatch !== true){
										O.WATCH(O.INC);
										O.SET(O.INC,`echo`,O.GET(O.INC,`echo`));
									}
								}
							}
						}
					} else {
						console.log(`%cERROR%c: An object literal was passed as a string, resulting in echo="[object Object]".  HTML cannot process object literals.`,O.CR,O.CO);
					}
				}).observe(E,{ // Attaches Observer to individual Element for waching and controlling Attribute Echo and Code
					attributes: true,
					attributeFilter: [`echo`,`code`],
					attributeOldValue: true,
					childList: false,
				}));
			},
		}
		for (O.INC of M){//Check of the Document for Initializing ECHO Observers
			O.INC = O.INC.type === `childList` ? O.INC.addedNodes[0] : O.INC.target;
			if (O.INC && O.INC.attributes && O.INC.hasAttribute(`echo`) && O.INC.echoWatch !== true){
				O.WATCH(O.INC);
				O.SET(O.INC,`echo`,O.GET(O.INC,`echo`));
			}
		}
		window.addEventListener(`load`,()=>{//Final check of the loaded Document for Initializing ECHO Observers
			for (O.INC of document.querySelectorAll(`[echo]`)){
				if (O.INC.echoWatch !== true){
					O.WATCH(O.INC);
				}
				O.SET(O.INC,`echo`,O.GET(O.INC,`echo`));
			}
		});
	})).observe(document.getElementsByTagName(`html`)[0],{ //Attaches Oberserver to HTML to watch for new Elements and additions of the Echo Attribute
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: [`echo`],
	});
} else {console.log(`%cERROR%c: MUTATION OBSERVER is Disabled`,O.CR,O.CO)}
