package com.ztesoft.nps.service;

import java.util.List;

import com.ztesoft.nps.model.Role;

public interface RoleService {
	Role add(Role role);

	Role findById(Long id);

	List<Role> findByParentId(Long id);
}
