package io.github.info.application.web.rest;

import io.github.info.application.InformationManagerApp;

import io.github.info.application.domain.InternalGroup;
import io.github.info.application.repository.InternalGroupRepository;
import io.github.info.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.info.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the InternalGroupResource REST controller.
 *
 * @see InternalGroupResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InformationManagerApp.class)
public class InternalGroupResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private InternalGroupRepository internalGroupRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInternalGroupMockMvc;

    private InternalGroup internalGroup;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InternalGroupResource internalGroupResource = new InternalGroupResource(internalGroupRepository);
        this.restInternalGroupMockMvc = MockMvcBuilders.standaloneSetup(internalGroupResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InternalGroup createEntity(EntityManager em) {
        InternalGroup internalGroup = new InternalGroup()
            .name(DEFAULT_NAME);
        return internalGroup;
    }

    @Before
    public void initTest() {
        internalGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createInternalGroup() throws Exception {
        int databaseSizeBeforeCreate = internalGroupRepository.findAll().size();

        // Create the InternalGroup
        restInternalGroupMockMvc.perform(post("/api/internal-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internalGroup)))
            .andExpect(status().isCreated());

        // Validate the InternalGroup in the database
        List<InternalGroup> internalGroupList = internalGroupRepository.findAll();
        assertThat(internalGroupList).hasSize(databaseSizeBeforeCreate + 1);
        InternalGroup testInternalGroup = internalGroupList.get(internalGroupList.size() - 1);
        assertThat(testInternalGroup.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createInternalGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = internalGroupRepository.findAll().size();

        // Create the InternalGroup with an existing ID
        internalGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInternalGroupMockMvc.perform(post("/api/internal-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internalGroup)))
            .andExpect(status().isBadRequest());

        // Validate the InternalGroup in the database
        List<InternalGroup> internalGroupList = internalGroupRepository.findAll();
        assertThat(internalGroupList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = internalGroupRepository.findAll().size();
        // set the field null
        internalGroup.setName(null);

        // Create the InternalGroup, which fails.

        restInternalGroupMockMvc.perform(post("/api/internal-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internalGroup)))
            .andExpect(status().isBadRequest());

        List<InternalGroup> internalGroupList = internalGroupRepository.findAll();
        assertThat(internalGroupList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInternalGroups() throws Exception {
        // Initialize the database
        internalGroupRepository.saveAndFlush(internalGroup);

        // Get all the internalGroupList
        restInternalGroupMockMvc.perform(get("/api/internal-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(internalGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getInternalGroup() throws Exception {
        // Initialize the database
        internalGroupRepository.saveAndFlush(internalGroup);

        // Get the internalGroup
        restInternalGroupMockMvc.perform(get("/api/internal-groups/{id}", internalGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(internalGroup.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingInternalGroup() throws Exception {
        // Get the internalGroup
        restInternalGroupMockMvc.perform(get("/api/internal-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInternalGroup() throws Exception {
        // Initialize the database
        internalGroupRepository.saveAndFlush(internalGroup);

        int databaseSizeBeforeUpdate = internalGroupRepository.findAll().size();

        // Update the internalGroup
        InternalGroup updatedInternalGroup = internalGroupRepository.findById(internalGroup.getId()).get();
        // Disconnect from session so that the updates on updatedInternalGroup are not directly saved in db
        em.detach(updatedInternalGroup);
        updatedInternalGroup
            .name(UPDATED_NAME);

        restInternalGroupMockMvc.perform(put("/api/internal-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInternalGroup)))
            .andExpect(status().isOk());

        // Validate the InternalGroup in the database
        List<InternalGroup> internalGroupList = internalGroupRepository.findAll();
        assertThat(internalGroupList).hasSize(databaseSizeBeforeUpdate);
        InternalGroup testInternalGroup = internalGroupList.get(internalGroupList.size() - 1);
        assertThat(testInternalGroup.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingInternalGroup() throws Exception {
        int databaseSizeBeforeUpdate = internalGroupRepository.findAll().size();

        // Create the InternalGroup

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restInternalGroupMockMvc.perform(put("/api/internal-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internalGroup)))
            .andExpect(status().isBadRequest());

        // Validate the InternalGroup in the database
        List<InternalGroup> internalGroupList = internalGroupRepository.findAll();
        assertThat(internalGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInternalGroup() throws Exception {
        // Initialize the database
        internalGroupRepository.saveAndFlush(internalGroup);

        int databaseSizeBeforeDelete = internalGroupRepository.findAll().size();

        // Get the internalGroup
        restInternalGroupMockMvc.perform(delete("/api/internal-groups/{id}", internalGroup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<InternalGroup> internalGroupList = internalGroupRepository.findAll();
        assertThat(internalGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InternalGroup.class);
        InternalGroup internalGroup1 = new InternalGroup();
        internalGroup1.setId(1L);
        InternalGroup internalGroup2 = new InternalGroup();
        internalGroup2.setId(internalGroup1.getId());
        assertThat(internalGroup1).isEqualTo(internalGroup2);
        internalGroup2.setId(2L);
        assertThat(internalGroup1).isNotEqualTo(internalGroup2);
        internalGroup1.setId(null);
        assertThat(internalGroup1).isNotEqualTo(internalGroup2);
    }
}
