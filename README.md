# jstry

*jstry* is a Ruby inspired library for safely accessing nested object properties in Javascript.

Ruby and Ruby on Rails provide ways of safely checking nested values: 

```ruby
@person = { :name => "Adama" }

# try
@person.try(:name).try(:title).try(:son) # Will return nil

# dig
@person.dig(:name, :title, :son) # Will return nil

```

Now take a simple Javascript object:

```javascript
var foo = {
    bar: {
      baz: "foobarbaz"
    }
  }
}

// This works
var fooBarBaz = foo.bar.baz // "foobarbaz"

// This will break your app
var fooBarStarbuckBaz = foo.bar.starbuck.baz // TypeError: undefined is not an object
```

With *jstry*:

```javascript
foo.try("bar").try("baz").unwrap() // "foobarbaz"
foo.try("bar").try("starbuck").try("baz").unwrap() // undefined

foo.tryAll("bar", "baz") // "foobarbaz"

trySafe(undefined, "bar", "baz") // undefined
```

## Installation

`npm install --save jstry`

*jstry* extends the functionality of whe javascript object so simply require the library somewhere in your project. If you want to use the `trySafe` function, then you can import it directly.

```javascript
require("jstry")

import { trySafe } from "jstry" // Only needed if using trySafe
```

## Usage

*jstry* provides three ways of unwrapping objects:

### `try` & `unwrap`

`try` is a way to lookup a single property on an object. It return a "wrapped" object where the value can be access with `.unwrap()`. That will either return the value or `undefined`.

```javascript
var foo = {
  bar: "foobar",
}
foo.try("bar").unwrap() // "foobar"
```

`try`s can also be chained together.

```javascript
var foo = {
  bar: {
    baz: "foobarbaz",
  },
}
foo.try("bar").try("baz").unwrap() // "foobarbaz"
foo.try("starbuck").try("baz").unwrap() // undefined
```

### `tryAll`

`tryAll` is a convenience function for long chains of `try`s. It takes any number of keys and does not need to be unwrapped.

```javascript
var foo = {
  bar: {
    baz: "foobarbaz",
  },
}
foo.tryAll("bar", "baz") // "foobarbaz"
foo.tryAll("starbuck", "baz") // undefined
```

### `trySafe`

Your code can still break if foo is `undefined` when `undefinedFoo.try("bar", "baz")` is executed. `trySafe` can be used to add another layer of safety.

```javascript
var foo = {
  bar: {
    baz: "foobarbaz",
  },
}
trySafe(foo, "bar", "baz") // "foobarbaz"
trySafe(foo, "starbuck", "baz") // undefined
trySafe(undefined, "bar", "baz") // undefined
```

## Contributing

Clone the repository!
