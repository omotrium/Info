package io.github.info.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.info.application.domain.StaffRole;
import io.github.info.application.repository.StaffRoleRepository;
import io.github.info.application.web.rest.errors.BadRequestAlertException;
import io.github.info.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing StaffRole.
 */
@RestController
@RequestMapping("/api")
public class StaffRoleResource {

    private final Logger log = LoggerFactory.getLogger(StaffRoleResource.class);

    private static final String ENTITY_NAME = "staffRole";

    private final StaffRoleRepository staffRoleRepository;

    public StaffRoleResource(StaffRoleRepository staffRoleRepository) {
        this.staffRoleRepository = staffRoleRepository;
    }

    /**
     * POST  /staff-roles : Create a new staffRole.
     *
     * @param staffRole the staffRole to create
     * @return the ResponseEntity with status 201 (Created) and with body the new staffRole, or with status 400 (Bad Request) if the staffRole has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/staff-roles")
    @Timed
    public ResponseEntity<StaffRole> createStaffRole(@Valid @RequestBody StaffRole staffRole) throws URISyntaxException {
        log.debug("REST request to save StaffRole : {}", staffRole);
        if (staffRole.getId() != null) {
            throw new BadRequestAlertException("A new staffRole cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StaffRole result = staffRoleRepository.save(staffRole);
        return ResponseEntity.created(new URI("/api/staff-roles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /staff-roles : Updates an existing staffRole.
     *
     * @param staffRole the staffRole to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated staffRole,
     * or with status 400 (Bad Request) if the staffRole is not valid,
     * or with status 500 (Internal Server Error) if the staffRole couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/staff-roles")
    @Timed
    public ResponseEntity<StaffRole> updateStaffRole(@Valid @RequestBody StaffRole staffRole) throws URISyntaxException {
        log.debug("REST request to update StaffRole : {}", staffRole);
        if (staffRole.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StaffRole result = staffRoleRepository.save(staffRole);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, staffRole.getId().toString()))
            .body(result);
    }

    /**
     * GET  /staff-roles : get all the staffRoles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of staffRoles in body
     */
    @GetMapping("/staff-roles")
    @Timed
    public List<StaffRole> getAllStaffRoles() {
        log.debug("REST request to get all StaffRoles");
        return staffRoleRepository.findAll();
    }

    /**
     * GET  /staff-roles/:id : get the "id" staffRole.
     *
     * @param id the id of the staffRole to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the staffRole, or with status 404 (Not Found)
     */
    @GetMapping("/staff-roles/{id}")
    @Timed
    public ResponseEntity<StaffRole> getStaffRole(@PathVariable Long id) {
        log.debug("REST request to get StaffRole : {}", id);
        Optional<StaffRole> staffRole = staffRoleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(staffRole);
    }

    /**
     * DELETE  /staff-roles/:id : delete the "id" staffRole.
     *
     * @param id the id of the staffRole to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/staff-roles/{id}")
    @Timed
    public ResponseEntity<Void> deleteStaffRole(@PathVariable Long id) {
        log.debug("REST request to delete StaffRole : {}", id);

        staffRoleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
