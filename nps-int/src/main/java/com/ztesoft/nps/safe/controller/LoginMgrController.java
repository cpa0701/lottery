package com.ztesoft.nps.safe.controller;

import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.common.views.Result;
import com.ztesoft.nps.safe.model.User;
import com.ztesoft.nps.safe.model.query.LoginQuery;
import com.ztesoft.nps.safe.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@Api(value = "登录与注销", description = "登录与注销")
public class LoginMgrController {
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

		HttpSession session = request.getSession();
		session.setAttribute("user",user);

		return Result.success(user);
	}

	@GetMapping("/logout")
	@ApiOperation(value = "注销", notes = "注销")
	public Result<Object> logout() {
		HttpSession session = request.getSession(false);
		if (session != null ) {
			session.removeAttribute("user");
		}

		return Result.success();
	}
}
