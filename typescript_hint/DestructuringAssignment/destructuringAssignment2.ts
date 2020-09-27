// 名前を変更して分割代入する例
function callUserName2() {
  const testUser: User = {
    id: 1,
    userName: 'テストユーザー',
  };

  const adminUser: User = {
    id: 1,
    userName: 'アドミンユーザー',
  };

  const { userName: testUserName } = testUser;
  console.log(testUserName); // 'テストユーザー'

  const { userName: adminUserName } = adminUser;
  console.log(adminUserName); // 'アドミンユーザー'
}

callUserName2();
