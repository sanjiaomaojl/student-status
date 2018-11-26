package cn.takia.test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestBase {
    public ApplicationContext getContent(){
        String[] conf = {"conf/spring-mvc.xml","conf/spring-mybatis.xml"};
        ApplicationContext ctx = new ClassPathXmlApplicationContext(conf);
        return ctx;
    }
}
