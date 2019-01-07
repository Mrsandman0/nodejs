const express = require('express');
let Router = express.Router();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const MongoClient = mongodb.MongoClient;
// let urlencodedParser = bodyParser.urlencoded({ extended: false });
Router.get('/', (req, res) => {
    // res.send('user list')
    // console.log(req);
    let { check } = req.query;
    // console.log(curr)
    // console.log(nums)

    // let { username, password } = req.body;
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, database) => {
        if (err) throw err;
        let db = database.db('NodeProject');
        let { curr, nums, content } = req.query;
        let goodslist = db.collection('goodslist');
        if (check == 1) {
            goodslist.find().count((err, result) => {
                let count = result;
                goodslist.find().sort({ "ID": 1 }).skip((curr - 1) * nums).limit(nums * 1).toArray((err, result) => {
                    // result：数据查询结果
                    if (err) {
                        res.send({
                            code: 0,
                            msg: err,
                            data: []
                        })
                        return
                    }
                    res.send({
                        count: count,
                        code: 1,
                        msg: 'success',
                        data: result
                    });
                });

                database.close();
            });
        }



        // 通过 db.myCollection.find().sort({"ID":1}).skip(10).limit(10)
        // 命令，将其根据ID排序后，跳过10，查询10条，结果为10-19条的数据。
        if (check == 2) {
            goodslist.find({ catagory: content }).toArray((err, result) => {
                let count = result.length;
                let arr = result.slice((curr - 1) * nums, curr * nums);
                // result： 数据查询结果
                if (err) {
                    res.send({
                        code: 0,
                        msg: err,
                        data: []
                    })
                    return
                }
                res.send({
                    count: count,
                    code: 1,
                    msg: 'success',
                    data: arr
                });

                database.close();
            })
        }
        //删除单个
        if (check == 4) {
            let id = (req.query.id) * 1;
            // console.log(id)
            goodslist.deleteOne({ id: id }, (err, result) => {
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
            // console.log(arr)
            for (let i = 0; i < len; i++) {
                goodslist.deleteOne({ id: arr[i] * 1 }, (err, result) => {
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
});




module.exports = Router;