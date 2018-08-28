package com.ztesoft.nps.common.config;

import com.ztesoft.utils.plugin.jdbc.dialect.MysqlDialect;
import com.ztesoft.utils.plugin.jdbc.dialect.OracleDialect;
import com.ztesoft.utils.plugin.jdbc.source.DatabaseConfig;
import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@Configuration
@ConfigurationProperties("spring.datasource")
public class DbcpConfiguration {
	@Value("${spring.datasource.url}")
	private String dbUrl;

	@Value("${spring.datasource.username}")
	private String username;

	@Value("${spring.datasource.password}")
	private String password;

	@Value("${spring.datasource.driver-class-name}")
	private String driverClassName;

	@Value("${spring.datasource.default-auto-commit}")
	private boolean defualtAutoCommit;

	@Value("${spring.datasource.initial-size}")
	private int initialSize;

	@Value("${spring.datasource.min-idle}")
	private int minIdle;

	@Value("${spring.datasource.max-active}")
	private int maxActive;

	@Value("${spring.datasource.max-wait-millis}")
	private int maxWait;

	@Value("${spring.datasource.max-idle}")
	private int maxIdle;

	@Value("${spring.datasource.time-between-eviction-runs-millis}")
	private int timeBetweenEvictionRunsMillis;

	@Value("${spring.datasource.min-evictable-idle-time-millis}")
	private int minEvictableIdleTimeMillis;

	@Value("${spring.datasource.validation-query}")
	private String validationQuery;

	@Value("${spring.datasource.test-while-idle}")
	private boolean testWhileIdle;

	@Value("${spring.datasource.test-on-borrow}")
	private boolean testOnBorrow;

	@Value("${spring.datasource.test-on-return}")
	private boolean testOnReturn;

	@Value("${spring.datasource.pool-prepared-statements}")
	private boolean poolPreparedStatements;

	@Value("${spring.datasource.maxPoolPreparedStatementPerConnectionSize}")
	private int maxPoolPreparedStatementPerConnectionSize;

	@Bean
	@Primary
	public DataSource dataSource() {

		BasicDataSource datasource = new BasicDataSource();

		//连接配置
		datasource.setUrl(dbUrl);
		datasource.setUsername(username);
		datasource.setPassword(password);
		datasource.setDriverClassName(driverClassName);

		//连接池配置
		datasource.setDefaultAutoCommit(defualtAutoCommit);
		datasource.setInitialSize(initialSize);
		datasource.setMinIdle(minIdle);
		datasource.setMaxActive(maxActive);
		datasource.setMaxWait(maxWait);
		datasource.setMaxIdle(maxIdle);
		datasource.setTimeBetweenEvictionRunsMillis(timeBetweenEvictionRunsMillis);
		datasource.setMinEvictableIdleTimeMillis(minEvictableIdleTimeMillis);
		datasource.setValidationQuery(validationQuery);
		datasource.setTestWhileIdle(testWhileIdle);
		datasource.setTestOnBorrow(testOnBorrow);
		datasource.setTestOnReturn(testOnReturn);
		datasource.setPoolPreparedStatements(poolPreparedStatements);
		datasource.setMaxOpenPreparedStatements(maxPoolPreparedStatementPerConnectionSize);

		//jdbc配置
		DatabaseConfig.addDatabaseSource("nps", datasource);
		DatabaseConfig.addDatabaseConfig("default.domain", "nps");
		if(driverClassName.indexOf("mysql")!=-1){
			DatabaseConfig.addDatabaseConfig("nps.dialect", MysqlDialect.class.getName());
		}else if(driverClassName.indexOf("oracle")!=-1){
			DatabaseConfig.addDatabaseConfig("nps.dialect", OracleDialect.class.getName());
		}

		return datasource;
	}

}
