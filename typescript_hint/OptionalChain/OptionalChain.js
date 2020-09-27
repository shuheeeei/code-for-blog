"use strict";
var _a, _b;
var productPrices = {
    dynabook: { price: 120000, stock: 3 },
    chromebook: { price: 60000, stock: 20 },
    macbook: { price: 250000 },
};
// 参考演算子の場合
// const macbookPrice: number | undefined = productPrices.macbook ? productPrices.macbook.price : null;
// const macbookPrice: number | undefined = productPrices.macbook === null  || productPrices.macbook === undefined ? undefined : productPrices.macbook.price;
// console.log(macbookPrice, '円'); // '250000 円'
// Optional Chainingの場合
var macbookPrice = (_a = productPrices.macbook) === null || _a === void 0 ? void 0 : _a.price;
console.log(macbookPrice, '円'); // '250000 円'
console.log((_b = productPrices.macbook) === null || _b === void 0 ? void 0 : _b.price, '円'); // 'undefined 円'
