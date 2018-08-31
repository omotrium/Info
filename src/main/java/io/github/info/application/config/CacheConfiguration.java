package io.github.info.application.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.github.info.application.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.github.info.application.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.Staff.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.Staff.class.getName() + ".applicationUsers", jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.Staff.class.getName() + ".staffRoles", jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.Application.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.Application.class.getName() + ".applicationUsers", jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.ApplicationUser.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.AuthenticationType.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.AuthenticationType.class.getName() + ".applications", jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.ApplicationClient.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.ApplicationClient.class.getName() + ".applications", jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.Role.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.Role.class.getName() + ".roleActivities", jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.Role.class.getName() + ".staffRoles", jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.Activity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.Activity.class.getName() + ".roleActivities", jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.UserType.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.UserType.class.getName() + ".staffs", jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.InternalGroup.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.InternalGroup.class.getName() + ".staffs", jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.Organisation.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.Organisation.class.getName() + ".staffs", jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.RoleActivity.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.info.application.domain.StaffRole.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
