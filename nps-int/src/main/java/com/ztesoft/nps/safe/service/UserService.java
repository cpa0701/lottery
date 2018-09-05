package com.ztesoft.nps.safe.service;

import java.util.List;

import com.ztesoft.nps.safe.model.User;
import com.ztesoft.nps.safe.model.UserRole;
import com.ztesoft.nps.safe.model.query.UserQuery;

public interface UserService {
	User add(User user);

	User findById(Long id);

	List<User> findByDeptId(Long deptId);

	List<User> findByCondition(int pageNum, int pageSize, UserQuery condition);

	User findByAccount(String account);

	User findByNo(String no);

	User update(User user);

	int addRole(UserRole userRole);

	int deleteRole(UserRole userRole);

	List<User> findByRoleId(int pageNum, int pageSize, Long id);
}
