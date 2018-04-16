'use strict'
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass').concat(//增加 sass-resources-loader 可以在每个sass模块中使用 sass函数 mixin...
      {
        loader: 'sass-resources-loader',
        options: {
          resources: path.resolve(__dirname, '../src/assets/style/index.scss')
        }
      }
    ),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}


//判断是否存在目录
function fsExistsAccess(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
}

//判断entry配置是否是js入口文件
function isJsEntryFile(entry,suffix = ['js']) {
  let reg = new RegExp(`\.(${suffix.join('|')})$`);

  if(typeof entry === 'string') return reg.test(entry);
  
  if(entry instanceof Array){
    for (let index = 0; index < entry.length; index++) {
      if (!reg.test(entry[index])) return false;
    }
  }

  return true;
}

//生成各个入口配置
exports.generateEntry = function ({ pageDir, filename, insetBefore }) {
  if (typeof pageDir !== 'string')
    throw new Error('请传入目录绝对路径');

  let pagePath = path.resolve(__dirname, pageDir),
    isExists = fsExistsAccess(pageDir),
    entryPath = {};

  if (isExists) {
    let pageFile = fs.readdirSync(pageDir),
      finishFilename = '',
      entryStr = '',
      chunckName = '';

    pageFile.forEach(function (name, index) {
      if (typeof filename === 'function') {
        finishFilename = filename.call(name, name);
      } else if (typeof filename === 'string') {
        finishFilename = filename;
      } else {
        finishFilename = 'index.js';
      }

      entryStr = path.join(pageDir, `${name}/${filename}`);

      //向指定入口添加chunck,如: ['babel-polyfill','main.js']
      if (typeof insetBefore === 'function') {
        chunckName = insetBefore(name);
        if (typeof chunckName === 'string') {
          entryPath[name] = [entryStr];
          entryPath[name].unshift(chunckName);
        }
      } else {
        entryPath[name] = entryStr;
      }

    });
  }

  return entryPath;
}

exports.generateHTMLPlugin = function ({ entryList = {}, filename, template, dependChunks }) {
  let chunks,
    finishFilename = '',
    finishTemplate = '',
    HTMLPlugins = [];
  // console.log(JSON.stringify(entryList))
  for (let name in entryList) {
    // console.log(entryList[name]);
    // console.log(name)
    let isJS = isJsEntryFile(entryList[name]);
    // console.log(isJS)
    if (!isJS ) continue;
    // console.log(entryList[name]);
    chunks = [];
    //判断文件名称
    if (typeof filename === 'function') {
      finishFilename = filename.call(name, name);
    } else if (typeof filename === 'string') {
      finishFilename = filename;
    } else {
      finishFilename = 'index.html';
    }

    if (typeof template === 'function') {
      finishTemplate = template.call(name, name);
    } else if (typeof template === 'string') {
      finishTemplate = template;
    } else {
      finishTemplate = 'index.html';
    }

    //添加依赖块
    if (dependChunks) {
      chunks = chunks.concat(dependChunks, name);
    } else {
      chunks.push(name);
    }

    HTMLPlugins.push({
      filename: finishFilename,
      template: finishTemplate,
      // chunks: chunks,
      inject: false
    });
  }

  return HTMLPlugins;
}

exports.generateCommonChunckPlugin = function (entryList = {}){
    let plugins = [];
  // console.log(entryList)
    for (const name in entryList) {
      console.log(name)
      plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: name+'-vendor',
          chunks: [name],
          minChunks: function (module, count) {
            return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf('css-loader') === -1 &&//去除被打包进来的css-loader
              module.resource.indexOf(
                path.join(__dirname, '../node_modules')
              ) === 0
            )
          }
        })
      );

    }

  return plugins;
}