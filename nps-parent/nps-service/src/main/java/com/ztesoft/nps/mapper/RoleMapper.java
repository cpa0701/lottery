package com.ztesoft.nps.mapper;

import java.util.List;

import com.ztesoft.nps.model.Role;
import com.ztesoft.nps.query.RoleQuery;

public interface RoleMapper {
	int add(Role role);

	Role findById(Long id);

	List<Role> findByParentId(Long id);

	int update(Role role);

	List<Role> findByCondition(RoleQuery condition);

	List<Role> findByPermissionId(Long id);
}
