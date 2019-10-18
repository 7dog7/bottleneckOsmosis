const app = {
	state: {
		filterType: 'allType',
		filterLang: 'allLang'
	},
	/**
	 * 获取资源
	 */
	filterResourcesArr(_arr) {
		/* 过滤资源 */
		console.table(_arr);
		const resourcesArr = _arr.filter(function(item) {
			if (item["type"] === "script" || item["type"] === "stylesheet" || item["type"] === "document") {
				if(item["url"].indexOf('chrome-extension') === -1 && item["url"].indexOf('file://') === -1){
					return item;
				}
			}
		});
		return resourcesArr;
	},
	/**
	 * 获取资源的注释代码
	 */
	getResourcesAnnotationCode(_content) {
		/* 匹配多行注释与单行注释与html注释*/
		const reg = /<!--[^\!\[]*?(?<!\/\/)-->|\/\/.*(?:\r|\n|$)|(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/mg;
		const regArr = _content.match(reg);
		return regArr === null ? '' : regArr.join('');
	},
	/**
	 * 渲染Dom
	 */
	appendResourcesDom(item) {
		/* 单文件所有注释 */
		const annotationCode = this.getResourcesAnnotationCode(item.content);

		/* 注释语言 */
		const regLang = new RegExp("[\\u4E00-\\u9FFF]+","g");
		const codeLang = regLang.test(annotationCode) ? 'gb' : 'en';
		const appendStr = `
			<li data-file-type="${item.type}" data-file-lang="${codeLang}">
				<div class="file-list-link-box">
					<a href="javascript:;">${item.url}</a>
				</div>
				<pre>${this.htmlEncodeByRegExp(annotationCode)}</pre>
			</li>
		`;
		/* 过滤没注释的文件 */
		if(annotationCode !== ''){
			$("#file-list").append(appendStr);
		}
	},
    htmlEncodeByRegExp:function (str){
        var s = "";
        if(str.length == 0) return "";
        s = str.replace(/&/g,"&amp;");
        s = s.replace(/</g,"&lt;");
        s = s.replace(/>/g,"&gt;");
        s = s.replace(/ /g,"&nbsp;");
        s = s.replace(/\'/g,"&#39;");
        s = s.replace(/\"/g,"&quot;");
        return s;
    },
	/**
	 * 绑定DOM事件
	 */
	bindDomEvent() {
		const that = this;
		$('#filterType,#filterLang').change(function(){
			const selected = $(this).children('option:selected').val();
			const eleId = $(this).attr("id");
			that.state[eleId] = selected;
			const $fileList = $("#file-list li");
			$fileList.each(function(i){
				if ((($(this).attr("data-file-type") === that.state["filterType"]) || (that.state["filterType"] === "allType")) 
				&& (($(this).attr("data-file-lang") === that.state["filterLang"]) || (that.state["filterLang"] === "allLang"))) 
				{
					$(this).show();
				} else {
					$(this).hide();
				}
			});
		});

		/* 给资源地址跳转到对应文件 */
		$("#file-list").on('click','a',function(){
			that.openResource($(this).html());
	  	});
	},
	/**
	 * 获取浏览器加载的全部资源
	 */
	getResources() {
		chrome.devtools.inspectedWindow.getResources((resources) => {
			/* 过滤后的数组 */
			const resourcesArr = this.filterResourcesArr(resources);
			resourcesArr.forEach((item,index) => {
				item.getContent((content) => {
					let obj = item;
					obj["content"] = content;
					this.appendResourcesDom(obj);
				});
			});
		});
	},
	/**
	 * 打开资源
	 * @param {string} _url 
	 */
	openResource(_url) {
		chrome.devtools.panels.openResource(_url);
	},
	/**
	 * 初始化
	 */
	init() {
		this.bindDomEvent();
		this.getResources();
	}
};

$(function(){
    chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab) {
        if(changeInfo.status === "complete"){
            $("#file-list").html('');
            app.init();
        }
    });
    app.init();

});

