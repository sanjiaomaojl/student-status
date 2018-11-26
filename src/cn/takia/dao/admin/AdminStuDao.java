package cn.takia.dao.admin;

import cn.takia.entity.Student;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AdminStuDao {
    //查询一共多少条数据
    int count();
    //查询数据返回list
    List<Student> loadStu(@Param("currPage") int currPage, @Param("pageSize") int pageSize);
    //删除该学生
    int deleteStuInfo(int stu_id);
    //增加新学生
    int addStuInfo(@Param("stu_name") String stu_name,@Param("stu_num") String stu_num,
                   @Param("stu_bir") String stu_bir,@Param("stu_pro") String stu_pro,
                   @Param("stu_university") String stu_university,@Param("stu_city") String stu_city,
                   @Param("stu_photo") String stu_photo,@Param("stu_from") String stu_from);
    //修改学生
    int modifyAdminInfo(Student student);
}
