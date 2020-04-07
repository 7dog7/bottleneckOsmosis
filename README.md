# 瓶颈渗透

## 1.JS文件字典 (持续压迫前端工程师给我提供)

使用技巧:
> 比如我们渗透一个后台系统，查看源码，分析公共js目录，后台管理js目录。  
> 当得到路劲就可以进行爆破探测文件是否存在，如果存在快速捕获接口进行测试SQLI,未授权访问  
> 当毫无思路得情况下，根据js文件分析网站后台大概结构，根据变量名，文件名进行深度猜测。  

## 2.FUZZ参数字典  

使用技巧:
>初始化字典地址:https://github.com/TheKingOfDuck/fuzzDicts/edit/master/paramDict/parameter.txt  
>如http://127.0.0.1/1.php ,视为可疑文件，进行fuzz param 选择GET,POST AND (POST JSON) AND (GET Route) AND cookie param

## 3.ScanAnnotation注释扫描谷歌插件 

使用技巧:
>谷歌浏览器，进入扩展程序开启开发者模式，选择加载已解压的扩展程序  
>谷歌应用商店: https://chrome.google.com/webstore/search/%E6%89%AB%E6%8F%8F%E5%BD%93%E5%89%8D%E8%B5%84%E6%BA%90%E6%B3%A8%E9%87%8A

工具前言:
>通过注释可以发现一些利用的内容，有的程序员喜欢写上这个是什么功能,你就可以猜出后台或者隐藏的功能，有的还会贴上后台地址啥，配置文件内网域名各种吧。ctf也可以辅助一下哦！

## 4.js,jq,vue,react,angluar 快速提取api and param
> 正在研究
> 参考资料:https://github.com/GerbenJavado/LinkFinder （基本是同个功能还有谷歌插件）  
> 参考资料:https://github.com/p1g3/JSINFO-SCAN （递归式寻找域名和api） 
> 近期发现Vue.js devtools,Augury,React Developer Tools等谷歌插件,如js代码没有进行变态处理，可以直接使用获取路由  
