package cn.takia.test.service;

import cn.takia.entity.User;
import cn.takia.service.LoginService;
import cn.takia.util.NoteResult;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestLoginService {
    @Test
    public void testUserLogin(){
        ApplicationContext ac = new ClassPathXmlApplicationContext("conf/spring-mvc.xml","conf/spring-mybatis.xml");
        LoginService service = ac.getBean("loginService",LoginService.class);
        NoteResult<User> result = service.checkLogin("school","123456");
        System.out.println(result);
    }
}
