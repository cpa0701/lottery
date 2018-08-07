package com.ztesoft.nps.utils;

import javax.servlet.http.HttpSession;

import com.ztesoft.nps.model.User;

public final class UserUtils {
	private UserUtils() {

	}

	public static User getUser(HttpSession session) {
		User user = (User) session.getAttribute("user");
		return user;
	}
}
