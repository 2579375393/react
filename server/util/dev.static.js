/**
 * Created by Administrator on 2018/4/10 0010.
 */
const MemoryFs = require('memory-fs');//在个插件是在内存中读取文件的
const axiox = require('axios');
const webpack = require('webpack');
const path = require('path');
const webpackConfig = require('../../build/webpack.config.server');
const reactDOM  = require('react-dom/server');
const httpProxy = require('http-proxy-middleware')

const getElement = ()=>{
    return  new Promise((resolve,reject) => {
        axiox.get('http://localhost:8888/public/index.html').then((res)=>{
            resolve(res.data)
        }).catch((error)=>{
            reject(error)
        })
    })
};

module.exports = function (app) {
let serverBundle ;

const mfs = new MemoryFs;
const Module = module.constructor;
const severComplier = webpack(webpackConfig);
    severComplier.outputFileSystem = mfs;
  severComplier.watch({},function(err,state){
    if(err) throw err;

    const tempState  = state.toJson();
    
    tempState.errors.forEach((err)=> console.log(err));
    tempState.warnings.forEach((warn)=> console.log(warn));

    const punblePath = path.join(webpackConfig.output.path,webpackConfig.output.filename)

    const bundle = mfs.readFileSync(punblePath,'utf-8' )//在内存中读文件

    const m = new Module();
    m._compile(bundle,'server-entry.js'); //把读出来的文件进行编译
    serverBundle = m.exports.default;
});

    app.use('/public',httpProxy({
        target:'http://localhost:8888'
    }));
    app.get('*',function(reeq,res){
        getElement().then((template)=>{
            const center =   reactDOM.renderToString(serverBundle)
            res.send(template.replace("<!--app-->",center))
        }).catch((error)=>{

            console.log(error);
        })
    })
}