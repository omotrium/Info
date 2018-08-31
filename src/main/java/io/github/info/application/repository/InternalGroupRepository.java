package io.github.info.application.repository;

import io.github.info.application.domain.InternalGroup;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the InternalGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InternalGroupRepository extends JpaRepository<InternalGroup, Long> {

}
