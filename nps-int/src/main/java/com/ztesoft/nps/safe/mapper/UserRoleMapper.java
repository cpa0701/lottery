package com.ztesoft.nps.safe.mapper;

import com.ztesoft.nps.safe.model.UserRole;

public interface UserRoleMapper {
	int addRole(UserRole userRole);

	int addUser(UserRole userRole);

	int delete(UserRole userRole);
}
