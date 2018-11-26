package cn.takia.test.dao.admin;

import cn.takia.dao.admin.AdminProfessionDao;
import cn.takia.entity.Profession;
import cn.takia.test.TestBase;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

public class TestProfessionDao extends TestBase {
    private AdminProfessionDao dao;
    @Before
    public void init(){
        dao = super.getContent().getBean("adminProfessionDao",AdminProfessionDao.class);
    }

    @Test
    //测试查询出来的列表
    public void testProList(){
        List<Profession> list = dao.loadProfession(0,3);
        //查询数据条数
        int count = dao.count();
        System.out.println(list);
        System.out.println(count);
    }
    @Test
    //测试专业查询
    public void testSearchProInfo(){
        List<Profession> list = dao.searchProInfo("数据");
        System.out.println(list);
    }
    @Test
    //测试专业信息修改
    public void testModifyProInfo(){
        Profession pro = new Profession();
        pro.setP_id(1);
        pro.setP_name("C语言程序");
        int num = dao.modifyProInfo(pro);
        System.out.println(num);
    }
    @Test
    //删除专业信息
    public void testDeleteProInfo(){
        int num = dao.deleteProInfo(7);
        System.out.println(num);
    }
    @Test
    //增加专业
    public void testAddProInfo(){
        int num = dao.addProInfo("增加的数据");
        int count = dao.proRepeat("增加的数据");
        System.out.println(count);
        System.out.println(num);
    }
}
