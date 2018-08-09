package com.ztesoft.nps.service;

import java.util.List;

import com.ztesoft.nps.model.Role;
import com.ztesoft.nps.query.RoleQuery;

public interface RoleService {
	Role add(Role role);

	Role findById(Long id);

	List<Role> findByParentId(Long id);

	Role update(Role role);

	List<Role> findByCondition(RoleQuery condition);
}
