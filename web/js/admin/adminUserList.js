//currPage表示页面编号
//pageSize表示每页显示数量
function loadUserList2() {
    panel();
    loadUserList(0,1);
}
//加载用户信息   currPage:从这个开始查数据    pageNo:页的标号
function loadUserList(currPage,pageNo) {
    var li = '';
    var pageSize = 3;
    //加载面板头部信息
    loadPanelHeadInfo();
    //加载表格头部
    loadAdminListHeadInfo();
    //加载列表
    $.ajax({
        url:path+"/admin/loadadminlist.do",
        type:"post",
        data:{"currPage":currPage,"pageSize":pageSize},
        dataType:"json",
        success:function (result) {
            if (result.status == 0){
                //表格所有行数
                var totalCount = result.msg;
                //分页  totalCount:总记录数   pageSize:每行显示数量     pageNo:当前行号
                pagination(totalCount,pageSize,pageNo);
                var list = result.data;
                //清除原列表信息
                $("#admin_list").empty();
                for (var i = 0; i < list.length; i++) {
                    var user_id = list[i].user_id;
                    var user_name = list[i].user_name;
                    var contacts = list[i].contacts;
                    var tel = list[i].tel;
                    var address = list[i].address;
                    var role = list[i].role;
                    createAdminList(user_id,user_name,contacts,tel,address,role);
                }
            }
        },
        error:function () {
            alert("用户信息加载失败");
        }
    });
    //搜索用户信息
    $("#btn_search_submit").bind("click",function () {
        li = '';
        $("#page").html('');
        $.ajax({
            url: path + "/admin/searchadmininfo.do",
            type: "post",
            data: {"contact":$("#input_search").val()},
            dataType: "json",
            success: function (result) {
                if(result.status == 0){
                    //表格所有行数
                    var count = result.msg;
                    var list = result.data;
                    //清除原列表信息
                    $("#admin_list").empty();
                    for (var i = 0; i < list.length; i++) {
                        var user_id = list[i].user_id;
                        var user_name = list[i].user_name;
                        var contacts = list[i].contacts;
                        var tel = list[i].tel;
                        var address = list[i].address;
                        var role = list[i].role;
                        createAdminList(user_id,user_name,contacts,tel,address,role);
                    }
                    //加载表格内容
                    $("#admin_list").html(li);
                }
            },
            error: function () {
                alert("列表加载失败!");
            }
        });
    });
    //加载面板头部信息
    function loadPanelHeadInfo() {
        //清除面板头部信息
        $("#panel_heading").empty();
        //面板头部信息
        var panel_heading = '';
        panel_heading +='<div class="row">' +
            '<h1 class="col-md-5">用户管理</h1>' +
            '<form class="bs-example bs-example-form col-md-5" role="form" style="margin: 20px 0 10px 0;" action="/admin/selectStudent" id="form1" method="post">' +
            '<div class="input-group">' +
            '<input type="text" class="form-control" id="input_search" placeholder="请输入" name="findByName">' +
            '<span class="input-group-addon btn" id="btn_search_submit" >搜索</span>' +
            '</div>' +
            '</form>' +
            '<button class="btn btn-default col-md-2" style="margin-top: 20px" onClick="addAdminInfo()">' +
            '添加用户' +
            '<sapn class="glyphicon glyphicon-plus"/>' +
            '</button>' +
            '</div>';
        var $panel_heading = $(panel_heading);
        $("#panel_heading").html($panel_heading);
    }
    //动态加载表格的内容
    function createAdminList(user_id,user_name,contacts,tel,address,role){
        /*表格的内容*/
        li+='<tr>';
        li+='<td>'+user_id+'</td>';
        li+='<td>'+user_name+'</td>';
        li+='<td>'+contacts+'</td>';
        li+='<td>'+tel+'</td>';
        li+='<td>'+address+'</td>';
        li+='<td>'+role+'</td>';
        li+='<td>';
        li+='<button class="btn btn-default btn-xs btn-info" onclick="modifyAdminInfo('+user_id+',\''+user_name+'\',\''+contacts+'\','+tel+',\''+address+'\','+role+')">修改</button>';
        li+='&nbsp;&nbsp;';
        li+='<button class="btn btn-default btn-xs btn-danger btn-primary" onclick="deleteAdminInfo('+user_id+')" id="delete_admin_user_info">删除</button>';
        li+='</td>';
        li+='</tr>';
        var $li = $(li);
        $("#admin_list").html($li);
    }
    //底部分页
    function pagination(totalCount,pageSize,pageNo) {
        var page = "";
        page += "<nav style=\"text-align: center\">" +
            "<ul class=\"pagination\" id='paginationNum'>";
        //获取总页数
        var totalPage = 0;
        if (totalCount%pageSize == 0){
            totalPage = parseInt(totalCount/pageSize);
        } else {
            totalPage = parseInt(totalCount/pageSize)+1;
        }
        //上一页
        if (pageNo-1 > 0){
            page += "<li><a onclick='loadUserList("+((pageNo-2)*pageSize)+","+(pageNo-1)+")'>&laquo;上一页</a></li>";
        }
        //全部加载
        for (var i = 1; i <= totalPage; i++) {
            //page += "<li><a href='javascript:loadUserList("+((i-1)*pageSize)+","+(i)+")'>"+i+"</a></li>";
            if(i==pageNo){//当前页码更改样式
                page += "<li class='active'><a onclick='loadUserList("+((i-1)*pageSize)+","+(i)+")'>"+i+"</a></li>";
            }else{
                page += "<li><a onclick='loadUserList("+((i-1)*pageSize)+","+(i)+")'>"+i+"</a></li>";
            }
        }
        //下一页
        if (pageNo+1 <= totalPage){
            page += "<li><a onclick='loadUserList("+(pageNo*pageSize)+","+(pageNo+1)+")'>下一页&raquo;</a></li>";
        }
        //最后一页
        page += "<li><a onclick='loadUserList("+((totalPage-1)*pageSize)+","+(totalPage)+")'>最后一页</a></li>";
        page +=
            "</ul>" +
            "</nav>";
        var $page = $(page);
        $("#page").html($page);
        //获取当前a标签的内容
        /*$("#paginationNum li a").click(function () {
            var thisNo = $(this).html();
        });*/
    }
}
//加载表格头部
function loadAdminListHeadInfo() {
    //清除头部信息
    $("#admin_list_head").empty();
    /*表格的头部*/
    var list_head = '';
    list_head+='<tr>' +
        '   <th>用户ID</th>' +
        '   <th>用户级别</th>' +
        '   <th>联系人</th>' +
        '   <th>电话</th>' +
        '   <th>地址</th>' +
        '   <th>角色等级</th>' +
        '   <th>操作</th>' +
        '</tr>';
    var $list_head = $(list_head);
    $("#admin_list_head").html($list_head);
}
//修改用户信息
function modifyAdminInfo(user_id,user_name,contacts,tel,address,role) {
    //表格内容清空
    $("#admin_list").html('');
    //分页清空
    $("#page").html('');
    //表格头部
    $("#admin_list_head").html('');
    //面板头部
    $("#panel_heading").html('');
    var modify = '';
    modify += '<div class="panel-body">' +
        '<div class="form-horizontal" id="editfrom">';
    //用户ID
    modify +=
        '<div class="form-group ">' +
        '<label for="inputUserId" class="col-sm-2 control-label" >用户ID</label>' +
        '<div class="col-sm-10">' +
        '<input readonly="readonly" type="number" class="form-control" id="inputUserId" name="userId" value='+user_id+'>' +
        '</div>' +
        '</div>';
    //用户级别
    modify +=
        '<div class="form-group">' +
        '<label for="inputUserName" class="col-sm-2 control-label">用户级别:</label>' +
        '<div class="col-sm-10">' +
        '<select class="form-control" name="inputUserName" id="inputUserName">' +
        '<option value="1">省</option>' +
        '<option value="2">市</option>' +
        '<option value="3">学校</option>' +
        '</select>' +
        '</div>' +
        '</div>';
    //联系人
    modify +=
        '<div class="form-group">' +
        '<label for="inputContacts" class="col-sm-2 control-label">联系人</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputContacts" name="inputContacts" placeholder="请输入联系人" value='+contacts+'>' +
        '</div>' +
        '</div>';
    //电话
    modify +=
        '<div class="form-group">' +
        '<label for="inputTel" class="col-sm-2 control-label">电话</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputTel" name="inputTel" placeholder="请输入电话" value='+tel+'>' +
        '</div>' +
        '</div>';
    //地址
    modify +=
        '<div class="form-group">' +
        '<label for="inputAddress" class="col-sm-2 control-label">地址</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputAddress" name="inputAddress" placeholder="请输入地址" value='+address+'>' +
        '</div>' +
        '</div>';
    //角色等级
    modify +=
        '<div class="form-group">' +
        '<label for="inputRole" class="col-sm-2 control-label">角色等级:</label>' +
        '<div class="col-sm-10">' +
        '<select class="form-control" name="inputRole" id="inputRole">' +
        '<option value="1">1</option>' +
        '<option value="2">2</option>' +
        '<option value="3">3</option>' +
        '</select>' +
        '</div>' +
        '</div>';
    //最后结尾
    modify +=
        '<div class="form-group" style="text-align: center">' +
        '<button class="btn btn-default" type="submit" id="modifyAdminInfoSub">提交</button>' +
        '<button class="btn btn-default" type="reset">重置</button>' +
        '</div>' +
        '</div>' +
        '</div>';
    var $modify = $(modify);
    $("#panel_modify").html($modify);
    //让其首先选中获取的参数
    //用户级别
    jsSelectItemByValue($("#inputUserName option"),user_name);
    //角色等级
    jsSelectItemByValue($("#inputRole option"),role);
    //alert($("#inputRole option")[1].value);
    //判断新输入的手机号是否正确
    /*$("#inputTel").blur(function () {
        var newTel = $("#inputTel").val();
        yzsjh(newTel);
    });*/
    //提交按钮
    $("#modifyAdminInfoSub").click(function () {
        //alert($("#inputUserName option:selected").val()+$("#inputRole option:selected").val())
        var newTel = $("#inputTel").val();
        if ($("#inputUserName option:selected").val() != $("#inputRole option:selected").val()){
            alert("你选择的用户级别和角色等级不对应");
        }
        else if (!yzsjh(newTel)){
            alert("你的手机号输入格式不正确")
        }else {
            var user_id = $("#inputUserId").val();
            var user_name = $("#inputUserName option:selected").text();
            var contacts = $("#inputContacts").val();
            var tel = $("#inputTel").val();
            var address = $("#inputAddress").val();
            var role = $("#inputRole option:selected").text();
            $.ajax({
                url:path+"/admin/modifyuserinfo.do",
                type:"post",
                data:{"user_id":user_id,"user_name":user_name,"contacts":contacts,"tel":tel,"address":address,"role":role},
                dataType:"json",
                success:function(result){
                    if (result.status == 0){
                        alert(result.msg);
                        loadUserList2();
                    }else {
                        alert(result.msg);
                    }
                },
                error:function () {
                    alert("信息修改失败。")
                }
            });
        }
    });
}
//增加用户信息
function addAdminInfo() {
    //表格内容清空
    $("#admin_list").html('');
    //分页清空
    $("#page").html('');
    //表格头部
    $("#admin_list_head").html('');
    //面板头部
    $("#panel_heading").html('');
    var add = '';
    add += '<div class="panel-body">' +
        '<div class="form-horizontal" id="editfrom">';
    //用户级别
    add +=
        '<div class="form-group">' +
        '<label for="inputUserName" class="col-sm-2 control-label">用户级别:</label>' +
        '<div class="col-sm-10">' +
        '<select class="form-control" name="inputUserName" id="inputUserName">' +
        '<option value="1">省</option>' +
        '<option value="2">市</option>' +
        '<option value="3">学校</option>' +
        '</select>' +
        '</div>' +
        '</div>';
    //联系人
    add +=
        '<div class="form-group">' +
        '<label for="inputContacts" class="col-sm-2 control-label">联系人</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputContacts" name="inputContacts" placeholder="请输入联系人">' +
        '</div>' +
        '</div>';
    //电话
    add +=
        '<div class="form-group">' +
        '<label for="inputTel" class="col-sm-2 control-label">电话</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputTel" name="inputTel" placeholder="请输入电话">' +
        '</div>' +
        '</div>';
    //地址
    add +=
        '<div class="form-group">' +
        '<label for="inputAddress" class="col-sm-2 control-label">地址</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputAddress" name="inputAddress" placeholder="请输入地址">' +
        '</div>' +
        '</div>';
    //角色等级
    add +=
        '<div class="form-group">' +
        '<label for="inputRole" class="col-sm-2 control-label">角色等级:</label>' +
        '<div class="col-sm-10">' +
        '<select class="form-control" name="inputRole" id="inputRole">' +
        '<option value="1">1</option>' +
        '<option value="2">2</option>' +
        '<option value="3">3</option>' +
        '</select>' +
        '</div>' +
        '</div>';
    //最后结尾
    add +=
        '<div class="form-group" style="text-align: center">' +
        '<button class="btn btn-default" type="submit" id="addAdminInfoSub">添加</button>' +
        '<button class="btn btn-default" type="reset">重置</button>' +
        '</div>' +
        '</div>' +
        '</div>';
    var $add = $(add);
    $("#panel_modify").html($add);
    $("#addAdminInfoSub").click(function () {
        var tel = $("#inputTel").val();
        if ($("#inputUserName option:selected").val() != $("#inputRole option:selected").val()){
            alert("你选择的用户级别和角色等级不对应");
        }
        else if (!yzsjh(tel)){
            alert("你的手机号输入格式不正确")
        }else {
            var user_name = $("#inputUserName option:selected").text();
            var contacts = $("#inputContacts").val();
            var tel = $("#inputTel").val();
            var address = $("#inputAddress").val();
            var role = $("#inputRole option:selected").text();
            $.ajax({
                url:path+"/admin/adduserinfo.do",
                type:"post",
                data:{"user_name":user_name,"contacts":contacts,"tel":tel,"address":address,"role":role},
                dataType:"json",
                success:function(result){
                    if (result.status == 0){
                        alert(result.msg);
                        loadUserList2();
                    }else {
                        alert(result.msg);
                    }
                },
                error:function () {
                    alert("信息添加失败。")
                }
            });
        }
    });
}
//删除用户信息
function deleteAdminInfo(user_id) {
    if (confirm("你确定要删除吗?")) {
        $.ajax({
            url:path+"/admin/deleteuserinfo.do",
            type:"post",
            data:{"user_id":user_id},
            dataType:"json",
            success:function(result){
                if (result.status == 0){
                    alert(result.msg);
                    loadUserList2();
                }else {
                    alert(result.msg);
                }
            },
            error:function () {
                alert("删除失败。")
            }
        });
    }
}
//让其首先选中获取的参数
function jsSelectItemByValue(objSelect, objItemText) {
    for (var i = 0; i < objSelect.length-1; i++) {
        if (objSelect[i].text == objItemText) {
            objSelect[i].selected = true;
            break;
        }
    }
}
//只能输入手机号
function yzsjh(phoneNum){
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/ ;
    if(!reg.test(phoneNum)) {
        return false;
    }else {
        return true;
    }
}
