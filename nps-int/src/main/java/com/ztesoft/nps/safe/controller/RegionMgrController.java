package com.ztesoft.nps.safe.controller;

import com.ztesoft.nps.safe.model.query.RegionIdQuery;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ztesoft.nps.common.views.Result;
import com.ztesoft.nps.common.exception.NpsDeleteException;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.safe.model.Department;
import com.ztesoft.nps.safe.model.Region;
import com.ztesoft.nps.safe.model.User;
import com.ztesoft.nps.safe.model.query.RegionQuery;
import com.ztesoft.nps.safe.service.DepartmentService;
import com.ztesoft.nps.safe.service.RegionService;
import com.ztesoft.nps.common.utils.UserUtils;

@RestController
@RequestMapping(value = "/regionMgr")
@Api(value = "区域管理", description = "区域管理")
public class RegionMgrController {
	@Autowired
	private RegionService regionService;

	@Autowired
	private DepartmentService departmentService;

	@Autowired
	private HttpSession session;

	@PostMapping("/addRegion")
	@ApiOperation(value = "新增区域", notes = "新增区域")
	public Result<Region> addRegion(@RequestBody Region region) {

		region.setCreatedBy(region.getUserId().toString());
		region.setModifiedBy(region.getUserId().toString());

		Region r = regionService.add(region);

		return Result.success(r);
	}

	@PostMapping("/regionList")
	@ApiOperation(value = "查询区域列表", notes = "查询区域列表")
	public Result<List<Region>> regionList(@RequestBody RegionQuery condition) {
		List<Region> regions = regionService.findByCondition(condition);

		return Result.success(regions);
	}

	@PostMapping("/findRegionById")
	@ApiOperation(value = "根据ID查询区域", notes = "根据ID查询区域")
	public Result<Region> findRegionById(@RequestBody RegionIdQuery regionIdQuery) {
		Long id = regionIdQuery.getId();
		Region region = regionService.findById(id);
		if (region == null) {
			throw new NpsObjectNotFoundException(id);
		}
		return Result.success(region);
	}

	@PostMapping("/updateRegion")
	@ApiOperation(value = "更新区域信息", notes = "更新区域信息")
	public Result<Region> updateRegion(@RequestBody Region region) {
		Region oldRegion = regionService.findById(region.getId());
		if (oldRegion == null) {
			throw new NpsObjectNotFoundException(region.getId());
		}

		oldRegion.setAreaId(region.getAreaId());
		oldRegion.setName(region.getName());
		oldRegion.setType(region.getType());
		oldRegion.setCode(region.getCode());
		oldRegion.setSequence(region.getSequence());
		oldRegion.setParentId(region.getParentId());


		oldRegion.setModifiedBy(region.getUserId().toString());

		Region r = regionService.update(oldRegion);

		return Result.success(r);
	}

	@PostMapping("/deleteRegion")
	@ApiOperation(value = "删除区域", notes = "删除区域")
	public Result<Object> deleteRegion(@RequestBody RegionIdQuery regionIdQuery) {
		Long id = regionIdQuery.getId();
		Region region = regionService.findById(id);
		if (region == null) {
			throw new NpsObjectNotFoundException(id);
		}

		List<Department> depts = departmentService.findByRegionId(id);
		if (CollectionUtils.isNotEmpty(depts)) {
			throw new NpsDeleteException("区域下存在部门，不能删除");
		}

		List<Region> regions = regionService.findByParentId(id);
		if (CollectionUtils.isNotEmpty(regions)) {
			throw new NpsDeleteException("区域下存在子节点，不能删除");
		}

		region.setModifiedBy(regionIdQuery.getUserId().toString());

		regionService.delete(region);

		return Result.success();
	}
}
