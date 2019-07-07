var path = require("path");
//
var Clean = require('clean-webpack-plugin');//
var Html = require('html-webpack-plugin');//
var Css = require('mini-css-extract-plugin');//
var Webpack = require("webpack");
module.exports = {
    entry:{
        index:'./src/index.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].bundle.js'
    },
    module:{
        rules:[
            
            {
                test:/\.html$/,
                use:[
                    {
                        loader:'html-loader',
                        options:{
                            attrs:['img:src']
                        }
                    }
                ]
            },
            
            {
                test:/\.less$/,
                use:[
                    {loader: css.loader,},
                    {loader:'css-loader'},
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')(),
                                // require('cssnano')({
                                //     preset: 'default'
                                // })
                            ]
                        }
                    },
                    {loader:'less-loader'}
                ]
            },
            {
                test:/\.(jpg|png|jpeg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            name:'[name].min.[ext]',
                            // 限制图片大小  <= 100kb 进行base64编码
                            limit:100,
                            outputPath:'img'
                        }
                    },
                    {
                        loader:'img-loader',
                        options:{
                            plugins:[
                                require('imagemin-pngquant')({
                                    quality:[0.3,0.5]
                                  }),
                            ]
                        }
                    }
                ]
            },
        ]
    },
    mode:'development',
    plugins:[
        new Html({
            filename:'index.html',
            template:'./src/index.html',
            // 指定文件插入页面中
            // chunks:[],
            minify:{
                // 去掉空格
                //collapseWhitespace:true,
                // 清理注释
                //removeComments:true
            }
        }),
        new Css({
            filename: "[name].css",
        }),
        // 开启热更新
        new Webpack.HotModuleReplacementPlugin(),
        // 每次清除上一次的打包文件
        //new Clean()
    ],
    devServer:{
        // 提供内容的路径
        contentBase:'dist',
        // 修改端口号
        port:'8886',
        // 开启热更新此时会刷新浏览器
        hot:true,
    }
}
