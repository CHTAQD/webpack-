let path = require("path");
let HWP = require("html-webpack-plugin")
let MCEP = require("mini-css-extract-plugin");
let MCEPS = require("mini-css-extract-plugin");

// let proxy =  require(' http-proxy-middleware ')

module.exports={
	mode:'development',
	entry:'./src/index.js',
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'bundle.js'
	},
	devServer:{
		port:3000,
		progress:true, 
		contentBase:'./dist', 
        compress:true ,
        proxy: { //devserver 自带的
            '/api': {
              target: 'locahost:8087',
              pathRewrite: {'^/api' : ''},
              secure: false          // 设置支持https协议的代理
            }
        }
            
	},
	plugins:[
		new HWP({
            template:'./src/index.html',
            filename:'index.html',
            hash:true,
            // minify:{
            //     removeAttributeQuotes:true, 
            //     collapseWhitespace: true,  
            // }
        }),
        new MCEP({
            filename:"index.css",
          
        }),
        new MCEPS({
            filename:"index.less",
          
        })

	],
	module:{
        rules:[
            // {
            //     test:/.css$/,
            //     use:[MCEP.loader,'css-loader','postcss-loader']
            // },
            {
                test:/.less$/,
                use:[MCEPS.loader,'css-loader','less-loader']
               
            }

        ]
	}


}