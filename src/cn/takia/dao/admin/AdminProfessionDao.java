package cn.takia.dao.admin;

import cn.takia.entity.Profession;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AdminProfessionDao {
    //查询一共多少条数据
    int count();
    //查询数据返回list
    List<Profession> loadProfession(@Param("currPage") int currPage,@Param("pageSize") int pageSize);
    //查询专业的模糊查询
    List<Profession> searchProInfo(String p_name);
    //修改专业信息
    int modifyProInfo(Profession pro);
    //删除该专业
    int deleteProInfo(int p_id);
    //增加专业
    int addProInfo(String p_name);
    //增加专业查重
    int proRepeat(String p_name);
}
