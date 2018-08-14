package com.ztesoft.nps.system.mapper;

import com.ztesoft.nps.system.model.RolePermission;

public interface RolePermissionMapper {
	int addPermission(RolePermission rolePermission);

	int addRole(RolePermission rolePermission);

	int delete(RolePermission rolePermission);
}
