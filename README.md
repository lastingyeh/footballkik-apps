### Main Topics

        1. group-chat system

        2. private-chat system

        3. bootstrap and ejs template used

        4. passport used by facebook & google

        5. mongodb used in mongoose

        6. async module

        7. add async / await (modify from original code)

        8. aws match with multer for upload

        9. container to use global modules applied

        10.get news api services by http://content.guardianapis.com/

### Deploy Heroku

        1. login

                $ heroku login

        2. create project (in project folder)

                $ heroku create project

        3. show projects

                $ heroku apps

        4. push code to heroku server

                $ git push heroku master

        5. as change in github

                $ git add .

                $ git commit -m ''

                $ git push

           then run back to step 4.

        6. as exec command in heroku

                $ touch Procfile

           add text in Procfile

                web: ./node_modules/.bin/forever -m 5 server.js



### Refs By Udemy Course

[Node with SocketIO: Build A Full Web Chat App From Scratch
](https://www.udemy.com/node-with-socketio-build-a-full-web-chat-app-from-scratch/)