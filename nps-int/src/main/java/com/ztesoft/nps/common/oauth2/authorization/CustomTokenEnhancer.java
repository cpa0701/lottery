//package com.ztesoft.nps.common.oauth2.authorization;
//
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
//import org.springframework.security.oauth2.common.OAuth2AccessToken;
//import org.springframework.security.oauth2.provider.OAuth2Authentication;
//import org.springframework.security.oauth2.provider.token.TokenEnhancer;
//
//import java.util.HashMap;
//import java.util.Map;
//
//public class CustomTokenEnhancer implements TokenEnhancer {
//
//    @Override
//    public OAuth2AccessToken enhance(OAuth2AccessToken oAuth2AccessToken, OAuth2Authentication authentication) {
//        Map<String, Object> additionalInfo = new HashMap<>();
//        additionalInfo.put("organization", authentication.getName());
//        User user = (User) authentication.getUserAuthentication().getPrincipal();
//        additionalInfo.put("userId", "10001");
//        ((DefaultOAuth2AccessToken) oAuth2AccessToken).setAdditionalInformation(additionalInfo);
//        return oAuth2AccessToken;
//    }
//
//}