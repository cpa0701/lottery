package com.ztesoft.nps;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
@ServletComponentScan
@MapperScan(basePackages = { "com.ztesoft.nps.**.mapper" })
//@EnableDiscoveryClient
public class NpsApplication {

	public static void main(String[] args) {
		SpringApplication.run(NpsApplication.class, args);
	}

}
