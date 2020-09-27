"use strict";
// 名前を変更して分割代入する例
function callUserName2() {
    var testUser = {
        id: 1,
        userName: 'テストユーザー',
    };
    var adminUser = {
        id: 1,
        userName: 'アドミンユーザー',
    };
    var testUserName = testUser.userName;
    console.log(testUserName); // 'テストユーザー'
    var adminUserName = adminUser.userName;
    console.log(adminUserName); // 'アドミンユーザー'
}
callUserName2();
