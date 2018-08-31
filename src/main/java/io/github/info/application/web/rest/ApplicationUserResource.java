package io.github.info.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.info.application.domain.ApplicationUser;
import io.github.info.application.repository.ApplicationUserRepository;
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
 * REST controller for managing ApplicationUser.
 */
@RestController
@RequestMapping("/api")
public class ApplicationUserResource {

    private final Logger log = LoggerFactory.getLogger(ApplicationUserResource.class);

    private static final String ENTITY_NAME = "applicationUser";

    private final ApplicationUserRepository applicationUserRepository;

    public ApplicationUserResource(ApplicationUserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
    }

    /**
     * POST  /application-users : Create a new applicationUser.
     *
     * @param applicationUser the applicationUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new applicationUser, or with status 400 (Bad Request) if the applicationUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/application-users")
    @Timed
    public ResponseEntity<ApplicationUser> createApplicationUser(@Valid @RequestBody ApplicationUser applicationUser) throws URISyntaxException {
        log.debug("REST request to save ApplicationUser : {}", applicationUser);
        if (applicationUser.getId() != null) {
            throw new BadRequestAlertException("A new applicationUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ApplicationUser result = applicationUserRepository.save(applicationUser);
        return ResponseEntity.created(new URI("/api/application-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /application-users : Updates an existing applicationUser.
     *
     * @param applicationUser the applicationUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated applicationUser,
     * or with status 400 (Bad Request) if the applicationUser is not valid,
     * or with status 500 (Internal Server Error) if the applicationUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/application-users")
    @Timed
    public ResponseEntity<ApplicationUser> updateApplicationUser(@Valid @RequestBody ApplicationUser applicationUser) throws URISyntaxException {
        log.debug("REST request to update ApplicationUser : {}", applicationUser);
        if (applicationUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ApplicationUser result = applicationUserRepository.save(applicationUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, applicationUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /application-users : get all the applicationUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of applicationUsers in body
     */
    @GetMapping("/application-users")
    @Timed
    public List<ApplicationUser> getAllApplicationUsers() {
        log.debug("REST request to get all ApplicationUsers");
        return applicationUserRepository.findAll();
    }

    /**
     * GET  /application-users/:id : get the "id" applicationUser.
     *
     * @param id the id of the applicationUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the applicationUser, or with status 404 (Not Found)
     */
    @GetMapping("/application-users/{id}")
    @Timed
    public ResponseEntity<ApplicationUser> getApplicationUser(@PathVariable Long id) {
        log.debug("REST request to get ApplicationUser : {}", id);
        Optional<ApplicationUser> applicationUser = applicationUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(applicationUser);
    }

    /**
     * DELETE  /application-users/:id : delete the "id" applicationUser.
     *
     * @param id the id of the applicationUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/application-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteApplicationUser(@PathVariable Long id) {
        log.debug("REST request to delete ApplicationUser : {}", id);

        applicationUserRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
