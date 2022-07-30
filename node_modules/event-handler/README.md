# Event Handler

## Usage

With this library you can listen in on native scroll events the same way you would if a user was scrolling the
page with a mouse or touch event.

```javascript
var obj = {};
EventHandler.createTarget(obj);

// listen to events
obj.addEventListener('wee', function () {
    // wee was trigger!
});

obj.dispatchEvent('wee');

EventHandler.destroyTarget(obj);

```