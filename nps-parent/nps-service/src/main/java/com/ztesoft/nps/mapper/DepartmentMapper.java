package com.ztesoft.nps.mapper;

import java.util.List;

import com.ztesoft.nps.model.Department;

public interface DepartmentMapper {
	int add(Department dept);

	int delete(Department dept);

	int deleteById(Long id);

	int update(Department dept);

	Department findById(Long id);

	List<Department> findAll();
}
