package com.ztesoft.nps.common.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpStatus;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.ztesoft.nps.common.views.Result;
import com.ztesoft.nps.common.views.ResultCodeEnum;
import org.apache.log4j.Logger;

@WebFilter(urlPatterns = "/*")
public class LoginFilter implements Filter {
	private static final Logger logger = Logger.getLogger(LoginFilter.class);

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse)resp;

		String url = request.getRequestURI();
		String contextPath = request.getContextPath();
		logger.info("============接受客户端请求 ：" + url);
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
//			HttpSession session = request.getSession(false);
//			// 没有登录
//			if (session == null || session.getAttribute("user") == null) {
//				Result<Object> result = Result
//						.failed(ResultCodeEnum.UNAUTHORIZED);
//				response.setStatus(HttpStatus.SC_UNAUTHORIZED);
//				response.setCharacterEncoding("UTF-8");
//				response.setContentType("application/json; charset=utf-8");
//				response.getWriter().write(
//						JSON.toJSONString(result,
//								SerializerFeature.WriteMapNullValue));
//				return;
//			}

			// 已经登录
			chain.doFilter(req, resp);
		}
	}

	@Override
	public void destroy() {

	}

}
