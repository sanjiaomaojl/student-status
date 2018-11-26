package cn.takia.test.service.admin;

import cn.takia.entity.Profession;
import cn.takia.service.admin.AdminProService;
import cn.takia.test.TestBase;
import cn.takia.util.NoteResult;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

//专业管理的Service层的测试
public class TestProService extends TestBase {
    private AdminProService service;
    @Before
    public void init(){
        service = super.getContent().getBean("adminProService",AdminProService.class);
    }
    //加载专业信息
    @Test
    public void testLoadPro(){
        NoteResult<List<Profession>> result = service.loadPro(0,3);
        System.out.println(result.getStatus());
        System.out.println(result.getMsg());
        System.out.println(result.getData());
    }
    //模糊查询单个专业
    @Test
    public void testSeaPro(){
        NoteResult<List<Profession>> result = service.searchPro("数据");
        System.out.println(result.getStatus());
        System.out.println(result.getMsg());
        System.out.println(result.getData());
    }
    //修改专业信息
    @Test
    public void testModifyPro(){
        NoteResult<Object> result = service.modifyProInfo(7,"C语言程序设计");
        System.out.println(result.getStatus());
        System.out.println(result.getMsg());
    }
    //删除专业信息
    @Test
    public void testDeletePro(){
        NoteResult<Object> result = service.deleteProInfo(7);
        System.out.println(result.getStatus());
        System.out.println(result.getMsg());
    }
    //增加专业
    @Test
    public void testAddPro(){
        NoteResult<Object> result = service.addProInfo("增加的专业");
        System.out.println(result.getStatus());
        System.out.println(result.getMsg());
    }
}
