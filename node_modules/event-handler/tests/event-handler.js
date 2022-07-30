var sinon = require('sinon');
var TestUtils = require('test-utils');
var assert = require('assert');

describe('Event Handler', function () {

    it('registering an event listener on an object and then triggering it calls the listener function', function () {
        var EventHandler = require('../src/event-handler');
        var eventName = 'test:event';
        var eventObj = {};
        EventHandler.createTarget(eventObj);
        var eventListener = sinon.spy();
        eventObj.addEventListener(eventName, eventListener);
        eventObj.dispatchEvent(eventName);
        assert.equal(eventListener.callCount, 1);
        EventHandler.destroyTarget(eventObj);
    });

    it('un-registering an event listener on an object and then triggering it does not call the listener function', function () {
        var EventHandler = require('../src/event-handler');
        var eventName = 'my:event';
        var eventObj = {};
        EventHandler.createTarget(eventObj);
        var eventListener = sinon.spy();
        eventObj.addEventListener(eventName, eventListener);
        eventObj.removeEventListener(eventName, eventListener);
        eventObj.dispatchEvent(eventName);
        assert.equal(eventListener.callCount, 0);
        EventHandler.destroyTarget(eventObj);
    });

    it('should call a listener who has been added to an object, even if createTarget is called on it again', function () {
        var EventHandler = require('../src/event-handler');
        var eventName = 'evt:event2';
        var eventObj = {};
        var eventListener = sinon.spy();
        EventHandler.createTarget(eventObj);
        eventObj.addEventListener(eventName, eventListener);
        EventHandler.createTarget(eventObj);
        eventObj.dispatchEvent(eventName);
        assert.equal(eventListener.callCount, 1);
        EventHandler.destroyTarget(eventObj);
    });

    it('should not call a listener after its target is destroyed', function () {
        var EventHandler = require('../src/event-handler');
        var eventName = 'destroyed:event';
        var eventObj = {};
        EventHandler.createTarget(eventObj);
        var eventListener = sinon.spy();
        eventObj.addEventListener(eventName, eventListener);
        eventObj.removeEventListener(eventName, eventListener);
        EventHandler.destroyTarget(eventObj);
        eventObj.dispatchEvent(eventName);
        assert.equal(eventListener.callCount, 0);
    });

    it('registering multiple event listeners on an object and then triggering it calls each listener function', function () {
        var EventHandler = require('../src/event-handler');
        var eventName = 'test:event';
        var eventObj = {};
        EventHandler.createTarget(eventObj);
        var firstEventListener = sinon.spy();
        var secondEventListener = sinon.spy();
        eventObj.addEventListener(eventName, firstEventListener);
        eventObj.addEventListener(eventName, secondEventListener);
        eventObj.dispatchEvent(eventName);
        assert.equal(firstEventListener.callCount, 1, 'first listener was called');
        assert.equal(secondEventListener.callCount, 1, 'second listener was called');
        EventHandler.destroyTarget(eventObj);
    });

});
