# 瓶颈渗透

## 1.JS文件字典 (持续压迫前端工程师给我提供)

使用技巧:
> 比如我们渗透一个后台系统，查看源码，分析公共js目录，后台管理js目录。  
> 当得到路径就可以进行爆破探测文件是否存在，如果存在快速捕获接口进行测试SQLI,未授权访问  
> 当毫无思路得情况下，根据js文件分析网站后台大概结构，根据变量名，文件名进行深度猜测。  

## 2.FUZZ参数字典  

使用技巧:
>初始化字典地址:https://github.com/TheKingOfDuck/fuzzDicts/edit/master/paramDict/parameter.txt  
>如http://127.0.0.1/1.php ,视为可疑文件，进行fuzz param 选择GET,POST AND (POST JSON) AND (GET Route) AND cookie param

## 3.ScanAnnotation注释扫描谷歌插件 

使用技巧:
>谷歌浏览器，进入扩展程序开启开发者模式，选择加载已解压的扩展程序  
>谷歌应用商店: https://chrome.google.com/webstore/detail/scanannotation/gejiegnodfccfhagbeaopeffcdbcgfef?hl=zh-CN (切换账户上架谷歌平台)  
>后续更新支持webpack注释扫描(__随缘更新__)

>通过注释可以发现一些利用的内容，有的程序员喜欢写上这个是什么功能,你就可以猜出后台或者隐藏的功能，有的还会贴上后台地址啥，配置文件内网域名各种吧。ctf也可以辅助一下哦！

## 4.js,jq,vue,react,angluar 快速提取api and param
> 正在研究
> 参考资料:https://github.com/GerbenJavado/LinkFinder （基本是同个功能还有谷歌插件）  
> 参考资料:https://github.com/p1g3/JSINFO-SCAN （递归式寻找域名和api）  
> 近期发现Vue.js devtools,Augury,React Developer Tools等谷歌插件,如js代码没有进行变态处理，可以直接使用获取路由  

## 5.WEB前端的渲染艺术 
> 参考资料:https://mp.weixin.qq.com/s/AfGkqO0O087W24wHgUVs-g  

## 6.manifest遍历JS文件
> 通过manifest.xxx.js 自动猜测 app.xxx.js  
> 使用方式: manifest_find_js.py https://xxxx.com/pc/js/manifest.e90b779b12a4f25606f0.js app  
> app是文件名可自定义  

  
