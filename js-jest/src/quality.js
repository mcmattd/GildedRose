'use strict';

const { qualityValues }= require('./consts');

module.exports.incrementQuality = (item, increment = 1) => {
    item.quality += increment * qualityValues.standardQualityUnit;

    return item;
};

module.exports.isLessThanFifty = (item) => {
    return item.quality < 50 * qualityValues.standardQualityUnit;
}
