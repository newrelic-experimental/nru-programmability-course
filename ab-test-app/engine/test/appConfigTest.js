var assert = require('assert')
var appConfig = require('../appConfig')

describe(`AppConfig Test`, function () {
    it(`should have an id`, function() {
        var appConfig = AppConfigTest.givenAppConfig("identity1")
        assert.equal(appConfig.getAppId(), "identity1")
    })

    it(`should have a port`, function() {
        var appConfig = AppConfigTest.givenAppConfig("identity1", 3004)
        assert.equal(appConfig.getPort(), 3004)
    })

    it(`should have delayStartMs`, function() {
        var appConfig = AppConfigTest.givenAppConfig("identity1", 3004, 150)
        assert.equal(appConfig.getDelayStartMs(), 150)
    })

    it(`should have a single dependency`, function() {
        var appConfig = AppConfigTest.givenAppConfig("identity1", 3004, 0, [{"id":"app2", urls:["https://somewhere.newrelic.com/api"]}])
        var dependencyEndpoints = appConfig.getDependencyEndpoint("/endpoint1")
        assert.equal(dependencyEndpoints.length, 1)
        assert.equal(dependencyEndpoints[0], "https://somewhere.newrelic.com/api/endpoint1")
    })
    
    it(`should fetch all single dependency urls`, function() {
        var appConfig = AppConfigTest.givenAppConfig("identity1", 3004, 0, [{"id":"app2", urls:["https://somewhere.newrelic.com/api", "https://else.newrelic.com/api"]}])
        var dependencyEndpoints = appConfig.getDependencyEndpoint("/endpoint1")
        assert.equal(dependencyEndpoints.length, 2)
        assert.equal(dependencyEndpoints[0], "https://somewhere.newrelic.com/api/endpoint1")
        assert.equal(dependencyEndpoints[1], "https://else.newrelic.com/api/endpoint1")
    })

    it(`should have all dependencies`, function() {
        var appConfig = AppConfigTest.givenAppConfig("identity1", 3004, 0, [{"id":"app2", urls:["https://somewhere.newrelic.com/api"]},{"id":"app3", urls:["https://else.newrelic.com/api"]}])
        var dependencyEndpoints = appConfig.getDependencyEndpoint("/endpoint1")
        assert.equal(dependencyEndpoints.length, 2)
        assert.equal(dependencyEndpoints[0], "https://somewhere.newrelic.com/api/endpoint1")
        assert.equal(dependencyEndpoints[1], "https://else.newrelic.com/api/endpoint1")
    })
})

class AppConfigTest{
    static givenAppConfig(id, port = 3000, delayStartMs = 0, dependencies = null){
        var raw = {
            "id": id,
            "port": port,
            "delayStartMs": delayStartMs
        }
        if (dependencies != null && dependencies.length>0){
            raw["dependencies"] = dependencies
        }
        var json = JSON.stringify(raw)
        return new appConfig("", function(){return JSON.parse(json)})
    }
}

module.exports = AppConfigTest
