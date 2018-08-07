package com.ztesoft.nps.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ztesoft.nps.mapper.RegionMapper;
import com.ztesoft.nps.model.Region;
import com.ztesoft.nps.service.RegionService;

@Service("regionService")
public class RegionServiceImpl implements RegionService {
	@Autowired
	private RegionMapper regionMapper;

	@Transactional(rollbackFor = Exception.class)
	@Override
	public Region add(Region region) {
		regionMapper.add(region);

		return regionMapper.findById(region.getId());
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int delete(Region region) {
		return regionMapper.delete(region);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int deleteById(Long id) {
		return regionMapper.deleteById(id);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public Region update(Region region) {
		regionMapper.update(region);

		return region;
	}

	@Transactional(readOnly = true)
	@Override
	public Region findByAreaId(Long areaId) {
		return regionMapper.findByAreaId(areaId);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Region> findByParentId(Long id) {
		return regionMapper.findByParentId(id);
	}

	@Override
	public Region findById(Long id) {
		return regionMapper.findById(id);
	}

}
