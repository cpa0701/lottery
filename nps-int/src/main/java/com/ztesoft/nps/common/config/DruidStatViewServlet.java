package com.ztesoft.nps.common.config;

import com.alibaba.druid.support.http.StatViewServlet;

import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;

@WebServlet(urlPatterns = { "/druid/*" }, initParams = {
		@WebInitParam(name = "loginUsername", value = "admin"),
		@WebInitParam(name = "loginPassword", value = "123456") })
public class DruidStatViewServlet extends StatViewServlet {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

}
