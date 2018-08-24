package com.ztesoft.nps.common.config;

import com.alibaba.druid.filter.Filter;
import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.wall.WallConfig;
import com.alibaba.druid.wall.WallFilter;
import com.ztesoft.utils.plugin.jdbc.dialect.MysqlDialect;
import com.ztesoft.utils.plugin.jdbc.dialect.OracleDialect;
import com.ztesoft.utils.plugin.jdbc.source.DatabaseConfig;
import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Configuration
@ConfigurationProperties("spring.datasource")
public class DruidConfiguration {
	@Value("${spring.datasource.url}")
	private String dbUrl;

	@Value("${spring.datasource.username}")
	private String username;

	@Value("${spring.datasource.password}")
	private String password;

	@Value("${spring.datasource.driver-class-name}")
	private String driverClassName;

	@Value("${spring.datasource.initialSize}")
	private int initialSize;

	@Value("${spring.datasource.minIdle}")
	private int minIdle;

	@Value("${spring.datasource.maxActive}")
	private int maxActive;

	@Value("${spring.datasource.maxWait}")
	private int maxWait;

	@Value("${spring.datasource.timeBetweenEvictionRunsMillis}")
	private int timeBetweenEvictionRunsMillis;

	@Value("${spring.datasource.minEvictableIdleTimeMillis}")
	private int minEvictableIdleTimeMillis;

	@Value("${spring.datasource.validationQuery}")
	private String validationQuery;

	@Value("${spring.datasource.testWhileIdle}")
	private boolean testWhileIdle;

	@Value("${spring.datasource.testOnBorrow}")
	private boolean testOnBorrow;

	@Value("${spring.datasource.testOnReturn}")
	private boolean testOnReturn;

	@Value("${spring.datasource.poolPreparedStatements}")
	private boolean poolPreparedStatements;

	@Value("${spring.datasource.maxPoolPreparedStatementPerConnectionSize}")
	private int maxPoolPreparedStatementPerConnectionSize;

	@Value("${spring.datasource.filters}")
	private String filters;

	@Value("${spring.datasource.connectionProperties}")
	private String connectionProperties;

	@Value("${spring.datasource.useGlobalDataSourceStat}")
	private boolean useGlobalDataSourceStat;

//	@Bean(name = "wallFilter")
//	@DependsOn("wallConfig")
//	public WallFilter wallFilter(WallConfig wallConfig) {
//		WallFilter wallFilter = new WallFilter();
//		wallFilter.setConfig(wallConfig);
//		return wallFilter;
//	}
//
//	@Bean(name = "wallConfig")
//	public WallConfig wallConfig() {
//		WallConfig wallConfig = new WallConfig();
//		wallConfig.setMultiStatementAllow(true);//允许一次执行多条语句
//		wallConfig.setNoneBaseStatementAllow(true);//允许一次执行多条语句
//		return wallConfig;
//	}

	@Bean
	@Primary
	public DataSource dataSource() {
		DruidDataSource datasource = new DruidDataSource();
		datasource.setUrl(this.dbUrl);
		datasource.setUsername(username);
		datasource.setPassword(password);
		datasource.setDriverClassName(driverClassName);

		// configuration
		datasource.setInitialSize(initialSize);
		datasource.setMinIdle(minIdle);
		datasource.setMaxActive(maxActive);
		datasource.setMaxWait(maxWait);
		datasource.setTimeBetweenEvictionRunsMillis(timeBetweenEvictionRunsMillis);
		datasource.setMinEvictableIdleTimeMillis(minEvictableIdleTimeMillis);
		datasource.setValidationQuery(validationQuery);
		datasource.setTestWhileIdle(testWhileIdle);
		datasource.setTestOnBorrow(testOnBorrow);
		datasource.setTestOnReturn(testOnReturn);
		datasource.setPoolPreparedStatements(poolPreparedStatements);
		datasource.setMaxPoolPreparedStatementPerConnectionSize(maxPoolPreparedStatementPerConnectionSize);
		datasource.setUseGlobalDataSourceStat(useGlobalDataSourceStat);
		try {
			datasource.setFilters(filters);
		} catch (SQLException e) {
			System.err.println("druid configuration initialization filter: " + e);
		}
//		//配置拦截器，解决mybatis批量插入报错
//		List<Filter> filters = new ArrayList<>();
//		filters.add(new WallFilter());
//		datasource.setProxyFilters(filters);

		datasource.setConnectionProperties(connectionProperties);

		myJdbcDataSourcejInit();//初始化jdbc数据源

		return datasource;
	}

	private void myJdbcDataSourcejInit(){
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName(driverClassName);
		dataSource.setUrl(dbUrl);
		dataSource.setUsername(username);
		dataSource.setPassword(password);

		DatabaseConfig.addDatabaseSource("nps", dataSource);
		DatabaseConfig.addDatabaseConfig("default.domain", "nps");
		if(driverClassName.indexOf("mysql")!=-1){
			DatabaseConfig.addDatabaseConfig("nps.dialect", MysqlDialect.class.getName());
		}else if(driverClassName.indexOf("oracle")!=-1){
			DatabaseConfig.addDatabaseConfig("nps.dialect", OracleDialect.class.getName());
		}

	}


}
