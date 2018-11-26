package cn.takia.service;

import cn.takia.dao.LoginDao;
import cn.takia.entity.User;
import cn.takia.util.NoteResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("loginService")
public class LoginServiceImpl implements LoginService{
    @Resource
    private LoginDao dao;
    @Override
    public NoteResult<User> checkLogin(String username, String password) {
        NoteResult<User> result = new NoteResult<User>();
        User user = dao.login(username);
        if(user == null){
            result.setStatus(1);
            result.setMsg("用户名不存在");
            return result;
        }
        if(!user.getPassword().equals(password)){
                result.setStatus(2);
                result.setMsg("密码不正确");
                return result;
        }
        result.setStatus(0);
        result.setMsg("登录成功");
        result.setData(user);
        return result;
    }
}
