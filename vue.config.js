module.exports = {
    devServer:{

        proxy:{
            '/doubanapi':{
                target:'https://api.douban.com/v2/movie',
                changeOrigin: true,//反向代理的时候是否要改变地址
                pathRewrite:{
                    '^/doubanapi':'/'
                }
            },
            '/cityapi':{
                target:'http://39.97.33.178/',
                changeOrigin: true,
                pathRewrite:{
                    '^/cityapi':'/'
                }
            },
            '/searchapi':{
                target:'http://zhouxunwang.cn/data/?id=62',
                changeOrigin:true,
                pathRewrite:{
                    '^/searchapi':'/'
                }
            }
        }
    }
}