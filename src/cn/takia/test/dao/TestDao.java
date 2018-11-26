package cn.takia.test.dao;

import cn.takia.dao.LoginDao;
import cn.takia.entity.User;
import cn.takia.test.TestBase;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestDao extends TestBase {
    @Test
    public void testUserLogin(){
        LoginDao ld = super.getContent().getBean("loginDao",LoginDao.class);
        User user = ld.login("demo");
        System.out.println(user);
    }
}
