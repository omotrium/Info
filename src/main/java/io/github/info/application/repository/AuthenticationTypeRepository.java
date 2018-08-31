package io.github.info.application.repository;

import io.github.info.application.domain.AuthenticationType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AuthenticationType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuthenticationTypeRepository extends JpaRepository<AuthenticationType, Long> {

}
