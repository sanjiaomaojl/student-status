package cn.takia.service.admin;

import cn.takia.dao.admin.AdminStuDao;
import cn.takia.entity.Profession;
import cn.takia.entity.Student;
import cn.takia.util.NoteResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("adminStuService")
public class AdminStuServiceImpl implements AdminStuService{
    @Resource
    private AdminStuDao dao;

    //加载学生基本信息
    @Override
    public NoteResult<List<Student>> loadStu(int currPage, int pageSize) {
        NoteResult<List<Student>> result = new NoteResult<>();
        List<Student> list = dao.loadStu(currPage,pageSize);
        int count = dao.count();
        if (count > 0){
            result.setStatus(0);
            result.setData(list);
            result.setMsg(count);
            return result;
        }else {
            result.setStatus(1);
            result.setMsg("查询不到任何数据");
            System.out.println("No effect");
            return result;
        }
    }
    //删除学生
    @Override
    public NoteResult<Object> deleteStuInfo(int stu_id) {
        NoteResult<Object> result = new NoteResult<>();
        int num = dao.deleteStuInfo(stu_id);
        if(num>0){
            result.setStatus(0);
            result.setMsg("删除成功");
            return result;
        }else {
            result.setStatus(1);
            result.setMsg("删除失败");
            System.out.println("No z");
            return result;
        }
    }
    //增加学生
    @Override
    public NoteResult<Object> addStuInfo(String stu_name, String stu_num, String stu_bir, String stu_pro, String stu_university, String stu_city, String stu_photo, String stu_from) {
        NoteResult<Object> result = new NoteResult<>();
        int num = dao.addStuInfo(stu_name,stu_num,stu_bir,stu_pro,stu_university,stu_city,stu_photo,stu_from);
        if(num>0){
            result.setStatus(0);
            result.setMsg("增加成功");
            return result;
        }else {
            result.setStatus(1);
            result.setMsg("增加失败");
            return result;
        }
    }
    //修改信息

    @Override
    public NoteResult<Object> modifyStuInfo(int stu_id, String stu_name, String stu_num,
                                            String stu_bir, String stu_pro, String stu_university,
                                            String stu_city, String stu_photo, String stu_from) {
        NoteResult<Object> result = new NoteResult<>();
        Student student = new Student();
        student.setStu_id(stu_id);
        student.setStu_name(stu_name);
        student.setStu_num(stu_num);
        student.setStu_bir(stu_bir);
        student.setStu_pro(stu_pro);
        student.setStu_university(stu_university);
        student.setStu_city(stu_city);
        student.setStu_photo(stu_photo);
        student.setStu_from(stu_from);
        int num = dao.modifyAdminInfo(student);
        if(num>0){
            result.setStatus(0);
            result.setMsg("修改成功");
            return result;
        }else {
            result.setStatus(1);
            result.setMsg("修改失败");
            System.out.println("no");
            return result;
        }
    }
}
