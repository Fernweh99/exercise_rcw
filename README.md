# exercise_rcw
this application use node v20

How to run this application:

1. clone this repo local with command: 'git clone <name-repo>'
2. use command 'npm i' to install dependecies
3. use command 'git submodule update --init --recursive' to clone database repo
4. create postgress db on Dbever or relative software
5. configure file .env (see on .env.example)
6. use command 'npm run dev' to run local server

How to run tests:
1. use command 'npm run seed' to create fake data
2. use command 'npm run test' to run all tests

You can consult api on file 'doc/swagger.yaml'