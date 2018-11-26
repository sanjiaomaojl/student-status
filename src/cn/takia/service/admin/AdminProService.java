package cn.takia.service.admin;

import cn.takia.entity.Profession;
import cn.takia.util.NoteResult;
import org.junit.Test;
import org.springframework.stereotype.Service;

import java.util.List;

public interface AdminProService {
    //加载专业信息
    NoteResult<List<Profession>> loadPro(int currPage,int pageSize);
    //单个模糊查询
    NoteResult<List<Profession>> searchPro(String p_name);
    //修改专业信息
    NoteResult<Object> modifyProInfo(int p_id,String p_name);
    //删除专业信息
    NoteResult<Object> deleteProInfo(int p_id);
    //增加专业
    NoteResult<Object> addProInfo(String p_name);
}
