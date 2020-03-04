# echo-js
Script Link: https://cdn.jsdelivr.net/gh/tygari/echo-js@latest/echo.min.js

Echo-js is a simple to use Custom Element that creates children based on a single line of code given for a list of ID's provided to it.

Echo-js uses 2 new attributes 'echo' and 'code'

The new tag "< echo- >" is what is used for this new element.
Attribute 'echo' holds a list of words meant to become the ID's of the repeated code stored in the attribute 'code'.
Attribute 'code' holds the string of code that will be repeated and given the ID's stored in 'echo'.

Example:
HTML:
```html
  <echo- echo="bar foo barfoo" code="<span></span>"></echo->
```

HTML Result:
```html
  <echo- echo="bar foo barfoo" code="<span></span>">
    <span id="bar"></span>
    <span id="foo"></span>
    <span id="barfoo"></span>
  </echo->
```

IF 'echo' is not provided nothing will happen.
IF 'code' is not provided it will default to '< div></ div>'.

'echo' and 'code' can be altered by javascript with the .setAttribute() command.

The order of the children will ALWAYS match the order listed within 'echo'.
Reordering the the ID list within 'echo' will result in a reorder of the children within the DOM to match.
Any data passed to the children or if the children are altered from the orginal code will be preserved within a reordering.
Adding a new ID word to 'echo' will add a new element based on 'code' as a child as per the 'echo' order.
Deleting an ID word from 'echo' will result in the deleting of the element from the children.

Example:
Children altered to have different text and colors.

Before:
```html
  <echo- echo="bar foo barfoo" code="<span></span>">
    <span id="bar" style="color:red">bar</span>
    <span id="foo" style="color:yellow">foo</span>
    <span id="barfoo" style="color:blue">barfoo</span>
  </echo->
```

Alter:
```javascript
  document.getElementsByTagName("echo-")[0].setAttribute("echo", "foobar barfoo foo")
```

After:
```html
  <echo- echo="foobar barfoo foo" code="<span></span>">
    <span id="foobar"></span>
    <span id="barfoo" style="color:blue">barfoo</span>
    <span id="foo" style="color:yellow">foo</span>
  </echo->
```

Altering the 'code' attribute deletes all children elements and resets them with the new code provided.

Example:
Before:
```html
  <echo- echo="foobar barfoo foo" code="<span></span>">
    <span id="foobar"></span>
    <span id="barfoo" style="color:blue">barfoo</span>
    <span id="foo" style="color:yellow">foo</span>
  </echo->
```

Alter:
```javascript
  document.getElementsByTagName("echo-")[0].setAttribute("code", "<p></p>")
```

After:
```html
  <echo- echo="foobar barfoo foo" code="<p></p>">
    <p id="foobar"></p>
    <p id="barfoo"></p>
    <p id="foo"></p>
  </echo->
```

Using a HTML Template Tag code

Example:
Before:
```html
   <template><span></span></template>
   <echo- echo="bar foo barfoo" code="document.getElementsByTagName('template')[0]"></echo->
```

After:
```html
  <template><span></span></template>
  <echo- echo="bar foo barfoo" code="document.getElementsByTagName('template')[0]">
    <span id="bar"></span>
    <span id="foo"></span>
    <span id="barfoo"></span>
  </echo->
```
