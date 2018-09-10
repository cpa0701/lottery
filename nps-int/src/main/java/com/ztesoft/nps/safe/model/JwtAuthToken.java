package com.ztesoft.nps.safe.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * Created by 64671 on 2018/9/8.
 */
@ApiModel
public class JwtAuthToken {

    @ApiModelProperty("令牌")
    private String access_token;

    @ApiModelProperty("请求令牌类型")
    private String token_type;

    @ApiModelProperty("刷新令牌")
    private String refresh_token;

    @ApiModelProperty("过期时间 单位s")
    private String expires_in;

    @ApiModelProperty("资源域")
    private String scope;

    @ApiModelProperty("组织")
    private String organization;

    @ApiModelProperty("app标识")
    private String appId;

    @ApiModelProperty("当前登陆用户")
    private String userId;

    @ApiModelProperty("jti值")
    private String jti;

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public String getToken_type() {
        return token_type;
    }

    public void setToken_type(String token_type) {
        this.token_type = token_type;
    }

    public String getRefresh_token() {
        return refresh_token;
    }

    public void setRefresh_token(String refresh_token) {
        this.refresh_token = refresh_token;
    }

    public String getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(String expires_in) {
        this.expires_in = expires_in;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getJti() {
        return jti;
    }

    public void setJti(String jti) {
        this.jti = jti;
    }

    @Override
    public String toString() {
        return "AuthToken{" +
                "access_token='" + access_token + '\'' +
                ", token_type='" + token_type + '\'' +
                ", refresh_token='" + refresh_token + '\'' +
                ", expires_in='" + expires_in + '\'' +
                ", scope='" + scope + '\'' +
                ", organization='" + organization + '\'' +
                ", appId='" + appId + '\'' +
                ", userId='" + userId + '\'' +
                ", jti='" + jti + '\'' +
                '}';
    }
}
