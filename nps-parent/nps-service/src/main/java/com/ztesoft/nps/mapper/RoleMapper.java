package com.ztesoft.nps.mapper;

import java.util.List;

import com.ztesoft.nps.model.Role;

public interface RoleMapper {
	int add(Role role);

	Role findById(Long id);

	List<Role> findByParentId(Long id);
}
