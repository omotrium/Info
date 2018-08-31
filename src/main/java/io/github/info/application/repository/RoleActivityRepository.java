package io.github.info.application.repository;

import io.github.info.application.domain.RoleActivity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RoleActivity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoleActivityRepository extends JpaRepository<RoleActivity, Long> {

}
