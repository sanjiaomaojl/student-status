package cn.takia.test.dao.admin;

import cn.takia.dao.admin.AdminUserDao;
import cn.takia.entity.AdminUser;
import cn.takia.test.TestBase;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

public class TestAdminDao extends TestBase {
    private AdminUserDao dao;

    @Before
    public void init(){
        dao = super.getContent().getBean("adminUserDao", AdminUserDao.class);
    }
    //测试加载列表
    @Test
    public void testLoadAdminList(){
        List<AdminUser> list = dao.loadAdminList(3,3);
        //数据库总记录数
        int count = dao.count();
        //总页数
        //int totalPage = (count + pageSize - 1) / pageSize
        System.out.println(list);
    }
    //测试修改数据
    @Test
    public void testModifyAdminInfo(){
        AdminUser user = new AdminUser();
        user.setUser_id(1);
        user.setUser_name("省");
        user.setContacts("小张");
        user.setTel("17853583170");
        user.setAddress("山东济南");
        user.setRole(1);
        int num = dao.modifyAdminInfo(user);
        System.out.println(num);
    }
    //测试删除
    @Test
    public void testDeleteAdminInfo(){
        int num = dao.deleteAdminInfo(4);
        System.out.println(num);
    }
    //测试添加
    @Test
    public void testAddAdminInfo(){
        int num = dao.addAdminInfo("省","测试","测试","测试",2);
        System.out.println(num);
    }
    //测试查找
    @Test
    public void testSearchAdminInfo(){
        List<AdminUser> list = dao.searchAdminInfo("小张");
        int num = dao.searchAdminInfoCount("小张");
        System.out.println(list);
        System.out.println(num);
    }
}
