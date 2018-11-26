package cn.takia.service.admin;

import cn.takia.dao.admin.AdminUserDao;
import cn.takia.entity.AdminUser;
import cn.takia.util.NoteResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("adminUserService")
public class AdminUserServiceImpl implements AdminUserService {
    @Resource
    private AdminUserDao dao;
    //加载
    @Override
    public NoteResult<List<AdminUser>> loadAdminUserList(int currPage,int pageSize) {
        NoteResult<List<AdminUser>> result = new NoteResult<List<AdminUser>>();
        List<AdminUser> list = dao.loadAdminList(currPage,pageSize);
        //总记录数
        int count = dao.count();
        result.setStatus(0);
        result.setMsg(count);
        result.setData(list);
        return result;
    }
    //修改
    @Override
    public NoteResult<Object> modifyUserInfo(int user_id, String user_name, String contacts, String tel, String address, int role) {
        NoteResult<Object> result = new NoteResult<Object>();
        AdminUser user = new AdminUser();
        user.setUser_id(user_id);
        user.setUser_name(user_name);
        user.setContacts(contacts);
        user.setTel(tel);
        user.setAddress(address);
        user.setRole(role);
        int num = dao.modifyAdminInfo(user);
        if (num > 0 ){
            result.setStatus(0);
            result.setMsg("修改成功");
            return result;
        }else {
            result.setStatus(1);
            result.setMsg("修改失败");
            return result;
        }
    }
    //删除
    @Override
    public NoteResult<Object> deleteUserInfo(int user_id) {
        NoteResult<Object> result = new NoteResult<Object>();
        int num = dao.deleteAdminInfo(user_id);
        if(num == 1){
            result.setStatus(0);
            result.setMsg("删除成功");
            return result;
        }else {
            result.setData(1);
            result.setMsg("删除失败,请重试");
            return result;
        }
    }
    //增加
    @Override
    public NoteResult<Object> addUserInfo(String user_name, String contacts, String tel, String address, int role) {
        NoteResult<Object> result = new NoteResult<Object>();
        int num = dao.addAdminInfo(user_name,contacts,tel,address,role);
        if(num == 1){
            result.setStatus(0);
            result.setMsg("增加成功");
            return result;
        }else {
            result.setData(1);
            result.setMsg("增加失败,请重试");
            return result;
        }
    }
    //查询
    @Override
    public NoteResult<List<AdminUser>> searchAdminInfo(String contacts) {
        NoteResult<List<AdminUser>> result = new NoteResult<List<AdminUser>>();
        List<AdminUser> list = dao.searchAdminInfo(contacts);
        int count = dao.searchAdminInfoCount(contacts);
        if (count > 0){
            result.setStatus(0);
            result.setMsg(count);
            result.setData(list);
            return result;
        }else {
            result.setStatus(1);
            result.setMsg("没有数据");
            return result;
        }
    }
}
