// ==UserScript==
// @name         云上全平台🦄️支持自动答题｜题库搜｜刷资源｜刷视频｜视频加速｜快速背题｜AI搜题｜AI问答｜
// @version      5.38
// @description  【🐯全网免费且仅做一款脚本🐯】、【🚀已完美兼容、智慧树、中国大学mooc、慕课、雨课堂、新国开、超星、学习通、知到、国家开放大学、蓝墨云、职教云、智慧职教、云班课精品课、剩余网站仅支持部分功能🚀】、【😎完美应付考试、测试，全自动答题，一键完成所有资源学习（视频挨个刷时长不存在滴）、视频倍速😎】、【半兼容、U校园、学堂在线】、【💪新增AI搜题、AI问答，定制化服务💪】、【💙破除网站不可复制文字💙】、【🐮基于生成式AI(ChatGPT)的答案生成🐮】、【🔥一键导入题目🔥】、【🧡新增背题模式（遮挡答案，更好的进行考试复习）🧡】、【有其他平台支持需要的请加群催更:tg群🐟https://t.me/tg_meto🐟QQ群😄716217812😄，共同交流进步，特别感谢MeTo题库提供题目搜索功能】。【💚作者在此保证，脚本无任何诸如（手机号，学校信息，等隐私信息）收集💚】
// @author       阿绿
// @note         致谢表：@凈仙人、@💪❤、@M_、@吃土豆长大的马铃薯、@悟虚、@台灯没电了、@Pumpkin、@小陈陈陈陈啊、@Sli、@无心人、@29827*0049、@热心解答（以上均是对此脚本做出过有效BUG提交OR提供账户帮助修复OR提供好的idea，如有遗漏请告知）
// @match        *://*.mosoteach.cn/*
// @match        *://*.chaoxing.com/*
// @match      	 *://*.xueyinonline.com/*
// @match        *://*.edu.cn/*
// @match        *://*.ouchn.cn/*
// @match        *://*.nbdlib.cn/*
// @match        *://*.hnsyu.net/*
// @match        *://*.gdhkmooc.com/*
// @match        *://*.zhihuishu.com/*
// @match      	 *://*.icve.com.cn/*
// @match      	 *://*.yuketang.cn/*
// @match      	 *://v.met0.top/*
// @match      	 *://*.icourse163.org/*
// @match      	 *://*.xuetangx.com/*
// @namespace    https://gitee.com/xiaolv12/yunbanke
// @supportURL   https://gitee.com/xiaolv12/yunbanke
// @updateURL    https://gitee.com/xiaolv12/yunbanke/raw/master/update.user.js
// @downloadURL  https://gitee.com/xiaolv12/yunbanke/raw/master/update.user.js
// @icon         https://bkimg.cdn.bcebos.com/pic/4ec2d5628535e5dde7114110e88eb0efce1b9c16c4e1
// @require      https://cdn.bootcss.com/crypto-js/3.1.9-1/crypto-js.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        unsafeWindow
// @grant        GM_info
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @connect      m.met0.top
// @connect      v.met0.top
// @connect      c.met0.top
// @connect      d.met0.top
// @connect      127.0.0.1
// @connect      gitee.com
// @connect      *
// @license      GPLv3
// ==/UserScript==
(function(_this) {
    _this.GM_setValue = GM_setValue;

    // let $ = window.y$ ||document.getElementById("yl_8").onclick; // 此处为避免原生网页没有jquery
    function MyPage(menu){
        // time = Math.floor(Date.now()/10000);
        // time = time %16;
        // console.log(time)
        // // this.axios = _this.axios;
        // // this.Qs =Qs;
        // this.MainIP = "http://localhost:10086"
        // this.ChatIP = "http://localhost:3000"
        this.aner = null;
        this.MainIP = "http://m.met0.top"
        this.ChatIP = "https://v.met0.top"
        this.SpareIP ="https://d.met0.top"
        this.version="5.2";
        this.$ = $;
        this.menu = menu;
        this.config = this.urlToObject(window.location.href);
        this.api = this.getAPI(this.config.hostname);
        this.config.tk_uid =null;
        this.initMenu();
        // this.initVue();
        return this;
    }
    MyPage.prototype.urlToObject = function(url){
        let obj = {};
        let arr1 = url.split("?");
        obj["front_url"] = arr1[0].split("/");
        if(url.includes('mooc.mosoteach.cn')){
            obj.hostname = "mooc.mosoteach";
        }else if(url.includes('mosoteach.cn')){
            obj.hostname = "mosoteach";
        }else if(url.includes("zhihuishu.com")){
            obj.hostname = "zhihuishu";
        }else if(url.includes("icve.com.cn")){
            obj.hostname = "icve";
        }else if(url.includes("met0.top")){
            obj.hostname = "meto";
        }else if(url.includes("ouchn.cn")){
            obj.hostname = "ouchn";
        }else if(url.includes("chaoxing.com")){
            obj.hostname = "chaoxing";
        }else if(url.includes("yuketang.cn")){
            obj.hostname = "yuketang";
        }else if(url.includes("icourse163")){
            obj.hostname = "mooc";
        }else if(url.includes("unipus.cn")){
            obj.hostname = "uschool";
        }else if(url.includes("xuetangx.com")){
            obj.hostname = "xuetangx";
        }
       
        if(arr1[1]){
            let arr2 = arr1[1].split("&");
            for(let i=0;i<arr2.length;i++){
                let res = arr2[i].split("=");
                obj[res[0]]=res[1];
            }
        }
        return obj;
    }
    MyPage.prototype.getAPI = function(hostname) {
        switch (hostname) {
            case "mooc.mosoteach":
                console.log("精品云班课脚本准备中");
                return new jpyunbanke_api(this.config);
            case "mosoteach":
                console.log("云班课脚本准备中");
                return new yunbanke_api(this.config);
            case "zhihuishu":
                console.log("智慧树脚本准备中");
                return new zhihuishu_api(this.config);
            case "icve":
                console.log("智慧职教脚本准备中");
                return new icve_api(this.config);
            case "meto":
                console.log("meto脚本准备中");
                return new meto_api(this.config);
            case "ouchn":
                console.log("国开脚本准备中");
                return new ouchn_api(this.config);
            case "chaoxing":
                console.log("超星脚本准备中");
                return new chaoxin_api(this.config);
            case "yuketang":
                console.log("雨课堂脚本准备中");
                return new yuketang_api(this.config);
            case "mooc":
                console.log("慕课脚本准备中");
                return new mooc_api(this.config);
            case "uschool":
                console.log("U校园脚本准备中");
                return new uschool_api(this.config);
            case "xuetangx":
                console.log("学堂在线脚本准备中");
                return new xuetangx_api(this.config);
            default:
                return null;
        }
      };

    MyPage.prototype.getCookie = function(objName) {   //获取指定名称的cookie的值
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
          var temp = arrStr[i].split("=");
          if (temp[0] == objName) return temp[1];  //解码
        }
        return "";
    }
    MyPage.prototype.generateHexString=function (length) {
        var hexString = '';
        var hexChars = '0123456789abcdef';
        for (var i = 0; i < length; i++) {
            hexString += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
        }
        return hexString;
    }
    MyPage.prototype.video_spend=function () {
        $('#zhu').append("<button id='x_spend' ><span>视频速率</span></button>");
        $("video").each((index,item)=>{
            item.playbackRate = GM_getValue("video_spend")||1;
        })
        $("#x_spend").click(()=>{
            var userInput = window.prompt("请注意有些平台有速率检测（如智慧树）,如被检测请保持默认\n部分平台发现观看速度过快会打回\n请输入您需要修改的速率(一般平台可支持:0-16倍速率，1为正常速率)", GM_getValue("video_spend")||1)||1;
            GM_setValue("video_spend",userInput)
            $("video").each((index,item)=>{
                item.playbackRate = userInput;
            })
        })
    }
    // MyPage.prototype.guid= function(data){
    //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    //         var r =Math.random() * 16 | 0,
    //             v = c == 'x' ? r : (r & 0x3 | 0x8);
    //             console.log(v);
    //         return v.toString(16);
    //     });
    // }
    MyPage.prototype.upladApi = function(url,data){
        if(!GM_getValue("time_error_rate")){
            GM_setValue("time_error_rate",0)
        }
        var obj={};
        obj.poolId = this.config.poolId;
        obj.token = this.config.poolId;
        for(var key in data){
            obj[key] = data[key];
        }
        return new Promise(function(resolve, reject){
            GM_xmlhttpRequest({
                timeout: 15000,
                method: "post",
                "url": url,
                headers:{
                    "Content-Type":'application/json',
                    accept: "application/json",
                },
                data: JSON.stringify(obj),
                onload: function(response) {
					var status = response.status;
					var playurl = "";
                    // console.log(response.responseText)
                    try{
                        var responseText = JSON.parse(response.responseText);
                    }catch{
                        let aner = $('html').find("#aner")
                        aner.text("服务器数据获取失败,请尝试切换网络");
                        // aner.append("<br>ti_uid="+GM_getValue("ti_uid") +"<br>pp="+GM_getValue("pp") +"<br>poolId="+GM_getValue("poolId"));
                        aner.css("display","block");
                        return
                    }
                    
					if(status==200||status=='200'||status==501||status=='501'){
                        resolve({"result":"success", "json":responseText});
					}else if(status==400||status=='400'||status==401||status=='401'){
                        if ("data" in responseText){
                            if (responseText.data.message){ //基本上是adduid的返回值
                                resolve({"result":"success", "json":responseText});
                            }else{
                                if(responseText.data != "重复试卷"){
                                    let aner = $('html').find("#aner")
                                    aner.css("display","block");
                                    if(responseText.data[0]=="人"){
                                        var time_error_rate = Date.now() - responseText.data.substr(6)
                                        GM_setValue("time_error_rate",time_error_rate);
                                        // console.log(time_error_rate)
                                    }
                                    GM_setValue("overdue",1)
                                    aner.text(responseText.data);
                                }else{
                                    resolve({"result":"success", "json":responseText});
                                }
                            }
                        }else{
                            let aner = $('html').find("#aner")
                            aner.text("基础配置文件似乎出错了,请刷新后重试");
                            // aner.append("<br>ti_uid="+GM_getValue("ti_uid") +"<br>pp="+GM_getValue("pp") +"<br>poolId="+GM_getValue("poolId"));
                            aner.css("display","block");
                        }
                        
                    }else if(status==500||status=='500'){
                        let aner = $('html').find("#aner")
                        aner.css("display","block")
                        if("message" in responseText){
                            aner.text(responseText.message);
                        }else{
                            aner.text("导入错误，请联系管理员");
                        }
						reject({"result":"error", "json":responseText});
                    }else{
                        let aner = $('html').find("#aner")
                        aner.css("display","block")
                        aner.text(responseText.message);
						reject({"result":"error", "json":responseText});
                        GM_setValue("overdue",1)
				    }
                },
                onerror : function(err){
                    console.log('error')
                    console.log(err)
                    let aner = $('html').find("#aner")
                    aner.css("display","block")
                    aner.text("无法连接到服务器，请尝试更换网络，需要可以访问http://d.met0.top");
                },
                ontimeout : function(inf){
                    if(url != this.MainIP+"/tiku/api/v1/problems"){
                        console.log('请求超时')
                        console.log(inf)
                        let aner = $('html').find("#aner")
                        aner.css("display","block")
                        aner.text("服务器响应超时，请稍后重试，或者直接加群，来催更，或者来给项目充个电，发动钞能力，助力作者更早更换服务器。");
                    }
                }
            });
        });
    }
    
    MyPage.prototype.HtmlUtil = {
        /*1.用浏览器内部转换器实现html转码*/
        htmlEncode:function (html){
            //1.首先动态创建一个容器标签元素，如DIV
            var temp = document.createElement ("div");
            //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
            (temp.textContent != undefined ) ? (temp.textContent = html) : (temp.innerText = html);
            //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
            var output = temp.innerHTML;
            temp = null;
            return output;
        },
        /*2.用浏览器内部转换器实现html解码*/
        htmlDecode:function (text){
            //1.首先动态创建一个容器标签元素，如DIV
            var temp = document.createElement("div");
            //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
            temp.innerHTML = text;
            //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        }
    };

    MyPage.prototype.resoluAnswers=function(data){
        let newData = {};
        if(data ==null){
            return console.log("并未获取到题库数据");
        }
        if("paperId" in data){
            console.log("meto题库重组中");
            newData.id = data.title;
            newData.rows = [];
            data.problems.forEach(row=>{
                let _data ={};
                _data.problemId = row.problemId;
                _data.subject = row.text;
                _data.answers = JSON.parse(row.answer);
                newData.rows.push(_data);
            });
            
        }else if("rule" in data){
            console.log("助手题库重组中");
            newData.rows = [];
            if("get_answer" in data){ //修改未测试
                data.get_answer.forEach(row=>{
                    let _data ={};
                    _data.answers = [];
                    let br = new RegExp("-and-","g");
                    row.t = row.t.replace(br,"&");
                    row.t=this.HtmlUtil.htmlDecode(row.t);
                    _data.subject = row.t;
                    row.a.forEach(an=>{
                        _data.answers.push(this.HtmlUtil.htmlDecode(an.replace(br,"&")))
                    })
                    _data.type =row.y;
                    _data.options = row.s;
                    newData.rows.push(_data);
                });
            }
        }else if("flag" in data){
            if (data.flag == "metoproblems"){
                console.log("meto1题组重组中");
                newData.id = data.title;
                newData.rows = [];
                try{
                    data.problems.forEach(row=>{
                        let _data ={};
                        _data.problemId = row.problemId;
                        _data.subject = row.text;
                        _data.answers = JSON.parse(row.answer);
                        newData.rows.push(_data);
                    });
                }catch (e){
                    // alert("服务器连接失败，请联系作者。")
                    console.log("发生异常:" + e);
                }
                
            }
            
        }else{
            console.log(data);
        }
        return newData;
    }

    
    /*
    *  u校园请求
    */
    class uschool_api{
        constructor(config) {
            this.config = config;
        }
        getCookie(objName) {   //获取指定名称的cookie的值
            var arrStr = document.cookie.split("; ");
            for (var i = 0; i < arrStr.length; i++) {
              var temp = arrStr[i].split("=");
              if (temp[0] == objName) return temp[1];  //解码
            }
            return "";
        }
        get_user_inf(){
            return new Promise((resolve,rejcet)=>{
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "https://ucamapi.unipus.cn/rpc/api/user-info/brief?source=0&callback=window.user_inf=&openId="+this.getCookie("ucamUserId"),
                    onload: res=> {
                        resolve(res.response);
                    },
                    onerror:err=>{
                        console.log("加载失败")
                    }
                })
            })
            
        }
        async get_user_obj(){
            //由于此处带有eval函数，会触发gre的代码保护，所以直接return了。
            return 
            // var regex = /window.webUser([\s\S]*?)};/gi;
            let script = await this.get_user_inf()
            // var matches = doc.match(regex);
            // eval(script)
            // GM_setValue("userimg",window.webUser.largeFaceUrl||"");
            // let img_table = $('html').find("#x_set")
            // img_table.css("background","url(" +  window.webUser.largeFaceUrl||"" + ")")
            let name = window.user_inf.result.name
            let id = window.user_inf.result.phone
            this.config.user_id = "uschool"+id
            this.config.full_name = name;
            let obj={
                "unionid": this.config.user_id,
                "username": this.config.full_name,
                "poolId":"ec942b0b-38c6-3256-b0e1-2a33428d4bbc",
                "grade": "uschool",
            };
            return obj
        }
    }
    /*
    *  学堂在线请求
    */
    
    class xuetangx_api{
        constructor(config) {
            this.config = config;
        }
        get_user_inf(){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'get',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    url: "https://www.xuetangx.com/api/v1/u/user/basic_profile/",
                    success: function(res) {
                        resolve(res.data);
                    }
                });
            });
        }
        async get_user_obj(){
            let user_inf = await this.get_user_inf()
            console.log(user_inf)
            GM_setValue("userimg",user_inf.avatar||"");
            let img_table = $('html').find("#x_set")
            img_table.css("background","url(" + user_inf.avatar||"" + ")")

            let name = user_inf.nickname
            let id = user_inf.user_id
            this.config.user_id = "xtzx_"+id
            this.config.full_name = name;
            let obj={
                "unionid": this.config.user_id,
                "username": this.config.full_name,
                "poolId":"ec942b0b-38c6-3256-b0e1-2a33428d4bbc",
                "grade": "学堂在线",
            };
            return obj
        }
    }
    /*
    *  mooc请求
    */
    
    class mooc_api{
        constructor(config) {
            this.config = config;
        }
        get_user_inf(){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'get',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    url: "https://www.icourse163.org/home.htm",
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        }
        async get_user_obj(){
            // var regex = /window.webUser([\s\S]*?)};/gi;
            // let doc = await this.get_user_inf()
            // var matches = doc.match(regex);
            // console.log(_this.webUser)
            // eval(matches[0])
            GM_setValue("userimg",_this.webUser.largeFaceUrl||"");
            let img_table = $('html').find("#x_set")
            img_table.css("background","url(" +  _this.webUser.largeFaceUrl||"" + ")")

            let name = _this.webUser.nickName
            let id = _this.webUser.id
            this.config.user_id = "mooc_"+id
            this.config.full_name = name;
            let obj={
                "unionid": this.config.user_id,
                "username": this.config.full_name,
                "poolId":"ec942b0b-38c6-3256-b0e1-2a33428d4bbc",
                "grade": "mooc",
            };
            return obj
        }
    }
    /*
    *  雨课堂请求
    */
    class yuketang_api{
        constructor(config) {
            this.config = config;
        }
        get_user_inf(){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'get',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    url: "https://"+this.config.front_url[2]+"/edu_admin/get_user_basic_info",
                    success: function(res) {
                        resolve(res.data.user_info);
                    }
                });
            });
        }
        get_user_inf1(){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'get',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    url: "https://"+this.config.front_url[2]+"/v2/api/web/userinfo",
                    success: function(res) {
                        resolve(res.data[0]);
                    }
                });
            });
        }
        async get_user_obj(){
            let user_inf = await this.get_user_inf() || await this.get_user_inf1()
            GM_setValue("userimg",user_inf.avatar||"");
            let img_table = $('html').find("#x_set")
            img_table.css("background","url(" +  user_inf.avatar||"" + ")")

            let name = user_inf.name
            let id = user_inf.user_id
            this.config.user_id = "ykt_"+id
            this.config.full_name = name;
            let obj={
                "unionid": this.config.user_id,
                "username": this.config.full_name,
                "poolId":"ec942b0b-38c6-3256-b0e1-2a33428d4bbc",
                "grade": "雨课堂",
            };
            return obj
        }
        sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
        // 创建一个 PointerEvent 对象
        pointerEvent = new PointerEvent("pointerdown", {
            bubbles: true,
            cancelable: true,
            pointerId: 1, // 指针 ID
            pointerType: "mouse", // 指针类型
            clientX: 100, // 指针在视口中的 X 坐标
            clientY: 100, // 指针在视口中的 Y 坐标
        });
        async choice_function(){
            if(!GM_getValue("resource_farming_state")&&!GM_getValue("resource_farming_main_state")){
                return
            }
            for(let i=10;i;i--){
                console.log($(".activity-content").text().length)
                await this.sleep(1000)
                if($("video").length&&$("video")[0].duration){
                    console.log("视频加载")
                    let video = $("video")[0]
                    
                    document.hasFocus = ()=> {
                        return true
                    }
                    await this.sleep(2000)
                    $(".xt_video_player_common_icon").click()
                    

                    while(1){
                        
                        if(video.ended||$(".text").text().substr(-4,4)=="100%"){
                            break;
                        }
                        await this.sleep(1000)
                        video.muted = true;
                        $(".xt_video_bit_play_btn").click()
                        $(".xt_video_bit_play_btn")[0].dispatchEvent(this.pointerEvent);
                        
                    }
                    
                    break;
                }
            }
            
            await this.sleep(1000)
            GM_setValue("resource_farming_state",false)
            if(GM_getValue("resource_farming_main_state")){
                $(".btn-next").click()
            }else{
                window.close();
            }
            
        }
        async resource_farming(){
            
            let activity_list=[]
            let divs = $(".leaf-detail")
            divs.each((index,div)=>{
                if($(div).find(".icon--shipin").length && $(div).find(".el-tooltip").text()!="已完成" ){
                    activity_list.push(div)
                }
            })
            divs = $(".right-content")[0] ||[]//雨课堂main site
            $(divs).find(".study-unit").each((index,div)=>{
                if($(div).find("span")[1].innerHTML.trim() !="已完成"){
                    activity_list.push($(div).find(".name-text"))
                }
            })
            

            if(activity_list.length){
                console.log(activity_list.length)
            }else{
                window.my.aner.show("slow")
                window.my.aner.text("未检测到页面资源，请等待页面加载完毕。 ")
                window.my.aner.append("</br>若未展开资源，请点击全部展开。")
                window.my.aner.append("</br>或者进入成绩单页面，再次点击。")
                $("#x_res").attr("disabled", false)
                $("#tab-student_school_report").click()
                return
            }
            window.my.aner.show("slow")
            window.my.aner.text("部分浏览器默认关闭弹出窗口，请在右上角开启")
            
            // return
            for(let i =0;i<activity_list.length;i++){
                GM_setValue("resource_farming_state",true)
                activity_list[i].click()
                while(1){
                    if(GM_getValue("resource_farming_state")){
                        $("#x_res").text("剩余"+(activity_list.length - i)+"资源")
                        await this.sleep(1000)
                    }else{
                        break
                    }
                }
                
            }
            $("#x_res").text("全部完成")
        }
    }
    /*
    *  超星请求
    */
    class chaoxin_api{
        constructor(config) {
            this.config = config;
        }
        get_userid(){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'post',
                    // xhrFields: {
                    //     withCredentials: true  //允许跨域发送cookies
                    // },
                    url:"http://i.chaoxing.com/base",
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        }
        sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
        async get_user_obj(){
            // let a = await this.get_userid()
            GM_setValue("userimg",$("body").find(".user").find("img")[0].attributes.src.value||"");
            let img_table = $('html').find("#x_set")
            img_table.css("background","url(" +  $("body").find(".user").find("img")[0].attributes.src.value||"" + ")")

            let name = $("body").find(".user").find("h3")[0].innerText
            let id = $("body").find(".user").find("img")[0].attributes.src.value.substr(28,9)
            this.config.user_id = "cx_"+id
            this.config.full_name = name;
            let obj={
                "unionid": this.config.user_id,
                "username": this.config.full_name,
                "poolId":"ec942b0b-38c6-3256-b0e1-2a33428d4bbc",
                "grade": "超星",
            };
            return obj
        }
        async choice_function(){
            if(!GM_getValue("resource_farming_main_state")){
                return
            }
            for(let i=10;i;i--){
                await this.sleep(1000)
                console.log("开始检测页面内容"+i)
                let video
                if($('iframe').length){
                    video = $('iframe').contents().find("iframe").contents().find("video")[0]
                }
                if(video){
                    console.log("视频加载")
                    video.muted = true;
                    while(1){
                        if(video.ended){
                            console.log("播放结束")
                            $("#prevNextFocusNext").click()
                            this.choice_function() //再次循环
                            break;
                        }
                        // $(".playButton").click()
                        video.play()
                        // let mi  = video.duration - video.currentTime
                        // console.log(mi)
                        await this.sleep(1000)
                    }
                    break;
                }
            }
            $("#prevNextFocusNext").click()
            // GM_setValue("resource_farming_state",false)
            this.choice_function() //再次循环
            
        }

    }
    
    /*
    *  国开请求
    */
    class ouchn_api{
        constructor(config) {
            this.config = config;
        }
        get_userid(){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    url:"https://lms.ouchn.cn/user/settings",
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        }
        // get_user_inf(){
        //     return new Promise((resolve,rejcet)=>{
        //         $.ajax({
        //             type: 'GET',
        //             xhrFields: {
        //                 withCredentials: true  //允许跨域发送cookies
        //             },
        //             url:"https://lms.ouchn.cn/api/user/20000797261/accounts",
        //             success: function(res) {
        //                 resolve(res[0]);
        //             }
        //         });
        //     });
        // }
        async get_user_obj(){
            // let a = await this.get_userid()
            // a = $(a)
            // eval(a.find("script")[0])
            // console.log(globalData)
            // let user_inf = await(this.get_user_inf());
            // if(!user_inf){
            //     return;
            // }
            // console.log(user_inf)
            let user_inf = _this.globalData.user
            // GM_setValue("userimg",user_inf.avatarUrl||"");
            // let img_table = $('html').find("#x_set")
            // img_table.css("background","url(" +  user_inf.avatarUrl||"" + ")")
            this.config.user_id = "gk_"+user_inf.id
            this.config.full_name = user_inf.name;
            let obj={
                "unionid": this.config.user_id,
                "username": this.config.full_name,
                "poolId":"ec942b0b-38c6-3256-b0e1-2a33428d4bbc",
                "grade": "国开",
            };
            return obj
        }

        get_activity_reads(course){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    url:"https://lms.ouchn.cn/api/course/"+course+"/activity-reads-for-user",
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        }
        get_completeness(course){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    url:"https://lms.ouchn.cn/api/course/"+course+"/my-completeness",
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        }
        get_models(course){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    url:"https://lms.ouchn.cn/api/courses/"+course+"/modules",
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        }
        get_all_activities(course,str){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    url:"https://lms.ouchn.cn/api/course/"+course+"/all-activities?module_ids="+str,
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        }
        async choice_function(){
            if(!GM_getValue("resource_farming_state")&&!GM_getValue("resource_farming_main_state")){
                return
            }
            for(let i=10;i;i--){
                console.log($(".activity-content").text().length)
                await this.sleep(1000)
                if($(".activity-content").find(".text-too-long").length){
                    console.log("检测到ppt按钮")
                    $(".activity-content").find(".text-too-long").click()
                    break;
                }else if($(".join-button").length){
                    console.log("课堂直播")
                    break;
                }else if($("video").length&&$("video")[0].duration){
                    console.log("视频加载")
                    let video = $("video")[0]
                    video.muted = true;
                    while(1){
                        if(video.ended){
                            break;
                        }
                        $(".mvp-fonts-play").click()
                        // let mi  = video.duration - video.currentTime
                        // console.log(mi)
                        await this.sleep(1000)
                    }
                    
                    break;
                }else if($(".activity-content").find(".page-box").length){
                    console.log("文章加载")
                    break;
                }else if($(".exam-activity-box").length){
                    console.log("测试题加载")
                    await this.sleep(1000)//测试题box加载过快，可能导致没有下一个
                    break;
                }
                
                
                
            }
            
            await this.sleep(1000)
            GM_setValue("resource_farming_state",false)
            $(".next-btn").click()
        }
        sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
        async resource_farming(){
            let course = this.config.front_url.at(4)
            let url = "https://lms.ouchn.cn/course/"+course+"/learning-activity/full-screen#/"
            let activity_list=[]
            let divs = $(".learning-activity")
            divs.each((index,div)=>{
                let type = $(div).find(".activity-summary").attr("ng-switch-when")
                if($(div).find(".completeness").attr("class") != "completeness full" && type != "exam"&& type != "forum" &&type != "homework"){
                    try{
                        var id = $(div).attr("id").substr(18)
                    }catch{
                        return
                    }
                    activity_list.push(id)
                }
            })
            if(activity_list.length){
                console.log(activity_list)
            }else{
                window.my.aner.show("slow")
                window.my.aner.text("未检测到页面资源，请等待页面加载完毕。 ")
                window.my.aner.append("</br>若未展开资源，请点击全部展开。")
                $("#x_res").attr("disabled", false)
                return
            }
            window.my.aner.show("slow")
            window.my.aner.text("部分浏览器默认关闭弹出窗口，请在右上角开启")
            
            // return
            for(let i =0;i<activity_list.length;i++){
                GM_setValue("resource_farming_state",true)
                let childwindow = window.open(url+activity_list[i], "_blank")
                while(1){
                    if(GM_getValue("resource_farming_state")){
                        $("#x_res").text("剩余"+(activity_list.length - i)+"资源")
                        await this.sleep(1000)
                    }else{
                        childwindow.close()
                        break
                    }
                }
                
            }
            $("#x_res").text("全部完成")
        }
    }
    /*
    *  meto请求
    */
    class meto_api{
        constructor(config) {
            this.config = config;
        }
        get_user_inf(){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    url:"https://v.met0.top/api/user",
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        }
        async get_user_obj(){
            let user_inf = await(this.get_user_inf());
            if(!user_inf){
                return;
            }
            this.config.tk_uid = user_inf.id;
            this.config.pp = user_inf.sal;
            this.config.user_id = user_inf.user.email
            this.config.poolId = CryptoJS.MD5(CryptoJS.MD5(this.config.user_id).toString() + this.config.pp).toString();
            this.config.poolId = this.config.poolId.slice(0,8)+"-"+this.config.poolId.slice(8,12)+"-"+this.config.poolId.slice(12,16)+"-"+this.config.poolId.slice(16,20)+"-"+this.config.poolId.slice(20,32)
            GM_setValue("poolId",this.config.poolId);
            GM_setValue("ti_uid",this.config.tk_uid);
            
            // GM_setValue("userimg",user_inf.avatarUrl||"");
            // let img_table = $('html').find("#x_set")
            // img_table.css("background","url(" +  user_inf.avatarUrl||"" + ")")
            
            this.config.full_name = user_inf.name;
            let obj={
                "unionid": this.config.user_id,
                "username": "",
                "poolId":"ec942b0b-38c6-3256-b0e1-2a33428d4bbc",
                "grade": "meto",
            };
            return obj
        }
    }
    /*
    *  智慧职教请求
    */
    class icve_api{
        constructor(config) {
            this.config = config;
        }
        get_user_inf(){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    // url:"https://sso.icve.com.cn/prod-api/user/userInfo?token="+this.getCookie("token"),
                    
                    // success: function(res) {
                    //     resolve(res.data);
                    // }
                    headers: {
                        "Authorization":"Bearer "+this.getCookie("Token"),
                    },
                    url:"https://zyk.icve.com.cn/prod-api/system/user/getInfo",
                    success: function(res) {
                        resolve(res.user);
                    }
                });
            });
        }
        get_user_inf1(){ //https://www.icve.com.cn/
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    url:"https://www.icve.com.cn/studycenter/PersonalInfo/getUserInfo",
                    success: function(res) {
                        resolve(res.userInfo);
                    }
                });
            });
        }
        getCookie(objName) {   //获取指定名称的cookie的值
            var arrStr = document.cookie.split("; ");
            for (var i = 0; i < arrStr.length; i++) {
              var temp = arrStr[i].split("=");
              if (temp[0] == objName) return temp[1];  //解码
            }
            return "";
        }
        async get_user_obj(){
            let user_inf={}
            if (_this._UID_){
                user_inf.id = _this._UID_;
                user_inf.displayName = _this._TRUENAME_;
            }else{
                user_inf =  await(this.get_user_inf());
                if(!user_inf){
                    user_inf = await(this.get_user_inf1());
                    if(!user_inf){
                        return
                    }
                }
            }
            console.log(user_inf)
            GM_setValue("userimg",user_inf.avatarUrl||"");
            let img_table = $('html').find("#x_set")
            img_table.css("background","url(" +  user_inf.avatarUrl||"" + ")")
            this.config.user_id = "icve_"
            this.config.user_id += user_inf.id||user_inf.userId||user_inf.Id;
            this.config.full_name = user_inf.displayName|| user_inf.nickName||user_inf.DisplayName;
            let obj={
                "unionid": this.config.user_id,
                "username": this.config.full_name,
                "poolId":"ec942b0b-38c6-3256-b0e1-2a33428d4bbc",
                "grade": "智慧职教",
            };
            return obj
        }

        personResult(examId,taskId){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    headers: {
                        "Authorization":"Bearer "+this.getCookie("Token"),
                    },
                    url:"https://zyk.icve.com.cn/prod-api/teacher/taskExamProblemRecord/examRecordPaperList?examId="+examId+"&taskId="+taskId+"&groupId=0",
                    dataType:"json",
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        }
        join_class(){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    headers: {
                        "Authorization":"Bearer "+this.getCookie("Token"),
                    },
                    url:"https://zyk.icve.com.cn/prod-api/teacher/courseList/myCourseList?pageNum=1&pageSize=6&flag=1",
                    dataType:"json",
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        }
        async get_quiz_result(examId,taskId,courseId){
            if(!classname){
                let classListData = await (this.join_class());
                if(!classListData){
                    return;
                }
                classListData.rows.forEach(course=>{
                    GM_setValue(course.courseId,course.courseName);//对应课名
                })
                var classname = GM_getValue("clazz_course_id")
                if(!classname){
                    classname = courseId;
                }
            }
            let res = await (this.personResult(examId,taskId));
            var status = "error";
            // if(res.result_code != 0){
            //      return alert(res.result_msg);
            // }
            let answers = this.reset_answer(res);
            answers.title = GM_getValue(examId)||"未命名试卷"
            if(answers == null || JSON.stringify(answers) == '{}' ){
                return status;
            }
            let obj={
                "poolId": this.config.poolId,
                "userId":   this.config.tk_uid,
                "tags":[classname,answers.title,"智慧职教"],
                "title":"zhzj_"+answers.id,
                "problems":[],
            };
            let data={};
            
            answers.rows.forEach(row=>{
                if(row.subject.length < 4 || row.answers == ""){
                    console.log("题目录入有误");
                    return; //跳出循环
                }
                data={
                    "tags":     ["智慧职教"],
                    "text":     row.subject,
                    "answer":   JSON.stringify(row.answers),
                };
                data.tags.push(row.type);
                let l = ["choice_A","choice_B","choice_C","choice_D","choice_E","choice_F","choice_G","choice_H","choice_I","choice_J","choice_K","choice_L","choice_M","choice_N","choice_O","choice_P","choice_Q","choice_R","choice_S","choice_T","choice_U","choice_V","choice_W","choice_X","choice_Y","choice_Z"];
                let i=0;
                row.options.forEach(option =>{
                    data[l[i]]=option;
                    i=i+1;
                })
                obj.problems.push(data);
            });
            if(obj.problems.length == 0){
                return;
            }
            await(window.my.upladApi(window.my.MainIP+"/tiku/api/v1/problems",obj).then((resutData)=>{
                console.log(resutData)
                if(resutData.result=="success" && resutData.json){
                    var data = resutData.json.data;
                    console.log(data);
                    GM_setValue(examId+taskId,1);
                    status = "success"
                }
            }));
            return status;
        }

        reset_answer(data){
            let newData = {};
            if(data ==null){
                return console.log("并未获取到题库数据");
            }
            if("requestId" in data){
                console.log("智慧职教题库重组中");
                newData.id = data.data[0].examId;
                newData.title = "暂无";
                newData.rows = [];
                data.data.forEach(row=>{
                    let _data = {};
                    _data.id = row.questionId;
                    let imgs =null;
                    try{
                        imgs = $.parseHTML(row.title); // 去除特殊字符报错
                    }catch (e){
                        console.log(e);
                    }
                    row.title=window.my.HtmlUtil.htmlDecode(row.title);
                    if(imgs){
                        imgs.forEach(async function(img,index){
                            if(img.localName == "img"){
                                row.title += img.outerHTML;
                            }
                        })
                    }
                    // row.subject = row.subject.substr(0,500) //截断前500个字符
                    _data.subject = row.title;
                    _data.options = [];
                    _data.answers = [];
                    _data.type = row.typeName;
                    let tmp_option =  JSON.parse(row.dataJson)

                        if(row.answer){
                            tmp_option.forEach(option=>{
                                _data.options.push(window.my.HtmlUtil.htmlDecode(option.Content));
                                row.answer.split(",").forEach(index=>{
                                    if(option.SortOrder == index){
                                        _data.answers.push(window.my.HtmlUtil.htmlDecode(option.Content));
                                    }
                                })
                            
                            });
                        }else{
                            if(row.isRight == true){
                                tmp_option.forEach(option=>{
                                    _data.options.push(window.my.HtmlUtil.htmlDecode(option.Content));
                                    row.recordAnswer.split(",").forEach(index=>{
                                        if(option.SortOrder == index){
                                            _data.answers.push(window.my.HtmlUtil.htmlDecode(option.Content));
                                        }
                                    })
                                
                                });
                            }else{
                                _data=null;
                            }
                        }
                        
                    // }
                    if(_data != null){
                        newData.rows.push(_data);
                    }
                    
                });
            }else{
                console.log(data);
            }
            console.log(newData)
            return newData;
        }
        get_page(courseId,courseInfoId){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    headers: {
                        "Authorization":"Bearer "+this.getCookie("Token"),
                    },
                    url:"https://zyk.icve.com.cn/prod-api/teacher/homeworkExam/answeredExamList?pageNum=1&pageSize=10&categoryId=1&flag=1&courseInfoId="+courseInfoId+"&courseId="+courseId,
                    dataType:"json",
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        }
        async upload_all_problem(show_aner){
            let classListData = await (this.join_class());
            if(!classListData){
                return;
            }
            classListData.rows.forEach(course=>{
                GM_setValue(course.courseId,course.courseName);//对应课名
            })
            this.config.class_size = 0
            this.config.class_length = 0
            let aner = $('html').find("#aner")
            if(show_aner){
                aner.text("欢迎您的第一次使用，正在为您聚合数据中，请稍后。。。。");
                aner.css("display","block")
            }
            for(let i=0;i<classListData.rows.length;i++){
                let cl = classListData.rows[i];
                this.get_page(cl.courseId,cl.courseInfoId).then((result) =>{
                    result.rows.forEach(async (item)=>{
                        if(!GM_getValue(item.id)){
                            GM_setValue(item.id,item.name)
                            this.config.class_length++;
                            this.config.class_size++;
                            try{
                                await(this.get_quiz_result(item.id,item.taskId,cl.courseId));
                                console.log(item.id+"upload成功")
                            }catch{
                                console.log(item.id+"upload失败")
                            }
                            this.config.class_size--;
                            if(show_aner){
                                aner.text("百分比长时间未动请刷新页面\n已加载："+Math.trunc((1-(this.config.class_size/this.config.class_length))*100)+"%");
                            }
                        }
                    })

                });
            }
        }
        async start_search(){ //智慧职教搜题按钮实现
            const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
            function random(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }
            let HtmlUtil = window.my.HtmlUtil;
            let aner = $('html').find("#aner")
            aner.css("display","block")
            aner.text("正在搜索中，请稍后")
            let upload_paper_flag = false;
            let answers = await(window.my.getAnswers("zhzj_"+this.config.id,true));
            if((answers == null)||JSON.stringify(answers) == '{}'  || answers.rows.length <= 0){
                let subjects = []
                $('.subjectDet').each(function(index,div){
                    let subjct_div = $(div).find('h5');
                    let subject = $(subjct_div).text().trim();
                    let imgs = $(subjct_div).find("img");
                    
                    subject=HtmlUtil.htmlDecode(subject);
                    imgs.each(async function(index,img){
                        if(img.outerHTML){
                            subject += img.outerHTML;
                        }
                    })
                    if(subject != ""){
                        subjects.push(subject);
                    }
                   
                })
                answers = await(window.my.findproblems(subjects));
                upload_paper_flag = true
            }
            
            if(JSON.stringify(answers) == '{}' || !(answers.rows)){
                aner.text("没有搜索到答案，若提前阅卷时有答案，但此时没有请反馈")
            }else{
                aner.text("总共搜索到"+answers.rows.length+"题")
                answers.rows.forEach(row=>{
                    aner.append("<hr>");
                    aner.append("题目:"+row.subject+"<br>"+"答案:");
                    row.answers.forEach(answer =>{        
                         aner.append(answer+" ");
                    });
                });
            }
            let divs = $('.subjectDet');
            for(let i=0;i<divs.length;i++){
                let div = divs[i];
                // let Id = $(div).find('a').attr('name');
                //console.log($(div).find('.t-subject.t-item.moso-text.moso-editor').html());
                let subjct_div = $(div).find('h5');
                let subject = $(subjct_div).text().trim();
                let imgs = $(subjct_div).find("img");
                
                subject=HtmlUtil.htmlDecode(subject);
                imgs.each(async function(index,img){
                    if(img.outerHTML){
                        subject += img.outerHTML;
                    }
                })
                if( $(div).find('.show_answer').length == 0){ //添加文字答案
                    $(div).append("<div class='show_answer'></div>")
                }
                answers.rows.forEach((row,index)=>{
                    if(row.subject == subject){
                        if(!$(div).find('.show_answer')[0].outerText){
                            $(div).find('.show_answer').append("答案："+JSON.stringify(row.answers)+"<br>").css('color','red'); // 添加答案在后方
                        }else{
                            $(div).append("第"+(i+1)+"题重复<br>").css('color','blue');
                            $(div).find('.show_answer').append("答案："+JSON.stringify(row.answers)+"<br>").css('color','red'); // 添加答案在后方
                        }
                    }
                });
                let $options = $(div).find(".el-checkbox");
                if($options.length == 0){
                    $options = $(div).find('.el-radio');
                }
                for(let index = 0;index<answers.rows.length;index++){
                    let row = answers.rows[index];
                    if(row.subject != subject){
                        continue;
                    }
                    if("checked" in answers.rows[index]&& answers.rows[index].checked == answers.rows[index].answers.length){
                        continue
                    }
                    answers.rows[index].checked = 0;
                    for(let i = 0;i < $options.length;i++){
                        let label = $options[i];
                        let content = $(label).find(".ql-editor").text()||$(label).find(".el-radio__label").text()||$(label).find(".el-checkbox__label").text();//单多选题答案获取
                        let content_split = content.trim().substr(2);
                        for(let j=0;j<row.answers.length;j++){
                            let answer = row.answers[j];
                            try{
                                if(content == answer || content_split == answer){
                                    if ($(label).find(".is-checked").length) {
                                        answers.rows[index].checked +=1;
                                        // aner.text("答案重复，请注意分辨答案。题目："+subject);
                                        continue;
                                    }
                                    $(label).css('color','red');
                                    $(label).click();
                                    answers.rows[index].checked +=1;
                                    await sleep(random(100,200));
                                    break;
                                }
                            }catch (e){
                                console.log("发生异常:" + e);
                            }
                        }
                    }
                };
                
    
            await sleep(random(500,1000));
            }; //结束
            answers.rows.forEach((row,index)=>{
                
                if(row.checked < row.answers.length){
                    delete answers.rows[index];
                    return;
                }
                for(let q =index+1;q<answers.rows.length;q++){
                    let row1 = answers.rows[q];
                    if(row.subject == row1.subject){
                        let tmp =  window.my.compareArr(row.answers,row1.answers);
                        if(tmp == "disjoint"){
                            return;
                        }else if(tmp == "equal"){
                            console.log(row.answers);
                            console.log(row1.answers);
                            delete answers.rows[index];
                            return;
                        }else if(tmp == "subset"){
                            delete answers.rows[index];
                            return;
                        }else if(tmp == "superset"){
                            delete answers.rows[q];
                            return;
                        }else if(tmp == "mix"){
                            return;
                        }else{
                            console.log("未知"+tmp)
                        }
                    }
                }
            });
            if(upload_paper_flag){
                window.my.upload_papers(answers,"zhzj_"+this.config.id,"智慧职教");
            }
            // alert('alv');
            this.upload_all_problem(false)
            //题库获取模块 end    
        }
    }
    /*
    *  智慧树请求
    */
    class zhihuishu_api{
        sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
        constructor(config) {
            this.config = config;
            alert("由于智慧树官方代码被混淆加密，暂不公开源代码，\n需要使用该功能请加群获取qq群：716217812，\n或者访问https://gitee.com/xiaolv12/yunbanke/blob/master/README.md")
        }
    }
    /*
    *  精品云班课请求
    */
    class jpyunbanke_api {
        constructor(config) {
            this.config = config;
        }
        getNewProject(){
            let user_inf = JSON.parse(localStorage.getItem("_user"))
            let online_courses = this.config.front_url[4];
            let plans = this.config.front_url[5];
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'get',
                    url:"https://coreapi-proxy.mosoteach.cn/index.php/online-courses/"+online_courses+"/plans/"+plans+"/members/"+user_inf.userId,
                    dataType:"json",
                    headers: {
                        "X-Token":localStorage.getItem("_token"),
                    },
                    success: function(res) {
                        resolve(res.member.chapters);
                    }
                });
            });
        }
    
        async resource_farming(){
            const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
            let project_obj = await(this.getNewProject())
            let project_oid = []
            project_obj.forEach((item)=>{
                item.sections.forEach((item)=>{
                    item.entities.forEach((item)=>{
                        if(item.gainedScore == -1){
                            project_oid.push(item.oid)
                        }
                    })
                })
            })
            let len = project_oid.length
            for(let i = 0;i< len;i++){
                let result = await(this.post_read_project(project_oid[i]))
                console.log(result)
                if (len - i - 1 != 0) {
                    $("#x_res").text("剩下" + (len - i - 1) + "个")
                }else {
                    $("#x_res").text("全部完成")
                    location.reload()
                    return 0
                }
                await sleep(1000);
            }
            
        }
        post_read_project(oid){
            let online_courses = this.config.front_url[4];
            let plans = this.config.front_url[5];
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'post',
                    url:"https://coreapi-proxy.mosoteach.cn/index.php/online-courses/"+online_courses+"/plans/"+plans+"/resources/"+oid+"/read",
                    dataType:"json",
                    headers: {
                        "X-Token":localStorage.getItem("_token"),
                    },
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        }
        async get_user_inf(){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'get',
                    url:"https://coreapi-proxy.mosoteach.cn/index.php/users/my-profile",
                    dataType:"json",
                    headers: {
                        "X-Token":localStorage.getItem("_token"),
                    },
                    success: function(res) {
                        resolve(res.user);
                    }
                });
            });
        }
        async get_user_obj(){
            let user_inf = await (this.get_user_inf());
            if(!user_inf){
                return;
            }
            GM_setValue("userimg",user_inf.fullAvatarUrl);
            GM_setValue("user_id",user_inf.userId);
            let img_table = $('html').find("#x_set")
            img_table.css("background","url(" +  user_inf.fullAvatarUrl + ")")
            this.config.user_id = user_inf.userId;
            // console.log(this.config.user_list)
            this.config.full_name = user_inf.fullName;
            let obj={
                "unionid": this.config.user_id,
                "username": this.config.full_name,
                "poolId":"ec942b0b-38c6-3256-b0e1-2a33428d4bbc",
                "grade": "精品云班课",
            };
            return obj
        }
    }
    

    /*
    *  云班课请求
    */
    class yunbanke_api {
        constructor(config) {
            this.config = config;
        }
        getListMember(clazzcourseId){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'post',
                    url:"https://www.mosoteach.cn/web/index.php?c=member&m=get_list_member",
                    dataType:"json",
                    data: {
                        clazz_course_id: clazzcourseId,
                        order_item: 'score'
                    },
                    success: function(res) {
                        resolve(res.data.member_data);
                    }
                });
            });
        }

        personResult(id,userId,ccId){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'post',
                    url:"https://www.mosoteach.cn/web/index.php?c=interaction_quiz&m=person_result",
                    dataType:"json",
                    data: {
                        id: id,
                        user_id: userId,
                        cc_id: ccId,
                    },
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        }
        
        join_class(){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'post',
                    url:"https://www.mosoteach.cn/web/index.php?c=clazzcourse&m=my_joined",
                    dataType:"json",
                    success: function(res) {
                        resolve(res.data);
                    }
                });
            });
        }
        get_page(class_id){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'post',
                    url:"https://www.mosoteach.cn/web/index.php?c=interaction&m=index&clazz_course_id="+class_id,
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        }
        get_page_status(id,ccId){
            return new Promise((resolve,rejcet)=>{
                $.ajax({
                    type: 'post',
                    url:"https://www.mosoteach.cn/web/index.php?c=interaction_quiz&m=get_quiz_ranking",
                    dataType:"json",
                    data: {
                        id: id,
                        ccId: ccId,
                    },
                    success: function(res) {
                        resolve(res);
                    }
                });
            });
        }

        async get_user_obj(){
            let classListData = await (this.join_class());
            if(!classListData){
                return console.log("未登录账户");
            }
            classListData.forEach(ccid=>{
                GM_setValue(ccid.id,ccid.course.name);//对应课名
                // console.log(ccid);
            })
            if(classListData.length == 0){
                return console.log("未登录账户");
            }     
            
            let {data:objectList} = await (this.getListMember(classListData[0].id));
            if(objectList.length <= 0 ){
                return alert("初始化脚本失败");
            }
            GM_setValue("userimg",objectList[0].full_avatar_url);
            GM_setValue("user_id",objectList[0].user_id);
            let img_table = $('html').find("#x_set")
            img_table.css("background","url(" +  objectList[0].full_avatar_url + ")")
            this.config.user_id = objectList[0].user_id;
            this.config.user_list = objectList;
            // console.log(this.config.user_list)
            this.config.full_name = objectList[0].full_name;
            this.config.clazz_course_id = classListData[0].id
            let obj={
                "unionid": objectList[0].user_id,
                "username": objectList[0].full_name,
                "poolId":"ec942b0b-38c6-3256-b0e1-2a33428d4bbc",
                "grade": "云班课",
            };
            return obj
        }

        async upload_all_problem(show_aner){
            let classListData = await (this.join_class());
            if(!classListData){
                return;
            }
            classListData.forEach(ccid=>{
                GM_setValue(ccid.id,ccid.course.name);//对应课名
                // console.log(ccid);
            })
            this.config.class_size = 0
            this.config.class_length = 0
            let aner = $('html').find("#aner")
            if(show_aner){
                aner.text("欢迎您的第一次使用，正在为您聚合数据中，请稍后。。。。");
                aner.css("display","block");
            }
            for(let i=0;i<classListData.length;i++){
                let cl = classListData[i];
                this.get_page(cl.id).then((result) =>{
                    $(result).find(".interaction-row").each(async (index,div)=>{
                        let id = $(div).attr('data-id');
                        let type = $(div).attr('data-type');
                        let status = $(div).attr('data-row-status');
                        if(type=="QUIZ"){
                            if(!GM_getValue(id)){
                                this.config.class_length++;
                                this.config.class_size++;
                                try{
                                    await(this.get_quiz_result(id,this.config.user_id,cl.id));
                                    console.log(id+"upload成功")
                                }catch{
                                    console.log(id+"upload失败")
                                }
                                
                                this.config.class_size--;
                                if(show_aner){
                                    aner.text("百分比长时间未动请刷新页面\n已加载："+Math.trunc((1-(this.config.class_size/this.config.class_length))*100)+"%");
                                }
                            }
                        }
                    })

                });
            }
        }

        async get_quiz_result(id,user_id,clazz_course_id){
            var classname = GM_getValue(clazz_course_id)
            if(!classname){
                let classListData = await (this.join_class());
                if(!classListData){
                    return;
                }
                classListData.forEach(ccid=>{
                    GM_setValue(ccid.id,ccid.course.name);//对应课名
                    // console.log(ccid);
                })
                var classname = GM_getValue(clazz_course_id)
                if(!classname){
                    classname = "未命名课程";
                }
            }
            let res = await (this.personResult(id,user_id,clazz_course_id));
            var status = "error";
            // if(res.result_code != 0){
            //      return alert(res.result_msg);
            // }
            let answers = this.reset_answer(res);
            if(answers == null || JSON.stringify(answers) == '{}' ){
                return status;
            }
            let obj={
                "poolId": this.config.poolId,
                "userId":   this.config.tk_uid,
                "tags":[classname,answers.title,"云班课"],
                "title":answers.id,
                "problems":[],
            };
            let data={};
            
            answers.rows.forEach(row=>{
                if(row.subject.length < 4 || row.answers == ""){
                    console.log("题目录入有误");
                    return; //跳出循环
                }
                data={
                    "tags":     ["云班课"],
                    "text":     row.subject,
                    "answer":   JSON.stringify(row.answers),
                };
                data.tags.push(row.type);
                let l = ["choice_A","choice_B","choice_C","choice_D","choice_E","choice_F","choice_G","choice_H","choice_I","choice_J","choice_K","choice_L","choice_M","choice_N","choice_O","choice_P","choice_Q","choice_R","choice_S","choice_T","choice_U","choice_V","choice_W","choice_X","choice_Y","choice_Z"];
                let i=0;
                row.options.forEach(option =>{
                    data[l[i]]=option;
                    i=i+1;
                })
                obj.problems.push(data);
            });
            if(obj.problems.length == 0){
                return;
            }
            await(window.my.upladApi(window.my.MainIP+"/tiku/api/v1/problems",obj).then((resutData)=>{
                console.log(resutData)
                if(resutData.result=="success" && resutData.json){
                    var data = resutData.json.data;
                    console.log(data);
                    GM_setValue(id,1);
                    status = "success"
                }else{
                    console.log(resutData);
                }
            }));
            return status;
        }

        reset_answer(data){
            let newData = {};
            if(data ==null){
                return console.log("并未获取到题库数据");
            }
            if("activity" in data){
                console.log("蓝墨云题库重组中");
                newData.id = data.activity.id;
                newData.title = data.activity.title;
                newData.rows = [];
                data.activity.topics.forEach(row=>{
                    let _data = {};
                    _data.id = row.topic_id;
                    let imgs =null;
                    try{
                        imgs = $.parseHTML(row.subject); // 去除特殊字符报错
                    }catch (e){
                        console.log(e);
                    }
                    row.subject=window.my.HtmlUtil.htmlDecode(row.subject);
                    if(imgs){
                        imgs.forEach(async function(img,index){
                            if(img.localName == "img"){
                                row.subject += img.outerHTML;
                            }
                        })
                    }
                    // row.subject = row.subject.substr(0,500) //截断前500个字符
                    _data.subject = row.subject;
                    _data.options = [];
                    _data.answers = [];
                    _data.type = row.type;
                    if(row.type == "TF"){
                        if(row.tf_answer!=null){
                            _data.answers.push(row.tf_answer);
                        }else{
                            if(row.result == 1){
                                _data.answers.push(row.user_tf_answer)
                            }else{
                                _data=null;
                            }
                        }
                    }else if(row.type == "FILL"){
                        row.fill.blank_alternatives.forEach(answer=>{
                            if(answer.contents[0] !=null){
                                _data.answers.push(answer.contents);
                            }else{
                                if(answer.result ==1){
                                    _data.answers.push(answer.user_content)
                                }else{
                                    _data=null;
                                }
                            }
                        });
                    }else{
                        if(row.answers.length != 0){
                            row.options.forEach(option=>{
                                _data.options.push(window.my.HtmlUtil.htmlDecode(option.content));
                                row.answers.forEach(index =>{
                                    if(option.item_no == index){
                                        _data.answers.push(window.my.HtmlUtil.htmlDecode(option.content));
                                    }
                                });
                            });
                        }else{
                            if(row.result == 1){
                                row.options.forEach(option=>{
                                    _data.options.push(window.my.HtmlUtil.htmlDecode(option.content));
                                    row.user_answers.forEach(index =>{
                                        if(option.item_no == index){
                                            _data.answers.push(window.my.HtmlUtil.htmlDecode(option.content));
                                        }
                                    });
                                });
                            }else{
                                _data=null;
                            }
                        }
                        
                    }
                    if(_data != null){
                        newData.rows.push(_data);
                    }
                    
                });
            }else{
                console.log(data);
            }
            return newData;
        }
        async main_resource(reslist){
            var watch = reslist[0]
            var req = {}
            if (reslist.length != 0) {
                $("#x_res").text("剩下" + reslist.length + "个")
            } else {
                $("#x_res").text("全部完成")
                location.reload()
                return 0
            }
            var clazz_course_id = this.config.clazz_course_id
            $.ajax({
                type: "POST",
                url: "https://www.mosoteach.cn/web/index.php?c=res&m=request_url_for_json",
                data: {
                    'file_id': watch.id,
                    'type': 'VIEW',
                    'clazz_course_id': clazz_course_id,
                },
                dataType: "json",
                success: msg => {
                    const src = msg.src
                    if (src.indexOf("m3u8") > -1) {
                        fetch(src)
                            .then(data => data.text())
                            .then(text => {
                                let time = 0
                                for (i of text.split("\n")) {
                                    if (i.indexOf("#EXTINF:") > -1) {
                                        i = parseFloat(i.replace("#EXTINF:", ""))
                                        time += i
                                    }
                                }
                                time = Math.ceil(time)
                                $.ajax({
                                    type: 'post',
                                    dataType: 'json',
                                    url: 'https://www.mosoteach.cn/web/index.php?c=res&m=save_watch_to',
                                    data: {
                                        clazz_course_id: clazz_course_id,
                                        res_id: watch.id,
                                        watch_to: time,
                                        duration: time,
                                        current_watch_to: time
                                    },
                                    success: res => {
                                        reslist.splice(0, 1)
                                        this.main_resource(reslist)
                                    }
                                });
                            })
                    } else {
                        reslist.splice(0, 1)
                        this.main_resource(reslist)
                    }
                }
            })
        }
        resource_farming(reslist){
            var reslist = []
            $(".res-row-open-enable").each(function() {
                if ($(this).find('span[data-is-drag]')[0].dataset.isDrag == "N") {
                    reslist.push({
                        id: $(this).attr('data-value'),
                        state: $(this).find('span[data-is-drag]')[0].dataset.isDrag,
                        type: $(this).attr('data-mime')
                    })
                }
            });
            this.main_resource(reslist)
        }
        async start_search(){ //搜题按钮实现
            const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
            function random(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }
    
            let HtmlUtil = window.my.HtmlUtil;
            let aner = $('html').find("#aner")
            aner.css("display","block")
            aner.text("正在搜索中，请稍后")
            let upload_paper_flag = false;
            let answers = await(window.my.getAnswers(this.config.id,true));
            if(this.config.tk_uid == null || (answers == null)||JSON.stringify(answers) == '{}'  || answers.rows.length <= 0){
                let subjects = []
                $('.topic-item').each(function(index,div){
                    let Id = $(div).find('a').attr('name');
                    let subject = $(div).find('.t-subject.t-item.moso-text.moso-editor').text().trim();
                    let imgs = $(div).find("img");
                    // console.log(imgs)
                    subject = HtmlUtil.htmlDecode(subject);
                    imgs.each(async function(index,img){
                        if(img.outerHTML){
                            subject += img.outerHTML;
                        }
                    })
                    if(subject != ""){
                        subjects.push(subject);
                    }
                   
                })
                answers = await(window.my.findproblems(subjects));
                upload_paper_flag = true
            }
            
            if(JSON.stringify(answers) == '{}' || !(answers.rows)){
                aner.text("没有搜索到答案，若提前阅卷时有答案，但此时没有请反馈")
            }else{
                aner.text("总共搜索到"+answers.rows.length+"题")
                answers.rows.forEach(row=>{
                    aner.append("<hr>");
                    aner.append("题目:"+row.subject+"<br>"+"答案:");
                    row.answers.forEach(answer =>{        
                         aner.append(answer+" ");
                    });
                });
            }
            
    
            window.my.config.timenum = answers.rows.length * 4 * (GM_getValue("is_wait") ? 0:1)
            $(".my-sticky-bottom").children("button:first").attr('id', 'submit')
            window.my.config.timer = setInterval(function() {
                window.my.config.timenum--
                if (window.my.config.timenum < 0) {
                    $("#submit").text("交卷")
                    $("#submit").attr("style", "")
                    $("#submit").attr('disabled', false)
                    clearInterval(window.my.config.timer)
                } else {
                    $("#submit").attr('disabled', true)
                    $("#x_start").attr('disabled', true)
                    $("#submit").attr("style", "width:250px")
                    $("#submit").text("请在" +window.my.config.timenum +"秒后交卷")
                }
            }, 1000)
    
            // $('.topic-item').each(function(index,div){ // 如果是这个后面记得加括号
            let divs = $('.topic-item');
            for(let i=0;i<divs.length;i++){
                let div = divs[i];
                let Id = $(div).find('a').attr('name');
                let flag_FT = false
                //console.log($(div).find('.t-subject.t-item.moso-text.moso-editor').html());
                let subject = $(div).find('.t-subject.t-item.moso-text.moso-editor').text();
                let imgs = $(div).find("img");
                
                subject=HtmlUtil.htmlDecode(subject);
                imgs.each(async function(index,img){
                    if(img.outerHTML){
                        subject += img.outerHTML;
                    }
                })
                // subject = subject.substr(0,500);
                // console.log(subject);
                // subject=escapeto(subject);
                //let space = new RegExp(`${String.fromCharCode(160)}`,"g"); /* no breaking space*/
                // console.log(subject);
                if( $(div).find('.show_answer').length == 0){
                    $(div).find('.t-con').append("<div class='show_answer'></div>")
                }
                answers.rows.forEach((row,index)=>{
                    if(row.subject == subject){
                        if(!$(div).find('.show_answer')[0].outerText){
                            $(div).find('.show_answer').append("答案："+JSON.stringify(row.answers)+"<br>").css('color','red'); // 添加答案在后方
                        }else{
                            $(div).append("第"+(i+1)+"题重复<br>").css('color','blue');
                            $(div).find('.show_answer').append("答案："+JSON.stringify(row.answers)+"<br>").css('color','red'); // 添加答案在后方
                            
                        }
                    }
                });
                let $options = $(div).find('label');
                if($options.length == 0){
                    $options = $(div).find('input');
                }
    
                for(let index = 0;index<answers.rows.length;index++){
                    let row = answers.rows[index];
                    if(row.subject != subject){
                        continue;
                    }
                    if("checked" in answers.rows[index]&& answers.rows[index].checked == answers.rows[index].answers.length){
                        continue
                    }
                    answers.rows[index].checked = 0;
                    for(let i = 0;i < $options.length;i++){
                        let label = $options[i];
                        let content = $(label).find('.option-content.moso-text.moso-editor').text();//单多选题答案获取
                        if(content == ""){
                            content = $(label).find('.el-radio__label').text();//判断题答案获取
                            flag_FT = true
                        }
                        
                        if(content == ""){
                            //填空题
                            if(Array.isArray(row.answers[i])){
                                $(label).val(row.answers[i][0]);
                                answers.rows[index].checked +=1;
                            }else{
                                $(label).val(row.answers[i]);
                                answers.rows[index].checked +=1;
                            }
                            let ev = document.createEvent("HTMLEvents");
                            ev.initEvent("input", true, true);
                            $(label)[0].dispatchEvent(ev);
                        }
                        for(let j=0;j<row.answers.length;j++){
                            let answer = row.answers[j];
                            if(flag_FT == true){
                                if (answer == "T"){
                                    answer = "正确"
                                }else if(answer == "F"){
                                    answer = "错误"
                                }
                            }
                            try{
                                if(content == answer){
                                    if ($(label).find(".is-checked").length) {
                                        answers.rows[index].checked +=1;
                                        // aner.text("答案重复，请注意分辨答案。题目："+subject);
                                        continue;
                                    }
                                    $(label).css('color','red');
                                    $(label).click();
                                    answers.rows[index].checked +=1;
                                    await sleep(random(100,200));
                                    break;
                                }
                            }catch (e){
                                console.log("发生异常:" + e);
                            }
                        }
                    }
                };
                
    
            await sleep(random(500,1000));
            }; //结束
            answers.rows.forEach((row,index)=>{
                
                if(row.checked < row.answers.length){
                    delete answers.rows[index];
                    return;
                }
                for(let q =index+1;q<answers.rows.length;q++){
                    let row1 = answers.rows[q];
                    if(row.subject == row1.subject){
                        let tmp =  window.my.compareArr(row.answers,row1.answers);
                        if(tmp == "disjoint"){
                            return;
                        }else if(tmp == "equal"){
                            console.log(row.answers);
                            console.log(row1.answers);
                            delete answers.rows[index];
                            return;
                        }else if(tmp == "subset"){
                            delete answers.rows[index];
                            return;
                        }else if(tmp == "superset"){
                            delete answers.rows[q];
                            return;
                        }else if(tmp == "mix"){
                            return;
                        }else{
                            console.log("未知"+tmp)
                        }
                    }
                }
            });
            if(upload_paper_flag){
                window.my.upload_papers(answers,this.config.id,"智慧树");
            }
            // alert('alv');
            window.my.api.upload_all_problem(false)
            //题库获取模块 end    
        }
    }
    
    MyPage.prototype.x_res = function(){
        return this.api.resource_farming()
    }
    MyPage.prototype.getAnswers = async function(id,deep){
        let answers = {};
        let obj={
            "poolId": this.config.poolId,
            "userId":   this.config.tk_uid,
            "querry": {
                "operator": "==",
                "argument1": "papertitle",
                "argument2": id,
            },
            "deep": deep,
        };
        await(this.upladApi(this.MainIP+"/tiku/api/v1/queryCollection",obj).then(async (resutData)=>{
            if(resutData.result==="success" && !!resutData.json){
                var data = resutData.json.results;
                console.log("总共查询到数据库数量"+data.length+"个");
                data.forEach((item, index) =>{
                    if(index == 0){
                        answers =this.resoluAnswers(item);
                    }else{
                        this.resoluAnswers(item).rows.forEach(i =>{
                            answers.rows.push(i);
                        })
                        
                    }
                });
            }
        }));

        return answers;
    }

    MyPage.prototype.arrowMove = function(e){
        // var e = document.getElementById(e);
        // 元素大小
        let elW = e.currentTarget.offsetWidth
        let elH = e.currentTarget.offsetHeight
        // 元素位置
        let elL = e.currentTarget.parentNode.parentNode.offsetLeft
        let elT = e.currentTarget.parentNode.parentNode.offsetTop
        // 鼠标位置
        let x = e.clientX
        let y = e.clientY
        // 窗口大小
        let w = window.innerWidth
        let h = window.innerHeight
        // 鼠标到元素左边距离
        let moveX = x - elL
        let moveY = y - elT
        let el = e.currentTarget
        document.onmousemove = function (e) {
            // el.style.position = 'fixed';
            el.parentNode.parentNode.style.left = e.clientX -moveX + 'px'
            el.parentNode.parentNode.style.top =e.clientY - moveY + 'px'
        }
        document.onmouseup = function (e) {
            document.onmousemove = null
            document.onmouseup = null
        }
    };

    MyPage.prototype.initMenu = function(){
        let $ = this.$,menu = this.menu;
        $(document).on('mousedown', '#x_set', function (e) {
            window.my.arrowMove(e);//.target.parentNode.id
        });
        $(document).on('click', '#x_start', function () {
            window.my.start();
        });
        $(document).on('click', '#x_set', function () {
            $('html').find("#set").toggle('active');
            $('html').find("#aner").hide("slow");
        });
        // $(document).on('click', '#x_charge', function () {
        //     let aner = $('html').find("#aner")
        //     aner.css("display","block")
        //     aner.text("");
        //     aner.append("充电地址：");

        // });
        $(document).on('click', '#x_find',async function () {
            let aner = $('html').find("#aner")
            let text = document.getElementById("find_input")
            aner.show("slow");
            aner.text("");
            
            if(text.value.length <6){
                aner.append("搜索题目需要6个字符以上");
                return;
            }
            aner.append("目前服务器被恶意攻击，可能会超时，<hr>");
            // problem = window.my.HtmlUtil.htmlDecode(text.value);
            // console.log(problem)
            await window.my.findproblem(text.value.replace(/   /g,"   "))
            aner.text("");
            aner.append("搜索到"+window.my.config.answer.rows.length+"条相关题目<hr>");
            window.my.config.answer.rows.forEach(row=>{
                aner.append("题目:"+row.subject+"<br>"+"答案:");
                row.answers.forEach(answer =>{        
                     aner.append(answer+" ");
                });
                aner.append("<hr>");
            });
        });
        $(document).on('click', '#x_AIfind',async function () {
            let aner = $('html').find("#aner")
            let text = document.getElementById("find_input")
            aner.show("slow");
            aner.text("");
            
            if(text.value.trim() == ""){
                aner.append("请输入内容");
                return;
            }
            aner.append("若长时间未返回信息，请反馈<hr>");

            let obj ={
                "messages": [
                    {
                        "role": "user",
                        "content": text.value
                    }
                ],
                "stream": true,
                "model": "gpt-3.5-turbo",
                "temperature": 0.5,
                "presence_penalty": 0,
                "frequency_penalty": 0,
                "top_p": 1
            };
            
            GM_xmlhttpRequest({
                responseType:"stream",
                timeout: 10000,
                method: "post",
                url: window.my.ChatIP+"/api/openai/v1/chat/completions",
                headers:{
                    // Authorization:'Bearer nk-wangzeqing',
                    Authorization:'Bearer nk-'+window.my.config.tk_uid+","+window.my.config.poolId,
                    // Cookie:"next-auth.csrf-token=e8b5559fadb5ce3684e9a0611591684ffffc2224d9125a49e7081a92425c3026%7C47d575638e3a14f787462c27c1fe8895d740210370848182a740fa71dfb55211; next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000; next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..wNFkEP1XItcDCpY2.nJBc4rvu8_cAGx0mtDdm2pvIjPAWGMGou24L2ZzoyImrCIqLDiAMS5w6WzN6dm_8GuI331tfqxHc_V4LRoAmmFT0A8X5ln9C1iC4p47IQM_4RF2B-8iLGElCkVOYJieCkvV1lVrFHVT31nzI12n8Xpwttrw5yGhywCR3sWZ1J7sr4QCXeCA-lpOdITDyW8AdNPjH4QQ7vhtCIzjzFoepmJKk5mE2lPmksDiGrQX3d1POPwfQqdHafb8rgZJl_BC4_wDXloIt6mtTfQ4._NPSNHQIhsWS5eQprCIeCQ",
                },
                data: JSON.stringify(obj),
                onloadstart: function(response) {
                    aner.text("");
                    // console.log(response.response)
                    const reader = response.response.getReader();
                    var error_d = "";
                    function read() {
                        reader.read().then(({ done, value }) => {
                          if (done) {
                            console.log('读取完毕');
                            return;
                          }
                          let data = new TextDecoder().decode(value)
                          data.split("data:").forEach(d=>{
                            if(d!=""&&d.indexOf("[DONE]") == -1){
                                let Json_msg=null;
                                try{
                                    if(error_d){
                                        d = error_d +d;
                                        error_d="";
                                    }
                                    Json_msg = $.parseJSON(d)
                                    if(Json_msg.msg=="empty access code"||Json_msg.msg=="wrong access code"){
                                        aner.append("若需要使用AI功能请先<button onclick=\"window.open('"+window.my.ChatIP+"/#/activate', 'Meto登陆', 'width=400,height=600');\">登陆</button>");
                                        return;
                                    }else if(Json_msg.msg=="剩余token不足请[充值](https://d.met0.top/)"){
                                        aner.append("您的AI剩余TOKEN已不足请<button onclick=\"window.open('https://d.met0.top/', 'Meto登陆');\">充值</button><br/>未登陆账号请<button onclick=\"window.open('"+window.my.ChatIP+"/#/activate', 'Meto登陆', 'width=400,height=600');\">登陆</button>");
                                        return;
                                    }
                                    aner.append(Json_msg.choices[0].delta.content);
                                    aner.scrollTop(aner.prop("scrollHeight"));
                                }catch (e){
                                    if(Json_msg){
                                        aner.append("发生异常:" + d);
                                    }else{
                                        console.log("发生异常:" + d)
                                    }
                                    error_d=d;
                                }
                            }
                            
                          });
                        //   console.log($.parseJSON(data));
                          // 继续读取下一个数据块
                          read();
                        });
                      }
                  
                      // 开始读取数据
                      read();
                },
                onerror : function(err){
                    console.log('error')
                    aner.append("发生异常:" + err);
                },
                ontimeout : function(inf){
                    console.log('请求超时')
                    aner.append("请求超时:" + inf);
                }
            })
            
        });
                
        $(document).on('click', '#x_yue', async function () {
            let aner = $('html').find("#aner")
            aner.show("slow");
            $("#x_yue").attr("disabled", true)
            aner.text("正在搜索答案中");
            let answers = await(window.my.getAnswers(window.my.config.id,true));
            if(!answers||JSON.stringify(answers) == "{}"){
                aner.text("暂时没有此试卷信息。可直接开始答题进行搜索（可能最终答案没那么全）");
                return;
            }
            
            aner.text("搜索到"+ answers.rows.length +"条题目信息");
            answers.rows.forEach(row=>{
                aner.append("<hr>");
                aner.append("题目:"+row.subject+"<br>"+"答案:");
                row.answers.forEach(answer =>{
                     aner.append(answer+" ");
                });
            });
                
        });
        $(document).on('click', '#x_res', async function () {
            $("#x_res").attr("disabled", true)
            window.my.x_res()
        });

        $(document).on('click', '#x_recall', async function () {
            $("#"+menu.id).css("left","0").css("top","0");
            $(".drawer").hide();
            $(".t-answer").each((index,div) =>{
                $(div).append("<button class =\"addpro\" style = \"height:30px; background:#c9fff5 ;border-radius: 50px;padding: 3px;margin-top: 10px;\">添加到错题</button>")
                $(div).find("span").css("color","#FFF").css("display","block").css("width","70px").css("font-size","25px").css("border","1px solid black").click(function(_this){
                    $(_this.currentTarget).css("color","#0bd")
                });
                $(div).find(".answer-r").hide();
                
            })
        });
        $(document).on('click', '#x_error_problems', async function () {
            let error_problem = GM_getValue(window.my.config.id+"_error_problem");
            if(!error_problem){
                error_problem = {};
                alert("您还未建立错题集");
                return;
            }
            $("#"+menu.id).css("left","0").css("top","0");
            $(".drawer").hide();
            $(".topic-list").text("");
            for (var i in error_problem) {
                $(".topic-list").append(error_problem[i]);

            };
            $(".t-answer").each((index,div) =>{
                $(div).find("span").css("color","#FFF").css("display","block").css("width","70px").css("font-size","25px").css("border","1px solid black").click(function(_this){
                    $(_this.currentTarget).css("color","#0bd")
                });
            });
        });

        $(document).on('click', '.addpro', async function (_this) {
            $(_this.currentTarget).attr("class","delpro").css("background","#f2ffc9").text("移出错题集");
            let error_problem = GM_getValue(window.my.config.id+"_error_problem");
            if(!error_problem){
                error_problem = {};
                console.log("新建错题库");
            }
            error_problem[$(_this.currentTarget.offsetParent).find(".t-index").text()] = _this.currentTarget.offsetParent.outerHTML;
            GM_setValue(window.my.config.id+"_error_problem",error_problem);
            console.log(error_problem);
        });
        $(document).on('click', '.delpro', async function (_this) {
            $(_this.currentTarget).attr("class","addpro").css("background","#c9fff5").text("添加到错题");
            let error_problem = GM_getValue(window.my.config.id+"_error_problem");
            delete error_problem[$(_this.currentTarget.offsetParent).find(".t-index").text()];
            GM_setValue(window.my.config.id+"_error_problem",error_problem);

        });    

        /**
        * MosoteachHelper CSS
        */
        const styleTag = `
        <style scoped>
            #${menu.id} #zhu button[disabled]{
                color: white !important;
                background-color: rgb(188, 188, 188) !important;
            }
            #${menu.id} #zhu button{
                float:left;
                margin:25px 2px;
                // width:70px;
                // height:25px;
                /* 把按钮撑大 */
                padding: 4px 8px;
                /* 去除默认边框 */
                border: none;
                /* 圆角 */
                border-radius: 50px;
                /* 按钮背景色 */
                background-color: #8888ff;
                /* 字体颜色、大小、粗细、字间距 */
                color: #fff;
                font-size: 12px;
                font-weight: bold;
                letter-spacing: 1px;
                /* 鼠标小手 */
                cursor: pointer;
            
                /* 给个定位 */
                position: relative;
                /* 3D模式 */
                transform-style: preserve-3d;
                /* 过度动画时间 */
                transition: ease-in-out 2s;
            }
            #${menu.id} #zhu button:hover {
                /* 鼠标放上来旋转一圈 */
                transform: rotateX(360deg);
            }
            #${menu.id} #zhu button::before,
            #${menu.id} #zhu button:after {
                content: "";
                /* 白色边框线 */
                border: 0.8px solid #fff;
                /* 圆角 */
                border-radius: 50px;

                /* 通过定位来撑开边框，简单来说，确定4边的距离，中间自然就固定了 */
                position: absolute;
                top: 1px;
                left: 1px;
                right: 1px;
                bottom: 1px;

                /* 3D模式 */
                transform-style: preserve-3d;
                /* 设置透视参数，向 Z轴方向移动，正常时候就是向屏幕外面移动 */
                transform: perspective(1000px) translateZ(5px);
            }
            #${menu.id} #zhu button::after {
                /* 另一边反着移动一下 */
                transform: perspective(1000px) translateZ(-5px);
            }
            #${menu.id} #zhu button span {
                /* 设置 span 为块元素 */
                display: block;
            
                /* 3D模式 */
                transform-style: preserve-3d;
                /* 同样设置透视，抬高 Z轴距离 */
                transform: perspective(500px) translateZ(8px);
            }
            #${menu.id}{
                font-size:14px;
                z-index: 9999;
                text-align:center;
                // width:0;
                // height:0;
                position:fixed;
                pointer-events: none;
                left:${menu.pos.x}px;
                top:${menu.pos.y}px;
                // background:${menu.background};
                // opacity:${menu.opacity};
            }
            #${menu.id} #zhu{
                pointer-events: visible;
            }
            #${menu.id} .drawer{
                text-align: center;
                pointer-events: visible;
                position:relative;
                max-height:400px;
                overflow:auto;
                // display: none;
                background: #fff;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                width: 100%; /* initially */
                max-width: 300px;
                opacity: 0.9;
                z-index: 199;
                padding:3px;
                margin:10px;
            }
            #${menu.id} p{
                text-align:left;
                padding-left:5px;
            }
            #${menu.id} .drawer input{
                border-radius: 3px;
                border: 1px solid;
                width:50%;
            }
            #${menu.id} .drawer button{
                display:inline;
                vertical-align:middle;
                border: 1px solid;
                background-color: transparent;
                text-transform: uppercase;
                padding: 1px 2px;
                font-weight: 300;
            }
            #${menu.id} .drawer button:hover {
                color: white;
                border: 0;
                background-color: #4cc9f0;
                -webkit-box-shadow: 10px 10px 99px 6px rgba(76,201,240,1);
                -moz-box-shadow: 10px 10px 99px 6px rgba(76,201,240,1);
                box-shadow: 10px 10px 99px 6px rgba(76,201,240,1);
            }
            #${menu.id} #x_set{
                animation: change 3s linear 0s infinite;
                float:left;
                position:relative;
                z-index: 200;
                margin:10px;
                border-radius:50%; 
                overflow:hidden;
                height: 50px;
                width:50px;
                border: solid 2px #00ff00;
                background: url(${GM_getValue("userimg") ? GM_getValue("userimg"):"https://i.jpg.dog/8a4f4bd4c5ea7b1eff20a2978885f2b1.jpeg"});
                background-size: 50px 50px;
            }
            @keyframes change {
                0% {border: solid 2px #333;}
                25% {border: solid 2px #f60;}
                50% {border: solid 2px #f00;}
                75% {border: solid 2px #1ab558;}
                100% {border: solid 2px #333;}
            }
        </style>`;

        $(styleTag).appendTo('head');
        let $menu = $(
            `
            <div id='${menu.id}'>
                <div id ="zhu">
                    <div id="x_set"></div>
                </div>
                <div class= "drawer" id="set">
                    <div>
                        🦄️<input id = "tiku_user" readonly="readonly" value="未获取到用户名,请刷新重试" />
                        ${GM_getValue("ti_uid")?`<button onclick="GM_setValue('ti_uid','');location.reload()">退出</button>`:`<button onclick="window.open('${this.ChatIP}/#/activate', 'Meto登陆', 'width=400,height=600');">登陆</button>`}
                        <button  id="x_charge" ><a target="_blank" href = "https://d.met0.top/buy/3">充电</a></button>
                    </div>
                    <div>
                        🔎<input id = "find_input" placeholder="搜索题目需要6个字符以上" />
                        <button  id="x_find" >MT搜</button>
                        <button  id="x_AIfind" >AI搜</button>
                    </div>
                    <div>
                        本项目非盈利，欢迎给项目发电<br/>
                        大家的支持就是我开发的动力<br/>
                        TG群:🐟<a target="_blank" href = "https://t.me/tg_meto">点我进群</a>(需魔法)🐟<br/>
                        QQ群:😄716217812😄
                    </div>
                </div>
                <div class= "drawer" id="aner">
                </div>
            </div>`);
        $($menu).appendTo('html');

        this.aner = $('#aner');
        // GM_setValue("update_time","")
        
    }
   

    MyPage.prototype.initData = async function(){ //初始化
        GM_registerMenuCommand("基本设置",function(){
            $('html').find("#set").toggle('active');
        });
        GM_registerMenuCommand(GM_getValue("is_wait") ? "开启延迟交卷" : "关闭延迟交卷（不建议）"  ,function(){
            GM_setValue("is_wait",!GM_getValue("is_wait"));
            location.reload();
        });
        GM_registerMenuCommand("重置脚本",function(){
            GM_setValue("overdue",1);
            GM_setValue("window.al_yun_xx",null);
            location.reload();
        });
        this.config.tk_uid = GM_getValue("ti_uid");
        this.config.poolId = GM_getValue("poolId");
        if(!this.config.tk_uid && this.config.hostname == "meto"){
            await this.api.get_user_obj();
        }
        document.getElementById("tiku_user").value=GM_getValue("ti_uid")||"您的版本过低，请手动登录"
        
        switch (this.config.hostname){
            case "mooc.mosoteach":
                if(this.config.c === "res"||this.config.front_url.at(-1) === "course-learning"){
                    $('#zhu').append("<button id='x_res' ><span>一键完成资源</span></button>");
                }else{
                    $('#zhu').append("<button onclick='window.open(\"https://d.met0.top\");'><span>MeT0题库</span></button>");
                }
                break;
            case "mosoteach": {
                if(this.config.m === "reply"){ //
                    // this.Listener();
                    $('#zhu').append("<button id='x_start' ><span>开始搜题</span></button>");
                    // document.getElementById("zhu")
                }else if(this.config.c === "res"||this.config.front_url.at(-1) === "course-learning"){
                    $('#zhu').append("<button id='x_res' ><span>一键完成资源</span></button>");
                }else if(this.config.m === "quiz_ranking" || this.config.m === "start_quiz_confirm"){
                    $('#zhu').append("<button id='x_yue' ><span>提前阅卷</span></button>");
                }else if(this.config.m === "person_quiz_result"){
                    // $('#zhu').append("<button id='x_start' ><span>开始搜题</span></button>");
                    $('#zhu').append("<button id='x_recall' ><span>背题模式</span></button>");
                    $('#zhu').append("<button id='x_error_problems' ><span>错题集</span></button>");
                    let aner = $('html').find("#aner")
                    aner.css("display","block")
                    aner.text("正在导入题库中");
                    if(!GM_getValue(this.config.id)){
                        flag =  await(this.api.get_quiz_result(this.config.id,this.config.user_id,this.config.clazz_course_id));
                        if(flag == "success"){
                            aner.text("题库导入成功");
                        }else{
                            aner.text("题库导入失败");
                        }
                        
                    }else{
                        aner.text("题库已存在");
                    }
                }else{
                    $('#zhu').append("<button onclick='window.open(\"https://d.met0.top\");'><span>MeT0题库</span></button>");
                }
                break;
            }
            case "zhihuishu": {
                if(this.config.front_url.at(5) == "checkHomework"){
                    let aner = $('html').find("#aner")
                    aner.css("display","block")
                    aner.text("正在导入题库中");
                    let examId = this.config.examId||this.config.id;
                    let taskId = this.config.recordId||this.config.taskId;
                    let obj = {
                        recruitId: this.config.front_url[6],
                        studentExamId: this.config.front_url[7],
                        examId: this.config.front_url[8],
                        schoolId: this.config.front_url[10],
                        courseId: this.config.front_url[9],
                    }
                    if(!GM_getValue(obj.examId)){
                        let server_token = await(labc(3))
                        flag =  await(this.api.get_quiz_result(server_token,obj));
                        if(flag == "success"){
                            aner.text("题库导入成功");
                        }else{
                            aner.text("题库导入失败");
                        }
                        
                    }else{
                        aner.text("题库已存在");
                    }
                }else if(this.config.front_url.at(3) =="stuStudy"){
                    this.api.choice_function()
                    if(GM_getValue("resource_farming_main_state")){
                        $('#zhu').append("<button onclick='GM_setValue(\"resource_farming_main_state\",!1)'><span>停止翻页</span></button>");
                    }else{
                        $('#zhu').append("<button onclick='GM_setValue(\"resource_farming_main_state\",!0);location.reload()'><span>自动翻页</span></button>");
                    }
                }else{
                    $('#zhu').append("<button onclick='window.open(\"https://d.met0.top\");'><span>MeT0题库</span></button>");
                }
                break;
            }
            case "icve": {
                if(this.config.front_url.at(-1) == "keepTest"||this.config.front_url.at(-1) =="jobTest"){ //
                    // this.Listener();
                    $('#zhu').append("<button id='x_start' ><span>开始搜题</span></button>");
                }else if(this.config.front_url.at(-1) =="course-learning"){ //暂未实现 留置
                    $('#zhu').append("<button id='x_res' ><span>一键完成资源</span></button>");
                }else if(this.config.front_url.at(-1) == "viewJob1"){
                    let aner = $('html').find("#aner")
                    aner.css("display","block")
                    aner.text("正在导入题库中");
                    let examId = this.config.examId||this.config.id;
                    let taskId = this.config.recordId||this.config.taskId;
                    if(!GM_getValue(examId+taskId)){
                        flag =  await(this.api.get_quiz_result(examId,taskId,"独立导入"));
                        if(flag == "success"){
                            aner.text("题库导入成功");
                        }else{
                            aner.text("题库导入失败");
                        }
                        
                    }else{
                        aner.text("题库已存在");
                    }
                }else{
                    $('#zhu').append("<button onclick='window.open(\"https://d.met0.top\");'><span>MeT0题库</span></button>");
                }
                break;
            }
            case "ouchn":{
                if(this.config.front_url.at(5) =="ng#" ||this.config.front_url.at(5) =="ng" ){
                    GM_setValue("resource_farming_state",false) //    跨域访问，清空默认状态
                    $('#zhu').append("<button id='x_res' ><span>一键完成资源</span></button>");
                }else if(this.config.front_url.at(5) =="learning-activity"){
                    this.api.choice_function()
                    if(GM_getValue("resource_farming_state")){
                        $('#zhu').append("<button id='x_xxx' ><span>正在刷资源，请稍后</span></button>");
                        this.aner.show("hide")
                        this.aner.text("如需暂停请刷新上一级页面")
                    }else{
                        if(GM_getValue("resource_farming_main_state")){
                            $('#zhu').append("<button onclick='GM_setValue(\"resource_farming_main_state\",false);location.reload()'><span>停止翻页</span></button>");
                        }else{
                            $('#zhu').append("<button onclick='GM_setValue(\"resource_farming_main_state\",true);location.reload()'><span>自动翻页</span></button>");
                        }
                    }
                }
                else{
                    $('#zhu').append("<button onclick='window.open(\"https://d.met0.top\");'><span>MeT0题库</span></button>");
                }
                break;
            }
            case "yuketang":{
                if(this.config.front_url.at(-1) =="studycontent"||this.config.front_url.at(-2) =="studentLog"){
                    GM_setValue("resource_farming_state",false) //    跨域访问，清空默认状态
                    $('#zhu').append("<button id='x_res' ><span>一键完成资源</span></button>");
                }else if(this.config.front_url.at(-2) =="video" || this.config.front_url.at(-3) =="video-student"){
                    this.api.choice_function()
                    if(GM_getValue("resource_farming_state")){
                        $('#zhu').append("<button id='x_xxx' ><span>正在刷资源，请稍后</span></button>");
                        this.aner.show("hide")
                        this.aner.text("如需暂停请刷新上一级页面")
                    }else{
                        if(GM_getValue("resource_farming_main_state")){
                            $('#zhu').append("<button onclick='GM_setValue(\"resource_farming_main_state\",false)'><span>停止翻页</span></button>");
                        }else{
                            $('#zhu').append("<button onclick='GM_setValue(\"resource_farming_main_state\",true);location.reload()'><span>自动翻页</span></button>");
                        }
                    }
                }
                else{
                    $('#zhu').append("<button onclick='window.open(\"https://d.met0.top\");'><span>MeT0题库</span></button>");
                }
                break;
            }
            case "chaoxing":{
                if(this.config.c === "res"||this.config.front_url.at(-1) === "course-learning"){
                    $('#zhu').append("<button id='x_res' ><span>一键完成资源</span></button>");
                }else if(this.config.front_url.at(4) =="studentstudy"){
                    this.api.choice_function()
                    if(GM_getValue("resource_farming_state")){
                        $('#zhu').append("<button id='x_xxx' ><span>正在刷资源，请稍后</span></button>");
                        this.aner.show("hide")
                        this.aner.text("如需暂停请刷新上一级页面")
                    }else{
                        if(GM_getValue("resource_farming_main_state")){
                            $('#zhu').append("<button onclick='GM_setValue(\"resource_farming_main_state\",false);location.reload()'><span>停止翻页</span></button>");
                        }else{
                            $('#zhu').append("<button onclick='GM_setValue(\"resource_farming_main_state\",true);location.reload()'><span>自动翻页</span></button>");
                        }
                    }
                }else{
                    $('#zhu').append("<button onclick='window.open(\"https://d.met0.top\");'><span>MeT0题库</span></button>");
                }
                break;
            }
            case "mooc":{
                if(this.config.front_url.at(-1) =="studycontent"||this.config.front_url.at(-2) =="studentLog"){
                    GM_setValue("resource_farming_state",false) //    跨域访问，清空默认状态
                    $('#zhu').append("<button id='x_res' ><span>一键完成资源</span></button>");
                
                }else{
                    $('#zhu').append("<button onclick='window.open(\"https://d.met0.top\");'><span>MeT0题库</span></button>");
                }
                break;
            }

        }
        
    }

    


    MyPage.prototype.toLog=function(explain){
        /*
        *  全局定时器
        */
        let find_input =  document.getElementById("find_input");
        var flag=true;
        setInterval(()=> {
            if(this.config.front_url.at(-1) != window.location.href.split("?")[0].split("/").at(-1)){
                location.reload()
            }
            let yaya_select = window.getSelection().toString();
            if(yaya_select){
                find_input.value = window.getSelection().toString()
            }
            if($("video").length&&flag){
                flag = false
                window.my.video_spend()
            }
        }, 400)
        // alert('啊绿: '+explain);
        this.initData();
        return this;
    }
    MyPage.prototype.findproblem = async function(text){
        let obj={
            "poolId": this.config.poolId,
            "userId":   this.config.tk_uid,
            "querry": {
                "operator": "contains",
                "argument1":"problemText",
                "argument2":text,
            }
        }
        /////
        await(this.upladApi(this.MainIP+"/tiku/api/v1/queryProblems",obj).then(async (resutData)=>{
            if(resutData.result==="success" && !!resutData.json){
                var data = resutData.json.results;
                //处理数据，添加标识头
                let obj = {
                    flag: "metoproblems",
                    problems : data,
                }
                this.config.answer =this.resoluAnswers(obj);
            }
        }))
    }

    MyPage.prototype.findproblems = async function(problems){
        let answer = []
        let obj={
            "poolId": this.config.poolId,
            "userId":   this.config.tk_uid,
            "querry": {
                "operator": "mulit",
                "argument1":"1",
                "argument2":"2",
                "problems":[]
            }
        }
        /////
        problems.forEach(problem =>{
            
            let problemobj = {
                "operator": "==",
                "argument1": "problemText",
                "argument2": problem,
            }
            obj.querry.problems.push(problemobj);
        })
        await(this.upladApi(this.MainIP+"/tiku/api/v1/queryProblems",obj).then(async (resutData)=>{
            if(resutData.result==="success" && !!resutData.json){
                var data = resutData.json.results;
                //处理数据，添加标识头
                let obj = {
                    flag: "metoproblems",
                    problems : data,
                }
                answer = this.resoluAnswers(obj)
                // console.log(this.config.answers);
            }
        }))
        return answer
    }

    MyPage.prototype.upload_papers = async function(answers,title,platform){
        
        var classname = GM_getValue(this.config.clazz_course_id)
        if(!classname){
            classname = "未命名课程";
        }
        let obj={
            "poolId": this.config.poolId,
            "userId":   this.config.tk_uid,
            "problemIds": [],
            "title":title,
            "tags":[classname,platform],
        }
        answers.rows.forEach(row=>{
            for(let i =0;i<obj.problemIds.length;i++){
                if(obj.problemIds[i] == row.problemId){
                    return;
                }
            }
            obj.problemIds.push(row.problemId); 
        });
        // console.log(obj);
        await(this.upladApi(this.MainIP+"/tiku/api/v1/collection",obj).then(async (resutData)=>{
            if(resutData.result==="success" && !!resutData.json){
                // var data = resutData.json.results;
                console.log(resutData);
            }
        }))
    }
    
    MyPage.prototype.compareArr = function(arr1 = [], arr2 = []) {   
        // arr1.sort();
        // arr2.sort();
        const setA = new Set(arr1);
        const setB = new Set(arr2);
        const intersection = new Set([...setA].filter(x => setB.has(x))); // 交集
        const union = new Set([...setA, ...setB]); // 并集
        const differenceA = new Set([...setA].filter(x => !setB.has(x))); // a数组中有而b数组中没有的元素
        const differenceB = new Set([...setB].filter(x => !setA.has(x))); // b数组中有而a数组中没有的元素
        if (intersection.size === 0) {
          return 'disjoint'; // a、b不相交
        } else if (intersection.size === setA.size && intersection.size === setB.size) {
          return 'equal';   // a、b相等
        } else if (intersection.size === setA.size) {
          return 'subset';  // a是子集
        } else if (intersection.size === setB.size) {
          return 'superset'; // a是父集
        } else {
          return 'mix';// a、b相交但不包含
        }
    }

    MyPage.prototype.start =function(reslist){
        return this.api.start_search()
    }
    
    _this.MyPage = MyPage;
})(unsafeWindow||window);

if(window.location == window.parent.location){ // 判断是否为ifarm
    window.my = new unsafeWindow.MyPage({
        id:"wzq",
        width:80,
        background:'#fff',
        opacity:0.8,
        pos:{
            x:100,
            y:100
        }
    }).toLog('私人圈子传播，请勿外传');
}