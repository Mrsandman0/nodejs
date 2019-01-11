const express = require('express');
let Router = express.Router();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const MongoClient = mongodb.MongoClient;
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let token = require("./token.js");

Router.post('/', urlencodedParser, (req, res) => {
    let { username, password } = req.body;
    console.log(username, password)
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, database) => {
        if (err) throw err;
        let db = database.db('NodeProject');
        let userinf = db.collection('userinf');
        userinf.findOne({ username, password }, (err, result) => {
            if (result) {
                // 登录成功后，给前端发送用户表示：token
                let encryption = token.createToken({
                    username: username,
                    password: password
                }, 600);
                // console.log(encryption);
                res.send({
                    code: 1,
                    data: encryption,
                    msg: 'ok'
                })
            } else {
                res.send({
                    code: 0,
                    data: [],
                    msg: 'fail'
                })
            }
        });

    })

})

Router.post('/check', urlencodedParser, (req, res) => {
    let check = req.headers.token;
    // console.log(typeof check)
    res.send({
            states: token.checkToken(check)
        })
        // if (token.checkToken(check)) {
        //     console.log(token.checkToken(check))
        // }
})






module.exports = Router;