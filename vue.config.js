module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
    // outputDir: ""
    devServer: {
        host: "127.0.0.1",
        port: 8888,
        //自动打开页面
        open:true,
        //配置代理
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}