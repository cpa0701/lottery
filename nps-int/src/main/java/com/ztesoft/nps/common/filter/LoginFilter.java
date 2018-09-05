package com.ztesoft.nps.common.filter;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.ztesoft.nps.common.views.Result;
import com.ztesoft.nps.common.views.ResultCodeEnum;
import org.apache.http.HttpStatus;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter(urlPatterns = "/*")
public class LoginFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse)resp;

		String url = request.getRequestURI();
		System.out.println("{ client :"+ request.getRemoteAddr()+" uri : "+url+" }");
		String contextPath = request.getContextPath();
		// 登录、注销、静态资源、swagger-ui不用过滤
		if (url.equals(contextPath + "/login")
				|| url.equals(contextPath + "/logout")) {
			chain.doFilter(req, resp);
		} else if (url.contains(".js") || url.contains(".css")
				|| url.contains(".html") || url.contains(".htm")
				|| url.contains(".jpg") || url.contains(".ico")
				|| url.contains(".png") || url.contains(".gif")
				|| url.startsWith("/webjars")
				|| url.startsWith("/swagger-resources")
				|| url.startsWith("/v2/api-docs") || url.startsWith("/druid")
				|| url.contains(".bmp")) {
			chain.doFilter(req, resp);
		} else {
			HttpSession session = request.getSession();
			// 没有登录
			if (session == null) {
				Result<Object> result = Result
						.failed(ResultCodeEnum.UNAUTHORIZED);
				response.setStatus(HttpStatus.SC_UNAUTHORIZED);
				response.setCharacterEncoding("UTF-8");
				response.setContentType("application/json; charset=utf-8");
				response.getWriter().write(
						JSON.toJSONString(result,
								SerializerFeature.WriteMapNullValue));
				return;
			}

			// 已经登录
			chain.doFilter(req, resp);
		}
	}

	@Override
	public void destroy() {

	}

}
