package com.ztesoft.nps.safe.service;

import java.util.List;

import com.ztesoft.nps.safe.model.Permission;
import com.ztesoft.nps.safe.model.RolePermission;
import com.ztesoft.nps.safe.query.PermissionQuery;

public interface PermissionService {
	Permission add(Permission permission);

	Permission update(Permission permission);

	Permission findById(Long id);

	List<Permission> findByCondition(PermissionQuery condition);

	List<Permission> findByRoleId(Long id);

	int addRole(RolePermission rolePermission);

	int deleteRole(RolePermission rolePermission);

	List<Permission> findByUserId(Long id);

	List<Permission> findByParentId(Long id);

	int delete(Permission permission);
}
