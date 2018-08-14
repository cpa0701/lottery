package com.ztesoft.nps.utils;

import javax.servlet.http.HttpSession;

import com.ztesoft.nps.system.model.User;

public final class UserUtils {
	public static final String SESSION_KEY = "user";

	private UserUtils() {

	}

	public static User getUser(HttpSession session) {
		User user = (User) session.getAttribute(SESSION_KEY);
		return user;
	}
}
