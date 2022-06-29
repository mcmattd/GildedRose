 const itemNames = require('./consts');
 const sellIn = require('./sellin');

class ItemStrategyManager {
  constructor (defaultStrategy) {
    this.strategies = {
      defaultStrategy: defaultStrategy
    };
  }

  addStrategy (strategy) {
    this.strategies[strategy.name] = strategy;
  }

  doStrategy (item) {
    if(!(item.name in this.strategies)){
      this.strategies.defaultStrategy.updateQuality(item);
    } else {
      return this.strategies[item.name].updateQuality(item);
    }
  }
}

class ItemStrategy {
    constructor(name, handler){
        this.name = name;
        this.handler = handler;
    }

    updateQuality(item) {
        this.handler(item);
    }
}

const agedBrieStrategy = new ItemStrategy(itemNames.agedBrie, (item) => {
  if(sellIn.isGreaterThanZero(item)) {
    
  }
})
