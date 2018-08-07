package com.ztesoft.nps.service.impl;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;

import com.github.pagehelper.PageHelper;
import com.ztesoft.nps.mapper.UserMapper;
import com.ztesoft.nps.model.User;
import com.ztesoft.nps.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper userMapper;

	@Transactional(rollbackFor = Exception.class)
	@Override
	public User add(User user) {
		// 生成随机盐值
		Random random = new Random();
		user.setSalt(String.valueOf(random.nextInt()));

		// 计算加盐值后的密码
		StringBuilder passwordAndSalt = new StringBuilder(user.getSalt());
		passwordAndSalt.append(user.getPassword());
		user.setPassword(DigestUtils.md5DigestAsHex(passwordAndSalt.toString()
				.getBytes()));

		userMapper.add(user);

		return userMapper.findById(user.getId());
	}

	@Transactional(readOnly = true)
	@Override
	public User findById(Long id) {
		return userMapper.findById(id);
	}

	@Override
	public List<User> findByDeptId(int pageNum, int pageSize, Long deptId) {
		PageHelper.startPage(pageNum, pageSize);

		return userMapper.findByDeptId(deptId);
	}

	@Override
	public User findByAccount(String account) {
		return userMapper.findByAccount(account);
	}

	@Override
	public User findByNo(String no) {
		return userMapper.findByNo(no);
	}

}
