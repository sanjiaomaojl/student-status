package cn.takia.dao;

import cn.takia.entity.User;

public interface LoginDao {
    User login(String username);
}
