package cn.takia.controller.admin;

import cn.takia.entity.AdminUser;
import cn.takia.service.admin.AdminUserService;
import cn.takia.util.NoteResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminUserController {
    @Resource
    private AdminUserService service;

    //加载用户列表
    @RequestMapping("/loadadminlist.do")
    @ResponseBody
    public NoteResult<List<AdminUser>> execute1(int currPage,int pageSize){
        NoteResult<List<AdminUser>> result = service.loadAdminUserList(currPage,pageSize);
        return result;
    }
    //修改用户信息
    @RequestMapping("/modifyuserinfo.do")
    @ResponseBody
    public NoteResult<Object> execute2(int user_id,String user_name,String contacts,String tel,String address,int role){
        NoteResult<Object> result = service.modifyUserInfo(user_id,user_name,contacts,tel,address,role);
        return result;
    }
    //删除用户信息
    @RequestMapping("/deleteuserinfo.do")
    @ResponseBody
    public NoteResult<Object> execute3(int user_id){
        NoteResult<Object> result = service.deleteUserInfo(user_id);
        return result;
    }
    //增加用户信息
    @RequestMapping("/adduserinfo.do")
    @ResponseBody
    public NoteResult<Object> execute4(String user_name,String contacts,String tel,String address,int role){
        NoteResult<Object> result = service.addUserInfo(user_name,contacts,tel,address,role);
        return result;
    }
    //查询用户信息
    @RequestMapping("/searchadmininfo.do")
    @ResponseBody
    public NoteResult<List<AdminUser>> execute5(String contact){
        NoteResult<List<AdminUser>> result = service.searchAdminInfo(contact);
        return result;
    }
}
