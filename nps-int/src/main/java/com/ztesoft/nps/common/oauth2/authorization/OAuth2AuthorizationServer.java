//package com.ztesoft.nps.common.oauth2.authorization;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
//import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
//import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
//import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
//import org.springframework.security.oauth2.provider.token.TokenEnhancer;
//import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
//import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
//import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
//
//import java.util.Arrays;
//
//@Configuration
//@EnableAuthorizationServer
//public class OAuth2AuthorizationServer extends AuthorizationServerConfigurerAdapter {
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Bean
//    public JwtAccessTokenConverter accessTokenConverter() {
//        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
//        converter.setSigningKey("ztesoft");
//        return converter;
//    }
//
//    @Bean
//    public JwtTokenStore jwtTokenStore() {
//        return new JwtTokenStore(accessTokenConverter());
//    }
//
//    @Bean
//    public TokenEnhancer tokenEnhancer() {
//        return new CustomTokenEnhancer();
//    }
//
//    @Override
//    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
//        TokenEnhancerChain tokenEnhancerChain = new TokenEnhancerChain();
//        tokenEnhancerChain.setTokenEnhancers(
//                Arrays.asList(tokenEnhancer(), accessTokenConverter()));
//
//        endpoints
//            .authenticationManager(authenticationManager)
//            .tokenStore(jwtTokenStore())
//            .tokenEnhancer(tokenEnhancerChain)
//            .accessTokenConverter(accessTokenConverter());
//    }
//
//    @Override
//    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
//        clients.inMemory()
//            .withClient("client-ztesoft")
//            .secret("123456")
//            .scopes("nps-api")
//            .authorizedGrantTypes(
//                "password",
//                //"authorization_code",
//                "refresh_token");
//    }
//
//}
