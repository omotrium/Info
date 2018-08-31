package io.github.info.application.repository;

import io.github.info.application.domain.ApplicationClient;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ApplicationClient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApplicationClientRepository extends JpaRepository<ApplicationClient, Long> {

}
