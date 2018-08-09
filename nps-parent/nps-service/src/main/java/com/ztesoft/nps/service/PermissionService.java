package com.ztesoft.nps.service;

import java.util.List;

import com.ztesoft.nps.model.Permission;
import com.ztesoft.nps.model.RolePermission;
import com.ztesoft.nps.query.PermissionQuery;

public interface PermissionService {
	Permission add(Permission permission);

	Permission update(Permission permission);

	Permission findById(Long id);

	List<Permission> findByCondition(PermissionQuery condition);

	List<Permission> findByRoleId(Long id);

	int addRole(RolePermission rolePermission);

	int deleteRole(RolePermission rolePermission);
}
