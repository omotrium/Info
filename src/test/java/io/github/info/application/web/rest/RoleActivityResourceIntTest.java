package io.github.info.application.web.rest;

import io.github.info.application.InformationManagerApp;

import io.github.info.application.domain.RoleActivity;
import io.github.info.application.domain.Role;
import io.github.info.application.domain.Activity;
import io.github.info.application.repository.RoleActivityRepository;
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
 * Test class for the RoleActivityResource REST controller.
 *
 * @see RoleActivityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InformationManagerApp.class)
public class RoleActivityResourceIntTest {

    @Autowired
    private RoleActivityRepository roleActivityRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRoleActivityMockMvc;

    private RoleActivity roleActivity;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RoleActivityResource roleActivityResource = new RoleActivityResource(roleActivityRepository);
        this.restRoleActivityMockMvc = MockMvcBuilders.standaloneSetup(roleActivityResource)
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
    public static RoleActivity createEntity(EntityManager em) {
        RoleActivity roleActivity = new RoleActivity();
        // Add required entity
        Role role = RoleResourceIntTest.createEntity(em);
        em.persist(role);
        em.flush();
        roleActivity.setRoles(role);
        // Add required entity
        Activity activity = ActivityResourceIntTest.createEntity(em);
        em.persist(activity);
        em.flush();
        roleActivity.setActivity(activity);
        return roleActivity;
    }

    @Before
    public void initTest() {
        roleActivity = createEntity(em);
    }

    @Test
    @Transactional
    public void createRoleActivity() throws Exception {
        int databaseSizeBeforeCreate = roleActivityRepository.findAll().size();

        // Create the RoleActivity
        restRoleActivityMockMvc.perform(post("/api/role-activities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roleActivity)))
            .andExpect(status().isCreated());

        // Validate the RoleActivity in the database
        List<RoleActivity> roleActivityList = roleActivityRepository.findAll();
        assertThat(roleActivityList).hasSize(databaseSizeBeforeCreate + 1);
        RoleActivity testRoleActivity = roleActivityList.get(roleActivityList.size() - 1);
    }

    @Test
    @Transactional
    public void createRoleActivityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = roleActivityRepository.findAll().size();

        // Create the RoleActivity with an existing ID
        roleActivity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoleActivityMockMvc.perform(post("/api/role-activities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roleActivity)))
            .andExpect(status().isBadRequest());

        // Validate the RoleActivity in the database
        List<RoleActivity> roleActivityList = roleActivityRepository.findAll();
        assertThat(roleActivityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRoleActivities() throws Exception {
        // Initialize the database
        roleActivityRepository.saveAndFlush(roleActivity);

        // Get all the roleActivityList
        restRoleActivityMockMvc.perform(get("/api/role-activities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(roleActivity.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getRoleActivity() throws Exception {
        // Initialize the database
        roleActivityRepository.saveAndFlush(roleActivity);

        // Get the roleActivity
        restRoleActivityMockMvc.perform(get("/api/role-activities/{id}", roleActivity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(roleActivity.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingRoleActivity() throws Exception {
        // Get the roleActivity
        restRoleActivityMockMvc.perform(get("/api/role-activities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRoleActivity() throws Exception {
        // Initialize the database
        roleActivityRepository.saveAndFlush(roleActivity);

        int databaseSizeBeforeUpdate = roleActivityRepository.findAll().size();

        // Update the roleActivity
        RoleActivity updatedRoleActivity = roleActivityRepository.findById(roleActivity.getId()).get();
        // Disconnect from session so that the updates on updatedRoleActivity are not directly saved in db
        em.detach(updatedRoleActivity);

        restRoleActivityMockMvc.perform(put("/api/role-activities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRoleActivity)))
            .andExpect(status().isOk());

        // Validate the RoleActivity in the database
        List<RoleActivity> roleActivityList = roleActivityRepository.findAll();
        assertThat(roleActivityList).hasSize(databaseSizeBeforeUpdate);
        RoleActivity testRoleActivity = roleActivityList.get(roleActivityList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingRoleActivity() throws Exception {
        int databaseSizeBeforeUpdate = roleActivityRepository.findAll().size();

        // Create the RoleActivity

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restRoleActivityMockMvc.perform(put("/api/role-activities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roleActivity)))
            .andExpect(status().isBadRequest());

        // Validate the RoleActivity in the database
        List<RoleActivity> roleActivityList = roleActivityRepository.findAll();
        assertThat(roleActivityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRoleActivity() throws Exception {
        // Initialize the database
        roleActivityRepository.saveAndFlush(roleActivity);

        int databaseSizeBeforeDelete = roleActivityRepository.findAll().size();

        // Get the roleActivity
        restRoleActivityMockMvc.perform(delete("/api/role-activities/{id}", roleActivity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RoleActivity> roleActivityList = roleActivityRepository.findAll();
        assertThat(roleActivityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RoleActivity.class);
        RoleActivity roleActivity1 = new RoleActivity();
        roleActivity1.setId(1L);
        RoleActivity roleActivity2 = new RoleActivity();
        roleActivity2.setId(roleActivity1.getId());
        assertThat(roleActivity1).isEqualTo(roleActivity2);
        roleActivity2.setId(2L);
        assertThat(roleActivity1).isNotEqualTo(roleActivity2);
        roleActivity1.setId(null);
        assertThat(roleActivity1).isNotEqualTo(roleActivity2);
    }
}
