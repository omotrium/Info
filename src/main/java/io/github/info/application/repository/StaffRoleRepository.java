package io.github.info.application.repository;

import io.github.info.application.domain.StaffRole;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StaffRole entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StaffRoleRepository extends JpaRepository<StaffRole, Long> {

}
