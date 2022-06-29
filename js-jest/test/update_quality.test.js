const {Item, Shop} = require ('../src/gilded_rose');
const {itemNames, qualityValues} = require ('../src/consts');

describe ('Update quality - non special items', function () {
  it ('should decrease quality of an item by one (given quality and sell in > 0) after one day', function () {
    const itemName = 'Non Special Item';
    const itemSellIn = 3;
    const itemQuality = 5;

    let items = [new Item (itemName, itemSellIn, itemQuality)];

    const gildedRose = new Shop (items);
    items = gildedRose.updateQuality ();

    expect (items[0].quality).toBe (
      itemQuality - qualityValues.standardQualityUnit
    );
  });

  it ('should decrease the sellIn value of an item by one', function () {
    const itemName = 'Non Special Item';
    const itemSellIn = 3;
    const itemQuality = 5;

    let items = [new Item (itemName, itemSellIn, itemQuality)];

    const gildedRose = new Shop (items);
    items = gildedRose.updateQuality ();

    expect (items[0].sellIn).toBe (
      itemSellIn - qualityValues.standardQualityUnit
    );
  });

  it ('should never decrement the quality of an item lower than zero', function () {
    const itemName = 'Non Special Item';
    const itemSellIn = 3;
    const itemQuality = 0;

    let items = [new Item (itemName, itemSellIn, itemQuality)];

    const gildedRose = new Shop (items);
    items = gildedRose.updateQuality ();

    expect (items[0].quality).toBe (itemQuality);
  });

  it ('should decrement the quality of an item twice as fast when the sell by date is zero', function () {
    const itemName = 'Non Special Item';
    const itemSellIn = 0;
    const itemQuality = 8;

    let items = [new Item (itemName, itemSellIn, itemQuality)];

    const gildedRose = new Shop (items);
    items = gildedRose.updateQuality ();

    expect (items[0].quality).toBe (
      itemQuality - 2 * qualityValues.standardQualityUnit
    );
  });
});

describe ('Update quality - Aged Brie', function () {
  it ('should increase the quality of aged brie as it gets older', function () {
    const itemName = itemNames.agedBrie;
    const itemSellIn = 5;
    const itemQuality = 8;

    let items = [new Item (itemName, itemSellIn, itemQuality)];

    const gildedRose = new Shop (items);
    items = gildedRose.updateQuality ();

    expect (items[0].quality).toBe (
      itemQuality + qualityValues.standardQualityUnit
    );
  });

  it ('should increase the quality of aged brie twice as fast when past the sellIn date', function () {
    const itemName = itemNames.agedBrie;
    const itemSellIn = 0;
    const itemQuality = 8;

    let items = [new Item (itemName, itemSellIn, itemQuality)];

    const gildedRose = new Shop (items);
    items = gildedRose.updateQuality ();

    expect (items[0].quality).toBe (
      itemQuality + 2 * qualityValues.standardQualityUnit
    );
  });

  it ('should never increase the quality of an item over 50', function () {
    const itemName = itemNames.agedBrie;
    const itemSellIn = 10;
    const itemQuality = 50;

    let items = [new Item (itemName, itemSellIn, itemQuality)];

    const gildedRose = new Shop (items);
    items = gildedRose.updateQuality ();

    expect (items[0].quality).toBe (itemQuality);
  });
});

describe ('Update quality - Backstage passes', function () {
  it ('should increase the quality of backstage passes by 2 when there are 10 days or less to go', function () {
    const itemName = itemNames.backstagePass;
    const itemSellIn = 10;
    const itemQuality = 2;

    let items = [new Item (itemName, itemSellIn, itemQuality)];

    const gildedRose = new Shop (items);
    items = gildedRose.updateQuality ();

    expect (items[0].quality).toBe (
      itemQuality + 2 * qualityValues.standardQualityUnit
    );
  });

  it ('should increase the quality of backstage passes by 3 when there are 5 days or less to go', function () {
    const itemName = itemNames.backstagePass;
    const itemSellIn = 5;
    const itemQuality = 2;

    let items = [new Item (itemName, itemSellIn, itemQuality)];

    const gildedRose = new Shop (items);
    items = gildedRose.updateQuality ();

    expect (items[0].quality).toBe (
      itemQuality + 3 * qualityValues.standardQualityUnit
    );
  });

  it ('should never increase the quality of an item over 50', function () {
    const itemName = itemNames.backstagePass;
    const itemSellIn = 10;
    const itemQuality = 50;

    let items = [new Item (itemName, itemSellIn, itemQuality)];

    const gildedRose = new Shop (items);
    items = gildedRose.updateQuality ();

    expect (items[0].quality).toBe (itemQuality);
  });

  it ('should drop the quality of backstage passes to 0 after concert', function () {
    const itemName = itemNames.backstagePass;
    const itemSellIn = 0;
    const itemQuality = 2;

    let items = [new Item (itemName, itemSellIn, itemQuality)];

    const gildedRose = new Shop (items);
    items = gildedRose.updateQuality ();

    expect (items[0].quality).toBe (itemQuality - itemQuality);
  });
});

describe ('Update quality - Sulfuras', function () {
  it ('should not decrement the quality of Sulfuras, when sellIn is 0', function () {
    const itemName = itemNames.sulfuras;
    const itemSellIn = 0;
    const itemQuality = 2;

    let items = [new Item (itemName, itemSellIn, itemQuality)];

    const gildedRose = new Shop (items);
    items = gildedRose.updateQuality ();

    expect (items[0].quality).toBe (itemQuality);
  });

  it ('should not increase the quality of sulfuras, when sellIn is greater than zero', function () {
    const itemName = itemNames.sulfuras;
    const itemSellIn = 7;
    const itemQuality = 2;

    let items = [new Item (itemName, itemSellIn, itemQuality)];

    const gildedRose = new Shop (items);
    items = gildedRose.updateQuality ();

    expect (items[0].quality).toBe (itemQuality);
  });
});

describe ('update quality - conjured', function () {
  it ('it should decrease the quality of conjured items by 2 when sell in date > 0', function () {
    const itemName = itemNames.conjured;
    const itemSellIn = 7;
    const itemQuality = 10;

    let items = [new Item (itemName, itemSellIn, itemQuality)];

    const gildedRose = new Shop (items);
    items = gildedRose.updateQuality ();

    expect (items[0].quality).toBe (
      itemQuality - 2 * qualityValues.standardQualityUnit
    );
  });

  it ('it should decrease the quality of conjured items by 5 when greater than the sell in date is zero', function () {
    const itemName = itemNames.conjured;
    const itemSellIn = 0;
    const itemQuality = 10;

    let items = [new Item (itemName, itemSellIn, itemQuality)];

    const gildedRose = new Shop (items);
    items = gildedRose.updateQuality ();

    expect (items[0].quality).toBe (
      itemQuality - 4 * qualityValues.standardQualityUnit
    );
  });
});
