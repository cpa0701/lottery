package com.ztesoft.nps.common.oauth2.resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
public class OAuth2ResourceServer extends ResourceServerConfigurerAdapter {

    @Value("${security.oauth2.start}")
    private boolean isOpen;

    @Override
    public void configure(HttpSecurity http) throws Exception {
//        http
//            .authorizeRequests()
//                .anyRequest().authenticated().antMatchers( "/oauth/**","/swagger-ui.html").permitAll()
//                //.and().formLogin().loginPage("/login")
//                //.and().logout().logoutSuccessUrl("/")
//                .and().requestMatchers().antMatchers("/**");

        if(isOpen){
            System.out.println("=============================开启jwt认证===========================");
            http.antMatcher("/**")        //匹配需要资源认证路径
                    .authorizeRequests()
                    .antMatchers("/swagger-ui.html", "/swagger-resources/**",
                            "/v2/api-docs/**", "/validatorUrl","/valid"
                    ).permitAll().anyRequest().authenticated();           //匹配不需要资源认证路径

        }else{
            System.out.println("=============================关闭jwt认证===========================");
            http.authorizeRequests()
                    .antMatchers("/**").permitAll().anyRequest().authenticated();           //匹配不需要资源认证路径
        }
    }

}
