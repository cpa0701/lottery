package com.ztesoft.nps.config;

import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;

import com.alibaba.druid.support.http.StatViewServlet;

@WebServlet(urlPatterns = { "/druid/*" }, initParams = {
		@WebInitParam(name = "loginUsername", value = "huyao"),
		@WebInitParam(name = "loginPassword", value = "ztesoft") })
public class DruidStatViewServlet extends StatViewServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

}
