import Http from '../../common/Http';

class LoginService {

  //登录方法
  login = async (param) => {
    var url = 'login';
    return Http.post(url,param);
  }
    //获取token
    authToken = async (param) => {
        var url = 'oauth/token';
        return Http.post(url, param);
    }
  //登出方法
    logout = async (param) => {
      var url = 'logout';
      return Http.post(url, param);
    }

  //获取登录信息
  getLoginInfo = async (param) => {
    var url = 'system/loginController/getLoginInfo';
    return await Http.post(url, param);
  }

  //获取验证码
  getSMSCode = async(param) => {
    return await Http.post('system/loginController/getDynamicCode', param);
  }

  // 重置密码
  resetPassword = async(param) => {
    return await Http.post('system/loginController/verifyDynamicCode', param);
  }

}

export default new LoginService();
