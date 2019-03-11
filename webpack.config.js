let path = require("path");
let HWP = require("html-webpack-plugin")
let MCEP = require("mini-css-extract-plugin");


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
		compress:true 
	},
	plugins:[
		new HWP({
            template:'./src/index.html',
            filename:'index.html',
            hash:true,
            minify:{
                removeAttributeQuotes:true, 
                collapseWhitespace: true,  
            }
        }),
        new MCEP({
            filename:"index.css",
          
        })
	],
	module:{
        rules:[
            {
                test:/.css$/,
                use:[MCEP.loader,'css-loader','postcss-loader']
            }
        ]
	}


}