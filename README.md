# casscadeJS
CasscadeJS is a simple to use Custom Element that creates children based on a single line of code given for a list of ID's provided to it.

CasscadeJS uses 2 new attributes 'echo' and 'code'

The new tag '<cass-cade>' is what is used for this new element.
Attribute 'echo' holds a list of words meant to become the ID's of the repeated code stored in the attribute 'code'.
Attribute 'code' holds the string of code that will be repeated and given the ID's stored in 'echo'.

Example:
HTML:
```html
  <cass-cade echo="bar foo barfoo" code="<span></span>"></cass-cade>
```

HTML Result:
```html
  <cass-cade echo="bar foo barfoo" code="<span></span>">
    <span id="bar"></span>
    <span id="foo"></span>
    <span id="barfoo"></span>
  </cass-cade>
```

IF 'echo' is not provided nothing will happen.
IF 'code' is not provided it will default to '< div></ div>'.

'echo' and 'code' can be altered by javascript with the .setAttribute() command.

The order of the children will ALWAYS math the order listed within 'echo'.
Reordering the the ID list within 'echo' will result in a reorder of the children within the DOM to match.
Any data passed to the children or if the children are altered from the orginal code will be preserved within a reordering.
Adding a new ID word to 'echo' will add a new element based on 'code' as a child as per the 'echo' order.
Deleting an ID word from 'echo' will result in the deleting of the element from the children.

Example:
Children altered to have different text and colors.

Before:
```html
  <cass-cade echo="bar foo barfoo" code="<span></span>">
    <span id="bar" style="color:red">bar</span>
    <span id="foo" style="color:yellow">foo</span>
    <span id="barfoo" style="color:blue">barfoo</span>
  </cass-cade>
```

Alter:
```js
  document.getElementsByTagName("cass-cade")[0].setAttribute("echo", "foobar barfoo foo")
```

After:
```html
  <cass-cade echo="foobar barfoo foo" code="<span></span>">
    <span id="foobar"></span>
    <span id="barfoo" style="color:blue">barfoo</span>
    <span id="foo" style="color:yellow">foo</span>
  </cass-cade>
```

Altering the 'code' attribute deletes all children elements and resets them with the new code provided.

Example:
Before:
```html
  <cass-cade echo="foobar barfoo foo" code="<span></span>">
    <span id="foobar"></span>
    <span id="barfoo" style="color:blue">barfoo</span>
    <span id="foo" style="color:yellow">foo</span>
  </cass-cade>
```

Alter:
```javascript
  document.getElementsByTagName("cass-cade")[0].setAttribute("code", "<p></p>")
```

After:
```html
  <cass-cade echo="foobar barfoo foo" code="<p></p>">
    <p id="foobar"></p>
    <p id="barfoo"></p>
    <p id="foo"></p>
  </cass-cade>
```
