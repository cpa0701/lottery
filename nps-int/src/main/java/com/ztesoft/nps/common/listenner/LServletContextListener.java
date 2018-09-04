package com.ztesoft.nps.common.listenner;

import com.ztesoft.nps.analysisProgram.SmsAccessAnalysis.SmsAccessStarter;
import com.ztesoft.nps.analysisProgram.SmsResultAnalsis.SmsResultStarter;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

/**
 * Created by 64671 on 2018/8/22.
 */
@WebListener
public class LServletContextListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        SmsAccessStarter.start();
        SmsResultStarter.start();
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        System.out.println("=================服务销毁========================");
    }
}
