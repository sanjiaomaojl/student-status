package cn.takia.entity;

import java.io.Serializable;

public class AdminUser implements Serializable {
    private int user_id;
    private String user_name;
    private String contacts;
    private String tel;
    private String address;
    private int role;

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getContacts() {
        return contacts;
    }

    public void setContacts(String contacts) {
        this.contacts = contacts;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "AdminUser{" +
                "user_id='" + user_id + '\'' +
                ", user_name='" + user_name + '\'' +
                ", contacts='" + contacts + '\'' +
                ", tel='" + tel + '\'' +
                ", address='" + address + '\'' +
                ", role=" + role +
                '}';
    }
}
