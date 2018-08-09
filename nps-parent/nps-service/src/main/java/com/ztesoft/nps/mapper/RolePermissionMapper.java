package com.ztesoft.nps.mapper;

import com.ztesoft.nps.model.RolePermission;

public interface RolePermissionMapper {
	int addPermission(RolePermission rolePermission);

	int addRole(RolePermission rolePermission);

	int delete(RolePermission rolePermission);
}
