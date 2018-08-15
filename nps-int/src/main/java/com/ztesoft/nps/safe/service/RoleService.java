package com.ztesoft.nps.safe.service;

import java.util.List;

import com.ztesoft.nps.safe.model.Role;
import com.ztesoft.nps.safe.model.RolePermission;
import com.ztesoft.nps.safe.model.UserRole;
import com.ztesoft.nps.safe.query.RoleQuery;

public interface RoleService {
	Role add(Role role);

	Role findById(Long id);

	List<Role> findByParentId(Long id);

	Role update(Role role);

	List<Role> findByCondition(RoleQuery condition);

	int addPermission(RolePermission rolePermission);

	int deletePermission(RolePermission rolePermission);

	List<Role> findByPermissionId(Long id);

	int addUser(UserRole userRole);

	int deleteUser(UserRole userRole);

	List<Role> findByUserId(Long id);

	int delete(Role role);
}
