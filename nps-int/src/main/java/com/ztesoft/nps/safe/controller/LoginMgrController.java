package com.ztesoft.nps.safe.controller;


import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.common.utils.ConstantUtils;
import com.ztesoft.nps.common.views.Result;

import com.ztesoft.nps.safe.model.JwtAuthToken;
import com.ztesoft.nps.safe.model.User;
import com.ztesoft.nps.safe.model.query.LoginQuery;
import com.ztesoft.nps.safe.service.UserService;
import com.ztesoft.utils.sys.datastruct.Var;
import com.ztesoft.utils.sys.exception.HttpConnectionException;
import com.ztesoft.utils.sys.util.HttpUtil;
import com.ztesoft.utils.sys.util.MapUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@Api(value = "登录与注销", description = "登录与注销")
public class LoginMgrController {

	@Value("${server.port}")
	private String serverPort;

//	@Value("${security.oauth2.client.authorized-grant-types}")
//	private String grantTypes;

	@Value("${security.user.name}")
	private String name;
	@Value("${security.oauth2.client.scope}")
	private String scope;

	@Value("${spring.application.name}")
	private String appId;

	@Value("${security.user.password}")
	private String password;


	@Autowired
	private UserService userService;

	@Autowired
	HttpServletRequest request;

	@PostMapping("/login")
	@ApiOperation(value = "登录", notes = "登录")
	public Result<User> login(@RequestBody LoginQuery loginInfo) {
		User user = userService.findByAccount(loginInfo.getAccount());
		if (user == null) {
			throw new NpsObjectNotFoundException("帐号或密码不正确");
		}

		StringBuilder passwordAndSalt = new StringBuilder(user.getSalt());
		passwordAndSalt.append(loginInfo.getPassword());
		String passwordMd5 = DigestUtils.md5DigestAsHex(passwordAndSalt
				.toString().getBytes());
		if (!user.getPassword().equals(passwordMd5)) {
			throw new NpsObjectNotFoundException("帐号或密码不正确");
		}

		// 清空密码和盐值
		user.setPassword(null);
		user.setSalt(null);

		String requestUrl = "http://10.45.50.199:"+serverPort+"/oauth/token";

		Map<String,String> requestHeader = new HashMap<String,String>();
		requestHeader.put("Authorization","Basic Y2xpZW50LW5wczoxMjM0NTY=");
		requestHeader.put("Content-Type","application/x-www-form-urlencoded");
		requestHeader.put("Accept","application/json");

		Map<String,String> requestParam = new HashMap<String,String>();
		requestParam.put("grant_type","password");
		requestParam.put("username","ztesoft");
		requestParam.put("password","123456");
		requestParam.put("scope","nps-api");
		requestParam.put("userId","1");
		requestParam.put("appId","nps");

		JwtAuthToken token = new JwtAuthToken();
		try {
			String result = HttpUtil.post(requestUrl,requestHeader,requestParam);
			token = MapUtil.convertMap2Bean(Var.fromJson(result).getObjectMap(), JwtAuthToken.class);
		} catch (HttpConnectionException e) {
			e.printStackTrace();
		}
		user.setToken(token);
		return Result.success(user);
	}

	private JwtAuthToken getAutoToken(User user){

		String requestUrl = "http://localhost:"+serverPort+"/oauth/token";

		Map<String,String> requestHeader = new HashMap<String,String>();
		requestHeader.put("Authorization",ConstantUtils.LOGIN_AUTHORIZATION);
		requestHeader.put("Content-Type",ConstantUtils.LOGIN_CONTENT_TYPE);
		requestHeader.put("Accept",ConstantUtils.LOGIN_ACCEPT);

		Map<String,String> requestParam = new HashMap<String,String>();
//		requestParam.put("grant_type",grantTypes);
		requestParam.put("username",name);
		requestParam.put("password",password);
		requestParam.put("scope",scope);
		requestParam.put("userId",user.getUserId().toString());
		requestParam.put("appId",appId);

		JwtAuthToken token = new JwtAuthToken();
		try {
			String result = HttpUtil.post(requestUrl,requestHeader,requestParam);
			token = MapUtil.convertMap2Bean(Var.fromJson(result).getObjectMap(), JwtAuthToken.class);
		} catch (HttpConnectionException e) {
			e.printStackTrace();
		}
		return token;
	}

	@PostMapping("/logout")
	@ApiOperation(value = "注销", notes = "注销")
	public Result<Object> logout() {
		HttpSession session = request.getSession(false);
		if (session != null ) {
			session.removeAttribute("user");
		}

		return Result.success();
	}
}
