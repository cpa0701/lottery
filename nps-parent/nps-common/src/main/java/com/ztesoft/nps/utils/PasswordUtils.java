package com.ztesoft.nps.utils;

import java.util.Random;

import org.springframework.util.DigestUtils;

public final class PasswordUtils {
	private PasswordUtils() {

	}

	/**
	 * 生成密码盐值
	 * 
	 * @return
	 */
	public static String generateSalt() {
		long seed = System.currentTimeMillis();
		Random random = new Random(seed);
		return String.valueOf(random.nextInt());
	}

	/**
	 * 根据盐值对密码进行加密
	 * 
	 * @param password
	 * @param salt
	 * @return 加密后的密码
	 */
	public static String encodePassword(String password, String salt) {
		StringBuilder pwdAndSalt = new StringBuilder(salt);
		pwdAndSalt.append(password);
		String pwd = DigestUtils.md5DigestAsHex(pwdAndSalt.toString()
				.getBytes());
		return pwd;
	}
}
