### asyncFundebug 如何上传map文件

安装fundebug-cli

```
npm install fundebug-cli -g
```

上传map文件(发布新版本时,记得修改版本号)
```
fundebug-cli upload --apikey "3213c4f5cfcfa6862e653ac4e2b2be46be3bfe316dee8df15776d2d6de6cafa5" --appversion 1.0.2 --directory dist/
```


