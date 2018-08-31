package io.github.info.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.info.application.domain.RoleActivity;
import io.github.info.application.repository.RoleActivityRepository;
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
 * REST controller for managing RoleActivity.
 */
@RestController
@RequestMapping("/api")
public class RoleActivityResource {

    private final Logger log = LoggerFactory.getLogger(RoleActivityResource.class);

    private static final String ENTITY_NAME = "roleActivity";

    private final RoleActivityRepository roleActivityRepository;

    public RoleActivityResource(RoleActivityRepository roleActivityRepository) {
        this.roleActivityRepository = roleActivityRepository;
    }

    /**
     * POST  /role-activities : Create a new roleActivity.
     *
     * @param roleActivity the roleActivity to create
     * @return the ResponseEntity with status 201 (Created) and with body the new roleActivity, or with status 400 (Bad Request) if the roleActivity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/role-activities")
    @Timed
    public ResponseEntity<RoleActivity> createRoleActivity(@Valid @RequestBody RoleActivity roleActivity) throws URISyntaxException {
        log.debug("REST request to save RoleActivity : {}", roleActivity);
        if (roleActivity.getId() != null) {
            throw new BadRequestAlertException("A new roleActivity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RoleActivity result = roleActivityRepository.save(roleActivity);
        return ResponseEntity.created(new URI("/api/role-activities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /role-activities : Updates an existing roleActivity.
     *
     * @param roleActivity the roleActivity to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated roleActivity,
     * or with status 400 (Bad Request) if the roleActivity is not valid,
     * or with status 500 (Internal Server Error) if the roleActivity couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/role-activities")
    @Timed
    public ResponseEntity<RoleActivity> updateRoleActivity(@Valid @RequestBody RoleActivity roleActivity) throws URISyntaxException {
        log.debug("REST request to update RoleActivity : {}", roleActivity);
        if (roleActivity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RoleActivity result = roleActivityRepository.save(roleActivity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, roleActivity.getId().toString()))
            .body(result);
    }

    /**
     * GET  /role-activities : get all the roleActivities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of roleActivities in body
     */
    @GetMapping("/role-activities")
    @Timed
    public List<RoleActivity> getAllRoleActivities() {
        log.debug("REST request to get all RoleActivities");
        return roleActivityRepository.findAll();
    }

    /**
     * GET  /role-activities/:id : get the "id" roleActivity.
     *
     * @param id the id of the roleActivity to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the roleActivity, or with status 404 (Not Found)
     */
    @GetMapping("/role-activities/{id}")
    @Timed
    public ResponseEntity<RoleActivity> getRoleActivity(@PathVariable Long id) {
        log.debug("REST request to get RoleActivity : {}", id);
        Optional<RoleActivity> roleActivity = roleActivityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(roleActivity);
    }

    /**
     * DELETE  /role-activities/:id : delete the "id" roleActivity.
     *
     * @param id the id of the roleActivity to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/role-activities/{id}")
    @Timed
    public ResponseEntity<Void> deleteRoleActivity(@PathVariable Long id) {
        log.debug("REST request to delete RoleActivity : {}", id);

        roleActivityRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
