package com.ztesoft.nps.safe.mapper;

import com.ztesoft.nps.safe.model.RolePermission;

public interface RolePermissionMapper {
	int addPermission(RolePermission rolePermission);

	int addRole(RolePermission rolePermission);

	int delete(RolePermission rolePermission);
}
