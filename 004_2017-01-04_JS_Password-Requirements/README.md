# #004 2017-01-04: Password requirements (JS)

**Features:**

- Simple password requirements
- Bloatfree, Vanilla & used HTML5 techniques.

**Usage:**

```html
<input type="password" name="password" required>
<div class="muted password-requirements">
    Your password should contain at least: 
    <span data-numbers="2">2 numbers</span>,
    <span data-uppercase="2">2 uppercase characters,</span>
    <span data-lowercase="3">3 lowercase characters,</span>
    <span data-special="1">1 special character</span>
    <span data-min-length="12">and be at least 12 characters long.</span>
</div>
```

The data attributes inside the class `.password-requirements` will be parsed and if the requirement is met, the span gets the class `.success`. The value of the data attributes is the minimum count of the characters.

Additionally the script builds a regex for the password field and sets a pattern attribute.

_This dynamic regex causes currently a small bug, due the regex isn't perfect. I have to learn more regex_ 😅 _(With the markup above as example, `A2a!Aa5bm!2a` will not be accepted, although it should)_

Available attributes:

- data-numbers
- data-uppercase
- data-lowercase
- data-special (Any char that is not A-z/0-9)
- data-min-length (whole password)


**Demo:**

https://codebrauer.github.io/27daysofcode/004_2017-01-04_JS_Password-Requirements/

--

Styled with [Wing](http://usewing.ml/)