package com.ztesoft.nps.system.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ztesoft.nps.system.model.Region;
import com.ztesoft.nps.system.query.RegionQuery;

public interface RegionMapper {
	int add(Region region);

	int delete(Region region);

	int deleteById(Long id);

	int update(Region region);

	Region findById(Long id);

	Region findByAreaId(@Param("areaId") Long areaId);

	List<Region> findByParentId(Long id);

	List<Region> findByCondition(RegionQuery condition);

	int findChildCount(Long id);
}
