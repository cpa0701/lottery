package com.ztesoft.nps.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ztesoft.nps.common.Result;
import com.ztesoft.nps.common.exception.NpsObjectNotFoundException;
import com.ztesoft.nps.model.Region;
import com.ztesoft.nps.service.RegionService;

@RestController
@RequestMapping(value = "/regions")
@Api(value = "区域管理", description = "区域管理")
public class RegionController {
	@Autowired
	private RegionService regionService;

	@PostMapping
	@ApiOperation(value = "新增区域", notes = "新增区域")
	public Result<Region> add(@RequestBody Region region) {
		// User user = UserUtil.getUser(request);
		// category.setCreator(user.getName());
		// category.setModifier(user.getName());

		regionService.add(region);

		return Result.success(region);
	}

	@GetMapping
	@ApiOperation(value = "根据父区域查询子区域列表", notes = "根据父区域查询子区域列表")
	public Result<List<Region>> findByParentId(
			@ApiParam(value = "父区域ID") @RequestParam(defaultValue = "0", required = true) Long parentId) {
		List<Region> regions = regionService.findByParentId(parentId);

		return Result.success(regions);
	}

	@GetMapping(value = "/{areaId}")
	@ApiOperation(value = "根据区域标识查询区域", notes = "根据区域标识查询区域")
	public Result<Region> findByAreaId(
			@ApiParam(value = "区域标识", required = true) @PathVariable Long areaId) {
		Region region = regionService.findByAreaId(areaId);
		if (region == null) {
			throw new NpsObjectNotFoundException(areaId);
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

		// oldDept.setName(dept.getName());
		// oldDept.setDescription(dept.getDescription());
		// oldDept.setParentId(dept.getParentId());

		// User user = UserUtil.getUser(request);
		// oldCategory.setModifier(user.getName());

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

		regionService.delete(region);

		return Result.success();
	}
}
