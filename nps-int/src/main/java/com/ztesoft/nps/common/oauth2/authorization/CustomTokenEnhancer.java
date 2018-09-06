package com.ztesoft.nps.common.oauth2.authorization;

import com.ztesoft.utils.sys.util.DateUtil;
import com.ztesoft.utils.sys.util.MapUtil;
import com.ztesoft.utils.sys.util.StringUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

public class CustomTokenEnhancer implements TokenEnhancer {

    @Value("${security.oauth2.client.extral.props}")
    private String extralProps;

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken oAuth2AccessToken, OAuth2Authentication authentication) {
        Map<String, Object> additionalInfo = new HashMap<>();
        additionalInfo.put("organization", authentication.getName());

        User user = (User) authentication.getUserAuthentication().getPrincipal();

        LinkedHashMap details = (LinkedHashMap) authentication.getUserAuthentication().getDetails();
        if(StringUtil.isNotNull(extralProps)){
            String[] props = extralProps.split(",");
            for(int i=0;i<props.length;i++){
                additionalInfo.put(props[i], MapUtil.getString(details,props[i]));
            }
        }
        ((DefaultOAuth2AccessToken) oAuth2AccessToken).setAdditionalInformation(additionalInfo);

        return oAuth2AccessToken;
    }

}