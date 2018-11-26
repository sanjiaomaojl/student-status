//加载专业信息
function loadProfessional(){
    //首先加载面板的内容
    panel();
    loadProList(0,1);
}
function loadProList(currPage,pageNo) {
    //ajax请求获取  专业  数据
    var li = '';
    var pageSize = 3;
    //加载面板头部信息
    loadPanelHeadInfo();
    //加载表格头部
    loadProHeadInfo();
    //加载列表
    $.ajax({
        url:path+"/admin/adminPro.do",
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
                    var p_id = list[i].p_id;
                    var p_name = list[i].p_name;
                    createAdminList(p_id,p_name);
                }
            }
        },
        error:function () {
            alert("专业信息查询失败");
        }
    });
    //模糊搜索专业信息
    $("#btn_search_submit").bind("click",function () {
        li = '';
        $("#page").html('');
        $.ajax({
            url: path + "/admin/searchAdminPro.do",
            type: "post",
            data: {"p_name":$("#input_search").val()},
            dataType: "json",
            success: function (result) {
                if(result.status == 0){
                    //表格所有行数
                    //var count = result.msg;
                    var list = result.data;
                    //清除原列表信息
                    $("#admin_list").empty();
                    for (var i = 0; i < list.length; i++) {
                        var p_id = list[i].p_id;
                        var p_name = list[i].p_name;
                        createAdminList(p_id,p_name);
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
            '<h1 class="col-md-5">专业管理</h1>' +
            '<form class="bs-example bs-example-form col-md-5" role="form" style="margin: 20px 0 10px 0;" action="/admin/selectStudent" id="form1" method="post">' +
            '<div class="input-group">' +
            '<input type="text" class="form-control" id="input_search" placeholder="请输入" name="findByName">' +
            '<span class="input-group-addon btn" id="btn_search_submit" >搜索</span>' +
            '</div>' +
            '</form>' +
            '<button class="btn btn-default col-md-2" style="margin-top: 20px" onClick="addProInfo()">' +
            '添加专业' +
            '<sapn class="glyphicon glyphicon-plus"/>' +
            '</button>' +
            '</div>';
        var $panel_heading = $(panel_heading);
        $("#panel_heading").html($panel_heading);
    }
    //动态加载表格的内容
    function createAdminList(p_id,p_name){
        /*表格的内容*/
        li+='<tr>';
        li+='<td>'+p_id+'</td>';
        li+='<td>'+p_name+'</td>';
        li+='<td>';
        li+='<button class="btn btn-default btn-xs btn-info" onclick="modifyProInfo('+p_id+',\''+p_name+'\')">修改</button>';
        li+='&nbsp;&nbsp;';
        li+='<button class="btn btn-default btn-xs btn-danger btn-primary" onclick="deleteProInfo('+p_id+')" id="delete_admin_user_info">删除</button>';
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
            page += "<li><a onclick='loadProList("+((pageNo-2)*pageSize)+","+(pageNo-1)+")'>&laquo;上一页</a></li>";
        }
        //全部加载
        for (var i = 1; i <= totalPage; i++) {
            //page += "<li><a href='javascript:loadUserList("+((i-1)*pageSize)+","+(i)+")'>"+i+"</a></li>";
            if(i==pageNo){//当前页码更改样式
                page += "<li class='active'><a onclick='loadProList("+((i-1)*pageSize)+","+(i)+")'>"+i+"</a></li>";
            }else{
                page += "<li><a onclick='loadProList("+((i-1)*pageSize)+","+(i)+")'>"+i+"</a></li>";
            }
        }
        //下一页
        if (pageNo+1 <= totalPage){
            page += "<li><a onclick='loadProList("+(pageNo*pageSize)+","+(pageNo+1)+")'>下一页&raquo;</a></li>";
        }
        //最后一页
        page += "<li><a onclick='loadProList("+((totalPage-1)*pageSize)+","+(totalPage)+")'>最后一页</a></li>";
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
function loadProHeadInfo() {
    //清除头部信息
    $("#admin_list_head").empty();
    /*表格的头部*/
    var list_head = '';
    list_head+='<tr>' +
        '   <th>专业ID</th>' +
        '   <th>专业名字</th>' +
        '   <th>操作</th>' +
        '</tr>';
    var $list_head = $(list_head);
    $("#admin_list_head").html($list_head);
}
//修改专业信息
function modifyProInfo(p_id,p_name) {
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
        '<label for="p_id" class="col-sm-2 control-label" >学生ID</label>' +
        '<div class="col-sm-10">' +
        '<input readonly="readonly" type="number" class="form-control" id="p_id" name="p_id" value='+p_id+'>' +
        '</div>' +
        '</div>';
    //专业姓名
    modify +=
        '<div class="form-group">' +
        '<label for="p_name" class="col-sm-2 control-label">专业名</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="p_name" name="p_name" placeholder="请输入专业名" value='+p_name+'>' +
        '</div>' +
        '</div>';
    //最后结尾
    modify +=
        '<div class="form-group" style="text-align: center">' +
        '<button class="btn btn-default" type="submit" id="modifyProInfoSub">提交</button>' +
        '<button class="btn btn-default" type="reset">重置</button>' +
        '</div>' +
        '</div>' +
        '</div>';
    var $modify = $(modify);
    $("#panel_modify").html($modify);
    //提交按钮
    $("#modifyProInfoSub").click(function () {
        var p_id = $("#p_id").val();
        var p_name = $("#p_name").val();
        $.ajax({
            url:path+"/admin/modifyProInfo.do",
            type:"post",
            data:{"p_id":p_id,"p_name":p_name},
            dataType:"json",
            success:function(result){
                if (result.status == 0){
                    alert(result.msg);
                    loadProfessional();
                }else {
                    alert(result.msg);
                }
            },
            error:function () {
                alert("信息修改失败。")
            }
        });
    });
}
//删除专业信息
function deleteProInfo(p_id) {
    if (confirm("你确定要删除吗?")) {
        $.ajax({
            url:path+"/admin/deleteProInfo.do",
            type:"post",
            data:{"p_id":p_id},
            dataType:"json",
            success:function(result){
                if (result.status == 0){
                    alert(result.msg);
                    loadProfessional();
                }else {
                    alert(result.msg);
                }
            },
            error:function () {
                alert("删除失败")
            }
        });
    }
}
//增加专业信息
function addProInfo() {
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
    //专业
    add +=
        '<div class="form-group">' +
        '<label for="inputContacts" class="col-sm-2 control-label">专业名</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputPro" name="inputPro" placeholder="请输入要添加的专业">' +
        '</div>' +
        '</div>';
    //最后结尾
    add +=
        '<div class="form-group" style="text-align: center">' +
        '<button class="btn btn-default" type="submit" id="addProInfoSub">添加</button>' +
        '<button class="btn btn-default" type="reset">重置</button>' +
        '</div>' +
        '</div>' +
        '</div>';
    var $add = $(add);
    $("#panel_modify").html($add);
    $("#addProInfoSub").click(function () {
        var pro = $("#inputPro").val();
        $.ajax({
            url:path+"/admin/addProInfo.do",
            type:"post",
            data:{"p_name":pro},
            dataType:"json",
            success:function(result){
                if (result.status == 0){
                    alert(result.msg);
                    loadProfessional();
                }else {
                    alert(result.msg);
                }
            },
            error:function () {
                alert("专业添加失败")
            }
        });
    });
}
