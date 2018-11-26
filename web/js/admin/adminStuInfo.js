//加载学生信息
function loadStuInfo() {
    //加载面板信息
    panel();
    loadStuList(0,1);
}
function loadStuList(currPage,pageNo) {
    //ajax请求获取  学生  数据
    var li = '';
    var pageSize = 3;
    //加载面板头部信息
    loadPanelHeadInfo();
    //加载表格头部
    loadStuHeadInfo();
    //加载列表
    $.ajax({
        url:path+"/admin/loadStuList.do",
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
                    var stu_id = list[i].stu_id;
                    var stu_name = list[i].stu_name;
                    var stu_num = list[i].stu_num;
                    var stu_bir = list[i].stu_bir;
                    var stu_pro = list[i].stu_pro;
                    var stu_university = list[i].stu_university;
                    var stu_city = list[i].stu_city;
                    var stu_photo = list[i].stu_photo;
                    var stu_from = list[i].stu_from;
                    createStuList(stu_id,stu_name,stu_num,stu_bir,stu_pro,stu_university,stu_city,stu_photo,stu_from);
                }
            }
        },
        error:function () {
            alert("用户信息加载失败");
        }
    });
    //动态加载表格的内容
    function createStuList(stu_id,stu_name,stu_num,stu_bir,stu_pro,stu_university,stu_city,stu_photo,stu_from){
        /*表格的内容*/
        li+='<tr>';
        li+='<td>'+stu_id+'</td>';
        li+='<td>'+stu_name+'</td>';
        li+='<td>'+stu_num+'</td>';
        li+='<td>'+stu_bir+'</td>';
        li+='<td>'+stu_pro+'</td>';
        li+='<td>'+stu_university+'</td>';
        li+='<td>'+stu_city+'</td>';
        li+='<td>'+stu_photo+'</td>';
        li+='<td>'+stu_from+'</td>';
        li+='<td>';
        li+='<button class="btn btn-default btn-xs btn-info" onclick="modifyStuInfo('+stu_id+',\''+stu_name+'\',' +
            '\''+stu_num+'\',\''+stu_bir+'\',\''+stu_pro+'\',\''+stu_university+'\',\''+stu_city+'\',' +
            '\''+stu_photo+'\',\''+stu_from+'\')">修改</button>';
        li+='&nbsp;&nbsp;';
        li+='<button class="btn btn-default btn-xs btn-danger btn-primary" onclick="deleteStuInfo('+stu_id+')" id="delete_admin_user_info">删除</button>';
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
            page += "<li><a onclick='loadStuList("+((pageNo-2)*pageSize)+","+(pageNo-1)+")'>&laquo;上一页</a></li>";
        }
        //全部加载
        for (var i = 1; i <= totalPage; i++) {
            //page += "<li><a href='javascript:loadUserList("+((i-1)*pageSize)+","+(i)+")'>"+i+"</a></li>";
            if(i==pageNo){//当前页码更改样式
                page += "<li class='active'><a onclick='loadStuList("+((i-1)*pageSize)+","+(i)+")'>"+i+"</a></li>";
            }else{
                page += "<li><a onclick='loadStuList("+((i-1)*pageSize)+","+(i)+")'>"+i+"</a></li>";
            }
        }
        //下一页
        if (pageNo+1 <= totalPage){
            page += "<li><a onclick='loadStuList("+(pageNo*pageSize)+","+(pageNo+1)+")'>下一页&raquo;</a></li>";
        }
        //最后一页
        page += "<li><a onclick='loadStuList("+((totalPage-1)*pageSize)+","+(totalPage)+")'>最后一页</a></li>";
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
    //加载面板头部信息
    function loadPanelHeadInfo() {
        //清除面板头部信息
        $("#panel_heading").empty();
        //面板头部信息
        var panel_heading = '';
        panel_heading +='<div class="row">' +
            '<h1 class="col-md-5">学生基本信息管理</h1>' +
            '<form class="bs-example bs-example-form col-md-5" role="form" style="margin: 20px 0 10px 0;" action="/admin/selectStudent" id="form1" method="post">' +
            '<div class="input-group">' +
            '<input type="text" class="form-control" id="input_search" placeholder="请输入" name="findByName">' +
            '<span class="input-group-addon btn" id="btn_search_submit" >搜索</span>' +
            '</div>' +
            '</form>' +
            '<button class="btn btn-default col-md-2" style="margin-top: 20px" onClick="addStuInfo()">' +
            '添加学生' +
            '<sapn class="glyphicon glyphicon-plus"/>' +
            '</button>' +
            '</div>';
        var $panel_heading = $(panel_heading);
        $("#panel_heading").html($panel_heading);
    }
}
//修改专业信息
function modifyStuInfo(stu_id,stu_name,stu_num,stu_bir,stu_pro,stu_university,stu_city,stu_photo,stu_from) {
    //alert(stu_id+','+stu_name+','+stu_num+','+stu_bir+','+stu_pro+','+stu_university+','+stu_city+','+stu_photo+','+stu_from)
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
        '<label for="inputStuId" class="col-sm-2 control-label" >学生ID</label>' +
        '<div class="col-sm-10">' +
        '<input readonly="readonly" type="number" class="form-control" id="inputStuId" name="inputStuId" value='+stu_id+'>' +
        '</div>' +
        '</div>';
    //学生姓名
    modify +=
        '<div class="form-group">' +
        '<label for="inputStuName" class="col-sm-2 control-label">姓名</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputStuName" name="inputStuName" value='+stu_name+'>' +
        '</div>' +
        '</div>';
    //身份证号
    modify +=
        '<div class="form-group">' +
        '<label for="inputStuNum" class="col-sm-2 control-label">身份证号</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputStuNum" name="inputStuNum" value='+stu_num+'>' +
        '</div>' +
        '</div>';
    //专业
    modify +=
        '<div class="form-group">' +
        '<label for="inputStuPro" class="col-sm-2 control-label">专业</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputStuPro" name="inputStuPro" value='+stu_pro+'>' +
        '</div>' +
        '</div>';
    //学校
    modify +=
        '<div class="form-group">' +
        '<label for="inputStuUniv" class="col-sm-2 control-label">学校</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputStuUniv" name="inputStuUniv" value='+stu_university+'>' +
        '</div>' +
        '</div>';
    //学校所在市
    modify +=
        '<div class="form-group">' +
        '    <label class="col-sm-2 control-label">学校所在市</label>' +
        '    <div class="col-sm-10">' +
        '        <div class="form-inline">' +
        '            <div data-toggle="distpicker">' +
        '                <select class="form-control" id="province2"></select>' +
        '                <select class="form-control" id="city2"></select>' +
        '                <select class="form-control" id="district2"></select>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';
    //照片
    modify +=
        '<div class="form-group">' +
        '<label for="inputStuPho" class="col-sm-2 control-label">照片</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputStuPho" name="inputStuPho" value='+stu_photo+'>' +
        '</div>' +
        '</div>';
    //生源地
    modify +=
        '<div class="form-group">' +
        '    <label class="col-sm-2 control-label">生源地</label>' +
        '    <div class="col-sm-10">' +
        '        <div class="form-inline">' +
        '            <div data-toggle="distpicker">' +
        '                <select class="form-control" id="province1"></select>' +
        '                <select class="form-control" id="city1"></select>' +
        '                <select class="form-control" id="district1"></select>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';
    //最后结尾
    modify+=
        '<div class="form-group" style="text-align: center">' +
        '<button class="btn btn-default" type="submit" id="modifyStuInfoBtn">提交</button>' +
        '<button class="btn btn-default" type="reset">重置</button>' +
        '</div>' +
        '</div>' +
        '</div>';
    var $modify = $(modify);
    $("#panel_modify").html($modify);
    //初始化
    $(function () {
        $('[data-toggle="distpicker"]').distpicker();
    });
    //让其首先选中获取的参数
    //学校所在市
    jsSelectItemByValue($("#city2 option"),stu_city);
    jsSelectItemByValue($("#province2 option"),"山东省");
    jsSelectItemByValue($("#district2 option"),"历下区");
    //生源地
    jsSelectItemByValue($("#city1 option"),stu_from);
    //提交按钮
    $("#modifyStuInfoBtn").click(function () {
        var stu_name = $("#inputStuName").val();
        var stu_num = $("#inputStuNum").val();
        var stu_bir = getBirthdayFromIdCard(stu_num);
        var stu_pro = $("#inputStuPro").val();
        var stu_university = $("#inputStuUniv").val();
        var stu_city = $("#city2 option:selected").text();
        var stu_photo = $("#inputStuPho").val();
        var stu_from = $("#city1 option:selected").text();
        $.ajax({
            url:path+"/admin/modifyStuInfo.do",
            type:"post",
            data:{"stu_id":stu_id,"stu_name":stu_name,"stu_num":stu_num,"stu_bir":stu_bir,
                "stu_pro":stu_pro,"stu_university":stu_university,"stu_city":stu_city,
                "stu_photo":stu_photo,"stu_from":stu_from},
            dataType:"json",
            success:function(result){
                if (result.status == 0){
                    alert(result.msg);
                    loadStuInfo();
                }else {
                    alert(result.msg);
                }
            },
            error:function () {
                alert("信息修改失败")
            }
        });
    });
}
//删除学生信息
function deleteStuInfo(stu_id) {
    if (confirm("你确定要删除吗?")) {
        $.ajax({
            url:path+"/admin/deleteStuInfo.do",
            type:"post",
            data:{"stu_id":stu_id},
            dataType:"json",
            success:function(result){
                if (result.status == 0){
                    alert(result.msg);
                    loadStuInfo();
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
//加载表格头部
function loadStuHeadInfo() {
    //清除头部信息
    $("#admin_list_head").empty();
    /*表格的头部*/
    var list_head = '';
    list_head+='<tr>' +
        '   <th>学生ID</th>' +
        '   <th>学生名字</th>' +
        '   <th>身份证号</th>' +
        '   <th>出生日期</th>' +
        '   <th>专业</th>' +
        '   <th>学校</th>' +
        '   <th>学校所在市</th>' +
        '   <th>照片</th>' +
        '   <th>生源地</th>' +
        '   <th>操作</th>' +
        '</tr>';
    var $list_head = $(list_head);
    $("#admin_list_head").html($list_head);
}
//获取到出生日期
function getBirthdayFromIdCard(idCard) {
    var birthday = "";
    if(idCard != null && idCard != ""){
        if(idCard.length == 15){
            birthday = "19"+idCard.substr(6,6);
        } else if(idCard.length == 18){
            birthday = idCard.substr(6,8);
        }

        birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
    }

    return birthday;
}
//增加用户信息
function addStuInfo() {
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
    //学生姓名
    add +=
        '<div class="form-group">' +
        '<label for="inputStuName" class="col-sm-2 control-label">姓名</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputStuName" name="inputStuName" placeholder="请输入姓名">' +
        '</div>' +
        '</div>';
    //身份证号
    add +=
        '<div class="form-group">' +
        '<label for="inputStuNum" class="col-sm-2 control-label">身份证号</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputStuNum" name="inputStuNum" placeholder="请输入身份证号">' +
        '</div>' +
        '</div>';
    //专业
    add +=
        '<div class="form-group">' +
        '<label for="inputStuPro" class="col-sm-2 control-label">专业</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputStuPro" name="inputStuPro" placeholder="请输入专业">' +
        '</div>' +
        '</div>';
    //学校
    add +=
        '<div class="form-group">' +
        '<label for="inputStuUniv" class="col-sm-2 control-label">学校</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputStuUniv" name="inputStuUniv" placeholder="请输入学校">' +
        '</div>' +
        '</div>';
    //学校所在市
    add +=
        '<div class="form-group">' +
        '    <label class="col-sm-2 control-label">学校所在市</label>' +
        '    <div class="col-sm-10">' +
        '        <div class="form-inline">' +
        '            <div data-toggle="distpicker">' +
        '                <select class="form-control" id="province2"></select>' +
        '                <select class="form-control" id="city2"></select>' +
        '                <select class="form-control" id="district2"></select>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';
    //照片
    add +=
        '<div class="form-group">' +
        '<label for="inputStuPho" class="col-sm-2 control-label">照片</label>' +
        '<div class="col-sm-10">' +
        '<input type="text" class="form-control" id="inputStuPho" name="inputStuPho" placeholder="照片输入，不会弄">' +
        '</div>' +
        '</div>';
    //生源地
    add +=
        '<div class="form-group">' +
        '    <label class="col-sm-2 control-label">生源地</label>' +
        '    <div class="col-sm-10">' +
        '        <div class="form-inline">' +
        '            <div data-toggle="distpicker">' +
        '                <select class="form-control" id="province1"></select>' +
        '                <select class="form-control" id="city1"></select>' +
        '                <select class="form-control" id="district1"></select>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
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
    $(function () {
        $('[data-toggle="distpicker"]').distpicker();
    });
    $("#addAdminInfoSub").click(function () {
        var stu_name = $("#inputStuName").val();
        var stu_num = $("#inputStuNum").val();
        var stu_bir = getBirthdayFromIdCard(stu_num);
        var stu_pro = $("#inputStuPro").val();
        var stu_university = $("#inputStuUniv").val();
        var stu_city = $("#city2 option:selected").text();
        var stu_photo = $("#inputStuPho").val();
        var stu_from = $("#city1 option:selected").text();
        $.ajax({
            url:path+"/admin/addStuInfo.do",
            type:"post",
            data:{"stu_name":stu_name,"stu_num":stu_num,"stu_bir":stu_bir,
                "stu_pro":stu_pro,"stu_university":stu_university,"stu_city":stu_city,
                "stu_photo":stu_photo,"stu_from":stu_from},
            dataType:"json",
            success:function(result){
                if (result.status == 0){
                    alert(result.msg);
                    loadStuInfo();
                }else {
                    alert(result.msg);
                }
            },
            error:function () {
                alert("信息添加失败。")
            }
        });
    });
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