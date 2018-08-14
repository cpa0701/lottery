import Http from '../../common/Http';

class DomainService {
    // 获取区域树
    domainTree = async (param)=>{
        var url = 'regions';
        return await Http.get(url,param);
    }
    // 区域新增
    addDomain = async (param) => {
        let url = 'regions';
        return await Http.post(url, param);
    };
    //区域修改
    updateDomain=async(param)=>{
        let url = 'regions/'+param.id;
        return await Http.put(url, param);
    }
    //删除区域
    deleteDomain=async(param)=>{
        let url = 'regions/'+param.id;
        return await Http.delete(url, param);
    }
}

export default new DomainService();