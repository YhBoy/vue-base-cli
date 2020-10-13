module.exports = {
    css: {
        loaderOptions: {
            less:{
                lessOptions: {
                    modifyVars: {
                        // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                        hack: `true; @import "your-less-file-path.less";`,
                    },
                },
            }

        }
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV !== 'development') {
            // 移除console
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
        }
    },
    productionSourceMap: process.env.NODE_ENV === 'development',
    devServer: {
        open: false, //是否自动弹出浏览器页面
        // https: false,
        // hotOnly: false,
        proxy: {
            '/proxyApi': {
                target: 'https://train.weiye360.cn/api/',  // test API服务器的地址
                // target: 'https://test-train.weiye360.cn/api/',  // dev API服务器的地址
                // ws: true,                               // 代理websockets
                changeOrigin: true,               // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/proxyApi': ''
                }
            }
        }
    }
}
