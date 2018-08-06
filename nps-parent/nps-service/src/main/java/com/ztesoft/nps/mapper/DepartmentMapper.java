package com.ztesoft.nps.mapper;

import java.util.List;

import com.ztesoft.nps.model.Department;

public interface DepartmentMapper {
	int add(Department dept);

	Department findById(Long id);

	List<Department> findByParentId(Long id);
}
