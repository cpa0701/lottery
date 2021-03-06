package com.ztesoft.nps.safe.mapper;

import java.util.List;

import com.ztesoft.nps.safe.model.Permission;
import com.ztesoft.nps.safe.model.query.PermissionQuery;

public interface PermissionMapper {
	int add(Permission permission);

	int update(Permission permission);

	Permission findById(Long id);

	List<Permission> findByCondition(PermissionQuery condition);

	List<Permission> findByRoleId(Long id);

	List<Permission> findByUserId(Long id);

	int findChildCount(Long id);

	List<Permission> findByParentId(Long id);

	int delete(Permission permission);
}
