package com.ztesoft.nps.common.filter;

import com.ztesoft.nps.analysisProgram.SmsAccessAnalysis.SmsAccess;
import com.ztesoft.nps.analysisProgram.SmsAccessAnalysis.SmsAccessQuequ;
import com.ztesoft.nps.analysisProgram.SmsBussinessBo;
import com.ztesoft.nps.business.surveyTaskMgr.model.TaskExe;
import com.ztesoft.utils.sys.util.StringUtil;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by 64671 on 2018/8/29.
 * 短链接地址过滤
 */
@WebFilter(urlPatterns = "/*")
public class ShortUrlFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp,
                         FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) resp;

        String requestURI = request.getRequestURI() ;
        int endIndex = requestURI.lastIndexOf("/") ;
        String shortUrl = requestURI.substring(endIndex+1) ;

        SmsBussinessBo service = new SmsBussinessBo();
        TaskExe taskExe = service.getBaseUrlFromShortUrl(shortUrl);
        if(taskExe == null || StringUtil.isNull(taskExe.getBaseUrl())){
            filterChain.doFilter(req,resp);
        }else{
            //将当前访问提交到分析队列中
            if(StringUtil.isNotNull(taskExe.getSerialId())){
                SmsAccess smsAccess = new SmsAccess(taskExe.getSerialId());
                SmsAccessQuequ.putInfo(smsAccess);
            }

            response.sendRedirect(taskExe.getBaseUrl());
        }

// 测试demo:
//        String baseUrl = "http://localhost:18088/swagger-ui.html";
//        if(shortUrl.equals("Uzii6n")){
//            //将当前访问提交到分析队列中
//            SmsAccess smsAccess = new SmsAccess("9999999");
//            SmsAccessQuequ.putInfo(smsAccess);
//
//            response.sendRedirect(baseUrl);
//        }else{
//            filterChain.doFilter(req,resp);
//        }

    }

    @Override
    public void destroy() {

    }
}
