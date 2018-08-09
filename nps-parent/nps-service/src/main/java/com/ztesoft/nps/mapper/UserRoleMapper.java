package com.ztesoft.nps.mapper;

import com.ztesoft.nps.model.UserRole;

public interface UserRoleMapper {
	int addRole(UserRole userRole);

	int addUser(UserRole userRole);

	int delete(UserRole userRole);
}
