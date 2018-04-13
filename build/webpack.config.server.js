/**
 * Created by Administrator on 2018/4/7 0007.
 */

const path = require('path');

module.exports = {
    target: "node",
    entry:{
        //指定项目入口文件
        app:path.join(__dirname,'../client/server-entry.js')
    },
    output:{
        //打包后的文件名变更方式 中间加了哈希值 值要文件有了改变哈希值就会变化
        filename:'server-entry.js',
        //把打包完成的文件存放在哪个文件目录下的路径   (如果目录下没有dist这个文件它自己建立的 )    (输出路径)
        path:path.join(__dirname,'../dist'),
        //这个路径是指 script上的属性src 路径  比如App.js文件 她在src上的反问路径是 public/App.hash.js 可以直接写cdn 域名
        publicPath:'/public',
       // 关于 CommonJS AMD CMD UMD 规范的差异总结   https://www.cnblogs.com/imwtr/p/4666181.html
       //打包后的代码是用什么规范 我这里是用commonjs2
        libraryTarget: "commonjs2"
    },
    module:{
        rules:[
            {
                enforce: "pre",
                test: /.(js|jsx)$/,
                loader: "eslint-loader",
                exclude:[
                    path.resolve(__dirname,"../node_modules")
                ]
            },
            {
                test:/.jsx$/,
                //npm install --save  babel-loader  babel-core babel-preset-es2015 babel-preset-es2015-loose babel-preset-react
                //babel-core 是babel-loader
                //babel-preset-es2015 es6把转成es5
                //babel-preset-es2015-loose可转换且移动端兼容性较好的语法
                // babel-preset-react  应该是让babel-loader 认识react的语法, 这样才好转成es5语法
                //用法:在一个根目录下有一个babelrc配置文件 里面的配置一些东西  也可以配置到下面的options可以一样的效果
                use:{
                    loader:'babel-loader',
                    /*  options:{
                     "presets":[
                     ["es2015",{"loose":true}],
                     "react"
                     ]
                     }*/
                },
                exclude:[
                    path.join(__dirname,'../node_modules')
                ]
            },
            {
                test:/.js$/,

                use:{
                    loader:'babel-loader',
                },
                /* exclude:[
                 path.join(__dirname,'../node_modules')
                 ]*/
                //上面或者下面的都写法都可以
                exclude:/node_modules/
            },
        ]
    },
   /* plugins:[

    ]*/
}
