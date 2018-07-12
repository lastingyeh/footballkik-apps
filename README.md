### create dev https

1. install ngrok

        $ brew cask install ngrok

2. start localhost:3000

        $ ngrok http 3000

3. get https://yourdomain and use this in 

    [facebook developer](https://developers.facebook.com/apps/1915837515114724/fb-login/settings/)

4. Facebbook登入 

        > 設定 > 基本資料 > 網站 > 網站網址 > https://yourdomain/

        > 有效的 OAuth 重新導向 URI > https://yourdomain/auth/facebook/callback

### mongodb reset command

1. reset friend_request, add_friend (robomongo db)

        $ db.getCollection('users').update({},{$set:{'sentRequest':[],'request':[],'friendList':[],'totalRequest':0}},{'multi':true}) 
