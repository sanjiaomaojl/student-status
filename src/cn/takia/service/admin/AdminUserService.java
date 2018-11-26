package cn.takia.service.admin;

import cn.takia.entity.AdminUser;
import cn.takia.util.NoteResult;

import java.util.List;

public interface AdminUserService {
    //加载用户
    NoteResult<List<AdminUser>> loadAdminUserList(int currPage,int pageSize);
    //修改用户信息
    NoteResult<Object> modifyUserInfo(int user_id,String user_name,String contacts,String tel,String address,int role);
    //删除用户信息
    NoteResult<Object> deleteUserInfo(int user_id);
    //添加用户信息
    NoteResult<Object> addUserInfo(String user_name,String contacts,String tel,String address,int role);
    //查询用户信息
    NoteResult<List<AdminUser>> searchAdminInfo(String contacts);
}
