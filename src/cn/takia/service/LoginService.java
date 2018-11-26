package cn.takia.service;

import cn.takia.entity.User;
import cn.takia.util.NoteResult;
import org.springframework.stereotype.Service;

public interface LoginService {
    NoteResult<User> checkLogin(String username, String password);
}
