'use strict'
var assert = require('assert')
var behaviorRepository = require('../behaviors/repository')
const Behavior = require('../behaviors/behavior')

describe(`BehaviorRepository Test`, function () {


    it(`should find behavior by lookup PRE`, function() {
        var dictionary = givenDictionary()
        dictionary["X-DEMO-SOMETHING1-PRE"] = 1
        var repository = givenRepository(["SOMETHING1"])
        var behaviors = repository.getByRequest(dictionary, "PRE")
        assert.equal(behaviors.length, 1)
        assert.equal(behaviors[0].getName(), "SOMETHING1")
    })

    it(`should find behavior by service id`, function() {
        var dictionary = givenDictionary()
        dictionary["X-DEMO-SOMETHING1-PRE-SERVICE1"] = 1
        var repository = givenRepository(["SOMETHING1"], new TestConfigLoader())
        var behaviors = repository.getByRequest(dictionary, "PRE")
        assert.equal(behaviors.length, 1)
        assert.equal(behaviors[0].getName(), "SOMETHING1")
    })

    it(`should not find behavior by service id that doesn't exist`, function() {
        var dictionary = givenDictionary()
        dictionary["X-DEMO-SOMETHING1-PRE-SERVICE12"] = 1
        var repository = givenRepository(["SOMETHING1"], new TestConfigLoader())
        var behaviors = repository.getByRequest(dictionary, "PRE")
        assert.equal(behaviors.length, 0)
    })

    it(`should NOT find behavior by lookup PRE`, function() {
        var dictionary = givenDictionary()
        dictionary["X-DEMO-SOMETHING1-POST"] = 1
        var repository = givenRepository(["SOMETHING1"])
        var behaviors = repository.getByRequest(dictionary, "PRE")
        assert.equal(behaviors.length, 0)
    })

    it(`should find behavior by lookup POST`, function() {
        var dictionary = givenDictionary()
        dictionary["X-DEMO-SOMETHING1-POST"] = 1
        var repository = givenRepository(["SOMETHING1"])
        var behaviors = repository.getByRequest(dictionary, "POST")
        assert.equal(behaviors.length, 1)
        assert.equal(behaviors[0].getName(), "SOMETHING1")
    })

    it(`should NOT find behavior by lookup POST`, function() {
        var dictionary = givenDictionary()
        dictionary["X-DEMO-SOMETHING1-PRE"] = 1
        var repository = givenRepository(["SOMETHING1"])
        var behaviors = repository.getByRequest(dictionary, "POST")
        assert.equal(behaviors.length, 0)
    })

    it(`should NOT find behavior by lookup undefined`, function() {
        var dictionary = givenDictionary()
        dictionary["X-DEMO-ANOTHER-PRE"] = 1
        dictionary["X-DEMO-ANOTHER-POST"] = 1
        var repository = givenRepository(["SOMETHING1"])
        var behaviors = repository.getByRequest(dictionary, "POST")
        assert.equal(behaviors.length, 0)
    })

    it(`should find many behaviors by lookup`, function() {
        var dictionary = givenDictionary()
        dictionary["X-DEMO-SOMETHING1-PRE"] = 1
        dictionary["X-DEMO-ANOTHER-PRE"] = 1
        var repository = givenRepository(["SOMETHING1", "ANOTHER"])
        var behaviors = repository.getByRequest(dictionary, "PRE")
        assert.equal(behaviors.length, 2)
    })

    it(`app id behavior should override general behavior`, function() {
        var dictionary = givenDictionary()
        dictionary["X-DEMO-SOMETHING1-PRE"] = 1
        dictionary["X-DEMO-SOMETHING1-PRE-SERVICE1"] = 2
        var repository = givenRepository(["SOMETHING1"])
        var behaviors =  repository.getByRequest(dictionary, "PRE")
        assert.equal(behaviors[0].getValue(), 2)
    })

    it(`app id behavior should override general behavior different order`, function() {
        var dictionary = givenDictionary()
        dictionary["X-DEMO-SOMETHING1-PRE-SERVICE1"] = 2
        dictionary["X-DEMO-SOMETHING1-PRE"] = 1
        var repository = givenRepository(["SOMETHING1"])
        var behaviors =  repository.getByRequest(dictionary, "PRE")
        assert.equal(behaviors[0].getValue(), 2)
    })
})

function givenRepository(behaviors = ["TEST"], configLoader = new TestConfigLoader()) {
    return new behaviorRepository(
        behaviors, 
        (name, value) => new Behavior(name, value), 
        (dic, key) => dic[key],
        () => configLoader
    )
}

function givenDictionary() {
    return {}
}

class TestConfigLoader{
    constructor(){
    }
    getAppId(){
        return "SERVICE1"
    }
}