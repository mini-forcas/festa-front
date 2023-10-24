`.env.local`を作って Supabase の接続情報を貼り付ける

[参考アプリ](https://tk2-220-19891.vs.sakura.ne.jp/mu-quiz/organizer/index.php)

```bash
パスの情報

管理者ページ

admin/
  create画面に遷移だけできる。
admin/create
  クイズを詳細に作成することができる。
  現状は画面だけ作成しているが、一旦この画面は使用せず手動でDBにクイズを入れる予定。
admin/create/[eventid]/quizzes
  ランダムなeventidを生成し、各クイズ大会ごとのクイズを作成することができる画面
  現状は画面だけ作成しているが、一旦この画面は使用せず手動でDBにクイズを入れる予定。
admin/play
  クイズゲームをするときにユーザーに画面共有をする時に使う。
  各問題を画面に表示することができる。
```
