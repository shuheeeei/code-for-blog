const iphones: string[] = ['iphone X', 'iphone XS', 'iphone XR'];

// ３個目の要素だけ欲しい場合はカンマ2つ並べたあとに好きな変数名を書いて取得する
const [,, favoritePhone] = iphones;

console.log(favoritePhone); // 'iphone XR'
