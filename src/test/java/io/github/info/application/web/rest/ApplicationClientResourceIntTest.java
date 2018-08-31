package io.github.info.application.web.rest;

import io.github.info.application.InformationManagerApp;

import io.github.info.application.domain.ApplicationClient;
import io.github.info.application.repository.ApplicationClientRepository;
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
 * Test class for the ApplicationClientResource REST controller.
 *
 * @see ApplicationClientResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InformationManagerApp.class)
public class ApplicationClientResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ApplicationClientRepository applicationClientRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restApplicationClientMockMvc;

    private ApplicationClient applicationClient;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ApplicationClientResource applicationClientResource = new ApplicationClientResource(applicationClientRepository);
        this.restApplicationClientMockMvc = MockMvcBuilders.standaloneSetup(applicationClientResource)
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
    public static ApplicationClient createEntity(EntityManager em) {
        ApplicationClient applicationClient = new ApplicationClient()
            .name(DEFAULT_NAME);
        return applicationClient;
    }

    @Before
    public void initTest() {
        applicationClient = createEntity(em);
    }

    @Test
    @Transactional
    public void createApplicationClient() throws Exception {
        int databaseSizeBeforeCreate = applicationClientRepository.findAll().size();

        // Create the ApplicationClient
        restApplicationClientMockMvc.perform(post("/api/application-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationClient)))
            .andExpect(status().isCreated());

        // Validate the ApplicationClient in the database
        List<ApplicationClient> applicationClientList = applicationClientRepository.findAll();
        assertThat(applicationClientList).hasSize(databaseSizeBeforeCreate + 1);
        ApplicationClient testApplicationClient = applicationClientList.get(applicationClientList.size() - 1);
        assertThat(testApplicationClient.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createApplicationClientWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = applicationClientRepository.findAll().size();

        // Create the ApplicationClient with an existing ID
        applicationClient.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restApplicationClientMockMvc.perform(post("/api/application-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationClient)))
            .andExpect(status().isBadRequest());

        // Validate the ApplicationClient in the database
        List<ApplicationClient> applicationClientList = applicationClientRepository.findAll();
        assertThat(applicationClientList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = applicationClientRepository.findAll().size();
        // set the field null
        applicationClient.setName(null);

        // Create the ApplicationClient, which fails.

        restApplicationClientMockMvc.perform(post("/api/application-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationClient)))
            .andExpect(status().isBadRequest());

        List<ApplicationClient> applicationClientList = applicationClientRepository.findAll();
        assertThat(applicationClientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllApplicationClients() throws Exception {
        // Initialize the database
        applicationClientRepository.saveAndFlush(applicationClient);

        // Get all the applicationClientList
        restApplicationClientMockMvc.perform(get("/api/application-clients?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(applicationClient.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getApplicationClient() throws Exception {
        // Initialize the database
        applicationClientRepository.saveAndFlush(applicationClient);

        // Get the applicationClient
        restApplicationClientMockMvc.perform(get("/api/application-clients/{id}", applicationClient.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(applicationClient.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingApplicationClient() throws Exception {
        // Get the applicationClient
        restApplicationClientMockMvc.perform(get("/api/application-clients/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateApplicationClient() throws Exception {
        // Initialize the database
        applicationClientRepository.saveAndFlush(applicationClient);

        int databaseSizeBeforeUpdate = applicationClientRepository.findAll().size();

        // Update the applicationClient
        ApplicationClient updatedApplicationClient = applicationClientRepository.findById(applicationClient.getId()).get();
        // Disconnect from session so that the updates on updatedApplicationClient are not directly saved in db
        em.detach(updatedApplicationClient);
        updatedApplicationClient
            .name(UPDATED_NAME);

        restApplicationClientMockMvc.perform(put("/api/application-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedApplicationClient)))
            .andExpect(status().isOk());

        // Validate the ApplicationClient in the database
        List<ApplicationClient> applicationClientList = applicationClientRepository.findAll();
        assertThat(applicationClientList).hasSize(databaseSizeBeforeUpdate);
        ApplicationClient testApplicationClient = applicationClientList.get(applicationClientList.size() - 1);
        assertThat(testApplicationClient.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingApplicationClient() throws Exception {
        int databaseSizeBeforeUpdate = applicationClientRepository.findAll().size();

        // Create the ApplicationClient

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restApplicationClientMockMvc.perform(put("/api/application-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationClient)))
            .andExpect(status().isBadRequest());

        // Validate the ApplicationClient in the database
        List<ApplicationClient> applicationClientList = applicationClientRepository.findAll();
        assertThat(applicationClientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteApplicationClient() throws Exception {
        // Initialize the database
        applicationClientRepository.saveAndFlush(applicationClient);

        int databaseSizeBeforeDelete = applicationClientRepository.findAll().size();

        // Get the applicationClient
        restApplicationClientMockMvc.perform(delete("/api/application-clients/{id}", applicationClient.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ApplicationClient> applicationClientList = applicationClientRepository.findAll();
        assertThat(applicationClientList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ApplicationClient.class);
        ApplicationClient applicationClient1 = new ApplicationClient();
        applicationClient1.setId(1L);
        ApplicationClient applicationClient2 = new ApplicationClient();
        applicationClient2.setId(applicationClient1.getId());
        assertThat(applicationClient1).isEqualTo(applicationClient2);
        applicationClient2.setId(2L);
        assertThat(applicationClient1).isNotEqualTo(applicationClient2);
        applicationClient1.setId(null);
        assertThat(applicationClient1).isNotEqualTo(applicationClient2);
    }
}
