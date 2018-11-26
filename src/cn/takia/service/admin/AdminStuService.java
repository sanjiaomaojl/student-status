package cn.takia.service.admin;

import cn.takia.entity.Student;
import cn.takia.util.NoteResult;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AdminStuService {
    //加载专业信息
    NoteResult<List<Student>> loadStu(int currPage, int pageSize);
    //删除学生信息
    NoteResult<Object> deleteStuInfo(int stu_id);
    //增加同学
    NoteResult<Object> addStuInfo(String stu_name, String stu_num, String stu_bir,
                                  String stu_pro, String stu_university, String stu_city,
                                  String stu_photo, String stu_from);
    //修改信息
    NoteResult<Object> modifyStuInfo(int stu_id,String stu_name, String stu_num, String stu_bir,
                                     String stu_pro, String stu_university, String stu_city,
                                     String stu_photo, String stu_from);
}
