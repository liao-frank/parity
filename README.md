# Parity
A web app solution to consolidating data parity.

This framework provides a React CMS interface and an Express.js API service for managing a many-to-many relationship.

## Installation
```
$ git clone https://fliao@code.squarespace.net/scm/~fliao/parity.git
$ git remote rm origins
$ cd parity

$ npm install
```

## Running Parity
```
$ npm run build:react
$ npm run start:api
```

Visit http://localhost:6008/ to view Parity.

## Development
### Setup
```
// start Parity service as normal.
$ npm run start:api

// start React dev server
$ npm run start:react
```

Visit http://localhost:3000/ to start watching.

### Writing `Half` models
The objective of Parity is to manage connections between two "halves" of a many-to-many relationship. You, the framework user, must define two models that represent these two halves. A `Half` can be visualized as an aggregate model of many "items", each of which can connect to other items in the other `Half`.


`Half` models can be defined as objects that must expose the following properties:
```
{
  /*
    A human-readable title for the half.
   */
  'title': String,

  /*
    A function that handles data retrieval on initial population, and on refresh.
    Use the provided callback with format `callback(err, itemMap)`.

    The `itemMap` should be an object mapping of `_parityId`s  to respective
    `Item` representations (see section below).
   */  
  'fetch': Function(callback),

  /*
    A function that returns a rendering of a visual representation of a given item
    representation. Feel free to import your own components here.
   */
  'renderItem': Function(item)
}
```

### The `Item` representation
Items are just object representations of singular entities within each half. You may keep whatever data in these objects that you need to render a good visual representation. However, Parity requires the following properties in order to handle these items correctly:
```
{
  /*
    A unique identifier for the item.
   */
  _parityId: String,

  /*
    A human-readable title of the item.
   */
  _parityName: String,

  ...otherPropsYouNeed
}
```

### Adding your `Half` models to Parity
Within `src/index.js`, import your two `Half` models and add them as props to the `Parity` component instance. Order doesn't matter here; the focused half is toggle-able in the app.
```
<Parity
  LeftHalf={YourHalfModel}
  RightHalf={YourOtherHalfModel}
/>
```
