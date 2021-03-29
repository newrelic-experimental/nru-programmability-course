'use strict'

const { v4: uuid } = require('uuid')
const logger = require('./common/logger')

/**
 * Manages subscriptions
 **/
class SubscriptionManager {
  constructor(appConfig) {
    const unsubRates = appConfig.getUnsubRates()
    const rolloverThreshold = appConfig.getRolloverThreshold()
    this._validateConfiguration(unsubRates, rolloverThreshold)

    this._subs = []
    this._aUnsubRate = unsubRates.a
    this._bUnsubRate = unsubRates.b
    this._rolloverThreshold = rolloverThreshold
    this._weightedRandomFn = this._initWeightedRandomFunction(unsubRates.b)
  }

  /**
   * Returns all subscriptions
   * returns {Object[]} 
   **/
  getUnsubscriptions() {
    return this._subs.filter(s => s.unsubscribe_datetime)
  }

  /**
   * Add a new subscription
   * @param {String} 'a' or 'b' the version of page
   **/
  add(version) {
    const newSub = {
      id: uuid(),
      version: version.toLowerCase(),
      unsubscribe_datetime: undefined
    }

    logger.info(`Adding new subscription from page ${version}`)
    this._subs.push(newSub)
    this._rollEntries()
  }

  /**
   * Unsubscribe an entry, adds the unsubscribe_datetime field.
   * Uses a weighted random function to determine which entry to unsubscribe.
   **/
  unsubscribe() {
    const version = this._weightedRandomFn()
    const filteredSubs = this._subs.filter(s => s.version === version)
    const unsubIndex = Math.floor(Math.random() * filteredSubs.length)
    const currentDateTime = new Date().toISOString()
    const unsub = filteredSubs[unsubIndex]
    
    if (unsub) {
      logger.info(`Unsubscription from ${version}`)
      unsub.unsubscribe_datetime = currentDateTime
    }
  }

  // Private
  

  /**
   * Validates AB test configuration
   * @param {Object} unsubRates ex: { a: 10, b: 90 } 
   * @param {Number} rolloverThreshold a positive integer
  **/
  _validateConfiguration(unsubRates, rolloverThreshold) {
    if (unsubRates === undefined || unsubRates.a === undefined || unsubRates.b === undefined) {
      throw new Error('unsubRates not defined')
    }

    if (typeof unsubRates.a !== 'number' || typeof unsubRates.b !== 'number') {
      throw new Error('unsubRates for "a" and "b" must be integers')
    }

    if (unsubRates.a < 0 || unsubRates.b < 0) {
      throw new Error('unsubRates for "a" and "b" must be non-negative integers')
    }

    if ((unsubRates.a + unsubRates.b) !== 100) {
      throw new Error('unsubRates for "a" and "b" must add up to 100')
    }

    if (!rolloverThreshold || typeof rolloverThreshold !== 'number' || rolloverThreshold < 0) {
      throw new Error('rolloverThreshold must be a positive integer')
    }
  }

  /**
   * Initializes the weighted random function
   * @param {Number} bUnsubRate The rate at which 'b' should be return vs 'a'
   * @return {Function} A function that returns 'a' or 'b' weighted toward 'b'
   **/
  _initWeightedRandomFunction(bUnsubRate) {
    const table = []
    for (let i = 0; i < 100; i++) {
      table[i] = i < bUnsubRate ? 'b' : 'a'
    }
    return () => table[Math.floor(Math.random() * table.length)]
  }

  /**
   * Removes old subscriptions to prevent increasing memory usage
  **/
  _rollEntries() {
    logger.info('Rolling subscription entries')
    const extra = this._subs.length - this._rolloverThreshold
    const toRemove = extra > 0 ? extra : 0;

    this._subs = this._subs.slice(toRemove)
    logger.info(`Removed ${toRemove} subscription entries`)
    this._printStatus()
  }

  /**
   * Prints the current subscriptions status. Including the total number of subscriptions, the ratio of a to b subscriptions, number of unsubscriptions, and the ratio of a to b for unsubscriptions
  **/
  _printStatus() {
    const percentage = (amount, total) => amount > 0 ? Math.floor((amount/total)*100) : 0
    const aSubs = this._subs.filter(s => s.version === 'a')
    const bSubs = this._subs.filter(s => s.version === 'b')

    const total = this._subs.length
    const totalA = aSubs.length
    const totalB = bSubs.length
    logger.info(`Total subscriptions:${total} A:${percentage(totalA, total)}% B:${percentage(totalB, total)}%`)
    const totalAUnsubs = aSubs.filter(s => s.unsubscribe_datetime).length
    const totalBUnsubs = bSubs.filter(s => s.unsubscribe_datetime).length
    const totalUnsubs = totalAUnsubs + totalBUnsubs
    logger.info(`Total unsubscriptions:${totalUnsubs} A:${percentage(totalAUnsubs, totalUnsubs)}% B:${percentage(totalBUnsubs, totalUnsubs)}%`)
  }
}

module.exports = SubscriptionManager
