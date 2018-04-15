## 怎么在全局使用sass script 

使用 sass-resources-loader

``` javascript
{
    loader: 'sass-resources-loader',
    options: {
        resources: path.resolve(__dirname, '../src/assets/style/index.scss')
    }
}
```

## zepto 导入这种无法引入的模块

使用 exports-loader 和 script-loader

``` javascript

import $ from 'exports-loader?window.$!script-loader!zepto'
```