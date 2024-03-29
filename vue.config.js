module.exports = {
    //Solution For Issue:You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
    //zhengkai.blog.csdn.net
    runtimeCompiler: true,
    //todo：打包的时候很重要的配置
    publicPath: '/weekfront/',

    devServer: {
      host: "0.0.0.0",
      port: 8085, // 端口号
      https: false, // https:{type:Boolean}
      open: true, //配置自动启动浏览器
      // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理

      // 配置多个代理
      proxy: {
      "/api": {
       target: "http://127.0.0.1:3007", // 要访问的接口域名
      //target: "http://pzg4um.natappfree.cc",
      ws: true, // 是否启用websockets
      changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      pathRewrite: {
      "^/api": "" //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
      }
      }
      }
      }
}
