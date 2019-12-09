module.exports = {
    publicPath: process.env.NODE_ENV === 'development'
    ? './'
    : '/',
    // outputDir: ""
    devServer: {
        host: "localhost",
        // host: "192.168.11.130",
        port: 8888,
        //自动打开页面
        open:true,
        //配置代理
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                // target: 'http://192.168.11.130:8080', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}