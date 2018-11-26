package cn.takia.service.admin;

import cn.takia.dao.admin.AdminProfessionDao;
import cn.takia.entity.Profession;
import cn.takia.util.NoteResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("adminProService")
public class AdminProServiceImpl implements AdminProService{
    @Resource
    private AdminProfessionDao dao;

    //加载专业信息
    @Override
    public NoteResult<List<Profession>> loadPro(int currPage, int pageSize) {
        NoteResult<List<Profession>> result = new NoteResult<>();
        List<Profession> list = dao.loadProfession(currPage,pageSize);
        int count = dao.count();
        if (count > 0){
            result.setStatus(0);
            result.setData(list);
            result.setMsg(count);
            return result;
        }else {
            result.setStatus(1);
            result.setMsg("查询不到任何数据");
            return result;
        }
    }
    //查询专业信息
    @Override
    public NoteResult<List<Profession>> searchPro(String p_name) {
        NoteResult<List<Profession>> result = new NoteResult<>();
        List<Profession> list = dao.searchProInfo(p_name);
        result.setStatus(0);
        result.setData(list);
        result.setMsg("查询成功");
        return result;
    }
    //修改专业信息
    @Override
    public NoteResult<Object> modifyProInfo(int p_id, String p_name) {
        NoteResult<Object> result = new NoteResult<>();
        Profession pro = new Profession();
        pro.setP_id(p_id);
        pro.setP_name(p_name);
        int num = dao.modifyProInfo(pro);
        if(num>0){
            result.setStatus(0);
            result.setMsg("修改成功");
            return result;
        }else {
            result.setStatus(1);
            result.setMsg("修改失败,请重新操作");
            return result;
        }
    }
    //删除专业信息
    @Override
    public NoteResult<Object> deleteProInfo(int p_id) {
        NoteResult<Object> result = new NoteResult<>();
        int num = dao.deleteProInfo(p_id);
        if(num>0){
            result.setStatus(0);
            result.setMsg("删除成功");
            return result;
        }else {
            result.setStatus(1);
            result.setMsg("删除失败");
            return result;
        }
    }
    //增加专业
    @Override
    public NoteResult<Object> addProInfo(String p_name) {
        NoteResult<Object> result = new NoteResult<>();
        int count = dao.proRepeat(p_name);
        if (count > 0){
            result.setStatus(1);
            result.setMsg("已经有此专业了,请不要重复添加");
            return result;
        }else {
            dao.addProInfo(p_name);
            result.setStatus(0);
            result.setMsg("增加成功");
            return result;
        }
    }
}
