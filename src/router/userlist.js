const express = require('express');
let Router = express.Router();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const MongoClient = mongodb.MongoClient;
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



    })
})

module.exports = Router;