module.exports = {
    publicPath:'/miaomiao',
    devServer:{
        proxy:{
            '/doubanapi':{
                target:'http://douban.uieee.com/',
                changeOrigin: true,//反向代理的时候是否要改变地址
                pathRewrite:{
                    '^/doubanapi':'/'
                }
            },
            '/cityapi':{
                target:'http://39.97.33.178',
                changeOrigin: true,
                pathRewrite:{
                    '^/cityapi':'/'
                }
            },
            '/searchapi':{
                target:'http://zhouxunwang.cn',
                changeOrigin:true,
                pathRewrite:{
                    '^/searchapi':'/'
                }
            }
        }
    }
}