package com.ztesoft.nps.mapper;

import java.util.List;

import com.ztesoft.nps.model.Permission;
import com.ztesoft.nps.query.PermissionQuery;

public interface PermissionMapper {
	int add(Permission permission);

	int update(Permission permission);

	Permission findById(Long id);

	List<Permission> findByCondition(PermissionQuery condition);
}
