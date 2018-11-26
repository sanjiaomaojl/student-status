//加载panel中的内容
function panel() {
    var panel = '';
    panel += '<div class="panel panel-default" id="panel_default">' +
        '       <div class="panel panel-default" id="panel_modify"></div>' +
        '           <div class="panel-heading" id="panel_heading">' +
        '               <!--加载面板头部信息-->' +
        '           </div>' +
        '           <table class="table table-bordered">' +
        '               <thead id="admin_list_head">' +
        '                   <!--ajax加载表格的头部-->' +
        '               </thead>' +
        '               <tbody id="admin_list">' +
        '                    <!--ajax加载表格的内容-->' +
        '                </tbody>' +
        '           </table>' +
        '           <div class="panel-footer" id="page">' +
        '               <!--分页-->' +
        '           </div>' +
        '       </div>';
    $("#panel").html(panel);
}