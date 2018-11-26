package cn.takia.controller.admin;

import cn.takia.entity.Profession;
import cn.takia.service.admin.AdminProService;
import cn.takia.util.NoteResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminProController {
    @Resource
    private AdminProService service;
    //显示专业列表
    @ResponseBody
    @RequestMapping("/adminPro.do")
    public NoteResult<List<Profession>> execute(int currPage,int pageSize){
        NoteResult<List<Profession>> result = service.loadPro(currPage,pageSize);
        return result;
    }
    //查询专业
    @ResponseBody
    @RequestMapping("/searchAdminPro.do")
    public NoteResult<List<Profession>> execute1(String p_name){
        NoteResult<List<Profession>> result = service.searchPro(p_name);
        return result;
    }
    //修改专业
    @ResponseBody
    @RequestMapping("/modifyProInfo.do")
    public NoteResult<Object> execute2(int p_id,String p_name){
        NoteResult<Object> result = service.modifyProInfo(p_id,p_name);
        return result;
    }
    //删除该专业
    @ResponseBody
    @RequestMapping("/deleteProInfo.do")
    public NoteResult<Object> execute3(int p_id){
        NoteResult<Object> result = service.deleteProInfo(p_id);
        return result;
    }
    //增加专业
    @ResponseBody
    @RequestMapping("/addProInfo.do")
    public NoteResult<Object> execute4(String p_name){
        NoteResult<Object> result = service.addProInfo(p_name);
        return result;
    }
}
