### 将sass script和样式分开存放

sass script 指的是 @function @mixin 和存放公用变量的sass文件,这些不直接生成样式的sass文件以 **'_'** 开头。

在 **index文件** 中@import,便可以在全局环境中使用。

如: **_function.scss** , **_mixin.scss**