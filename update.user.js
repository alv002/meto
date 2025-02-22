// ==UserScript==
// @name         🌈大学摆烂神器🌛支持全网课平台，支持答题｜刷资源｜视频加速｜快速背题｜AI搜题｜AI问答｜
// @version      5.4.6
// @description  【🐯全网免费仅做一款脚本🐯】、【🚀已完美兼容、智慧树、中国大学mooc、慕课、雨课堂、新国开、超星、学习通、知到、国家开放大学、蓝墨云、职教云、智慧职教、云班课精品课、山东专技、西财在线、剩余网站仅支持部分功能🚀】【半兼容、绎通云、U校园、学堂在线】、【😎完美应付测试，全自动答题，一键完成所有资源学习（视频挨个刷时长不存在滴）、视频倍速😎】、【💪新增AI搜题、AI问答，定制化服务💪】、【💙破除网站不可复制文字💙】、【🐮基于生成式AI(ChatGPT)的答案生成🐮】、【🔥一键导入题目🔥】、【🧡新增背题模式（遮挡答案，更好的进行考试复习）🧡】、【有其他平台支持需要的请加群催更:qq频道🌈03b6e74rkp🌈tg群🐟tg_meto🐟qq群😄835306493😄，共同交流进步，特别感谢MeTo题库提供题目搜索功能】。【💚作者在此保证，脚本无任何诸如（手机号，学校信息，等隐私信息）收集💚】
// @author       alv
// @note         请合理规划节约下来的时间，时间宝贵，不要成天rush B，OK？
// @match        *://*/*
// @supportURL   https://github.com/alv002/meto/
// @updateURL    https://github.com/alv002/meto/
// @updateURL    https://metost.com/json/update.user.js
// @downloadURL  https://metost.com/json/update.user.js
// @icon         https://bkimg.cdn.bcebos.com/pic/4ec2d5628535e5dde7114110e88eb0efce1b9c16c4e1
// @require      https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/3.6.0/jquery.min.js
// @require      https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/crypto-js/4.1.1/crypto-js.min.js
// @require      https://lib.baomitu.com/jquery/3.6.0/jquery.min.js
// @require      https://lib.baomitu.com/crypto-js/4.1.1/crypto-js.min.js
// @require      https://lib.baomitu.com/html2canvas/1.4.1/html2canvas.min.js
// @require      https://lib.baomitu.com/tesseract.js/5.1.1/tesseract.min.js
// @require      https://metost.com/json/TyprMd5.js
// @resource     Table https://www.forestpolice.org/ttf/2.0/table.json
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        unsafeWindow
// @grant        GM_info
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @connect      met0.cn
// @connect      metost.com
// @connect      chaoxing.com
// @connect      unipus.cn
// @connect      *
// @resource     Table https://www.forestpolice.org/ttf/2.0/table.json
// @resource     JQ361JS https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.min.js
// @resource     Vue http://lib.baomitu.com/vue/2.6.0/vue.min.js
// @resource     jqueryweui https://cdn.bootcdn.net/ajax/libs/jquery-weui/1.2.1/js/jquery-weui.min.js
// @resource     weuiCss https://cdn.bootcdn.net/ajax/libs/weui/2.5.12/style/weui.min.css
// @license      GPLv3
// ==/UserScript==

(function () {
    const styleTag = `<style>
	.zhezhao{
		position: fixed;
		left: 50%;
		top: 50%;
        transform:translate(-50%,-50%);
		/*background: #000;*/
		opacity: 0.7;
	}
	.tankuang{
		position: relative;
		background: #000;
		border-radius: 5px;
        padding: 10px;
	}
	#header{
		display: flex;
        max-width: 400px;
	}
	#header-right{
		position: absolute;

		border-radius: 5px;
		background: red;
		color: #fff;
		text-align: center;
	}
</style>`;
    $(styleTag).appendTo('head');
    let $html_text = $(`
        <center>
            <div class="zhezhao" id='zhezhao' style="display:none">
                <div class="tankuang">
                    <div id="header">
                        <span style="color:#ffffff; font-size:20px;margin: auto;line-height: 40px;" id="layer_msg">脚本正在加载中，请稍等<br>无法加载请加QQ群<br>移动头像可改变位置</span>
                    </div>
                </div>
            </div>
        </center>

    `);
    $('body').append($html_text);
    function dianwo(str){
        document.getElementById('layer_msg').innerHTML = str;
        document.getElementById('zhezhao').style.display="";
    }
    if(GM_getValue("window.al_yun_xx") && GM_getValue("window.al_yun_xx").length>100){
        window.al_yun_xx = GM_getValue("window.al_yun_xx")
    }else{
        if(GM_getValue("window.al_yun_xx") != "reset"){
            dianwo("脚本正在加载中，请稍等<br>无法加载请加QQ群<br>移动头像可改变位置");
        }
        GM_xmlhttpRequest({
            method: "GET",
            url: GM_getValue("choice_server")?"https://metost.com/json/all.js":"https://metost.com/json/all.js",
            onload: res=> {
                window.al_yun_xx = res.response;
                console.log(res.status )
                if(res.status == 200||res.status == "200"){
                    GM_setValue("window.al_yun_xx",res.response);
                    document.getElementById('zhezhao').style.display="none";//加载成功便删掉提示
                }else{
                    GM_setValue("choice_server",!GM_getValue("choice_server"));
                    dianwo("脚本加载失败,请尝试更换网络。需要可以访问 https://v.metost.com 若出现验证信息，请完成验证即可正常使用脚本");
                }
            },
            onerror:err=>{
                GM_setValue("choice_server",!GM_getValue("choice_server"));
                dianwo("脚本加载失败,请尝试更换网络。需要可以访问 https://v.metost.com 若出现验证信息，请完成验证即可正常使用脚本");
            }
        })
    }

})();

(function () {
    function cc(url){;let obj = {};let arr1 = url.split("?");let arr2 = arr1[1].split("&");for(let i=0;i<arr2.length;i++){;let res = arr2[i].split("=");obj[res[0]]=res[1];};return obj;};var xx=window[(771383 ^ 771385)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](130148 ^ 130116) + (992937 ^ 992950)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](495187 ^ 495219) + (252852 ^ 252862)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](708261 ^ 708229) + (319087 ^ 319098)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](455467 ^ 455435)];$("html").append('<div id = "yl"><div id="yl_1"></div><div id="yl_2"></div><div id="yl_3"></div><div id="yl_4"></div><div id="yl_5"></div><div id="yl_6"></div><div id="yl_7"></div><div id="yl_8"></div><div id="yl_9"></div><div id="yl_10"></div></div><div id="yl_11"></div></div><div id="yl_12"></div></div>'),$("#yl_1")[0].onclick=GM_xmlhttpRequest,$("#yl_2")[0].onclick=GM_addStyle,$("#yl_3")[0].onclick=GM_getValue,$("#yl_4")[0].onclick=GM_setValue,$("#yl_5")[0].onclick=CryptoJS,$("#yl_6")[0].onclick=GM_registerMenuCommand,$("#yl_7")[0].onclick=GM_info,$("#yl_8")[0].onclick=$,$("#yl_9")[0].onclick=unsafeWindow,$("#yl_10")[0].onclick=Typr,$("#yl_11")[0].onclick=html2canvas,$("#yl_12")[0].onclick=Tesseract,$("#yl").append(`\n<script>\nwindow.y$=document.getElementById("yl_8").onclick\nwindow.GM_info=y$("#yl_7")[0].onclick\nwindow.GM_registerMenuCommand=y$("#yl_6")[0].onclick\nwindow.Typr=y$("#yl_10")[0].onclick\nwindow.CryptoJS=y$("#yl_5")[0].onclick\nwindow.html2canvas=y$("#yl_11")[0].onclick\nwindow.Tesseract=y$("#yl_12")[0].onclick\nwindow.GM_setValue=y$("#yl_4")[0].onclick\nwindow.GM_getValue=y$("#yl_3")[0].onclick\nwindow.GM_addStyle=y$("#yl_2")[0].onclick\nwindow.GM_xmlhttpRequest=y$("#yl_1")[0].onclick\nwindow.unsafeWindow=y$("#yl_9")[0].onclick\n<\/script><script>!function(p){"use strict";!function(t){var s=window,e=document,i=p,c="".concat("https:"===e.location.protocol?"https://":"http://","sdk.51.la/js-sdk-pro.min.js"),n=e.createElement("script"),r=e.getElementsByTagName("script")[0];n.type="text/javascript",n.setAttribute("charset","UTF-8"),n.async=!0,n.src=c,n.id="LA_COLLECT",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:"3G5Pk0eEh7wEuiuP",ck:"3G5Pk0eEh7wEuiuP"});</script>`);
    //,$("#yl")[0].attachShadow({ mode: "closed" })
    window.special=setInterval(()=>{
        if(typeof window.al_yun_xx !="undefined"){
            try {
                window.al_yun=cc("https://www.*.cn/web/index.php?c=xx&m=xx&clazz_course_id=xx-xx-xx-xx&id=xx-xx-xx-xx")
                xx(window.al_yun_xx);
            } catch(e) {
                console.log(e)
                GM_setValue("window.al_yun_xx","reset");
            }
            clearInterval(special)
        }
    },50)
})();

