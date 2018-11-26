package cn.takia.test.dao.admin;

import cn.takia.dao.admin.AdminStuDao;
import cn.takia.entity.Student;
import cn.takia.test.TestBase;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

public class TestStuDao extends TestBase {
    private AdminStuDao dao;
    @Before
    public void init(){
        dao = super.getContent().getBean("adminStuDao",AdminStuDao.class);
    }

    @Test
    //测试查询出来的列表
    public void testProList(){
        List<Student> list = dao.loadStu(0,3);
        //查询数据条数
        int count = dao.count();
        System.out.println(list);
        System.out.println(count);
    }
    //删除用户
    @Test
    //删除专业信息
    public void testDeleteProInfo(){
        int num = dao.deleteStuInfo(2);
        System.out.println(num);
    }
    //增加新学生
    @Test
    public void testAddStuInfo(){
        int num = dao.addStuInfo("1","1","1","1","1","1","1","1");
        System.out.println(num);
    }
    //修改学生
    @Test
    public void testModifyStuInfo(){
        Student student = new Student();
        student.setStu_id(6);
        student.setStu_name("1");
        student.setStu_num("1");
        student.setStu_bir("1");
        student.setStu_pro("1");
        student.setStu_university("1");
        student.setStu_city("1");
        student.setStu_photo("1");
        student.setStu_from("2");
        int num = dao.modifyAdminInfo(student);
        System.out.println(num);
    }
}
