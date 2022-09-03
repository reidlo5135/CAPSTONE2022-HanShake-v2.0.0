package kr.co.handshake.auth.advice;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class LoggedInConfiguration implements WebMvcConfigurer {
    private final LoggedInInterceptor loggedInInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loggedInInterceptor)
                .excludePathPatterns("/")
                .excludePathPatterns("/swagger-resources/**", "/swagger-ui/**", "/v3/api-docs")
                .excludePathPatterns("/css/*")
                .excludePathPatterns("/js/*")
                .excludePathPatterns("/img/**")
                .excludePathPatterns("/index.html")
                .excludePathPatterns("/login")
                .excludePathPatterns("/docs/**")
                .excludePathPatterns("/v1/api/users/signup")
                .excludePathPatterns("/v1/api/oauth/**");
    }
}
