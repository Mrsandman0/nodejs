const express = require('express');
let Router = express.Router();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const MongoClient = mongodb.MongoClient;
let urlencodedParser = bodyParser.urlencoded({ extended: false });

Router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if (req.method == "OPTIONS") {
        res.send(200); /*让options请求快速返回*/
    } else {
        next();
    }
});

function datatime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let time = year + '-' + month + '-' + day;
    return time;
}


Router.get('/', (req, res) => {
    let check = req.query.check;
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, database) => {
        if (err) throw err;
        let db = database.db('NodeProject');
        let userlist = db.collection('userlist');
        //数据渲染
        if (check == 1) {
            userlist.find({}).toArray((err, result) => {
                // console.log(result)
                if (err) {
                    res.send({
                        code: 0,
                        msg: err,
                        data: []
                    })
                    return
                }
                res.send({
                    code: 1,
                    msg: '操作成功',
                    data: result
                })
            })
        }

        //删除单个
        if (check == 2) {
            let id = (req.query.id) * 1;
            // console.log(id)
            userlist.deleteOne({ id: id }, (err, result) => {
                if (err) {
                    res.send({
                        code: 0,
                        msg: err
                    })
                    return
                }
                res.send({
                    code: 1,
                    msg: '删除成功'
                })
            })
        }

        //删除多个
        if (check == 3) {
            let arr = JSON.parse(req.query.arr);
            let len = arr.length;
            console.log(arr)
            for (let i = 0; i < len; i++) {
                userlist.deleteOne({ id: arr[i] * 1 }, (err, result) => {
                    // console.log(arr[i] * 1);
                    if (err) {
                        res.send({
                            code: 0,
                            msg: err
                        })
                        return
                    }
                    if (i == len - 1) {
                        res.send({
                            code: 1,
                            msg: '删除成功'
                        })
                    }
                })
            }
        }

        //检测电话号码
        if (check == 4) {
            let num = req.query.num * 1;
            userlist.findOne({ phnum: num }, (err, result) => {
                if (result) {
                    res.send({
                        code: 0,
                        data: [],
                        msg: 'fail'
                    })
                } else {
                    res.send({
                        code: 1,
                        data: [],
                        msg: 'ok'
                    })
                }
            })
        }



    })
})

//添加用户
Router.post('/', urlencodedParser, (req, res) => {
    let { check } = req.body;
    // console.log(req.body)
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, database) => {
            if (err) throw err;

            let db = database.db('NodeProject');

            let userlist = db.collection('userlist');
            if (check == 1) {
                let { name, nickname, password, num, sex, birthday, email, msg } = req.body;
                userlist.find({}).sort({ id: -1 }).limit(1).toArray((err, result) => {
                    let id = result[0]['id'] * 1;
                    // console.log(id);
                    userlist.insertOne({
                        id: id + 1,
                        name: name,
                        nickname: nickname,
                        password: password,
                        phnum: num,
                        male: sex,
                        birthday: birthday,
                        email: email,
                        msg: msg,
                        time: datatime()
                    }, (err, result) => {
                        if (err) {
                            res.send({
                                    code: 0,
                                    msg: err
                                })
                                // console.log(err)
                            return

                        }
                        res.send({
                            code: 1,
                            msg: '操作成功'
                        })
                    })
                    database.close();
                })
            }


            if (check == 2) {
                let { id } = req.body;
                userlist.findOne({ id: id * 1 }, (err, result) => {
                    if (err) {
                        res.send({
                            code: 0,
                            msg: err,
                            data: []
                        })
                        return
                    }
                    res.send({
                        code: 1,
                        msg: 'success',
                        data: result
                    })
                })
            }


            if (check == 3) {
                let { id } = req.body;
                userlist.findOne({ id: id * 1 }, (err, result) => {
                    let phonenum = (result.phnum) * 1;
                    // console.log(phonenum)
                    let { name, nickname, password, num, sex, birthday, email, msg } = req.body;
                    console.log(num);
                    if (num * 1 == phonenum) {
                        userlist.updateOne({ id: id * 1 }, {
                            $set: {
                                name: name,
                                nickname: nickname,
                                password: password,
                                phnum: num,
                                male: sex,
                                birthday: birthday,
                                email: email,
                                msg: msg,
                                time: datatime()
                            }
                        }, (err, result) => {
                            if (err) {
                                res.send({
                                    code: 0,
                                    msg: err
                                })
                                return
                            }
                            res.send({
                                code: 1,
                                msg: '操作成功'
                            })
                        })
                    } else {
                        userlist.find({ phnum: phonenum * 1 }, (err, result) => {
                            if (result) {
                                res.send({
                                    code: 0,
                                    msg: '电话号码已存在'
                                })
                            } else {
                                userlist.updateOne({ id: id * 1 }, {
                                    $set: {
                                        name: name,
                                        nickname: nickname,
                                        password: password,
                                        phnum: num,
                                        male: sex,
                                        birthday: birthday,
                                        email: email,
                                        msg: msg,
                                        time: datatime()
                                    }
                                }, (err, result) => {
                                    if (err) {
                                        res.send({
                                            code: 0,
                                            msg: err
                                        })
                                        return
                                    }
                                    res.send({
                                        code: 1,
                                        msg: '操作成功'
                                    })
                                })
                            }
                        })
                    }
                })
            }


        })
        // 关闭数据库，避免资源浪费
        // database.close();
});



module.exports = Router;