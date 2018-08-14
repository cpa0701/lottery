package com.ztesoft.nps.system.mapper;

import com.ztesoft.nps.system.model.UserRole;

public interface UserRoleMapper {
	int addRole(UserRole userRole);

	int addUser(UserRole userRole);

	int delete(UserRole userRole);
}
