package com.ztesoft.nps.safe.service.impl;

import java.util.List;
import java.util.Map;

import com.ztesoft.utils.sys.util.DatabaseUtil;
import com.ztesoft.utils.sys.util.MapUtil;
import com.ztesoft.utils.sys.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ztesoft.nps.safe.mapper.RegionMapper;
import com.ztesoft.nps.safe.model.Region;
import com.ztesoft.nps.safe.model.query.RegionQuery;
import com.ztesoft.nps.safe.service.RegionService;

@Service("regionService")
public class RegionServiceImpl implements RegionService {
	@Autowired
	private RegionMapper regionMapper;

	@Transactional(rollbackFor = Exception.class)
	@Override
	public Region add(Region region) {
		// 新增节点为叶子节点
		region.setLeaf(Boolean.TRUE);

		String maxAreaIdSql = "select Max(area_id) as maxAreaId from regions";
		Map<String,Object> areaIdMap = DatabaseUtil.queryForMap(maxAreaIdSql);
		Long areaId = MapUtil.getLong(areaIdMap,"maxAreaId")+1L;
		region.setAreaId (areaId);

		String sequenceSql = "select Max(sequence) as sequence from regions";
		Map<String,Object> sequenceMap = DatabaseUtil.queryForMap(sequenceSql);
		int sequence = MapUtil.getInteger(sequenceMap,"sequence")+1;
		region.setSequence(sequence);

		regionMapper.add(region);

		Region pRegion = regionMapper.findById(region.getParentId());
		if (pRegion != null) {
			// 父节点变为非叶子节点
			pRegion.setLeaf(Boolean.FALSE);
			pRegion.setModifiedBy(region.getModifiedBy());
			regionMapper.update(pRegion);
		}

		return regionMapper.findById(region.getId());
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int delete(Region region) {
		regionMapper.delete(region);

		int cnt = regionMapper.findChildCount(region.getParentId());
		if (cnt <= 0) {
			// 将被删节点的父节点转换位叶子节点
			Region pRegion = regionMapper.findById(region.getParentId());
			pRegion.setLeaf(Boolean.TRUE);
			pRegion.setModifiedBy(region.getModifiedBy());
			regionMapper.update(pRegion);
		}
		return 1;
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

		return regionMapper.findById(region.getId());
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

	@Transactional(readOnly = true)
	@Override
	public Region findById(Long id) {
		return regionMapper.findById(id);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Region> findByCondition(RegionQuery condition) {
		if(condition.getParentId()==null){
			condition.setParentId(0L);
		}
		return regionMapper.findByCondition(condition);
	}

}
