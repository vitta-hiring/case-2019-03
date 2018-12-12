package br.com.vitta.hiring.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static com.google.common.collect.Sets.newHashSet;

@Configuration
@EnableSwagger2
@ComponentScan
public class ApiConfig {

    private static final String RESOURCES = "br.com.vitta.hiring.resources";

    @Value("${application.version}")
    private String appBuildVersion;

    @Bean
    public Docket apiDoc() {
        final String description = "Api Vitta Hiring";

        final ApiInfo build = new ApiInfoBuilder()
                .title("Vitta Hiring")
                .description(description).version(appBuildVersion).build();

        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage(RESOURCES))
                .paths(PathSelectors.any())
                .build()
                .protocols(newHashSet("http", "https"))
                .apiInfo(build);
    }

}