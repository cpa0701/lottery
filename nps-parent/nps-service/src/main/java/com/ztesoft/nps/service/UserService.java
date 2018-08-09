package com.ztesoft.nps.service;

import java.util.List;

import com.ztesoft.nps.model.User;
import com.ztesoft.nps.query.UserQuery;

public interface UserService {
	User add(User user);

	User findById(Long id);

	List<User> findByDeptId(Long deptId);

	List<User> findByCondition(int pageNum, int pageSize, UserQuery condition);

	User findByAccount(String account);

	User findByNo(String no);

	User update(User user);
}
