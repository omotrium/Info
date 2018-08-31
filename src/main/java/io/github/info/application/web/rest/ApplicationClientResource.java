package io.github.info.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.info.application.domain.ApplicationClient;
import io.github.info.application.repository.ApplicationClientRepository;
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
 * REST controller for managing ApplicationClient.
 */
@RestController
@RequestMapping("/api")
public class ApplicationClientResource {

    private final Logger log = LoggerFactory.getLogger(ApplicationClientResource.class);

    private static final String ENTITY_NAME = "applicationClient";

    private final ApplicationClientRepository applicationClientRepository;

    public ApplicationClientResource(ApplicationClientRepository applicationClientRepository) {
        this.applicationClientRepository = applicationClientRepository;
    }

    /**
     * POST  /application-clients : Create a new applicationClient.
     *
     * @param applicationClient the applicationClient to create
     * @return the ResponseEntity with status 201 (Created) and with body the new applicationClient, or with status 400 (Bad Request) if the applicationClient has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/application-clients")
    @Timed
    public ResponseEntity<ApplicationClient> createApplicationClient(@Valid @RequestBody ApplicationClient applicationClient) throws URISyntaxException {
        log.debug("REST request to save ApplicationClient : {}", applicationClient);
        if (applicationClient.getId() != null) {
            throw new BadRequestAlertException("A new applicationClient cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ApplicationClient result = applicationClientRepository.save(applicationClient);
        return ResponseEntity.created(new URI("/api/application-clients/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /application-clients : Updates an existing applicationClient.
     *
     * @param applicationClient the applicationClient to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated applicationClient,
     * or with status 400 (Bad Request) if the applicationClient is not valid,
     * or with status 500 (Internal Server Error) if the applicationClient couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/application-clients")
    @Timed
    public ResponseEntity<ApplicationClient> updateApplicationClient(@Valid @RequestBody ApplicationClient applicationClient) throws URISyntaxException {
        log.debug("REST request to update ApplicationClient : {}", applicationClient);
        if (applicationClient.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ApplicationClient result = applicationClientRepository.save(applicationClient);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, applicationClient.getId().toString()))
            .body(result);
    }

    /**
     * GET  /application-clients : get all the applicationClients.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of applicationClients in body
     */
    @GetMapping("/application-clients")
    @Timed
    public List<ApplicationClient> getAllApplicationClients() {
        log.debug("REST request to get all ApplicationClients");
        return applicationClientRepository.findAll();
    }

    /**
     * GET  /application-clients/:id : get the "id" applicationClient.
     *
     * @param id the id of the applicationClient to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the applicationClient, or with status 404 (Not Found)
     */
    @GetMapping("/application-clients/{id}")
    @Timed
    public ResponseEntity<ApplicationClient> getApplicationClient(@PathVariable Long id) {
        log.debug("REST request to get ApplicationClient : {}", id);
        Optional<ApplicationClient> applicationClient = applicationClientRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(applicationClient);
    }

    /**
     * DELETE  /application-clients/:id : delete the "id" applicationClient.
     *
     * @param id the id of the applicationClient to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/application-clients/{id}")
    @Timed
    public ResponseEntity<Void> deleteApplicationClient(@PathVariable Long id) {
        log.debug("REST request to delete ApplicationClient : {}", id);

        applicationClientRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
