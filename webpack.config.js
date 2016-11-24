var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var entris = function(path){
	var entry = {};
	const folderReader = function(path){
		var files = fs.readdirSync(path);
		files.forEach(function(file){
			var srcChild = path + '/' + file;
			var stat = fs.statSync(srcChild);
			if(stat.isDirectory()){
				folderReader(srcChild);
			}else{
				if(file.indexOf('entry.js') !== -1){
					entry[path.replace('./static/page','') + '/' + (srcChild.substring(srcChild.lastIndexOf('/') + 1,srcChild.lastIndexOf('.'))).replace('-entry','')] = srcChild;
				}
			}
		})
	}
	folderReader(path);
	return entry;
}

module.exports = {
	debug:true,
	devtool:'source-map',
	resolve:{
		extensions: ['', '.js', '.jsx', '.vue']
	},
	entry:entris('./static/page'),
	output:{
		filename:'[name]-pack.js',
		path:__dirname + '/dist/page'
	},
	module:{
		loaders:[{
			test: /\.(js|jsx|es6)$/,
			loader:'babel',
			query:{
	          cacheDirectory: true,
	          presets: ['es2015', 'stage-0']
	        }
		}]
	}
}