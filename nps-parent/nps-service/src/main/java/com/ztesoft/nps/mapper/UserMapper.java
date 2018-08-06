package com.ztesoft.nps.mapper;

import java.util.List;

import com.ztesoft.nps.model.User;

public interface UserMapper {
	int add(User user);

	User findById(Long id);

	List<User> findAll();
}
