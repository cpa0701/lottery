package com.ztesoft.nps.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ztesoft.nps.model.Department;

public interface DepartmentMapper {
	int add(Department dept);

	Department findById(Long id);

	List<Department> findAll(@Param("parentId") Long parentId,
			@Param("regionId") Long regionId, @Param("name") String name);

	List<Department> findByParentId(Long id);

	List<Department> findByRegionId(Long id);

	int update(Department dept);

	int delete(Department dept);
}
