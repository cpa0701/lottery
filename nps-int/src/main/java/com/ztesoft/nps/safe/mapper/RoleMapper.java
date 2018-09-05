package com.ztesoft.nps.safe.mapper;

import java.util.List;

import com.ztesoft.nps.safe.model.Role;
import com.ztesoft.nps.safe.model.query.RoleQuery;

public interface RoleMapper {
	int add(Role role);

	Role findById(Long id);

	List<Role> findByParentId(Long id);

	int update(Role role);

	List<Role> findByCondition(RoleQuery condition);

	List<Role> findByPermissionId(Long id);

	List<Role> findByUserId(Long id);

	int findChildCount(Long id);

	int delete(Role role);
}
