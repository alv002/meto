/*
    *  绎通云请求
    *  作者：红红火火
    */
    class ytccr_api{
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
                $.ajax({
                    type: 'get',
                    xhrFields: {
                        withCredentials: true  //允许跨域发送cookies
                    },
                    headers: {
                        "Authorization":"Bearer "+this.getCookie("token"),
                    },
                    url: "https://dadexs.ytccr.com/org_student_api/yt/student/myStudentInfo/getInfo",
                    success: function(res) {
                        resolve(res);
                    }
                });
            })
            
        }
        async get_user_obj(){
            // var regex = /window.webUser([\s\S]*?)};/gi;
            let user_inf = await this.get_user_inf()
            // var matches = doc.match(regex);
            // GM_setValue("userimg",window.webUser.largeFaceUrl||"");
            // let img_table = $('html').find("#x_set")
            // img_table.css("background","url(" +  window.webUser.largeFaceUrl||"" + ")")
            let name = user_inf.data.realName
            let id = user_inf.data.idCardNo
            this.config.user_id = "yty_"+id
            this.config.full_name = name;
            let obj={
                "unionid": this.config.user_id,
                "username": this.config.full_name,
                "poolId":"ec942b0b-38c6-3256-b0e1-2a33428d4bbc",
                "grade": "绎通云",
            };
            return obj
        }
    }
