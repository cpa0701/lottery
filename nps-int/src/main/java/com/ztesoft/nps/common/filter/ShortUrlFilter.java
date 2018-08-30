package com.ztesoft.nps.common.filter;

import com.ztesoft.nps.analysisProgram.SmsAccessAnalysis.SmsAccess;
import com.ztesoft.nps.analysisProgram.SmsAccessAnalysis.SmsAccessQuequ;
import com.ztesoft.nps.analysisProgram.SmsBussinessBo;
import com.ztesoft.nps.business.surveyTaskMgr.model.TaskExe;
import com.ztesoft.nps.common.utils.ConstantUtils;
import com.ztesoft.utils.sys.util.MapUtil;
import com.ztesoft.utils.sys.util.StringUtil;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

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
        if(requestURI.endsWith(ConstantUtils.RES_SYSTEM_NAME)){
            int endIndex = requestURI.lastIndexOf("/") ;
            String shortUrl = requestURI.substring(endIndex+1) ;

            SmsBussinessBo service = new SmsBussinessBo();
            Map<String,Object> resultMap = service.getBaseUrlFromShortUrl(shortUrl);;
            if(StringUtil.isNull(MapUtil.getString(resultMap,"short_url"))
                    || StringUtil.isNull(MapUtil.getString(resultMap,"base_url"))){
                filterChain.doFilter(req,resp);
            }else{
                if(MapUtil.getInteger(resultMap,"url_flag")==0){
                    //将当前访问提交到分析队列中
                    String serailId = MapUtil.getString(resultMap,"serial_id");
                    String taskId = MapUtil.getString(resultMap,"task_id");
                    if(StringUtil.isNotNull(serailId) && StringUtil.isNotNull(taskId)){
                        SmsAccess smsAccess = new SmsAccess(serailId,taskId);
                        SmsAccessQuequ.putInfo(smsAccess);
                    }
                }
                response.sendRedirect(MapUtil.getString(resultMap,"base_url"));
            }

            // 测试demo:
//            String baseUrl = "http://localhost:18088/swagger-ui.html";
//            if(shortUrl.equals("Uzii6nNPS")){
//                //将当前访问提交到分析队列中
//                SmsAccess smsAccess = new SmsAccess("9999999");
//                SmsAccessQuequ.putInfo(smsAccess);
//
//                response.sendRedirect(baseUrl);
//            }else{
//                filterChain.doFilter(req,resp);
//            }
        }else{
            filterChain.doFilter(req,resp);
        }

    }

    @Override
    public void destroy() {

    }
}
