package io.github.info.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.info.application.domain.InternalGroup;
import io.github.info.application.repository.InternalGroupRepository;
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
 * REST controller for managing InternalGroup.
 */
@RestController
@RequestMapping("/api")
public class InternalGroupResource {

    private final Logger log = LoggerFactory.getLogger(InternalGroupResource.class);

    private static final String ENTITY_NAME = "internalGroup";

    private final InternalGroupRepository internalGroupRepository;

    public InternalGroupResource(InternalGroupRepository internalGroupRepository) {
        this.internalGroupRepository = internalGroupRepository;
    }

    /**
     * POST  /internal-groups : Create a new internalGroup.
     *
     * @param internalGroup the internalGroup to create
     * @return the ResponseEntity with status 201 (Created) and with body the new internalGroup, or with status 400 (Bad Request) if the internalGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/internal-groups")
    @Timed
    public ResponseEntity<InternalGroup> createInternalGroup(@Valid @RequestBody InternalGroup internalGroup) throws URISyntaxException {
        log.debug("REST request to save InternalGroup : {}", internalGroup);
        if (internalGroup.getId() != null) {
            throw new BadRequestAlertException("A new internalGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InternalGroup result = internalGroupRepository.save(internalGroup);
        return ResponseEntity.created(new URI("/api/internal-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /internal-groups : Updates an existing internalGroup.
     *
     * @param internalGroup the internalGroup to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated internalGroup,
     * or with status 400 (Bad Request) if the internalGroup is not valid,
     * or with status 500 (Internal Server Error) if the internalGroup couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/internal-groups")
    @Timed
    public ResponseEntity<InternalGroup> updateInternalGroup(@Valid @RequestBody InternalGroup internalGroup) throws URISyntaxException {
        log.debug("REST request to update InternalGroup : {}", internalGroup);
        if (internalGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InternalGroup result = internalGroupRepository.save(internalGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, internalGroup.getId().toString()))
            .body(result);
    }

    /**
     * GET  /internal-groups : get all the internalGroups.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of internalGroups in body
     */
    @GetMapping("/internal-groups")
    @Timed
    public List<InternalGroup> getAllInternalGroups() {
        log.debug("REST request to get all InternalGroups");
        return internalGroupRepository.findAll();
    }

    /**
     * GET  /internal-groups/:id : get the "id" internalGroup.
     *
     * @param id the id of the internalGroup to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the internalGroup, or with status 404 (Not Found)
     */
    @GetMapping("/internal-groups/{id}")
    @Timed
    public ResponseEntity<InternalGroup> getInternalGroup(@PathVariable Long id) {
        log.debug("REST request to get InternalGroup : {}", id);
        Optional<InternalGroup> internalGroup = internalGroupRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(internalGroup);
    }

    /**
     * DELETE  /internal-groups/:id : delete the "id" internalGroup.
     *
     * @param id the id of the internalGroup to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/internal-groups/{id}")
    @Timed
    public ResponseEntity<Void> deleteInternalGroup(@PathVariable Long id) {
        log.debug("REST request to delete InternalGroup : {}", id);

        internalGroupRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
