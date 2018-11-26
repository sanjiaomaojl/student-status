package cn.takia.entity;

import java.io.Serializable;

public class User implements Serializable {
    private String login_name;
    private String password;
    private int role;

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public String getLogin_name() {
        return login_name;
    }

    public void setLogin_name(String login_name) {
        this.login_name = login_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "login_name='" + login_name + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                '}';
    }
}
