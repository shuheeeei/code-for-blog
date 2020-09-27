type ProductInfo = {
  dynabook: Record<string, number>;
  chromebook: Record<string, number>;
  macbook?: Record<string, number>;
};
const productPrices: ProductInfo = {
  dynabook: { price: 120000, stock: 3 },
  chromebook: { price: 60000, stock: 20 },
  macbook: { price: 250000 },
};

// 参考演算子の場合
// const macbookPrice: number | undefined = productPrices.macbook ? productPrices.macbook.price : null;
// const macbookPrice: number | undefined = productPrices.macbook === null  || productPrices.macbook === undefined ? undefined : productPrices.macbook.price;
// console.log(macbookPrice, '円'); // '250000 円'

// Optional Chainingの場合
const macbookPrice: number | undefined = productPrices.macbook?.price;
console.log(macbookPrice, '円'); // '250000 円'

console.log(productPrices.macbook?.price, '円'); // 'undefined 円'
