package com.ztesoft.nps.service;

import java.util.List;

import com.ztesoft.nps.model.Department;

public interface DepartmentService {
	Department add(Department dept);

	Department findById(Long id);

	List<Department> findByParentId(Long id);
}
