package cn.takia.dao.admin;

import cn.takia.entity.AdminUser;
import cn.takia.util.PageBean;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AdminUserDao {
    //查询多少条数据
    int count();
    //分页查询用户管理
    List<AdminUser> loadAdminList(@Param("currPage") int currPage,@Param("pageSize") int pageSize);
    //修改用户信息
    int modifyAdminInfo(AdminUser user);
    //增加用户信息
    int addAdminInfo(@Param("user_name") String user_name,@Param("contacts") String contacts,@Param("tel")String tel,@Param("address")String address,@Param("role")int role);
    //删除用户信息
    int deleteAdminInfo(int user_id);
    //查询用户信息
    List<AdminUser> searchAdminInfo(String contacts);
    //根据用户信息查询的数量
    int searchAdminInfoCount(String contacts);
}
