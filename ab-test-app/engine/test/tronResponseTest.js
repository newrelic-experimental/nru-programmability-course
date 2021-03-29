var assert = require('assert')
var tronResponse = require('../tronResponse')
var appConfigTest = require('./appConfigTest')

describe(`TronResponse Test`, function () {
    it(`should create default config before tron response`, function() {
        TronResponseTest.givenTronResponse()
        assert.equal(appConfig.getAppId(), "identity1")
    })

    it(`should set and get trace header`, function() {
        const tron = TronResponseTest.givenTronResponse()
        tron.setTraceHeader("me")
        assert.equal(tron.getTraceHeader(), "me")
    })

    it(`should get http request header value`, function() {
        const tron = TronResponseTest.givenTronResponse()
        const request = TronResponseTest.givenHttpRequest()
        request.set_header("X-DEMOTRON-TRACE", "abc123")
        var value = tron.getTraceHttpRequestHeader(request)
        assert.equal(value, "abc123")
    })

    it(`should get http reponse header value`, function() {
        const tron = TronResponseTest.givenTronResponse()
        const response = TronResponseTest.givenHttpResponse()
        response.set_header("X-DEMOTRON-TRACE", "abc123")
        var value = tron.getTraceHttpResponseHeader(response)
        assert.equal(value, "abc123")
    })



    it(`should not find header that is not passed in from caller`, function() {
        const tron = TronResponseTest.givenTronResponse()
        const request = TronResponseTest.givenHttpRequest()
        tron.addDemoHeaders(request)
        assert.equal(tron.getHeader("X-DEMO-SOMETHING"), undefined)
    })

    it(`should find header that is passed in from caller`, function() {
        const tron = TronResponseTest.givenTronResponse()
        const request = TronResponseTest.givenHttpRequestWithHeader("X-DEMO-SOMETHING","1")
        tron.addDemoHeaders(request)
        assert.equal(tron.getHeader("X-DEMO-SOMETHING"), 1)
    })


    it(`should NOT add trace when not in request`, function() {
        const tron = TronResponseTest.givenTronResponse()
        const request = TronResponseTest.givenHttpRequest()
        var added = tron.addMyTraceHeader(request)
        assert.equal(added, false)
        assert.equal(tron.getTraceHeader(), undefined)
    })

    it(`should NOT add trace when not in request`, function() {
        const tron = TronResponseTest.givenTronResponse()
        const request = TronResponseTest.givenHttpRequest()
        var added = tron.addMyTraceHeader(request)
        assert.equal(added, false)
        assert.equal(tron.getTraceHeader(), undefined)
    })

    it(`should append downstream trace`, function() {
        const tron = TronResponseTest.givenTronResponse()
        tron.setTraceHeader("me")
        const response = TronResponseTest.givenHttpResponse()
        response.set_header("X-DEMOTRON-TRACE", "abc123")
        var added = tron.appendTrace(response)
        assert.equal(added, true)
        assert.equal(tron.getTraceHeader(), "me,abc123")
    })
})

var appConfig = null
class TronResponseTest{
    static givenAppConfig(id, port = 3000, dependencies = null){
        appConfig = appConfigTest.givenAppConfig(id, port, dependencies)
    }

    static givenTronResponse(){
        if (appConfig == null){
            this.givenAppConfig("identity1")
        }
        return new tronResponse(function() {return appConfig})
    }

    static givenHttpRequest(){
        return new HttpRequestTest()
    }

    static givenHttpRequestWithHeader(headerKey, headerValue){
        var request = new HttpRequestTest()
        request.set_header(headerKey,headerValue)
        return request
    }

    static givenHttpResponse(){
        return new HttpResponseTest()
    }
}

class HttpRequestTest{
    constructor(){
        this.headers = new Object()
    }

    header(key){
        var value = this.headers[key]
        return value
    }

    set_header(key, value){
        this.headers[key] = value
    }
}

class HttpResponseTest{
    constructor(){
        this.headerInstance = new HttpHeaderTest()
    }

	get headers() {
        return this.headerInstance
    }

    set_header(key, value){
        this.headerInstance.set(key, value)
    }
}

class HttpHeaderTest{
    constructor(){
      this.headerMap = new Map()
    }
    get(key){
        return this.headerMap.get(key)
    }
    set(key, value){
        this.headerMap.set(key, value)
    }
}

module.exports = TronResponseTest
