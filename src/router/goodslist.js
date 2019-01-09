const express = require('express');
let Router = express.Router();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const MongoClient = mongodb.MongoClient;
let urlencodedParser = bodyParser.urlencoded({ extended: false });

function datatime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let time = year + '-' + month + '-' + day;
    return time;
}

Router.get('/', (req, res) => {
    let { check } = req.query;
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, database) => {
        if (err) throw err;
        let db = database.db('NodeProject');
        let { curr, nums, content, query } = req.query;
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
        //搜索功能
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
            for (let i = 0; i < len; i++) {
                goodslist.deleteOne({ id: arr[i] * 1 }, (err, result) => {
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

        //模糊查询
        if (check == 5) {
            goodslist.find({
                $or: [
                    { catagory: { $regex: query } },
                    { name: { $regex: query } },
                    { id: { $regex: query } },
                    { newprice: { $regex: query } },
                    { num: { $regex: query } }
                ]
            }).toArray((err, result) => {
                let count = result.length;
                let arr = result.slice((curr - 1) * nums, curr * nums);
                console.log(count)
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





    })
});

Router.post('/', urlencodedParser, (req, res) => {
    let { check } = req.body;
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, database) => {
            if (err) throw err;

            let db = database.db('NodeProject');

            let goodslist = db.collection('goodslist');
            if (check == 1) {
                let { id, goodsname, oldpic, newpic, goodssort, goodsnum, msg } = req.body;
                goodslist.updateOne({ id: id * 1 }, {
                    $set: {
                        name: goodsname,
                        catagory: goodssort,
                        oldprice: oldpic,
                        newprice: newpic,
                        num: goodsnum,
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
                    database.close();
                })

            }


            if (check == 2) {
                let { id } = req.body;
                console.log(id);
                goodslist.findOne({ id: id * 1 }, (err, result) => {
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
                    database.close();
                })

            }
            if (check == 3) {
                goodslist.find({}).sort({ id: -1 }).limit(1).toArray((err, result) => {
                    let id = result[0]['id'];
                    let { goodsname, oldpic, newpic, goodssort, goodsnum, msg } = req.body;
                    goodslist.insertOne({
                        id: id + 1,
                        name: goodsname,
                        catagory: goodssort,
                        oldprice: oldpic,
                        newprice: newpic,
                        num: goodsnum,
                        msg: msg,
                        status: 1,
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

                        database.close();
                    })
                })

            }








        })
        // 关闭数据库，避免资源浪费
        // database.close();
});



module.exports = Router;