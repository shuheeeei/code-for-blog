// 一般的な分割代入の例
function callUserName1() {
  const testUser: User = {
    id: 1,
    userName: 'テストユーザー',
  };

  const adminUser: User = {
    id: 1,
    userName: 'アドミンユーザー',
  };

  const { userName } = testUser;
  console.log(userName); // 'テストユーザー'

  // const { userName } = adminUser;
  // error TS2451: Cannot redeclare block-scoped variable 'userName'.
}

callUserName1();
