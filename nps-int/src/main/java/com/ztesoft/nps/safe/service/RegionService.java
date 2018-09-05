package com.ztesoft.nps.safe.service;

import java.util.List;

import com.ztesoft.nps.safe.model.Region;
import com.ztesoft.nps.safe.model.query.RegionQuery;

public interface RegionService {
	Region add(Region region);

	int delete(Region region);

	int deleteById(Long id);

	Region update(Region region);

	Region findById(Long id);

	Region findByAreaId(Long areaId);

	List<Region> findByParentId(Long id);

	List<Region> findByCondition(RegionQuery condition);
}
