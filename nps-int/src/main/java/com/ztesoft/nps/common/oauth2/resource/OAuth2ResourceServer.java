//package com.ztesoft.nps.common.oauth2.resource;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
//import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
//
//@Configuration
//@EnableResourceServer
//public class OAuth2ResourceServer extends
//    ResourceServerConfigurerAdapter {
//    @Override
//    public void configure(HttpSecurity http) throws Exception {
////        http
////            .authorizeRequests()
////                .anyRequest().authenticated().antMatchers( "/oauth/**","/swagger-ui.html").permitAll()
////                //.and().formLogin().loginPage("/login")
////                //.and().logout().logoutSuccessUrl("/")
////                .and().requestMatchers().antMatchers("/**");
//        http.antMatcher("/**")        //匹配需要资源认证路径
//                .authorizeRequests()
//                .antMatchers("/swagger-ui.html", "/swagger-resources/**",
//                        "/v2/api-docs/**", "/validatorUrl","/valid"
//                ).permitAll().anyRequest().authenticated();           //匹配不需要资源认证路径
//
//
//    }
//
//}
