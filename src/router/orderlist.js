const express = require('express');
let Router = express.Router();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const MongoClient = mongodb.MongoClient;
// let urlencodedParser = bodyParser.urlencoded({ extended: false });

Router.get('/', (req, res) => {
    let check = req.query.check;
    // let id = req.query.id;
    // console.log(check);
    // console.log(id);
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, database) => {
        if (err) throw err;

        let db = database.db('NodeProject');

        let orderlist = db.collection('orderlist');

        if (check == 2) {
            orderlist.find().toArray((err, result) => {
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


        //删除单个
        if (check == 1) {
            let id = (req.query.id) * 1;
            // console.log(id)
            orderlist.deleteOne({ id: id }, (err, result) => {
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
                orderlist.deleteOne({ id: arr[i] * 1 }, (err, result) => {
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
        //根据id升序
        if (check == 4) {
            orderlist.find().sort({ id: 1 }).toArray((err, result) => {
                if (err) {
                    res.send({
                        code: 0,
                        msg: err
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
        //根据id降序
        if (check == 5) {
            orderlist.find().sort({ id: -1 }).toArray((err, result) => {
                if (err) {
                    res.send({
                        code: 0,
                        msg: err
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

        // 关闭数据库，避免资源浪费
        database.close();
    })
});

// Router.get('/:username', (req, res) => {
//     res.send({
//         path: req.url,
//         username: req.params.username
//     })
// });


module.exports = Router;