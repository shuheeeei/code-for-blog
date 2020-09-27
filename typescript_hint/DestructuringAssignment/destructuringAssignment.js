"use strict";
// 一般的な分割代入の例
function callUserName1() {
    var testUser = {
        id: 1,
        userName: 'テストユーザー',
    };
    var adminUser = {
        id: 1,
        userName: 'アドミンユーザー',
    };
    var userName = testUser.userName;
    console.log(userName); // 'テストユーザー'
    // const { userName } = adminUser;
    // error TS2451: Cannot redeclare block-scoped variable 'userName'.
}
callUserName1();
var testUser = {
    id: 1,
    userName: 'テストユーザー',
};
var adminUser = {
    id: 1,
    userName: 'アドミンユーザー',
};
var userName = testUser.userName;
