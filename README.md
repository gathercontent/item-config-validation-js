# Item Configuration Validation (JS)
Validation for the Item Configuration in the client.

### Isolated usage

Include `configValue.js` and use it like so:

```js
validateConfig().validateAll(config);
```

This will run all existing validations and return `true` if they all pass,
or `false` if one of them breaks.

To debug which ones are failing, send a `true` argument for `debug` when initializing the
validation.

```js
validateConfig(true).validateAll(config);
```

Or run each test invidually.

### Running the tests

Tests have two dependencies: Chai and Mocha. To install them locally, run:

```bash
npm install
```

And open the `index.html` file inside the `spec` folder.

