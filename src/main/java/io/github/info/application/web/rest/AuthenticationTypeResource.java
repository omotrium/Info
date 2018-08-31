package io.github.info.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.info.application.domain.AuthenticationType;
import io.github.info.application.repository.AuthenticationTypeRepository;
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
 * REST controller for managing AuthenticationType.
 */
@RestController
@RequestMapping("/api")
public class AuthenticationTypeResource {

    private final Logger log = LoggerFactory.getLogger(AuthenticationTypeResource.class);

    private static final String ENTITY_NAME = "authenticationType";

    private final AuthenticationTypeRepository authenticationTypeRepository;

    public AuthenticationTypeResource(AuthenticationTypeRepository authenticationTypeRepository) {
        this.authenticationTypeRepository = authenticationTypeRepository;
    }

    /**
     * POST  /authentication-types : Create a new authenticationType.
     *
     * @param authenticationType the authenticationType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new authenticationType, or with status 400 (Bad Request) if the authenticationType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/authentication-types")
    @Timed
    public ResponseEntity<AuthenticationType> createAuthenticationType(@Valid @RequestBody AuthenticationType authenticationType) throws URISyntaxException {
        log.debug("REST request to save AuthenticationType : {}", authenticationType);
        if (authenticationType.getId() != null) {
            throw new BadRequestAlertException("A new authenticationType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AuthenticationType result = authenticationTypeRepository.save(authenticationType);
        return ResponseEntity.created(new URI("/api/authentication-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /authentication-types : Updates an existing authenticationType.
     *
     * @param authenticationType the authenticationType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated authenticationType,
     * or with status 400 (Bad Request) if the authenticationType is not valid,
     * or with status 500 (Internal Server Error) if the authenticationType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/authentication-types")
    @Timed
    public ResponseEntity<AuthenticationType> updateAuthenticationType(@Valid @RequestBody AuthenticationType authenticationType) throws URISyntaxException {
        log.debug("REST request to update AuthenticationType : {}", authenticationType);
        if (authenticationType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AuthenticationType result = authenticationTypeRepository.save(authenticationType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, authenticationType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /authentication-types : get all the authenticationTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of authenticationTypes in body
     */
    @GetMapping("/authentication-types")
    @Timed
    public List<AuthenticationType> getAllAuthenticationTypes() {
        log.debug("REST request to get all AuthenticationTypes");
        return authenticationTypeRepository.findAll();
    }

    /**
     * GET  /authentication-types/:id : get the "id" authenticationType.
     *
     * @param id the id of the authenticationType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the authenticationType, or with status 404 (Not Found)
     */
    @GetMapping("/authentication-types/{id}")
    @Timed
    public ResponseEntity<AuthenticationType> getAuthenticationType(@PathVariable Long id) {
        log.debug("REST request to get AuthenticationType : {}", id);
        Optional<AuthenticationType> authenticationType = authenticationTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(authenticationType);
    }

    /**
     * DELETE  /authentication-types/:id : delete the "id" authenticationType.
     *
     * @param id the id of the authenticationType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/authentication-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteAuthenticationType(@PathVariable Long id) {
        log.debug("REST request to delete AuthenticationType : {}", id);

        authenticationTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
