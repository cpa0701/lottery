package com.ztesoft.nps.service;

import java.util.List;

import com.ztesoft.nps.model.Region;

public interface RegionService {
	Region add(Region region);

	int delete(Region region);

	int deleteById(Long id);

	Region update(Region region);

	Region findById(Long id);

	Region findByAreaId(Long areaId);

	List<Region> findByParentId(Long id);
}
