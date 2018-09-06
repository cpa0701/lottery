import Http from '../../common/Http';

class DomainService {
    // 获取区域树
    domainTree = async (param)=>{
        // var url = 'regions';
        // return await Http.get(url,param);
        var url = 'regionMgr/regionList';
        return await Http.post(url,param);
    }
    // 区域新增
    addDomain = async (param) => {
        let url = 'regionMgr/addRegion';
        return await Http.post(url, param);
    };
    //区域修改（更新区域信息）
    updateDomain=async(param)=>{
        // let url = 'regions/'+param.id;
        // return await Http.put(url, param);
        let url = '/regionMgr/updateRegion';
        return await Http.post(url, param);
    }
    //删除区域
    deleteDomain=async(param)=>{
        // let url = 'regions/'+param.id;
        // return await Http.delete(url, param);
        let url = '/regionMgr/deleteRegion';
        return await Http.post(url, param);
    }
}

export default new DomainService();