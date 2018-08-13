package com.ztesoft.nps.controller;

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

import com.ztesoft.nps.common.Result;
import com.ztesoft.nps.common.exception.NpsDeleteException;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.model.Department;
import com.ztesoft.nps.model.Region;
import com.ztesoft.nps.model.User;
import com.ztesoft.nps.query.RegionQuery;
import com.ztesoft.nps.service.DepartmentService;
import com.ztesoft.nps.service.RegionService;
import com.ztesoft.nps.utils.UserUtils;

@RestController
@RequestMapping(value = "/regions")
@Api(value = "区域管理", description = "区域管理")
public class RegionController {
	@Autowired
	private RegionService regionService;

	@Autowired
	private DepartmentService departmentService;

	@Autowired
	private HttpSession session;

	@PostMapping
	@ApiOperation(value = "新增区域", notes = "新增区域")
	public Result<Region> add(@RequestBody Region region) {
		User currentUser = UserUtils.getUser(session);
		region.setCreatedBy(currentUser.getAccount());
		region.setModifiedBy(currentUser.getAccount());

		Region r = regionService.add(region);

		return Result.success(r);
	}

	@GetMapping
	@ApiOperation(value = "查询区域列表", notes = "查询区域列表")
	public Result<List<Region>> findByCondition(RegionQuery condition) {
		List<Region> regions = regionService.findByCondition(condition);

		return Result.success(regions);
	}

	@GetMapping(value = "/{id}")
	@ApiOperation(value = "根据ID查询区域", notes = "根据ID查询区域")
	public Result<Region> findById(
			@ApiParam(value = "区域ID", required = true) @PathVariable Long id) {
		Region region = regionService.findById(id);
		if (region == null) {
			throw new NpsObjectNotFoundException(id);
		}
		return Result.success(region);
	}

	@PutMapping(value = "/{id}")
	@ApiOperation(value = "更新区域信息", notes = "更新区域信息")
	public Result<Region> update(
			@ApiParam(value = "区域ID", required = true) @PathVariable Long id,
			@RequestBody Region region) {
		Region oldRegion = regionService.findById(id);
		if (oldRegion == null) {
			throw new NpsObjectNotFoundException(id);
		}

		oldRegion.setAreaId(region.getAreaId());
		oldRegion.setName(region.getName());
		oldRegion.setType(region.getType());
		oldRegion.setCode(region.getCode());
		oldRegion.setSequence(region.getSequence());
		oldRegion.setParentId(region.getParentId());

		User currentUser = UserUtils.getUser(session);
		oldRegion.setModifiedBy(currentUser.getAccount());

		Region r = regionService.update(oldRegion);

		return Result.success(r);
	}

	@DeleteMapping(value = "/{id}")
	@ApiOperation(value = "删除区域", notes = "删除区域")
	public Result<Object> delete(
			@ApiParam(value = "区域ID", required = true) @PathVariable Long id) {
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

		User currentUser = UserUtils.getUser(session);
		region.setModifiedBy(currentUser.getAccount());

		regionService.delete(region);

		return Result.success();
	}
}
