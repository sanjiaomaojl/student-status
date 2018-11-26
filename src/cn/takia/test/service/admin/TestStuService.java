package cn.takia.test.service.admin;

import cn.takia.entity.Student;
import cn.takia.service.admin.AdminStuService;
import cn.takia.test.TestBase;
import cn.takia.util.NoteResult;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

public class TestStuService extends TestBase {
    private AdminStuService service;
    @Before
    public void init(){
        service = super.getContent().getBean("adminStuService",AdminStuService.class);
    }
    //加载专业信息
    @Test
    public void testLoadStu(){
        NoteResult<List<Student>> result = service.loadStu(0,3);
        System.out.println(result.getStatus());
        System.out.println(result.getMsg());
        System.out.println(result.getData());
    }
    //删除专业信息
    @Test
    public void testDeleteStu(){
        NoteResult<Object> result = service.deleteStuInfo(2);
        System.out.println(result.getStatus());
        System.out.println(result.getMsg());
    }
    //增加学生信息
    @Test
    public void testAddStu(){
        NoteResult<Object> result = service.addStuInfo("2","2",
                "2","2","2","2","2","2");
        System.out.println(result.getStatus());
        System.out.println(result.getMsg());
    }
    //修改学生信息
    @Test
    public void testModifyStu(){
        NoteResult<Object> result = service.modifyStuInfo(6,"1","1","1","1","1","1","1","1");
        System.out.println(result.getStatus());
        System.out.println(result.getMsg());
    }
}
