![echo-js](https://scontent.fewr1-3.fna.fbcdn.net/v/t1.15752-9/89195605_239495867216251_4865512654271152128_n.png?_nc_cat=101&_nc_sid=b96e70&_nc_ohc=SFFnce9USQYAX-QXAW5&_nc_ht=scontent.fewr1-3.fna&oh=1f52d93391a4c7c0d61b69ecdb9e20a8&oe=5E839849)



Script Link: https://cdn.jsdelivr.net/gh/tygari/echo-js/echo.min.js

## What is Echo-JS? 

Echo-JS is simple to use Attributes that create children based on a single line of code given for a list of ID's provided to it.

## Why Echo-JS? 

**Echo-JS gives you exact control over the position of all of the elements to arrange however you choose!** 

JavaScript has lots of ways to add/rearrange/delete elements within an array, however, when you implement those into the DOM.  The tools can sometimes break down and can create other challenges where precisely manipulating objects is needed. Echo-JS can solve those challenges! 

Echo-JS allows you to rearrange the elements of children as an array within the DOM. 


## How It Works 

Echo-js uses 3 new attributes 'echo' , 'code' , and 'auto'

Attribute 'echo' holds a list of words meant to become the ID's of the repeated code stored in the attribute 'code'.
Attribute 'code' holds the string of code that will be repeated and given the ID's stored in 'echo'.
Attribute 'auto' holds a boolean and sets a watch on global variables assigned to the element for automatic retrieval and updating.
All attributes are optional and recognized seperately.

Web Element Extra Data
```
  this.echo = 'echo' Attribute String
  this.code = 'code' Attribute String
  this.auto = 'auto' Attribute String
  this.echoArray = Array created from 'echo' Attribute String
  this.codeHTML = String created from 'code'Attribute String
  this.echoAuto = Stores 'echo' Attribute Watch Timer
  this.codeAuto = Stores 'code' Attribute Watch TImer
```

## Examples

Below are examples on how to implement Echo-JS into your application 

### Example: 

### HTML:
```html
  <div echo="bar foo barfoo" code="<span></span>"></div>
```

### HTML Result:
```html
  <div echo="bar foo barfoo" code="<span></span>">
    <span id="bar"></span>
    <span id="foo"></span>
    <span id="barfoo"></span>
  </div>
```

IF 'echo' is not provided nothing will happen.
IF 'code' is not provided it will default to '< div></ div>'.

'echo' and 'code' can be altered by javascript with the .setAttribute() command.

The order of the children will ALWAYS match the order listed within 'echo'.
Reordering the the ID list within 'echo' will result in a reorder of the children within the DOM to match.
Any data passed to the children or if the children are altered from the orginal code will be preserved within a reordering.
Adding a new ID word to 'echo' will add a new element based on 'code' as a child as per the 'echo' order.
Deleting an ID word from 'echo' will result in the deleting of the element from the children.

## Example:
Children altered to have different text and colors.

### Before:
```html
  <div echo="bar foo barfoo" code="<span></span>">
    <span id="bar" style="color:red">bar</span>
    <span id="foo" style="color:yellow">foo</span>
    <span id="barfoo" style="color:blue">barfoo</span>
  </div>
```

### Alter:
```javascript
  document.getElementsByTagName("div")[0].setAttribute("echo", "foobar barfoo foo")
```

### After:
```html
  <div echo="foobar barfoo foo" code="<span></span>">
    <span id="foobar"></span>
    <span id="barfoo" style="color:blue">barfoo</span>
    <span id="foo" style="color:yellow">foo</span>
  </div>
```

'echo' can be assigned with an array.
"[bar, foo, barfoo]" will work both inliine and with .setAttribute().
[bar, foo, barfoo] will work with .setAttribute().

## Example:

### HTML:
```html
  <div echo="[bar, foo, barfoo]" code="<span></span>"></div>
```

### HTML Result:
```html
  <div echo="bar foo barfoo" code="<span></span>">
    <span id="bar"></span>
    <span id="foo"></span>
    <span id="barfoo"></span>
  </div>
```

'echo' can be passed global variables via the name of the variable as a string.

## Example:

### HTML:
```html
  <div echo="bar" code="<span></span>"></echo->
```

### Alter:
```javascript
  var bar = 'bar foo barfoo'
  var foo = [bar, foo, barfoo]
  document.getElementsByTagName("div")[0].setAttribute("echo", 'bar')
```

### HTML Result:
```html
  <div echo="bar" code="<span></span>">
    <span id="bar"></span>
    <span id="foo"></span>
    <span id="barfoo"></span>
  </div>
```

'echo' can be passed Global Variable Arrays designations.

## Example:

### HTML:
```html
  <div echo="barfoo[0]" code="<span></span>"></div>
```

### Alter:
```javascript
  var barfoo = [['bar', 'foo']]
  document.getElementsByTagName("div")[0].setAttribute("echo", 'barfoo[0]')
```

### HTML Result:
```html
  <div echo="'barfoo[0]'" code="<span></span>">
    <span id="bar"></span>
    <span id="foo"></span>
  </div>
```

Passing 'echo' the string name of an object will set the object keys as children.

## Example:

### HTML:
```html
  <div echo="barfoo" code="<span></span>"></div>
```

### Alter:
```javascript
  var barfoo = {
      bar: 'one',
      foo: 'two',
      foobar: 'three',
  }
  document.getElementsByTagName("div")[0].setAttribute("echo", 'barfoo')
```

### HTML Result:
```html
  <div echo="barfoo" code="<span></span>">
    <span id="bar"></span>
    <span id="foo"></span>
    <span id="foobar"></span>
  </div>
```

Passing 'echo' a string of an Object Dot Notation and/or Bracket Notation will retieve the data from within a Global Variable Literal.

## Example:

### HTML:
```html
  <div echo="barfoo.foobar" code="<span></span>"></div>
  <div echo="barfoo['foobar']" code="<span></span>"></div>
```

### Alter:
```javascript
  var barfoo = {
      foobar: 'foo bar',
  }
  document.getElementsByTagName("div")[0].setAttribute("echo", 'barfoo')
```

### HTML Result:
```html
  <div echo="barfoo.foobar" code="<span></span>">
    <span id="bar"></span>
    <span id="foo"></span>
  </div>
```

If the variable is a global variable before load completes 'echo' will retrieve it automaticly.
After load completes 'echo' ceases auto variable retrival.

## Example:
```javascript
  var bar = 'will be auto retrived'
  window.addEventListener("load",()=>{
     var foo = 'will not be auto retrieved'
  })
```

Altering the 'code' attribute deletes all children elements and resets them with the new code provided.

## Example:
### Before:
```html
  <div echo="foobar barfoo foo" code="<span></span>">
    <span id="foobar"></span>
    <span id="barfoo" style="color:blue">barfoo</span>
    <span id="foo" style="color:yellow">foo</span>
  </div>
```

### Alter:
```javascript
  document.getElementsByTagName("div")[0].setAttribute("code", "<p></p>")
```

### After:
```html
  <div echo="foobar barfoo foo" code="<p></p>">
    <p id="foobar"></p>
    <p id="barfoo"></p>
    <p id="foo"></p>
  </div>
```

# Using a HTML Template Tag code

## Example:
### Before:
```html
   <template><span></span></template>
   <div echo="bar foo barfoo" code="document.getElementsByTagName('template')[0]"></div>
```

### After:
```html
  <template><span></span></template>
  <div echo="bar foo barfoo" code="document.getElementsByTagName('template')[0]">
    <span id="bar"></span>
    <span id="foo"></span>
    <span id="barfoo"></span>
  </div>
```

# Using 'auto' Attribute to Auto Update

## Example:
### Before:
```javascript
  var barfoo = 'bar foo foobar';
```
```html
   <template><span></span></template>
   <div echo="barfoo" code="<span></span>" auto="true">
    <span id="bar"></span>
    <span id="foo"></span>
    <span id="foobar"></span>
  </div>
```

### Alter:
```javascript
  barfoo = 'foo foobar bar';
```

### After:
```html
  <template><span></span></template>
  <div echo="bar foo barfoo" code="<span></span>" auto="true">
    <span id="foo"></span>
    <span id="barfoo"></span>
    <span id="bar"></span>
  </div>
```
