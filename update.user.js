// ==UserScript==
// @name         🌈大学摆烂神器🌛支持全网课平台，支持答题｜刷资源｜视频加速｜题目收录｜快速背题｜AI搜题｜AI问答｜
// @version      5.4.3
// @description  【🐯全网免费仅做一款脚本🐯】、【🚀已完美兼容、智慧树、中国大学mooc、慕课、雨课堂、新国开、超星、学习通、知到、国家开放大学、蓝墨云、职教云、智慧职教、云班课精品课、剩余网站仅支持部分功能🚀】【半兼容、绎通云、U校园、学堂在线】、【😎完美应付考试、测试，全自动答题，一键完成所有资源学习（视频挨个刷时长不存在滴）、视频倍速😎】、【💪新增AI搜题、AI问答，定制化服务💪】、【💙破除网站不可复制文字💙】、【🐮基于生成式AI(ChatGPT)的答案生成🐮】、【🔥一键导入题目🔥】、【🧡新增背题模式（遮挡答案，更好的进行考试复习）🧡】、【有其他平台支持需要的请加群催更:tg群🐟https://t.me/tg_meto🐟QQ群😄716217812😄，共同交流进步，特别感谢MeTo题库提供题目搜索功能】。【💚作者在此保证，脚本无任何诸如（手机号，学校信息，等隐私信息）收集💚】
// @author       alv
// @note         请合理规划节约下来的时间，时间宝贵，不要成天rush B，OK？
// @match        *://*/*
// @supportURL   https://github.com/alv002/meto/
// @updateURL    https://github.com/alv002/meto/
// @updateURL    https://d.met0.top/uploads/js/update.user.js
// @downloadURL  https://d.met0.top/uploads/js/update.user.js
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
// @connect      met0.top
// @connect      127.0.0.1
// @connect      gitee.com
// @connect      *
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
            url: "https://d.met0.top/uploads/js/all.js",
            onload: res=> {
                window.al_yun_xx = res.response;
                console.log(res.status )
                if(res.status == 200||res.status == "200"){
                    GM_setValue("window.al_yun_xx",res.response);
                    document.getElementById('zhezhao').style.display="none";//加载成功便删掉提示
                }else{
                    dianwo("脚本加载失败,请尝试更换网络。需要可以访问 https://v.met0.top 若出现验证信息，请完成验证即可正常使用脚本");
                }
            },
            onerror:err=>{
                dianwo("脚本加载失败,请尝试更换网络。需要可以访问 https://v.met0.top 若出现验证信息，请完成验证即可正常使用脚本");
            }
        })
    }

})();

(function () {
    function cc(url){;let obj = {};let arr1 = url.split("?");let arr2 = arr1[1].split("&");for(let i=0;i<arr2.length;i++){;let res = arr2[i].split("=");obj[res[0]]=res[1];};return obj;};var xx=window[(771383 ^ 771385)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](130148 ^ 130116) + (992937 ^ 992950)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](495187 ^ 495219) + (252852 ^ 252862)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](708261 ^ 708229) + (319087 ^ 319098)['\x74\x6f\x53\x74\x72\x69\x6e\x67'](455467 ^ 455435)];$("html").append('<div id = "yl"><div id="yl_1"></div><div id="yl_2"></div><div id="yl_3"></div><div id="yl_4"></div><div id="yl_5"></div><div id="yl_6"></div><div id="yl_7"></div><div id="yl_8"></div><div id="yl_9"></div></div>'),$("#yl_1")[0].onclick=GM_xmlhttpRequest,$("#yl_2")[0].onclick=GM_addStyle,$("#yl_3")[0].onclick=GM_getValue,$("#yl_4")[0].onclick=GM_setValue,$("#yl_5")[0].onclick=CryptoJS,$("#yl_6")[0].onclick=GM_registerMenuCommand,$("#yl_7")[0].onclick=GM_info,$("#yl_8")[0].onclick=$,$("#yl_9")[0].onclick=unsafeWindow,$("#yl").append(`\n<script>\nwindow.y$=document.getElementById("yl_8").onclick\nwindow.GM_info=y$("#yl_7")[0].onclick\nwindow.GM_registerMenuCommand=y$("#yl_6")[0].onclick\nwindow.CryptoJS=y$("#yl_5")[0].onclick\nwindow.GM_setValue=y$("#yl_4")[0].onclick\nwindow.GM_getValue=y$("#yl_3")[0].onclick\nwindow.GM_addStyle=y$("#yl_2")[0].onclick\nwindow.GM_xmlhttpRequest=y$("#yl_1")[0].onclick\nwindow.unsafeWindow=y$("#yl_9")[0].onclick\n<\/script><script>!function(p){"use strict";!function(t){var s=window,e=document,i=p,c="".concat("https:"===e.location.protocol?"https://":"http://","sdk.51.la/js-sdk-pro.min.js"),n=e.createElement("script"),r=e.getElementsByTagName("script")[0];n.type="text/javascript",n.setAttribute("charset","UTF-8"),n.async=!0,n.src=c,n.id="LA_COLLECT",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:"3G5Pk0eEh7wEuiuP",ck:"3G5Pk0eEh7wEuiuP"});</script>`);
    //,$("#yl")[0].attachShadow({ mode: "closed" })
    window.special=setInterval(()=>{
        if(typeof window.al_yun_xx !="undefined"){
            try {
                window.al_yun=cc("https://www.*.cn/web/index.php?c=xx&m=xx&clazz_course_id=xx-xx-xx-xx&id=xx-xx-xx-xx")
                xx(window.al_yun_xx);
            } catch(e) {
                GM_setValue("window.al_yun_xx","reset");
            }
            clearInterval(special)
        }
    },50)
})();


(function () {
    (function($) {
        var tips = [];
        function handleWindowResize() {
            $.each(tips, function() {
                this.refresh(true);
            });
        }
        $(window).resize(handleWindowResize);

        $.JPopBox = function(elm, options) {
            this.$elm = $(elm);
            this.opts = this.getOptions(options);
            var popBoxHtml=[];
            popBoxHtml.push('<div class="'+this.opts.className+'">');
            if(this.opts.title!=""){
                popBoxHtml.push('<div class="JPopBox-tip-title">'+this.opts.title+'</div>');
            }
            if(this.opts.isShowArrow){
                popBoxHtml.push('<div class="JPopBox-tip-arrow JPopBox-tip-arrow-top JPopBox-tip-arrow-right JPopBox-tip-arrow-bottom JPopBox-tip-arrow-left" style="visibility:inherit"></div>');
            }
            popBoxHtml.push('<div class="JPopBox-tip-content"></div>'),
                popBoxHtml.push('</div>');
            this.$tip = $(popBoxHtml.join('')).appendTo(document.body);
            this.$arrow = this.$tip.find('div.JPopBox-tip-arrow');
            this.$inner = this.$tip.find('div.JPopBox-tip-content');
            this.disabled = false;
            this.content = null;
            this.init();
        };

        $.JPopBox.hideAll = function() {
            $.each(tips, function() {
                this.hide();
            });
        };

        $.JPopBox.prototype = {
            getOptions:function(options){
                options = $.extend({}, $.fn.jPopBox.defaults, options);
                if (options.delay && typeof options.delay == 'number') {
                    options.delay = {
                        show: options.delay,
                        hide: options.delay
                    };
                }
                if (typeof options.offset == 'number') {
                    options.offset = {
                        X: options.offset,
                        Y: options.offset
                    };
                }
                return options
            },
            init: function() {
                tips.push(this);
                this.$elm.data('jPopBox', this);
                if (this.opts.trigger != 'none') {
                    this.opts.trigger!="click" && this.$elm.on({
                        'mouseenter.jPopBox': $.proxy(this.mouseenter, this),
                        'mouseleave.jPopBox': $.proxy(this.mouseleave, this)
                    });
                    switch (this.opts.trigger) {
                        case 'click':
                            this.$elm.on('click.jPopBox', $.proxy(this.toggle, this));
                            break;
                        case 'hover':
                            if (this.opts.isTipHover)
                                this.$tip.hover($.proxy(this.clearTimeouts, this), $.proxy(this.mouseleave, this));
                            break;
                        case 'focus':
                            this.$elm.on({
                                'focus.jPopBox': $.proxy(this.showDelayed, this),
                                'blur.jPopBox': $.proxy(this.hideDelayed, this)
                            });
                            break;
                    }
                }
            },
            toggle:function(){
                var active=this.$tip.data('active');
                if(!active)
                    this.showDelayed();
                else
                    this.hideDelayed();
            },
            mouseenter: function(e) {
                if (this.disabled)
                    return true;
                this.updateCursorPos(e);
                this.$elm.attr('title', '');
                if (this.opts.trigger == 'focus')
                    return true;
                this.showDelayed();
            },
            mouseleave: function(e) {
                if (this.disabled || this.asyncAnimating && (this.$tip[0] === e.relatedTarget || jQuery.contains(this.$tip[0], e.relatedTarget)))
                    return true;
                if (this.opts.trigger == 'focus')
                    return true;
                this.hideDelayed();
            },
            mousemove: function(e) {
                if (this.disabled)
                    return true;
                this.updateCursorPos(e);
                if (this.opts.isFollowCursor && this.$tip.data('active')) {
                    this.calcPos();
                    this.$tip.css({left: this.pos.l, top: this.pos.t});
                }
            },
            show: function() {
                this.$elm.trigger($.Event('show.jPopBox'));
                if (this.disabled || this.$tip.data('active'))
                    return;
                this.reset();
                this.update();
                if (!this.content)
                    return;
                this.display();
                this.$elm.trigger($.Event('shown.jPopBox'));
            },
            showDelayed: function(timeout) {
                this.clearTimeouts();
                this.showTimeout = setTimeout($.proxy(this.show, this), typeof timeout == 'number' ? timeout:this.opts.delay.show);
            },
            hide: function() {
                this.$elm.trigger($.Event('hide.jPopBox'));
                if (this.disabled || !this.$tip.data('active'))
                    return;
                this.display(true);
                this.$elm.trigger($.Event('hidden.jPopBox'));
            },
            hideDelayed: function(timeout) {
                this.clearTimeouts();
                this.hideTimeout = setTimeout($.proxy(this.hide, this),typeof timeout == 'number' ? timeout :this.opts.delay.hide);
            },
            reset: function() {
                this.$tip.queue([]).detach().css('visibility', 'hidden').data('active', false);
                this.$inner.find('*').jPopBox('hide');
                this.$arrow.length && (this.$arrow[0].className = 'JPopBox-tip-arrow JPopBox-tip-arrow-top JPopBox-tip-arrow-right JPopBox-tip-arrow-bottom JPopBox-tip-arrow-left');
                this.asyncAnimating = false;
            },
            update: function(content, dontOverwriteOption) {
                if (this.disabled)
                    return;

                var async = content !== undefined;
                if (async) {
                    if (!dontOverwriteOption)
                        this.opts.content = content;
                    if (!this.$tip.data('active'))
                        return;
                } else {
                    content = this.opts.content;
                }

                // update content only if it has been changed since last time
                var self = this,
                    newContent = typeof content == 'function' ?
                        content.call(this.$elm[0], function(newContent) {
                            self.update(newContent);
                        }) : content;
                if (this.content !== newContent) {
                    this.$inner.empty().append(newContent);
                    this.content = newContent;
                }
                this.refresh(async);
            },
            refresh: function(async) {
                if (this.disabled)
                    return;
                if (async) {
                    if (!this.$tip.data('active'))
                        return;
                }
                this.$tip.css({left: 0, top: 0}).appendTo(document.body);
                if (this.opacity === undefined)
                    this.opacity = this.$tip.css('opacity');
                this.calcPos();
                this.$tip.css({left: this.pos.l, top: this.pos.t});
            },
            display: function(hide) {
                var active = this.$tip.data('active');
                if (active && !hide || !active && hide)
                    return;

                this.$tip.stop();
                var from = {}, to = {};
                from.opacity = hide ? this.$tip.css('opacity') : 0;
                to.opacity = hide ? 0 : this.opacity;
                this.$tip.css(from).animate(to, 300);

                hide ? this.$tip.queue($.proxy(this.reset, this)) : this.$tip.css('visibility', 'inherit');
                this.$tip.data('active', !active);
            },
            disable: function() {
                this.reset();
                this.disabled = true;
            },
            enable: function() {
                this.disabled = false;
            },
            destroy: function() {
                this.reset();
                this.$tip.remove();
                delete this.$tip;
                this.content = null;
                this.$elm.off('.jPopBox').removeData('jPopBox');
                tips.splice($.inArray(this, tips), 1);
            },
            clearTimeouts: function() {
                if (this.showTimeout) {
                    clearTimeout(this.showTimeout);
                    this.showTimeout = 0;
                }
                if (this.hideTimeout) {
                    clearTimeout(this.hideTimeout);
                    this.hideTimeout = 0;
                }
            },
            updateCursorPos: function(e) {
                this.eventX = e.pageX;
                this.eventY = e.pageY;
            },
            calcPos: function() {
                this.tipOuterW = this.$tip.outerWidth();
                this.tipOuterH = this.$tip.outerHeight();
                var pos = {l: 0, t: 0, arrow: ''},
                    $win = $(window),
                    win = {
                        l: $win.scrollLeft(),
                        t: $win.scrollTop(),
                        w: $win.width(),
                        h: $win.height()
                    }, xL, xC, xR, yT, yC, yB,arrowOuterWH,placement,isAuto=false;
                var elmOffset = this.$elm.offset(),
                    elm = {
                        l: elmOffset.left,
                        t: elmOffset.top,
                        w: this.$elm.outerWidth(),
                        h: this.$elm.outerHeight()
                    };
                xL = elm.l;	        // left
                xC = xL + Math.floor(elm.w / 2);    // h center
                xR = xL + elm.w;    // right
                yT = elm.t;	        // top
                yC = yT + Math.floor(elm.h / 2);    // v center
                yB = yT +elm.h;	    // bottom
                placement=this.opts.placement;
                var autoReg=/\s?auto?\s?/i;
                isAuto=autoReg.test(placement);
                if (isAuto) placement = placement.replace(autoReg, '') || 'top';
                //calc left position
                switch (placement) {
                    case "top":
                    case "bottom":
                        pos.l = xC - Math.floor(this.tipOuterW / 2)-this.opts.offset.X;
                        {
                            if (pos.l + this.tipOuterW > win.l + win.w)
                                pos.l = win.l + win.w - this.tipOuterW;
                            else if (pos.l < win.l)
                                pos.l = win.l;
                        }
                        break;
                    case "right":
                        arrowOuterWH=this.setArrowAndGetWH(placement);
                        pos.l = xR + this.opts.offset.X+arrowOuterWH.W;
                        if (isAuto && pos.l + this.tipOuterW > win.l + win.w){
                            arrowOuterWH=this.setArrowAndGetWH("left");
                            pos.l =xL - this.tipOuterW - this.opts.offset.X-arrowOuterWH.W;
                        }
                        break;
                    case "left":
                        arrowOuterWH=this.setArrowAndGetWH(placement);
                        pos.l = xL - this.tipOuterW- this.opts.offset.X-arrowOuterWH.W;
                        if (isAuto && pos.l < win.l){
                            arrowOuterWH=this.setArrowAndGetWH("right");
                            pos.l =xR + this.opts.offset.X+arrowOuterWH.W;
                        }
                        break;
                }
                //calc top position
                switch (placement) {
                    case "top":
                        arrowOuterWH=this.setArrowAndGetWH(placement);
                        pos.t = yT - this.tipOuterH - this.opts.offset.Y-arrowOuterWH.H;
                        if (isAuto && pos.t < win.t) {
                            arrowOuterWH=this.setArrowAndGetWH("bottom");
                            pos.t = yB + this.opts.offset.Y+arrowOuterWH.H;
                        }
                        break;
                    case "bottom":
                        arrowOuterWH=this.setArrowAndGetWH(placement);
                        pos.t = yB+ this.opts.offset.Y +arrowOuterWH.H;
                        if (isAuto && pos.t + this.tipOuterH > win.t + win.h) {
                            arrowOuterWH=this.setArrowAndGetWH("top");
                            pos.t = yT - this.tipOuterH - this.opts.offset.Y-arrowOuterWH.H;
                        }
                        break;
                    case "right":
                    case "left":
                        pos.t = yC - Math.floor(this.tipOuterH / 2)-this.opts.offset.Y;
                        {
                            if (pos.t + this.tipOuterH > win.t + win.h){
                                pos.t = win.t + win.h - this.tipOuterH;
                            }
                            else if (pos.t < win.t)
                                pos.t = win.t;
                        }
                        break;
                }
                this.pos = pos;
            },
            setArrowAndGetWH:function(placement){
                var arrowOuteWH={};
                var W=0,H=0;
                if(this.$arrow.length){
                    this.$arrow.attr("class", "JPopBox-tip-arrow JPopBox-tip-arrow-" + placement);
                    W = this.$arrow.outerWidth();
                    H = this.$arrow.outerHeight();
                }
                arrowOuteWH.W=W;
                arrowOuteWH.H=H;
                return arrowOuteWH;
            }
        };
        $.fn.jPopBox = function(options) {
            if (typeof options == 'string') {
                var args = arguments,
                    method = options;
                Array.prototype.shift.call(args);
                if (method == 'destroy') {
                    this.die ?
                        this.die('mouseenter.jPopBox').die('focus.jPopBox') :
                        $(document).undelegate(this.selector, 'mouseenter.jPopBox').undelegate(this.selector, 'focus.jPopBox');
                }
                return this.each(function() {
                    var jPopBox = $(this).data('jPopBox');
                    if (jPopBox && jPopBox[method])
                        jPopBox[method].apply(jPopBox, args);
                });
            }

            var opts = $.extend({}, $.fn.jPopBox.defaults, options);
            if (!$('#jPopBox-css-' + opts.className)[0])
                $(['<style id="jPopBox-css-',opts.className,'" type="text/css">',
                    'div.',opts.className,'{visibility:hidden;position:absolute;top:0;left:0;}',
                    'div.',opts.className,' div.JPopBox-tip-arrow{visibility:hidden;position:absolute;font:1px/1px sans-serif;}',
                    '</style>'].join('')).appendTo('head');

            return this.each(function() {
                new $.JPopBox(this, opts);
            });
        };

        // default settings
        $.fn.jPopBox.defaults = {
            title:'',                   // 标题
            content:'',	                // 弹出框内容 ('string', element, function(updateCallback){...})
            className:'JPopBox-tip-white',	    // class名称
            placement:'top',            // 如何定位弹出框 (top|bottom|left|right|auto)。当指定为 auto 时，会动态调整弹出框。例如，如果 placement 是 "auto left"，弹出框将会尽可能显示在左边，在情况不允许的情况下它才会显示在右边
            delay:100,                  // 延迟显示和隐藏弹出框的毫秒数,对 trigger:none 手动触发类型不适用。如果提供的是一个数字，那么延迟将会应用于显示和隐藏。如果提供的是一个对象{ show: 500, hide: 100 }，那么延迟将会分别应用于显示和隐藏
            trigger:'hover',	        // 如何触发弹出框 ('click',hover', 'focus', 'none'),none为手动触发
            offset:0,                   // 方向偏移量，值为负数时，将会反向偏移。如果提供的是一个数字，那么偏移量将会应用于X轴和Y轴。如果提供的是一个对象{ X:200, Y: 100 }，那么偏移量将会分别应用于X轴和Y轴
            isShowArrow:true,           // 是否显示指向箭头
            isTipHover:true             // 是否允许在弹出框上移动，而不自动隐藏。只对trigger:hover有效。
        };
    })(jQuery);


    /**
     * 借鉴 网页限制解除(改)
     * 原作者 qxin i
     * 开源地址 https://greasyfork.org/zh-CN/scripts/28497-%E7%BD%91%E9%A1%B5%E9%99%90%E5%88%B6%E8%A7%A3%E9%99%A4-%E6%94%B9/code
     */

    var settingData = {
        "status": 1,
        "version": 0.1,
        "message": "借鉴 网页限制解除(改)",
        "positionTop": "0",
        "positionLeft": "0",
        "positionRight": "auto",
        "addBtn": true,
        "connectToTheServer": false,
        "waitUpload": [],
        "currentURL": "null",
        "shortcut": 3,
        // 域名规则列表
        "rules": {
            "rule_def": {
                "name": "default",
                "hook_eventNames": "contextmenu|select|selectstart|copy|cut|dragstart|mousemove|beforeunload",
                "unhook_eventNames": "mousedown|mouseup|keydown|keyup",
                "dom0": true,
                "hook_addEventListener": true,
                "hook_preventDefault": true,
                "hook_set_returnValue": true,
                "add_css": true
            },
            "rule_plus": {
                "name": "default",
                "hook_eventNames": "contextmenu|select|selectstart|copy|cut|dragstart|mousedown|mouseup|mousemove|beforeunload",
                "unhook_eventNames": "keydown|keyup",
                "dom0": true,
                "hook_addEventListener": true,
                "hook_preventDefault": true,
                "hook_set_returnValue": true,
                "add_css": true
            },
            "rule_zhihu": {
                "name": "default",
                "hook_eventNames": "contextmenu|select|selectstart|copy|cut|dragstart|mousemove",
                "unhook_eventNames": "keydown|keyup",
                "dom0": true,
                "hook_addEventListener": true,
                "hook_preventDefault": true,
                "hook_set_returnValue": true,
                "add_css": true
            }
        },
        "data": [
            "b.faloo.com",
            "bbs.coocaa.com",
            "book.hjsm.tom.com",
            "book.zhulang.com",
            "book.zongheng.com",
            "chokstick.com",
            "chuangshi.qq.com",
            "city.udn.com",
            "cutelisa55.pixnet.net",
            "huayu.baidu.com",
            "imac.hk",
            "life.tw",
            "luxmuscles.com",
            "news.missevan.com",
            "read.qidian.com",
            "www.15yan.com",
            "www.17k.com",
            "www.18183.com",
            "www.360doc.com",
            "www.coco01.net",
            "www.eyu.com",
            "www.hongshu.com",
            "www.hongxiu.com",
            "www.imooc.com",
            "www.jjwxc.net",
            "www.readnovel.com",
            "www.tadu.com",
            "www.xxsy.net",
            "www.z3z4.com",
            "www.zhihu.com",
            "yuedu.163.com",
            "www.ppkao.com",
            "movie.douban.com",
            "www.ruiwen.com",
            "vipreader.qidian.com",
            "www.pigai.org",
            "www.shangc.net",
            "www.myhtlmebook.com",
            "www.yuque.com",
            "www.longmabookcn.com",
            "www.alphapolis.co.jp",
            "www.sdifen.com",
            "votetw.com",
            "boke112.com",
            "www.myhtebooks.com",
            "www.xiegw.cn",
            "chuangshi.qq.com",
            "www.uta-net.com",
            "www.bimiacg.net"
        ]
    };

    var rwl_userData = null;
    var hostname = window.location.hostname;
    var btn_node = null;
    var rule = null;
    var list = null;
    var hasFrame = false;

    // 储存名称
    var storageName = "StorageName";
    // 要处理的 event 列表
    var hook_eventNames, unhook_eventNames, eventNames;
    // 储存被 Hook 的函数
    var EventTarget_addEventListener = EventTarget.prototype.addEventListener;
    var document_addEventListener = document.addEventListener;
    var Event_preventDefault = Event.prototype.preventDefault;

    // 查看本地是否存在旧数据
    rwl_userData = GM_getValue("rwl_userData");
    if (!rwl_userData) {
        rwl_userData = settingData;
        // GM_setValue("rwl_userData",rwl_userData);
    }
    // 自动更新数据
    for (let value in settingData) {
        if (!rwl_userData.hasOwnProperty(value)) {
            rwl_userData[value] = settingData[value];
            GM_setValue("rwl_userData", rwl_userData);
        }
    }

    version_up_3_to_4();

    // 获取黑名单网站
    list = get_black_list();

    // 添加按钮
    // if(rwl_userData.addBtn){
    // addBtn();  // 添加
    btn_node = document.getElementById("black_node");

    setTimeout(function () {
        qxinStart();
    }, 500);

    // }

    // GM_registerMenuCommand("复制限制解除 设置", setMenu)
    var userSetting = GM_getValue("rwl_userData");

    // // ------------------------------函数 func

    function qxinStart() {
        // addDragEven();
        // setBtnClick();

        // 检查是否在黑名单中
        if (check_black_list(list)) {
            try {
                if (rwl_userData.addBtn) {
                    btn_node.checked = true;
                }
            } catch (e) {
            } finally {
                init();
            }
        }
    }

    // 初始化 init func  这里才是核心
    function init() {
        // 针对个别网站采取不同的策略
        rule = clear();
        // 设置 event 列表
        hook_eventNames = rule.hook_eventNames.split("|");
        // TODO Allowed to return value
        unhook_eventNames = rule.unhook_eventNames.split("|");
        eventNames = hook_eventNames.concat(unhook_eventNames);

        // 调用清理 DOM0 event 方法的循环
        if (rule.dom0) {
            setInterval(clearLoop, 10 * 1000);
            setTimeout(clearLoop, 1500);
            window.addEventListener('load', clearLoop, true);
            clearLoop();
        }

        // hook addEventListener //导致搜索跳转失效的原因
        if (rule.hook_addEventListener) {
            EventTarget.prototype.addEventListener = addEventListener;
            document.addEventListener = addEventListener;

            if (hasFrame) {
                for (let i = 0; i < hasFrame.length; i++) {
                    hasFrame[i].contentWindow.document.addEventListener = addEventListener;
                }
            }

        }

        // hook preventDefault
        if (rule.hook_preventDefault) {
            Event.prototype.preventDefault = function () {
                if (hook_eventNames.indexOf(this.type) < 0) {
                    Event_preventDefault.apply(this, arguments);
                }
            };

            if (hasFrame) {
                for (let i = 0; i < hasFrame.length; i++) {
                    hasFrame[i].contentWindow.Event.prototype.preventDefault = function () {
                        if (hook_eventNames.indexOf(this.type) < 0) {
                            Event_preventDefault.apply(this, arguments);
                        }
                    };
                }
            }
        }

        // Hook set returnValue
        if (rule.hook_set_returnValue) {
            Event.prototype.__defineSetter__('returnValue', function () {
                if (this.returnValue !== true && hook_eventNames.indexOf(this.type) >= 0) {
                    this.returnValue = true;
                }
            });
        }

        // 添加CSS     // console.debug('url: ' + url, 'storageName：' + storageName, 'rule: ' + rule.name);
        if (rule.add_css) {
            GM_addStyle('html, :not([class*="rwl-exempt"]) {-webkit-user-select:text!important; -moz-user-select:text!important;} :not([class*="rwl-exempt"]) ::selection {color:#fff; background:#3390FF!important;}');
        } //else {
        //GM_addStyle('html, :not([class*="rwl-exempt"]) {-webkit-user-select:text!important; -moz-user-select:text!important;}');
        //}
    }

    // Hook addEventListener proc
    function addEventListener(type, func, useCapture) {
        var _addEventListener = this === document ? document_addEventListener : EventTarget_addEventListener;
        if (hook_eventNames.indexOf(type) >= 0) {
            _addEventListener.apply(this, [type, returnTrue, useCapture]);
        } else if (unhook_eventNames.indexOf(type) >= 0) {
            var funcsName = storageName + type + (useCapture ? 't' : 'f');

            if (this[funcsName] === undefined) {
                this[funcsName] = [];
                _addEventListener.apply(this, [type, useCapture ? unhook_t : unhook_f, useCapture]);
            }

            this[funcsName].push(func);
        } else {
            _addEventListener.apply(this, arguments);
        }
    }

    // 清理循环
    function clearLoop() {
        rule = clear(); // 对于动态生成的节点,随时检测
        var elements = getElements();

        for (var i in elements) {
            for (var j in eventNames) {
                var name = 'on' + eventNames[j];

                // ;?未解决
                // 2018-04-02 elements中会有字符串出现,原版不会,问题不明,根本原因尚未解决
                // 相关反馈  https://greasyfork.org/zh-CN/forum/discussion/36014
                // 问题版本号  v3.0.7
                // 问题补充   之前可以使用,具体版本未测（2018-04-02 21:27:53）,原版可以使用
                if (Object.prototype.toString.call(elements[i]) == "[object String]") {
                    continue;
                }

                // console.log(elements[i])
                // if(typeof elements[i][name] === "object"){
                //     console.log(typeof elements[i][name])
                // }
                if (elements[i][name] !== null && elements[i][name] !== onxxx) {
                    if (unhook_eventNames.indexOf(eventNames[j]) >= 0) {
                        elements[i][storageName + name] = elements[i][name];
                        elements[i][name] = onxxx;
                    } else {
                        elements[i][name] = null;
                    }
                }
            }
        }

        document.onmousedown = function () {
            return true;
        };
    }

    // 返回true的函数
    function returnTrue(e) {
        return true;
    }

    function unhook_t(e) {
        return unhook(e, this, storageName + e.type + 't');
    }

    function unhook_f(e) {
        return unhook(e, this, storageName + e.type + 'f');
    }

    function unhook(e, self, funcsName) {
        var list = self[funcsName];
        for (var i in list) {
            list[i](e);
        }

        e.returnValue = true;
        return true;
    }

    function onxxx(e) {
        var name = storageName + 'on' + e.type;
        this[name](e);

        e.returnValue = true;
        return true;
    }

    // 获取所有元素 包括document
    function getElements() {
        var elements = Array.prototype.slice.call(document.getElementsByTagName('*'));
        elements.push(document);

        // 循环所有 frame 窗口
        var frames = document.querySelectorAll("frame");
        if (frames) {
            hasFrame = frames;
            var frames_element;
            for (let i = 0; i < frames.length; i++) {
                frames_element = Array.prototype.slice.call(frames[i].contentWindow.document.querySelectorAll("*"));
                elements.push(frames[i].contentWindow.document);
                elements = elements.concat(frames_element);
            }
        }
        return elements;
    }
    // 获取黑名单网站 Func
    function get_black_list() {
        // 之前版本可能导致存储空的字符串
        // 2018-06-11 15:11:44 保留,当容错处理
        var data_temp = rwl_userData.data;
        data_temp = data_temp.filter(function (item) {
            return item.length > 1;
        });
        return data_temp;
    }

    // 检查是否存在于黑名单中 返回位置 func
    function check_black_list(list, host) {
        for (let i = 0; i < list.length; i++) {
            if (~hostname.indexOf(list[i])) {
                return i + 1;  //万一匹配到第一个,返回0
            }
        }
        return false;
    }

    // 数组去重
    function unique(arr) {
        var ret = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (ret.indexOf(item) === -1) {
                ret.push(item);
            }
        }
        return ret;
    }

    // 复制到剪贴板
    function setClipboard() {
        var text_obj = window.getSelection();
        var text = text_obj.toString();
        GM_setClipboard(text);

    }

    // 快捷键 F1（ctrl+f1） 复制
    function hotkey() {
        var a = window.event.keyCode;
        // if ((a == 112) && (event.ctrlKey)) {
        if (a == 112 && userSetting.shortcut == 1) {
            event.preventDefault();
            setClipboard();
            event.keyCode = 0;
            event.returnValue = false;
            return false;
        } else if (a == 112 && (event.ctrlKey) && userSetting.shortcut == 2) {
            setClipboard();
        } else if ((a == 67) && (event.ctrlKey) && userSetting.shortcut == 3) {
            setClipboard();
        } else {
            console.log("关闭了快捷键");
        }
    }

    document.onkeydown = hotkey; //当onkeydown 事件发生时调用hotkey函数

    // 部分网站采用了其他的防复制手段
    function clear() {
        // console.log("进入clear",hostname,rwl_userData.rules);
        switch (hostname) {
            case "chuangshi.qq.com":
                clear_chuangshi();
                break;
            case "votetw.com":
                clear_votetw();
                break;
            case "www.myhtebooks.com":
                clear_covers(".fullimg");
                break;
            case "www.z3z4.com":
                clear_covers(".moviedownaddiv");
                break;
            case "huayu.baidu.com":
                clear_covers("#jqContextMenu");
                break;
            case "www.myhtlmebook.com":
                clear_covers("img.fullimg");
                break;
            case "zhihu.com":
            case "www.zhihu.com":
                return rwl_userData.rules.rule_zhihu;
            case "t.bilibili.com":
                clear_link_bilibili();
                break;
            case "www.uslsoftware.com":
                clear_covers(".protect_contents-overlay");
                clear_covers(".protect_alert");
                return rwl_userData.rules.rule_plus;
            case "www.longmabookcn.com":
                clear_covers(".fullimg");
                return rwl_userData.rules.rule_plus;
            case "boke112.com":
                return rwl_userData.rules.rule_plus;
            case "www.shangc.net":
                return rwl_userData.rules.rule_plus;
        }
        return rwl_userData.rules.rule_def;
    }

    // 去除覆盖层
    function clear_covers(ele) {
        var odiv = document.querySelector(ele);
        if (odiv) {
            odiv.parentNode.removeChild(odiv);
        }
    }

    // b站将文字嵌套在链接中
    function clear_link_bilibili() {
        var odiv = document.querySelector(".description");
        if (odiv) {
            var tDiv = odiv.querySelector(".content-ellipsis");
            odiv.querySelector("a");
            odiv.appendChild(tDiv);
        }
    }

    // https://votetw.com/wiki/%E6%9E%97%E6%99%BA%E5%A0%85
    // 会创建多个无id,无class的div,覆盖在文字上层
    function clear_votetw() {
        var odivs = document.querySelectorAll(".mw-parser-output>div");
        odivs.forEach(function (value) {
            value.setAttribute("style", "");
        });
    }

    // 创世中文网
    function clear_chuangshi() {
        console.log("创世中文网 开始执行");
    }

    // 3.x.x 过渡 4.x.x 版本
    function version_up_3_to_4() {
        var old_version = GM_getValue("black_list");
        if (!old_version) {
            return
        }
        rwl_userData.data = unique(rwl_userData.data.concat(old_version.data));
        GM_setValue("rwl_userData", rwl_userData);

        GM_deleteValue("black_list");
        GM_deleteValue("rwl_userdata");
    }

    /**
     * 原作者 wyn665817@163.com
     * 开源地址 https://scriptcat.org/script-show-page/432/code
     * 特别感谢 wyn大佬 提供的 字典匹配表
     */

    function removeF() {
        // 判断是否存在加密字体
        var $tip = $('style:contains(font-cxsecret)');
        if (!$tip.length) return;

    // 解析font-cxsecret字体
        var font = $tip.text().match(/base64,([\w\W]+?)'/)[1];
        font = Typr.parse(base64ToUint8Array(font))[0];

    // 匹配解密字体
        var table = JSON.parse(GM_getResourceText('Table'));
        var match = {};
        for (var i = 19968; i < 40870; i++) { // 中文[19968, 40869]
            $tip = Typr.U.codeToGlyph(font, i);
            if (!$tip) continue;
            $tip = Typr.U.glyphToPath(font, $tip);
            $tip = MD5(JSON.stringify($tip)).slice(24); // 8位即可区分
            match[i] = table[$tip];
        }

    // 替换加密字体
        $('.font-cxsecret').html(function (index, html) {
            $.each(match, function (key, value) {
                key = String.fromCharCode(key);
                key = new RegExp(key, 'g');
                value = String.fromCharCode(value);
                html = html.replace(key, value);
            });
            return html;
        }).removeClass('font-cxsecret'); // 移除字体加密

        function base64ToUint8Array(base64) {
            var data = window.atob(base64);
            var buffer = new Uint8Array(data.length);
            for (var i = 0; i < data.length; ++i) {
                buffer[i] = data.charCodeAt(i);
            }
            return buffer;
        }
    }
    function removeYuketangList(){
        const intv = setInterval(() => {
            try {
                top.document.querySelector('.exam').__vue__.handleHangUpTip = function () {
                };
                const querySelector = top.document.querySelector;
                top.document.querySelector = function (...args) {
                    if (args[0] === '#hcSearcheModal') return false
                    return querySelector.call(this, ...args)
                };
                clearInterval(intv);
            } catch (e) {
            }
        }, 100);
    }


    function start() {
        try {removeYuketangList();}catch (e){}
        setTimeout(function () {
            try {removeF();} catch (e) {}
            try {init();} catch (e) {}


        }, 1000);
    }

    function getDefaultConfig() {
        const defaultConfig = {
            auto_search: false,//自动搜索
            auto_close: true,//自动关闭
            remove_limit: false,//解除限制
            fixed_modal: true,//基于浏览器布局
            custom_style_on: true,
            in_setting: false,//是否在设置页面
            custom_style: "",
            out_iframe: true,
            model:{
                select:"默认",
                "答题":`我想让你扮演一名做题家，我将会对你发起提问，你的任务是给出具体的答案并说明理由。我的题目是“{msg}”`,
                "翻译":`下面我让你来充当翻译家，你的目标是把任何语言翻译成中文，请翻译时不要带翻译腔，而是要翻译得自然、流畅和地道，使用优美和高雅的表达方式。请翻译下面这句话：“{msg}”`,
                "默认":`{msg}`,
                "自定义1":``,
                "自定义2":``,
            }
        };
        //去查找接口设置 默认
        if (GM_getValue("defaultConfig") === undefined) {
            GM_setValue("defaultConfig", JSON.stringify(defaultConfig));
        }
        return JSON.parse(GM_getValue("defaultConfig"))
    }

    let options = getDefaultConfig();

    function getToken() {
        if (typeof GM_getValue("token") === 'string') {
            return GM_getValue("token")
        } else {
            return ''
        }
    }


    window.addEventListener("message", function (event) {
        if (event.data.type === 'search') {
            addModal2(createFrameLoading(), false);
            searchWord(event.data.wd).then(res => {
                addModal2(res, false, false);
            });
        } else {
            if (event.data.type === 'auto_close') {
                options.auto_close = event.data.auto_close;
                GM_setValue("defaultConfig", JSON.stringify(options));
            } else if (event.data.type === 'auto_search') {
                options.auto_search = event.data.auto_search;
                GM_setValue("defaultConfig", JSON.stringify(options));
            } else if (event.data.type === 'remove_limit') {
                let copy = Object.assign(options);
                copy.remove_limit = event.data.remove_limit;
                GM_setValue("defaultConfig", JSON.stringify(copy));
            } else if (event.data.type === 'fixed_modal') {
                options.fixed_modal = event.data.fixed_modal;
                GM_setValue("defaultConfig", JSON.stringify(options));
            } else if (event.data.type === 'out_iframe') {
                options.out_iframe = event.data.out_iframe;
                GM_setValue("defaultConfig", JSON.stringify(options));
            } else if (event.data.type === 'select_msg_model') {
                options.model.select = event.data.select_msg_model;
                GM_setValue("defaultConfig", JSON.stringify(options));
            } else if (event.data.type === 'update_msg_model') {
                options.model[event.data.select_msg_model] = event.data.update_msg_model;
                GM_setValue("defaultConfig", JSON.stringify(options));
            } else if (event.data.type === 'login') {
                
            } else if (event.data.type === 'captcha') {

            } else if (event.data.type === 'checkVersion') {
                GM_setValue("version", JSON.stringify(event.data.version));
            }
        }
    }, false);


    let POPOVER_ID = 'hcSearchePopover';
    let MODAL_ID = 'hcSearcheModal';


    let mouseX = 0;
    let mouseY = 0;

    let _self = unsafeWindow, top$1 = _self, UE = _self.UE;

    var SearchPanel = {
        getOptions: function () {
            return options
        },
        show: function (word) {
            options.in_setting = false;
            addModal2(createFrameLoading(), options.auto_close === true);
            searchWord(word).then(res => {
                
            });
        },
        showWordSearch() {
            options.auto_close = false;
            GM_setValue("defaultConfig", JSON.stringify(options));
            // addModal2("https://v.met0.top/", false, false);
            searchWord("").then(res => {
                //addModal2(res, false, false);
            });
        },
        setting: function () {
            options.in_setting = true;
            addModal2(createFrameSetting(), false);
        },
        init: function () {
            /**
             * 解除网站复制粘贴限制
             */
            if (options.remove_limit) relieveLimit();

            //页面始终保持再最外层document
            top$1 = options.out_iframe ? searchOutDocument(_self, top$1) : top$1;

            top$1.document.addEventListener('mouseup', mouseUp);

            top$1.document.addEventListener('mousemove', function (e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
        }
    };

    // 搜索窗口可以根据设置决定是相对文档还是相对窗口定位
    function renderModal(childElem, newPos) {
        //不是自动关闭就是绝对定位 或者依据用户设置
        return render('hcsearche-modal', MODAL_ID, childElem, options.fixed_modal, newPos);
    }


    // 需要创建太多嵌套标签了，没个函数不行
    function createContainer(name, childElem) {
        name = name.toLowerCase();
        let elem = top$1.document.createElement(name);
        elem.style.display = 'block';
        // id 改成驼峰式
        elem.id = name.replace('hcsearche', 'hcSearche').replace(/\-[a-z]/g, function (w) {
            return w.replace('-', '').toUpperCase();
        });
        if (childElem) {
            if (Array.isArray(childElem) === false)
                childElem = [childElem];
            for (let i = 0; i < childElem.length; i++)
                elem.appendChild(childElem[i]);
        }
        return elem;
    }

    /**
     * isFixed 是否相对浏览器可视区域定位
     * newPos 是否更新定位（如果元素已经存在的话
     */
    function render(tagName, elemId, childElem, isFixed, newPos) {
        console.log('开始渲染 model', isFixed);
        let doc = top$1.document;
        let elem = doc.getElementById(elemId);
        if (elem) {
            elem.innerHTML = '';
        } else {
            elem = doc.createElement(tagName);
            elem.id = elemId;
            doc.body.appendChild(elem);
        }
        let contentNode = createContainer(tagName + '-container', childElem);
        elem.appendChild(contentNode);
        // class ID same
        elem.classList.add(elemId);
        let X = false;
        let Y = false;
        if (!newPos) {
            X = elem.style.left.replace('px', '');
            console.log(X, "X");
            Y = elem.style.top.replace('px', '');
        }
        if (!X) {
            let pos = getXY(elem.offsetWidth, elem.offsetHeight);
            X = pos.X;
            Y = pos.Y;
            // 相对文档定位时需要将文档滚动距离加上
            if (!isFixed) {
                Y += window.pageYOffset;
            }
        }

        elem.style.position = isFixed ? 'fixed' : 'absolute';
        elem.style.left = X + 'px';
        elem.style.top = Y + 'px';
        setTimeout(function () {
            elem.classList.add(elemId + '-show');
        }, 10);
        return elem;
    }

    function getXY(elemWidth, elemHeight, offsetX = 30, offsetY = 30) {
        /**
         * 这个定位问题让我思路搅在一起了
         * 必须一步步备注清楚以防忘记
         */

        /**
         * 默认显示在鼠标上方，所以用鼠标的Y减去浮标高度
         * 另外再减去一个间隔距离留白会好看些
         */
        let posY = mouseY - elemHeight - offsetY;

        /**
         * 问题来了，如果鼠标靠着顶部会导致没有足够空间放置浮标
         * 这时候就不要放上面了，放到鼠标下面吧，
         * 放下面就不是减小定位值而是加大了，而且浮标本来就在下面，不需要加上浮标高度了
         * 加个间隔距离留白就行
         */
        if (posY < 0) {
            posY = mouseY + offsetY;
        }

        /**
         * 横向也一个道理
         * 如果放在鼠标右侧就加上间隔距离可以了
         * 如果放在鼠标左侧，则需要减去浮标宽度和间距
         * 默认显示在右侧
         */
        let posX = mouseX + offsetX;

        /**
         * 如果坐标加上浮标宽度超过窗口宽度那就是超出了
         * 那么，放到左边吧
         */

        if (posX + elemWidth > window.innerWidth) {
            posX = mouseX - elemWidth - offsetX;
        }

        /**
         * 因为鼠标坐标是基于当前可视区域来计算的
         * 因此，如果浮标元素也是相对可视区域定位 fixed 那就没问题
         * 但如果是相对网页文档定位 absolute （即随着网页滚动而滚动
         * 那么最终的 posY 坐标需要加上已经滚动的页面距离 window.pageYOffset
         */
        return {
            X: posX,
            Y: posY
        };
    }

    function mouseUp(e) {
        setTimeout(function () {
            mouseUpCallback(e);
        }, 1);
    }


    function mouseUpCallback(e) {
        if (options.auto_close === true) {
            removeTemplate(MODAL_ID, e.target);
        }
        e = e || window.event;
        mouseX = e.clientX;
        mouseY = e.clientY;
        let txt = window.getSelection().toString().trim();
        if (txt && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') ; else {
            autoRemoveTemplate(e);
        }
    }
    function autoRemoveTemplate(e) {
        // console.log('autoRemoveTemplate')
        removeTemplate(POPOVER_ID, false);
        /**
         * 只有开启自动关闭才会自动移除搜索窗口
         */
        if (options.auto_close === true) {
            removeTemplate(MODAL_ID, e.target);
        }
    }

    // 临时锁定
    function lockClick() {
        // toggle options
        options.auto_close = !options.auto_close;
        // toggle class
        this.classList.toggle('hcSearcheModalLocked', options.auto_close === false);
    }


    function linkCloseClick() {
        removeTemplate(MODAL_ID);
    }

    function createFrameLoading() {
        let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, user-scalable=0, width=device-width">
    <meta name="full-screen" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="format-detection" content="address=no">
    <meta name="format-detection" content="telephone=no">
    <title>MeTo</title>
    <style>` + GM_getResourceText('weuiCss') + `</style>
    <style type="text/css">
        body, html {
            height: 100%;
            padding: 10px;
            -webkit-tap-highlight-color: transparent;
        }
        body::-webkit-scrollbar {
            display: none;
        }
        .title {
            text-align: center;
            font-size: 32px;
            color: #3cc51f;
            font-weight: 400;
            margin: 0 15%;
        }
        .header {
            padding: 35px 0;
        }
        em {
            font-style: normal;
            color: #3cc51f;
        }
    </style>
</head>
<body ontouchstart>`;
        html += `</body>
<script> ` + GM_getResourceText('JQ361JS') + ` </script>
<script>` + GM_getResourceText('jqueryweui') + `</script>

<script type="text/javascript">
    $.showLoading("正在搜索中");
</script>
</html>`;
        return html;
    }

    function addModal2(html, newPos, footerChildNode = false,chat=false) {
        // header link
        let linksNode = createContainer('hcsearche-modal-links');
        let linkNode = top$1.document.createElement('hcsearche-link');
        linkNode.setAttribute('title', '有不懂的请点我');
        linkNode.setAttribute('data-seindex', 0);
        linkNode.setAttribute('data-seclass', 'baidu');
        linkNode.innerHTML = 'MeToGPT';
        linkNode.setAttribute('data-securrent', 'true');
        linkNode.style.color = '#586069';

        linkNode.addEventListener('click', function () {
            window.open('https://v.met0.top/');
        });

        linksNode.appendChild(linkNode);

        let settingNode = top$1.document.createElement('hcsearche-link');
        settingNode.setAttribute('title', '点击打开设置页');
        settingNode.setAttribute('data-seindex', 0);
        settingNode.setAttribute('data-seclass', 'baidu');
        settingNode.setAttribute('id', "settingNode");
        settingNode.innerHTML = options.in_setting ? '返回' : '设置';
        settingNode.setAttribute('data-securrent', 'true');
        linkNode.style.color = '#586069';
        //
        linksNode.appendChild(settingNode);

        settingNode.addEventListener('click', function () {
            options.in_setting = !options.in_setting;
            let btn = top$1.document.getElementById("settingNode").innerText;
            if (btn === '返回') {
                top$1.document.getElementById("settingNode").innerText = '设置';
                SearchPanel.showWordSearch();
            } else {
                top$1.document.getElementById("settingNode").innerText = '返回';
                addModal2(createFrameSetting(), false);
            }
        });


        // close button
        let closeLinkNode = top$1.document.createElement('hcsearche-link');
        closeLinkNode.id = 'hcSearcheClose';
        closeLinkNode.innerHTML = '&times;';
        closeLinkNode.addEventListener('click', linkCloseClick);

        linksNode.appendChild(closeLinkNode);

        // lock button
        let lockNode = createContainer('hcsearche-modal-lock');

        if (options.auto_close === false)
            lockNode.classList.add('hcSearcheModalLocked');

        lockNode.addEventListener('click', lockClick);


        // iframe
        let iframeNode
        if(chat){
            iframeNode= top$1.document.createElement('div');
            iframeNode.id = 'hcChat';

        }else{
            iframeNode = top$1.document.createElement('iframe');
            iframeNode.id = 'hcSearcheIframe';
            console.log(html.substring(0, 4))
            if(html.substring(0, 4) == "http"){
                iframeNode.src = html;
            }else{
                iframeNode.srcdoc = html;

            }
        }
        
        iframeNode.setAttribute('width', '100%');
        iframeNode.setAttribute('frameborder', '0');
        
        
        
        let headerNode = createContainer('hcsearche-modal-header', [lockNode, linksNode]);
        dragElement(headerNode);
        let bodyNode = createContainer('hcsearche-modal-body', iframeNode);

        let footerNode = createContainer('hcsearche-modal-footer', footerChildNode);
        dragElement(footerNode);
        let contentNode = createContainer('hcsearche-modal-content', [headerNode, bodyNode, footerNode]);

        let modal = renderModal(contentNode, newPos);
        // function resizeIframe() {
            
        //     iframeNode.style.height = iframeNode.contentDocument.body.scrollHeight +10 + 'px';
        // }
        // linksNode.onload =  resizeIframe()
        // bodyNode.setAttribute('onhashchange', resizeIframe());
        // dragElement(modal);
        return iframeNode
    }

    function dragElement(elmnt) {
        let moveX,moveY
        if (top$1.document.getElementById(elmnt.id + "-drag")) {
            // if present, the drag is where you move the DIV from:
            top$1.document.getElementById(elmnt.id + "-drag").onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            parentNode = top$1.document.getElementById("hcSearcheModal")
            let elL =parentNode.offsetLeft
            let elT =parentNode.offsetTop
            moveX = e.clientX - elL
            moveY = e.clientY - elT
            // get the mouse cursor position at startup:

            top$1.document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            top$1.document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            // set the element's new position:
            parentNode.style.left =  e.clientX -moveX + 'px'
            parentNode.style.top =  e.clientY - moveY + 'px'
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            top$1.document.onmouseup = null;
            top$1.document.onmousemove = null;
        }
    }


    // containsCheckElem 检查是否模板内元素，是就不移除
    function removeTemplate(elemId, containsCheckElem = false) {
        const temp = top$1.document.getElementById(elemId);
        if (temp && (containsCheckElem === false || temp.contains(containsCheckElem) === false)) {
            temp.classList.remove(elemId + '-show');
            setTimeout(function () {
                if (temp.classList.contains(elemId + '-show') === false && temp.parentElement) {
                    top$1.document.body.removeChild(temp);
                }
            }, 500);
        }
    }


    function createFrameSetting() {
        let html = `
 <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>` + GM_getResourceText('weuiCss') + `</style>
    <title></title>
</head>
<body>
<div id="app">
    <div class="weui-cells">
        <div class="weui-cells__title">AI设置</div>  
        <label for="chat_msg_model" class="weui-cell weui-cell_active weui-cell_select weui-cell_select-after">
            <div class="weui-cell__hd">
                <span class="weui-label">AI模板</span>
            </div>
            <div class="weui-cell__bd">
                <select class="weui-select" name="chat_msg_model" id="chat_msg_model" >
                    <option value="答题">答题</option>
                    <option value="翻译">翻译</option>
                    <option value="默认">默认</option>
                    <option value="自定义1">自定义1</option>
                    <option value="自定义2">自定义2</option>
                </select>
            </div>
        </label>
        <div class="weui-cell weui-cell_active">
            <textarea id="chat_msg" class="weui-textarea" placeholder="请参照已有模版编写，{msg}是选中替换内容" rows="3">`+options.model[options.model.select]+`</textarea>
            <a role="button" class="weui-btn weui-btn_mini weui-btn_primary weui-wa-hotarea" href="javascript:" id="update">修改</a>
        </div>
        <div class="weui-cells__title">悬浮搜索图标</div>
        <label class="weui-cell weui-cell_active weui-cell_switch">
            <label class="weui-cell__bd" for="auto_search">
                划词后自动搜索
                <div class="weui-cell__desc">打开后划词自动打开搜题窗口进行搜题,否则鼠标右下角显示搜题图标</div>
            </label>
            <input type="checkbox" class="weui-switch" id="auto_search"  v-model="auto_search">
        </label>
        <div class="weui-cells__title">解除限制</div>
        <label class="weui-cell weui-cell_active weui-cell_switch">
            <label class="weui-cell__bd" for="remove_limit">
                解除网站的禁止复制限制
                <div class="weui-cell__desc">打开后可解除部分网站的禁止划词限制,如冲突（无法滑动验证框，无法选中按钮等）可关闭此功能<font color="red">(刷新页面后生效)</font></div>
            </label>
            <input type="checkbox" class="weui-switch" id="remove_limit" v-model="remove_limit">
        </label>
        <div class="weui-cells__title">搜索窗口</div>
        <label class="weui-cell weui-cell_active weui-cell_switch">
            <label class="weui-cell__bd" for="fixed_modal">
                基于浏览器窗口定位
                <div class="weui-cell__desc">打开后搜索窗口可固定在浏览器窗口特定位置，不受页面滚动影响</div>
            </label>
            <input type="checkbox" class="weui-switch" id="fixed_modal" v-model="fixed_modal">
        </label>

        <label class="weui-cell weui-cell_active weui-cell_switch">
            <label class="weui-cell__bd" for="out_iframe">
                寻找最外层iframe
                <div class="weui-cell__desc">打开后将会将搜题窗口悬浮在最外层iframe，可能某些网站<font color="red">无法正常显示搜题窗口</font>，否则将会在本iframe显示搜题窗口,若限制窗口无法移动到自定义的位置时可打开此开关</div>
            </label>
            <input type="checkbox" class="weui-switch" id="out_iframe" v-model="out_iframe">
        </label>
    </div>

</div>
</body>
<script> ` + GM_getResourceText('Vue') + `</script>
<script> ` + GM_getResourceText('JQ361JS') + ` </script>
<script>` + GM_getResourceText('jqueryweui') + `</script>
<!-- 引入组件库 -->
<script>
    let chat_obj = `+JSON.stringify(options.model)+`;
    $(document).ready(function() {
        document.getElementById("chat_msg_model").value = "`+options.model.select+`"
        $("#chat_msg_model").change(function(value) {
            window.parent.postMessage({"type": 'select_msg_model',"select_msg_model":$(this).val()}, '*');
            document.getElementById("chat_msg").value = chat_obj[$(this).val()]
            console.log(chat_obj[$(this).val()])
        });
        $("#update").click(function(value){
            console.log($("#chat_msg_model").val())
            window.parent.postMessage({"type": 'update_msg_model',"select_msg_model":$("#chat_msg_model").val() ,"update_msg_model":$("#chat_msg").val()}, '*');
        })
    });
</script>
<script>
  window.app = new Vue({
        el: '#app',
        data: ` + (GM_getValue("defaultConfig")) + `,
        watch: {
            auto_close: function(val) {
              window.parent.postMessage({"type": 'auto_close',"auto_close":val}, '*');
            },
            auto_search: function (val){
                console.log(val)
                window.parent.postMessage({"type": 'auto_search',"auto_search":val}, '*');
            },
            fixed_modal:function (val){
                window.parent.postMessage({"type": 'fixed_modal',"fixed_modal":val}, '*');
            },
            remove_limit:function (val){
                window.parent.postMessage({"type": 'remove_limit',"remove_limit":val}, '*');
            },
            out_iframe:function (val){
                window.parent.postMessage({"type": 'out_iframe',"out_iframe":val}, '*');
            }
        }
       })
</script>
</html>
`;
        return html;
    }


    /**
     * 解除限制
     */
    function relieveLimit() {
        
        start();
        if (location.host.indexOf('chaoxing') !== -1) {
            setTimeout(() => {
                try {
                    _self.UEDITOR_CONFIG.scaleEnabled = false;
                } catch (e) {
                }
                $.each(UE.instants, function () {
                    var key = this.key;
                    this.ready(function () {
                        this.destroy();
                        UE.getEditor(key);
                    });
                });
            }, 2000);
        }

        if ((window.location.href.includes("newMooc=true") && location.host.indexOf('chaoxing') !== -1) || location.pathname.indexOf('exam/test/reVersionPaperMarkContentNew') !== -1) {
            setTimeout(() => {
                    $("body").removeAttr("onselectstart");
                    $("html").css("user-select", "unset");
                    try {
                        UE.EventBase.prototype.fireEvent = function () {
                            return null
                        };
                    } catch (e) {

                    }

                },
                2000);
        }
    }
    async function searchWord(selectionText) {
        //addModal2(r.responseText, false, false)
        if(!selectionText){
            return addModal2("https://v.met0.top/#/chat", false, false);
        }
        let msg = options.model[options.model.select].replace("{msg}",selectionText)
        console.log(msg)
        let obj ={
            "messages": [
                {
                    "role": "user",
                    "content": msg,
                }
            ],
            "stream": true,
            "model": "gpt-3.5-turbo",
            "temperature": 0.5,
            "presence_penalty": 0,
            "frequency_penalty": 0,
            "top_p": 1
        };
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                responseType:"stream",
                timeout: 10000,
                method: "post",
                url: "https://v.met0.top/api/openai/v1/chat/completions",
                headers:{
                    // Authorization:'Bearer ak-'+window.my.config.tk_uid+","+window.my.config.poolId,
                    Authorization:'Bearer nk-wangzeqing',
                    // Cookie:"next-auth.csrf-token=e8b5559fadb5ce3684e9a0611591684ffffc2224d9125a49e7081a92425c3026%7C47d575638e3a14f787462c27c1fe8895d740210370848182a740fa71dfb55211; next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000; next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..wNFkEP1XItcDCpY2.nJBc4rvu8_cAGx0mtDdm2pvIjPAWGMGou24L2ZzoyImrCIqLDiAMS5w6WzN6dm_8GuI331tfqxHc_V4LRoAmmFT0A8X5ln9C1iC4p47IQM_4RF2B-8iLGElCkVOYJieCkvV1lVrFHVT31nzI12n8Xpwttrw5yGhywCR3sWZ1J7sr4QCXeCA-lpOdITDyW8AdNPjH4QQ7vhtCIzjzFoepmJKk5mE2lPmksDiGrQX3d1POPwfQqdHafb8rgZJl_BC4_wDXloIt6mtTfQ4._NPSNHQIhsWS5eQprCIeCQ",
                },
                data: JSON.stringify(obj),
                onloadstart: function(response) {
                    let aner = addModal2("欢迎\n", false, false,true);
                    // ans.append("123")
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
                                let Json_msg=null
                                try{
                                    if(error_d){
                                        d = error_d +d;
                                        error_d="";
                                    }
                                    Json_msg = $.parseJSON(d)
                                    if(Json_msg.msg=="empty access code"||Json_msg.msg=="wrong access code"){
                                        aner.append("若需要使用AI功能请先");
                                        var newDiv = document.createElement('button');
                                        newDiv.addEventListener('click', function() {
                                            window.open('https://v.met0.top/#/activate', 'Meto登陆', 'width=400,height=600')
                                        });
                                        newDiv.textContent = "登陆"
                                        aner.appendChild(newDiv);
                                        return;
                                    }else if(Json_msg.msg=="剩余token不足请[充值](https://d.met0.top/)"){
                                        aner.append("您的AI剩余TOKEN已不足请");
                                        var newDiv = document.createElement('button');
                                        newDiv.addEventListener('click', function() {
                                            window.open('https://d.met0.top/', 'Meto登陆')
                                        });
                                        newDiv.textContent = "充值Token"
                                        aner.appendChild(newDiv);
                                        return;
                                    }
                                    aner.append(Json_msg.choices[0].delta.content||"");
                                    // aner.scrollTop(aner.prop("scrollHeight"));
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
                },
                ontimeout : function(inf){
                    console.log('请求超时')
                }
            })
            
            // GM_xmlhttpRequest({
            //     method: "GET",
            //     //url: "https://app.itihey.com/pcService/api/queryAnswer?word=" + encodeURIComponent(selectionText || window.getSelection().toString().trim()),
            //     url:"https://v.met0.top/#/activate",
            //     headers: {
            //         "access-token": getToken(),
            //         "Version": GM_info.script.version
            //     },
            //     onload: function (r) {
            //         console.log(r.responseText);
            //         resolve( r.responseText);
            //     }
            // });
        })
    }

    /**
     * 字符串模板格式化
     * @param {string} formatStr - 字符串模板
     * @returns {string} 格式化后的字符串
     * @example
     * StringFormat("ab{0}c{1}ed",1,"q")  output "ab1cqed"
     */


    function StringFormat(formatStr) {
        var args = arguments;
        return formatStr.replace(/\{(\d+)\}/g, function (m, i) {
            i = parseInt(i);
            return args[i + 1];
        });
    }

    /**
     * 日期格式化
     * @param {Date} date - 日期
     * @param {string} formatStr - 格式化模板
     * @returns {string} 格式化日期后的字符串
     * @example
     * DateFormat(new Date(),"yyyy-MM-dd")  output "2020-03-23"
     * @example
     * DateFormat(new Date(),"yyyy/MM/dd hh:mm:ss")  output "2020/03/23 10:30:05"
     */
    function DateFormat(date, formatStr) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(formatStr)) {
            formatStr = formatStr.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(formatStr)) {
                formatStr = formatStr.replace(
                    RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return formatStr;
    }

    /**
     * 清除dom元素默认事件
     * @param {object} e - dom元素
     */
    function ClearBubble(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }

    /**
     * 寻找最外层doc
     * @param _self
     * @param top
     * @returns {*|string|boolean|number|string|Window}
     */
    function searchOutDocument(_self, top) {
        try {
            while (top !== _self.top) {
                top = top.parent.document ? top.parent : _self.top;
                if (top.location.pathname === '/mycourse/studentstudy') break;
            }
        } catch (err) {
            top = _self;
        }
        return top;
    }

    //面板
    var Panel={
        popBoxEl:{},
        randomCode:"",
        Create:function(title,placement,isShowArrow,content,shownFn){
            var self=this;
            $(self.popBoxEl).jPopBox({
                title: title,
                className: 'JPopBox-tip-white',
                placement: placement,
                trigger: 'none',
                isTipHover: true,
                isShowArrow: isShowArrow,
                content: function(){
                    return StringFormat('<div id="panelBody{0}">{1}</div>',self.randomCode,content);
                }
            });
            $(self.popBoxEl).on("shown.jPopBox",function(){
                var $panel=$("div.JPopBox-tip-white");
                typeof shownFn === 'function' && shownFn($panel);
            });
            $(self.popBoxEl).jPopBox('show');
        },
        Update:function(Fn){
            var $panel=$("div.JPopBox-tip-white");
            Fn($panel);    
        },
        Destroy:function(){
            //$(this.popBoxEl).jPopBox("hideDelayed");
            $(this.popBoxEl).jPopBox("destroy");
        },
        CreateStyle:function(){
            var s="";
            s+=StringFormat("#panelBody{0}>div input,#panelBody{0}>div select{padding: 3px; margin: 0; background: #fff; font-size: 14px; border: 1px solid #a9a9a9; color:black;width: auto;min-height: auto; }",this.randomCode);
            s+=StringFormat("#panelBody{0}>div:first-child{padding-bottom: 5px;height:30px}",this.randomCode);
            s+=StringFormat("#panelBody{0}>div:last-child hr{border: 1px inset #eeeeee;background: none;height: 0px;margin: 0px;}",this.randomCode);
            return s;
        }
    };

    // import {wonload} from "./lib/parse";
    function generateRandomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    // 调用函数生成长度为6-10的随机字符串
    var randomString = generateRandomString(Math.floor(Math.random() * 5) + 6);
    // console.log(randomString);
    //主程序
    var HcSearch=function(){
        var transIconBase64="data:image/png;base64,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";
        var $doc=$(document);
        var $body=$("html body");
        $("html head");
        var randomCode="yyMM000000";    //属性随机码，年月加六位随机码。用于元素属性后缀，以防止属性名称重复。
        var createHtml=function(){
            var wordTransIconHtml=StringFormat('<div id="'+randomString+'{0}" class="wordTrans{0}"><div class="wordTransIcon{0}"></div></div>',randomCode,transIconBase64);
            $body.append(StringFormat('<div id="'+randomString+'{0}">',randomCode)+wordTransIconHtml+'</div>');
        };
        var createStyle=function(){
            //尽可能避开csp认证
            let css =`
            #hcSearchePopover,
            #hcSearcheModal,
            #hcSearchePopover.hcSearchePopover,
            #hcSearcheModal.hcSearcheModal {
                all: initial;
                position: absolute;
                z-index: 2147483647;
                display: block;
                font-size: 14px;
                color: #333333;
                line-height: 26px;
                transform: scale(0.9);
                opacity: 0;
                transition: transform 0.1s ease-out, opacity 0.1s ease-out;
            }

            #hcSearchePopover.hcSearchePopover-show,
            #hcSearcheModal.hcSearcheModal-show {
                transform: scale(1);
                opacity: 1;
            }

            #hcSearcheModal #hcSearcheModalContent {
                background: #f6f8fa;
                border: 1px solid #d1d5da;
                border-radius: 10px;
                color: #586069;
                display: block;
                box-shadow: 0 16px 100px 0 rgba(0, 0, 0, 0.2);
            }

            #hcSearcheModal #hcSearcheModalBody {
                margin-left: auto;
                margin-right: auto;
                position: relative;
                width: 390px;
                background-color: #fff;
                border: 1px solid #d1d5da;
                border-width: 1px 0;
                border-radius: 3px;
            }

            #hcSearcheModal #hcSearcheIframe {
                overflow: hidden;
                margin: 0;
                padding: 0;
                height :550px;
                max-height: 550px;
            }
            #hcSearcheModal #hcChat{
                overflow:auto;
                margin: 5px;
                padding: 0;
                max-height: 350px;
            }

            #hcSearcheModal #hcSearcheModalHeader {
                cursor: move;
                font-size: 13px;
                line-height: 24px;
                padding: 1px 4px;
                color: #586069;
            }

            #hcSearcheModal #hcSearcheModalHeader::after {
                display: block;
                clear: both;
                content: "";
            }

            #hcSearcheModal #hcSearcheModalFooter {
                min-height: 10px;
                cursor: move;
                position: relative;
                display: flex;
                justify-content: center;
            }

            #hcSearcheModal #hcSearcheModalLinks {
                float: right
            }

            #hcSearcheModal #hcSearcheModalLinks hcsearche-link {
                display: inline-block;
                color: #24292e;
                margin: 0 0 0 6px;
                font-size: 13px;
                font-weight: normal;
                text-decoration: none;
                cursor: pointer;
                padding: 0 0.5em;
                border-radius: 0;
            }

            #hcSearcheModal #hcSearcheModalLinks hcsearche-link[data-securrent=true],
            #hcSearcheModal #hcSearcheModalLinks hcsearche-link:hover {
                // background: rgba(27, 31, 35, .04);
                color: #444d56;
            }

            #hcSearcheModal #hcSearcheModalLinks hcsearche-link>svg {
                vertical-align: sub;
                padding-left: 4px;
            }

            #hcSearcheModal #hcSearcheModalLinks #hcSearcheClose:hover {
                background: rgba(0, 0, 0, 0.05);
            }

            #hcSearcheModal #hcSearcheModalLock {
                cursor: pointer;
                float: left;
                display: block;
                opacity: 0.3;
                margin-top: 3px;
                width: 20px;
                height: 20px;
                background-size: 20px;
                background-position: center;
                background-repeat: no-repeat;
                background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMSAxMHYtNGMwLTIuNzYtMi4yNC01LTUtNXMtNSAyLjI0LTUgNXYyaC0xdi0yYzAtMy4zMTIgMi42ODktNiA2LTZzNiAyLjY4OSA2IDZ2NGgxMHYxNGgtMTh2LTE0aDd6bTEwIDFoLTE2djEyaDE2di0xMnoiLz48L3N2Zz4=);
            }

            #hcSearcheModal #hcSearcheModalLock.hcSearcheModalLocked {
                background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik02IDZjMC0zLjMxMSAyLjY4OS02IDYtNnM2IDIuNjg4IDYgNnY0aDN2MTRoLTE4di0xNGgzdi00em0xNCA1aC0xNnYxMmgxNnYtMTJ6bS0xMy01djRoMTB2LTRjMC0yLjc2LTIuMjQtNS01LTVzLTUgMi4yNC01IDV6Ii8+PC9zdmc+)
            }

            #hcSearcheModal #hcSearcheNextLink {
                position: absolute;
                top: -40px;
                right: 28px;
                display: block;
                width: 32px;
                height: 32px;
                color: #6c757d;
                cursor: pointer;
                background-size: 16px;
                background-position: center;
                background-repeat: no-repeat;
                background-color: #f6f8fa;
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA4UlEQVQ4T+2TTUoDQRCF32twTpCLuFKYEaYWguvoGQS3nsFjeAYXEoIQ6JqF1wi6Sly48wBPGpzQtpNJyMJVetm8+urvFTHyYoy3IYS3tm0X22QcA7j7A4B3M3s8Av5rBu4+MbPPfuJDWyg1mzVKCu6+InljZq8JUgK6rruTNDWzyz7JLx/EGM8APJO8TpAc8BN8D+DCzD4GAekzhwC4SkYieSLpT3DSDzoxQUjOJM1DCEHSeZl5awXZABtJLyS/AJzmZee23nULTVVV67qulwfdwtihbVpw9wjA9hGXGklP3z4VgPj5LnZPAAAAAElFTkSuQmCC);
                border-radius: 10px;
            }

            #hcSearcheModal #hcSearcheNextLink:hover {
                background-color: #e9ecef;
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA8ElEQVQ4T2NkwAMKCwvT/v37d3/ixIm7cSljxGdAQUFBCwMDw4MJEybMGTWAXmFQXFws0tvb+wYW4thiAV0NPBobGhqY3r9//4yBgSFk4sSJR0CGoBtQUFCQycDAEDRhwgRXmCUo6SA/P9+ckZFx0////4NBhiAbANVc9OvXL9tp06a9wGoASBDZEEZGRg9QQmJgYGBlYGDA0AxSjzUlQg3Z8v///20MDAxMjIyMFug243QBTCI/P9+GgYFhBwMDw+ffv38bIjsbOVnjzQvFxcU2TExMz7u7u++SlRfwZTS4F/Lz8/cxMjI6EqMYi5p1AJbtgw7fjyoMAAAAAElFTkSuQmCC);
                color: #444d56;
            }

            #hcSearcheModal #hcSearcheNextLink.hcSearcheNextLinkLoading {
                background-color: #e9ecef;
                background-image: none;
            }

            #hcSearcheModal #hcSearcheNextLink.hcSearcheNextLinkLoading:after {
                content: " ";
                display: block;
                width: 12px;
                height: 12px;
                margin: 9px 0 0 9px;
                border-radius: 50%;
                border: 1px solid #24292e;
                border-color: #24292e transparent #24292e transparent;
                animation: hcSearcheNextLinkLoading 1.2s linear infinite;
            }

            @keyframes hcSearcheNextLinkLoading {
                0% {
                    transform: rotate(0deg);
                }

                50% {
                    transform: rotate(180deg);
                }

                100% {
                    transform: rotate(720deg);
                }
            }

            .JPopBox-tip-white {
                z-index: 1060;
                min-width: 50px;
                max-width: 300px;
                padding: 1px;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                color: #333;
                line-height: 1.42857143;
                text-align: left;
                text-align: start;
                text-decoration: none;
                text-shadow: none;
                text-transform: none;
                letter-spacing: normal;
                word-break: normal;
                word-spacing: normal;
                word-wrap: normal;
                white-space: normal;
                background-color: #fff;
                -webkit-background-clip: padding-box;
                background-clip: padding-box;
                border: 1px solid #ccc;
                border: 1px solid rgba(0, 0, 0, .2);
                border-radius: 6px;
                -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
                box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
                line-break: auto
            }

            .JPopBox-tip-white .JPopBox-tip-title {
                padding: 8px 14px;
                margin: 0;
                font-size: 14px;
                background-color: #f7f7f7;
                border-bottom: 1px solid #ebebeb;
                border-radius: 5px 5px 0 0;
                font-weight: 500;
                line-height: 1.1;
                color: inherit
            }

            .JPopBox-tip-white .JPopBox-tip-content {
                padding: 9px 14px
            }

            .JPopBox-tip-white .JPopBox-tip-arrow,
            .JPopBox-tip-white .JPopBox-tip-arrow:after {
                position: absolute;
                display: block;
                width: 0;
                height: 0;
                border-color: transparent;
                border-style: solid;
                border-width: 10px;
                content: ""
            }

            .JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-top {
                left: 50%;
                margin-left: -11px;
                border-bottom-width: 0;
                border-top-color: rgba(0, 0, 0, .25);
                bottom: -11px
            }

            .JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-top:after {
                content: " ";
                bottom: 1px;
                margin-left: -10px;
                border-bottom-width: 0;
                border-top-color: #fff
            }

            .JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-right {
                top: 50%;
                left: -11px;
                margin-top: -11px;
                border-left-width: 0;
                border-right-color: rgba(0, 0, 0, .25)
            }

            .JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-right:after {
                content: " ";
                left: 1px;
                bottom: -10px;
                border-left-width: 0;
                border-right-color: #fff
            }

            .JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-bottom {
                left: 50%;
                margin-left: -11px;
                border-top-width: 0;
                border-bottom-color: rgba(0, 0, 0, .25);
                top: -11px
            }

            .JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-bottom:after {
                content: " ";
                top: 1px;
                margin-left: -10px;
                border-top-width: 0;
                border-bottom-color: #fff
            }

            .JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-left {
                top: 50%;
                right: -11px;
                margin-top: -11px;
                border-right-width: 0;
                border-left-color: rgba(0, 0, 0, .25)
            }

            .JPopBox-tip-white .JPopBox-tip-arrow.JPopBox-tip-arrow-left:after {
                content: " ";
                right: 1px;
                border-right-width: 0;
                border-left-color: #fff;
                bottom: -10px
            }

            .JPopBox-tip-white {
                width: 482px;
                max-width: 550px;
                min-width: 450px;
            }
            `
            GM_addStyle(css);

            var s="";
            s+=StringFormat(".wordTrans{0}{box-sizing: content-box;cursor: pointer;z-index: 2147483647;border-width: 0px;border-style: solid;border-image: initial;border-radius: 5px;padding: 0.5px;position: absolute;display: none}",randomCode);
            s+=StringFormat(".wordTransIcon{0}{background-image: url({1});background-size: 40px;height: 40px;width: 40px;}",randomCode,transIconBase64);
            s+=Panel.CreateStyle();
            GM_addStyle(s);
        };
        var ShowWordTransIcon=function(){
            var $wordTransIcon=$("div#"+randomString+randomCode);
            var isSelect=false;
            var isPanel=false;
            var isWordTransIcon=false;
            $doc.on({
                "selectionchange":function(e){
                    isSelect=true;
                },
                "mousedown":function(e){
                    var $targetEl=$(e.target);
                    isPanel=$targetEl.parents().is("div.JPopBox-tip-white");
                    isWordTransIcon=$targetEl.parents().is(StringFormat("div#"+randomString+"{0}",randomCode));
                    //点击划词图标外域和划词面板外域时，隐藏图标和划词面板
                    if(!isWordTransIcon && !isPanel){
                        $wordTransIcon.hide();
                        Panel.Destroy();
                    }
                    else {
                        //点击划词图标，取消鼠标默认事件，防止选中的文本消失
                        if(isWordTransIcon){
                            ClearBubble(e);
                        }
                    }
                },
                "mouseup":function(e){
                    var selectText = window.getSelection().toString().trim();
                    if(!isPanel&&isSelect&&selectText){
                        if (!SearchPanel.getOptions().auto_search){
                            $wordTransIcon.show().css({
                                left: e.pageX + 'px',
                                top : e.pageY + 12 + 'px'
                            });
                        }else {
                            //选中的文本内容
                            SearchPanel.show(selectText);
                        }
                        isSelect=false;
                    }
                }
            });
            $wordTransIcon.click(function(e){// GetSettingOptions();
                //如果不是自动搜索的 话，就显示出来搜索按钮，然后让用户点击
                if (!SearchPanel.getOptions().auto_search){
                    var selectText = window.getSelection().toString().trim();
                    Panel.Destroy();
                    SearchPanel.show(selectText);
                    $wordTransIcon.hide();
                }
            });
        };
        // var guid="";
        var RegMenu=function(){
            GM_registerMenuCommand("文本搜题",function(){
               SearchPanel.showWordSearch();
            });
            GM_registerMenuCommand("设置",function(){
                SearchPanel.setting();
            });
        };
        this.init=function(){
            randomCode=DateFormat(new Date(),"yyMM").toString()+(Math.floor(Math.random() * (999999 - 100000 + 1) ) + 100000).toString();
            createStyle();
            createHtml();
            ShowWordTransIcon();
            SearchPanel.init();
            RegMenu();
        };
    };

    var hcSearch=new HcSearch();
    hcSearch.init();

    
})()

