package com.ztesoft.nps.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
		userMapper.add(user);
		return user;
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

}
