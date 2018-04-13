const path = require('path');
const HTMLplugins = require('html-webpack-plugin')
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    entry: {
        //指定项目入口文件
        app: path.join(__dirname, '../client/index.js')
    },
    output: {
        //打包后的文件名变更方式 中间加了哈希值 值要文件有了改变哈希值就会变化
        filename: '[name].[hash].js',
        //把打包完成的文件存放在哪个文件目录下的路径   (如果目录下没有dist这个文件它自己建立的 )    (输出路径)
        path: path.join(__dirname, '../dist'),
        //这个路径是指 script上的属性src 路径  比如App.js文件 她在src上的反问路径是 public/App.hash.js 可以直接写cdn 域名
        publicPath: '/public/'
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /.(js|jsx)$/,
                loader: "eslint-loader",
                exclude:[
                    path.resolve(__dirname,"../node_modules")
                ]
            },
            {
                test: /.jsx$/,
                //npm install --save  babel-loader  babel-core babel-preset-es2015 babel-preset-es2015-loose babel-preset-react
                //babel-core 是babel-loader
                //babel-preset-es2015 es6把转成es5
                //babel-preset-es2015-loose可转换且移动端兼容性较好的语法
                // babel-preset-react  应该是让babel-loader 认识react的语法, 这样才好转成es5语法
                //用法:在一个根目录下有一个babelrc配置文件 里面的配置一些东西  也可以配置到下面的options可以一样的效果
                use: {
                    loader: 'babel-loader',
                    /*  options:{
                     "presets":[
                     ["es2015",{"loose":true}],
                     "react"
                     ]
                     }*/
                },
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            },
            {
                test: /.js$/,

                use: {
                    loader: 'babel-loader',
                },
                /* exclude:[
                 path.join(__dirname,'../node_modules')
                 ]*/
                //上面或者下面的都写法都可以
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        // npm i --save-dev html-webpack-plugin  这个插件的作用是:打包的时候会在文件下面自动生成一个index.html 的文件
        new HTMLplugins({
            //把client里面的template.html 文件负责到dist/index.html文件里面去
            template: path.join(__dirname, "../client/template.html")
        })

    ]
};


if (isDev) {

    config.entry =
        [
            "react-hot-loader/patch",
            path.join(__dirname, '../client/index.js'),

        ];

    //注意: 如果用这个服务一定要把dist目录删除了 因为这个服务首先检查硬盘的代码, 在第2章第六节课,15:30
    //步骤:先把服务启动起来在删除dist的目录
    config.devServer = { //npm install webpack-dev-server --save-dev
        host: 'localhost', //可以用http://localhost 来访问
        port: '8888',//端口
        contentBase: path.join(__dirname, "../dist"),//访问首页地址
        hot: true, //启用 webpack 的模块热替换特性  https://blog.csdn.net/huangpb123/article/details/78556652   react-hot-loader  热更新是使用方法
        overlay: { //如有错误就会显示到网页上
            error: true
        },
        open: true,//自动打开浏览器
        publicPath: '/public/', //跟output的pathPublic是对应的
        historyApiFallback: { //当你反问的路径没有的时候   就会返回首页
            index: '/public/index.html'
        }
    };
    //config.plugins.push(new webpack.NamedModulesPlugin())//https://blog.csdn.net/huangpb123/article/details/78556652   react-hot-loader  热更新是使用方法
    config.plugins.push(new webpack.HotModuleReplacementPlugin())//https://blog.csdn.net/huangpb123/article/details/78556652   react-hot-loader  热更新是使用方法
}


module.exports = config;

