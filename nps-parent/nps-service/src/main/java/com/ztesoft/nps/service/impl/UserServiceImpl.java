package com.ztesoft.nps.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.ztesoft.nps.mapper.UserMapper;
import com.ztesoft.nps.mapper.UserRoleMapper;
import com.ztesoft.nps.model.User;
import com.ztesoft.nps.model.UserRole;
import com.ztesoft.nps.query.UserQuery;
import com.ztesoft.nps.service.UserService;
import com.ztesoft.nps.utils.PasswordUtils;

@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper userMapper;

	@Autowired
	private UserRoleMapper userRoleMapper;

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

	@Transactional(readOnly = true)
	@Override
	public List<User> findByDeptId(Long deptId) {
		return userMapper.findByDeptId(deptId);
	}

	@Transactional(readOnly = true)
	@Override
	public User findByAccount(String account) {
		return userMapper.findByAccount(account);
	}

	@Transactional(readOnly = true)
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

	@Transactional(readOnly = true)
	@Override
	public List<User> findByCondition(int pageNum, int pageSize,
			UserQuery condition) {
		PageHelper.startPage(pageNum, pageSize);

		return userMapper.findByCondition(condition);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int addRole(UserRole userRole) {
		return userRoleMapper.addRole(userRole);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int deleteRole(UserRole userRole) {
		return userRoleMapper.delete(userRole);
	}

	@Transactional(readOnly = true)
	@Override
	public List<User> findByRoleId(int pageNum, int pageSize, Long id) {
		PageHelper.startPage(pageNum, pageSize);

		return userMapper.findByRoleId(id);
	}

}
