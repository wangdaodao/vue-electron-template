const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const isProduction = ['production'].includes(process.env.NODE_ENV);
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
    // 基本路径
    publicPath: '/', // vue-cli3.3+新版本使用
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
    // 以多页模式构建应用程序。
    pages: undefined,
    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: true,
    // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    transpileDependencies: [],
    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
    parallel: require('os').cpus().length > 1,
    // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
    productionSourceMap: false,

    // webpack配置
    //对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias.set('@', resolve('src'));
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'demo'
                return args
            })
    },
    // 调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
    configureWebpack: config => {
        // cdn引用时配置externals
        config.externals = {
            // 'vue': 'Vue',
            // 'element-gui': 'ELEMENT',
            // 'vue-router': 'VueRouter',
            // 'vuex': 'Vuex',
            // 'axios': 'axios'
        }
        let plugins = [
            
        ];
        if (isProduction) {
            // 移除console
            plugins.push(
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            pure_funcs: ['console.log']
                        }
                    }
                })
            );
            // gzip压缩
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            config.plugins = [...config.plugins, ...plugins];
        } else {
            // config.devtool = 'cheap-module-eval-source-map';
        }
    },
    css: {
        // 启用 CSS modules
        requireModuleExtension: true,
        // 是否使用css分离插件
        extract: isProduction,
        // 开启 CSS source maps，一般不建议开启
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            sass: {
                //设置css中引用文件的路径，引入通用使用的scss文件（如包含的@mixin）
                // prependData: `
                //     @import '@/assets/styles/var.scss';
                //     @import '@/assets/styles/mixin.scss';
                // `
            }
        }
    },
    // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
    devServer: {
        host: '0.0.0.0',
        port: 8082, // 端口号
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        hotOnly: true, // 热更新
        // proxy: {}
    },

    // 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "appId": "com.mortisetenon.app",
                "productName": "demo",//项目名，也是生成的安装文件名，即screen.exe
                "copyright": "Copyright © 2020 by wangdaodao.com",//版权信息
                "directories": {
                    "output": "./dist_electron"//输出文件路径
                },
                "win": {//win相关配置
                    "icon": "./public/app.ico",//图标，当前图标在根目录下，注意这里有两个坑
                    "target": [
                        {
                            "target": "nsis",//利用nsis制作安装程序
                            "arch": [
                                "x64",//64位
                                "ia32"//32位
                            ]
                        }
                    ]
                },
                "nsis": {
                    "oneClick": false, // 是否一键安装
                    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                    "installerIcon": "./public/app.ico",// 安装图标
                    "uninstallerIcon": "./public/app.ico",//卸载图标
                    "installerHeaderIcon": "./public/app.ico", // 安装时头部图标
                    "createDesktopShortcut": true, // 创建桌面图标
                    "createStartMenuShortcut": true,// 创建开始菜单图标
                    "shortcutName": "demo", // 图标名称
                },
            }
        }
    }
};
