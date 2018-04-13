/**
 * Created by Administrator on 2018/4/7 0007.
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


const isDev = process.env.NODE_ENV === 'development'


if(!isDev){

    const ReactSSR = require('react-dom/server');
    const serverEntry = require('../dist/server-entry').default;
    const  indexHTML =  fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');

    app.use('/public',express.static(path.join(__dirname,'../dist')));

    app.get( "*",function (req,res) {
        const html =   ReactSSR.renderToString(serverEntry);
        res.send(indexHTML.replace('<!--app-->',html))
    });
}else {
    const dev = require('./util/dev.static');
    dev(app)
}


app.listen(7777,function () {
    console.log("http://localhost:7777")
});