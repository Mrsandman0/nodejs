const express = require('express');
let Router = express.Router();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const MongoClient = mongodb.MongoClient;


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

        let goodsCategory = db.collection('goodsCategory');
        if (check == 2) {
            goodsCategory.find().toArray((err, result) => {
                if (err) {
                    res.send({
                        code: 0,
                        msg: err
                    })
                    return
                }
                res.send({
                    data: result
                })
            })
        }
        if (check == 1) {
            let id = (req.query.id) * 1;
            goodsCategory.deleteOne({ id: id }, (err, result) => {
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

        if (check == 3) {
            let arr = JSON.parse(req.query.arr);
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                goodsCategory.deleteOne({ id: arr[i] * 1 }, (err, result) => {
                    console.log(arr[i] * 1);
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
            // console.log(arr)
        }

        //修改数据
        if (check == 4) {
            let { id, name, msg } = req.query;
            console.log(req.query);
            goodsCategory.updateOne({ id: id * 1 }, { $set: { name: name, msg: msg, time: datatime() } }, (err, result) => {
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

        //添加数据
        if (check == 5) {
            let { name, msg } = req.query;
            console.log(req.query);
            goodsCategory.find({}).sort({ id: -1 }).limit(1).toArray((err, result) => {
                // console.log(result);
                let id = result[0]['id'];
                goodsCategory.insertOne({
                    id: id + 1,
                    name: name,
                    msg: msg,
                    time: datatime()
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
            });
        }

    })
})


module.exports = Router;