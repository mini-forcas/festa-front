- ユーザーがクイズに参加して問題に参加するまでをやる
  https://nextjs.org/docs/pages/api-reference/functions/use-router
- ユーザが回答した答えと正しい答えをテーブル(user_answer)に入れる
- テーブルに入れた値を表示する
- クイズ参加時に、socket-io の UUID をユーザに振る
- festa?userId= 画面でユーザーが選択した答えを送信することができる。
- festa?userId= 画面で管理者が選択した答えをユーザーは見ることができる。

- 管理者が次のクイズを表示みたいなボタンを押したらユーザーの画面にクイズが表示される
  /Users/kazutake.yamamoto/source/private/festa-front/app/admin/\_layout.tsx
- Admin 画面は実際にクイズをするときに出題するクイズを選択するだけにする。
