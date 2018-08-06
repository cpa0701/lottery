package com.ztesoft.nps.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ztesoft.nps.model.Region;

public interface RegionMapper {
	int add(Region region);

	int delete(Region region);

	int deleteById(Long id);

	int update(Region region);

	Region findById(Long id);

	Region findByAreaId(@Param("areaId") Long areaId);

	List<Region> findByParentId(Long id);
}
