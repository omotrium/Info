package io.github.info.application.web.rest;

import io.github.info.application.InformationManagerApp;

import io.github.info.application.domain.AuthenticationType;
import io.github.info.application.repository.AuthenticationTypeRepository;
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
 * Test class for the AuthenticationTypeResource REST controller.
 *
 * @see AuthenticationTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InformationManagerApp.class)
public class AuthenticationTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TOKEN = "AAAAAAAAAA";
    private static final String UPDATED_TOKEN = "BBBBBBBBBB";

    @Autowired
    private AuthenticationTypeRepository authenticationTypeRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAuthenticationTypeMockMvc;

    private AuthenticationType authenticationType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AuthenticationTypeResource authenticationTypeResource = new AuthenticationTypeResource(authenticationTypeRepository);
        this.restAuthenticationTypeMockMvc = MockMvcBuilders.standaloneSetup(authenticationTypeResource)
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
    public static AuthenticationType createEntity(EntityManager em) {
        AuthenticationType authenticationType = new AuthenticationType()
            .name(DEFAULT_NAME)
            .token(DEFAULT_TOKEN);
        return authenticationType;
    }

    @Before
    public void initTest() {
        authenticationType = createEntity(em);
    }

    @Test
    @Transactional
    public void createAuthenticationType() throws Exception {
        int databaseSizeBeforeCreate = authenticationTypeRepository.findAll().size();

        // Create the AuthenticationType
        restAuthenticationTypeMockMvc.perform(post("/api/authentication-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(authenticationType)))
            .andExpect(status().isCreated());

        // Validate the AuthenticationType in the database
        List<AuthenticationType> authenticationTypeList = authenticationTypeRepository.findAll();
        assertThat(authenticationTypeList).hasSize(databaseSizeBeforeCreate + 1);
        AuthenticationType testAuthenticationType = authenticationTypeList.get(authenticationTypeList.size() - 1);
        assertThat(testAuthenticationType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAuthenticationType.getToken()).isEqualTo(DEFAULT_TOKEN);
    }

    @Test
    @Transactional
    public void createAuthenticationTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = authenticationTypeRepository.findAll().size();

        // Create the AuthenticationType with an existing ID
        authenticationType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAuthenticationTypeMockMvc.perform(post("/api/authentication-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(authenticationType)))
            .andExpect(status().isBadRequest());

        // Validate the AuthenticationType in the database
        List<AuthenticationType> authenticationTypeList = authenticationTypeRepository.findAll();
        assertThat(authenticationTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = authenticationTypeRepository.findAll().size();
        // set the field null
        authenticationType.setName(null);

        // Create the AuthenticationType, which fails.

        restAuthenticationTypeMockMvc.perform(post("/api/authentication-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(authenticationType)))
            .andExpect(status().isBadRequest());

        List<AuthenticationType> authenticationTypeList = authenticationTypeRepository.findAll();
        assertThat(authenticationTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAuthenticationTypes() throws Exception {
        // Initialize the database
        authenticationTypeRepository.saveAndFlush(authenticationType);

        // Get all the authenticationTypeList
        restAuthenticationTypeMockMvc.perform(get("/api/authentication-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(authenticationType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].token").value(hasItem(DEFAULT_TOKEN.toString())));
    }
    

    @Test
    @Transactional
    public void getAuthenticationType() throws Exception {
        // Initialize the database
        authenticationTypeRepository.saveAndFlush(authenticationType);

        // Get the authenticationType
        restAuthenticationTypeMockMvc.perform(get("/api/authentication-types/{id}", authenticationType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(authenticationType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.token").value(DEFAULT_TOKEN.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAuthenticationType() throws Exception {
        // Get the authenticationType
        restAuthenticationTypeMockMvc.perform(get("/api/authentication-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAuthenticationType() throws Exception {
        // Initialize the database
        authenticationTypeRepository.saveAndFlush(authenticationType);

        int databaseSizeBeforeUpdate = authenticationTypeRepository.findAll().size();

        // Update the authenticationType
        AuthenticationType updatedAuthenticationType = authenticationTypeRepository.findById(authenticationType.getId()).get();
        // Disconnect from session so that the updates on updatedAuthenticationType are not directly saved in db
        em.detach(updatedAuthenticationType);
        updatedAuthenticationType
            .name(UPDATED_NAME)
            .token(UPDATED_TOKEN);

        restAuthenticationTypeMockMvc.perform(put("/api/authentication-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAuthenticationType)))
            .andExpect(status().isOk());

        // Validate the AuthenticationType in the database
        List<AuthenticationType> authenticationTypeList = authenticationTypeRepository.findAll();
        assertThat(authenticationTypeList).hasSize(databaseSizeBeforeUpdate);
        AuthenticationType testAuthenticationType = authenticationTypeList.get(authenticationTypeList.size() - 1);
        assertThat(testAuthenticationType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAuthenticationType.getToken()).isEqualTo(UPDATED_TOKEN);
    }

    @Test
    @Transactional
    public void updateNonExistingAuthenticationType() throws Exception {
        int databaseSizeBeforeUpdate = authenticationTypeRepository.findAll().size();

        // Create the AuthenticationType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restAuthenticationTypeMockMvc.perform(put("/api/authentication-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(authenticationType)))
            .andExpect(status().isBadRequest());

        // Validate the AuthenticationType in the database
        List<AuthenticationType> authenticationTypeList = authenticationTypeRepository.findAll();
        assertThat(authenticationTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAuthenticationType() throws Exception {
        // Initialize the database
        authenticationTypeRepository.saveAndFlush(authenticationType);

        int databaseSizeBeforeDelete = authenticationTypeRepository.findAll().size();

        // Get the authenticationType
        restAuthenticationTypeMockMvc.perform(delete("/api/authentication-types/{id}", authenticationType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AuthenticationType> authenticationTypeList = authenticationTypeRepository.findAll();
        assertThat(authenticationTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AuthenticationType.class);
        AuthenticationType authenticationType1 = new AuthenticationType();
        authenticationType1.setId(1L);
        AuthenticationType authenticationType2 = new AuthenticationType();
        authenticationType2.setId(authenticationType1.getId());
        assertThat(authenticationType1).isEqualTo(authenticationType2);
        authenticationType2.setId(2L);
        assertThat(authenticationType1).isNotEqualTo(authenticationType2);
        authenticationType1.setId(null);
        assertThat(authenticationType1).isNotEqualTo(authenticationType2);
    }
}
