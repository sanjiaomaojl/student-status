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