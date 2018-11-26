package cn.takia.controller;

import cn.takia.entity.User;
import cn.takia.service.LoginService;
import cn.takia.util.NoteResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping("/user")
public class LoginController {
    @Resource
    private LoginService service;
    @RequestMapping("/login.do")
    @ResponseBody
    public NoteResult<User> execute(String username,String password){
        NoteResult<User> result = service.checkLogin(username, password);
        return result;
    }
}
