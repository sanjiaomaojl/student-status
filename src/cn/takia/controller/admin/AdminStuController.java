package cn.takia.controller.admin;

import cn.takia.entity.Student;
import cn.takia.service.admin.AdminStuService;
import cn.takia.util.NoteResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminStuController {
    @Resource
    private AdminStuService service;
    //显示学生列表
    @ResponseBody
    @RequestMapping("/loadStuList.do")
    public NoteResult<List<Student>> execute(int currPage, int pageSize){
        NoteResult<List<Student>> result = service.loadStu(currPage,pageSize);
        return result;
    }
    //删除学生列表
    @ResponseBody
    @RequestMapping("/deleteStuInfo.do")
    public NoteResult<Object> execute2(int stu_id){
        NoteResult<Object> result = service.deleteStuInfo(stu_id);
        return result;
    }
    //增加学生
    @ResponseBody
    @RequestMapping("/addStuInfo.do")
    public NoteResult<Object> execute3(String stu_name, String stu_num, String stu_bir,
                                      String stu_pro, String stu_university, String stu_city,
                                      String stu_photo, String stu_from){
        NoteResult<Object> result = service.addStuInfo(stu_name,stu_num,stu_bir,stu_pro,
                stu_university,stu_city,stu_photo,stu_from);
        return result;
    }
    //修改学生
    @ResponseBody
    @RequestMapping("/modifyStuInfo.do")
    public NoteResult<Object> execute4(int stu_id,String stu_name, String stu_num, String stu_bir,
                                       String stu_pro, String stu_university, String stu_city,
                                       String stu_photo, String stu_from){
        NoteResult<Object> result = service.modifyStuInfo(stu_id,stu_name,stu_num,stu_bir,stu_pro,
                stu_university,stu_city,stu_photo,stu_from);
        return result;
    }
}
