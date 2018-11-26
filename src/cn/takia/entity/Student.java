package cn.takia.entity;

public class Student {
    private int stu_id;
    private String stu_name;
    private String stu_num;
    private String stu_bir;
    private String stu_pro;
    private String stu_university;
    private String stu_city;
    private String stu_photo;
    private String stu_from;

    public int getStu_id() {
        return stu_id;
    }

    public void setStu_id(int stu_id) {
        this.stu_id = stu_id;
    }

    public String getStu_name() {
        return stu_name;
    }

    public void setStu_name(String stu_name) {
        this.stu_name = stu_name;
    }

    public String getStu_num() {
        return stu_num;
    }

    public void setStu_num(String stu_num) {
        this.stu_num = stu_num;
    }

    public String getStu_bir() {
        return stu_bir;
    }

    public void setStu_bir(String stu_bir) {
        this.stu_bir = stu_bir;
    }

    public String getStu_pro() {
        return stu_pro;
    }

    public void setStu_pro(String stu_pro) {
        this.stu_pro = stu_pro;
    }

    public String getStu_university() {
        return stu_university;
    }

    public void setStu_university(String stu_university) {
        this.stu_university = stu_university;
    }

    public String getStu_city() {
        return stu_city;
    }

    public void setStu_city(String stu_city) {
        this.stu_city = stu_city;
    }

    public String getStu_photo() {
        return stu_photo;
    }

    public void setStu_photo(String stu_photo) {
        this.stu_photo = stu_photo;
    }

    public String getStu_from() {
        return stu_from;
    }

    public void setStu_from(String stu_from) {
        this.stu_from = stu_from;
    }

    @Override
    public String toString() {
        return "Student{" +
                "stu_id=" + stu_id +
                ", stu_name='" + stu_name + '\'' +
                ", stu_num='" + stu_num + '\'' +
                ", stu_bir='" + stu_bir + '\'' +
                ", stu_pro='" + stu_pro + '\'' +
                ", stu_university='" + stu_university + '\'' +
                ", stu_city='" + stu_city + '\'' +
                ", stu_photo='" + stu_photo + '\'' +
                ", stu_from='" + stu_from + '\'' +
                '}';
    }
}
