package com.ztesoft.nps.service;

import java.util.List;

import com.ztesoft.nps.model.User;

public interface UserService {
	User add(User user);

	User findById(Long id);

	List<User> findByDeptId(int pageNum, int pageSize, Long deptId);
}
