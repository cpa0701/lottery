package com.ztesoft.nps.service;

import java.util.List;

import com.ztesoft.nps.model.Permission;
import com.ztesoft.nps.query.PermissionQuery;

public interface PermissionService {
	Permission add(Permission permission);

	Permission update(Permission permission);

	Permission findById(Long id);

	List<Permission> findByCondition(PermissionQuery condition);
}
