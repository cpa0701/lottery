package com.ztesoft.nps.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.ztesoft.nps.mapper.UserMapper;
import com.ztesoft.nps.model.User;
import com.ztesoft.nps.service.UserService;
import com.ztesoft.nps.utils.PasswordUtils;

@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper userMapper;

	@Transactional(rollbackFor = Exception.class)
	@Override
	public User add(User user) {
		user.setSalt(PasswordUtils.generateSalt());
		user.setPassword(PasswordUtils.encodePassword(user.getPassword(),
				user.getSalt()));

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

	@Transactional(rollbackFor = Exception.class)
	@Override
	public User update(User user) {
		// 修改密码
		if (user.getPassword() != null) {
			user.setSalt(PasswordUtils.generateSalt());
			user.setPassword(PasswordUtils.encodePassword(user.getPassword(),
					user.getSalt()));
		}
		
		userMapper.update(user);

		return userMapper.findById(user.getId());
	}

}
