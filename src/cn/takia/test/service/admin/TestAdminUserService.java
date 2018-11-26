package cn.takia.test.service.admin;

import cn.takia.entity.AdminUser;
import cn.takia.service.admin.AdminUserService;
import cn.takia.test.TestBase;
import cn.takia.util.NoteResult;
import org.junit.Before;
import org.junit.Test;

import java.util.List;
//service测试
public class TestAdminUserService extends TestBase {
    private AdminUserService service;
    @Before
    public void init(){
        service = super.getContent().getBean("adminUserService",AdminUserService.class);
    }
    //加载用户
    @Test
    public void testLoadAdminUserListService(){
        NoteResult<List<AdminUser>> result = service.loadAdminUserList(0,1);
        System.out.println(result.getStatus());
        System.out.println(result.getMsg());
        System.out.println(result.getData());
        System.out.println(result.getData().size());
        System.out.println(result.getData().get(0));
        System.out.println(result.getData().get(0).getUser_id());
    }
    //修改信息
    @Test
    public void testModifyUserInfo(){
        NoteResult<Object> result = service.modifyUserInfo(1,"省","小张","17853583170","山东济南",1);
        System.out.println(result.getStatus());
        System.out.println(result.getMsg());
    }
    //删除信息
    @Test
    public void testDeleteUserInfo(){
        NoteResult<Object> result = service.deleteUserInfo(5);
        System.out.println(result.getStatus());
        System.out.println(result.getMsg());
    }
    //增加信息
    @Test
    public void testAddUserInfo(){
        NoteResult<Object> result = service.addUserInfo("省","测试","测试","测试",2);
        System.out.println(result.getStatus());
        System.out.println(result.getMsg());
    }
    //查询信息
    @Test
    public void testSearchAdminInfo(){
        NoteResult<List<AdminUser>> result = service.searchAdminInfo("小张");
        System.out.println(result.getStatus());
        System.out.println(result.getMsg());
        System.out.println(result.getData());
    }
}
