package io.github.info.application.web.rest;

import io.github.info.application.InformationManagerApp;

import io.github.info.application.domain.StaffRole;
import io.github.info.application.domain.Staff;
import io.github.info.application.domain.Role;
import io.github.info.application.repository.StaffRoleRepository;
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
 * Test class for the StaffRoleResource REST controller.
 *
 * @see StaffRoleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InformationManagerApp.class)
public class StaffRoleResourceIntTest {

    @Autowired
    private StaffRoleRepository staffRoleRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStaffRoleMockMvc;

    private StaffRole staffRole;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StaffRoleResource staffRoleResource = new StaffRoleResource(staffRoleRepository);
        this.restStaffRoleMockMvc = MockMvcBuilders.standaloneSetup(staffRoleResource)
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
    public static StaffRole createEntity(EntityManager em) {
        StaffRole staffRole = new StaffRole();
        // Add required entity
        Staff staff = StaffResourceIntTest.createEntity(em);
        em.persist(staff);
        em.flush();
        staffRole.setStaff(staff);
        // Add required entity
        Role role = RoleResourceIntTest.createEntity(em);
        em.persist(role);
        em.flush();
        staffRole.setRole(role);
        return staffRole;
    }

    @Before
    public void initTest() {
        staffRole = createEntity(em);
    }

    @Test
    @Transactional
    public void createStaffRole() throws Exception {
        int databaseSizeBeforeCreate = staffRoleRepository.findAll().size();

        // Create the StaffRole
        restStaffRoleMockMvc.perform(post("/api/staff-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staffRole)))
            .andExpect(status().isCreated());

        // Validate the StaffRole in the database
        List<StaffRole> staffRoleList = staffRoleRepository.findAll();
        assertThat(staffRoleList).hasSize(databaseSizeBeforeCreate + 1);
        StaffRole testStaffRole = staffRoleList.get(staffRoleList.size() - 1);
    }

    @Test
    @Transactional
    public void createStaffRoleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = staffRoleRepository.findAll().size();

        // Create the StaffRole with an existing ID
        staffRole.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStaffRoleMockMvc.perform(post("/api/staff-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staffRole)))
            .andExpect(status().isBadRequest());

        // Validate the StaffRole in the database
        List<StaffRole> staffRoleList = staffRoleRepository.findAll();
        assertThat(staffRoleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStaffRoles() throws Exception {
        // Initialize the database
        staffRoleRepository.saveAndFlush(staffRole);

        // Get all the staffRoleList
        restStaffRoleMockMvc.perform(get("/api/staff-roles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(staffRole.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getStaffRole() throws Exception {
        // Initialize the database
        staffRoleRepository.saveAndFlush(staffRole);

        // Get the staffRole
        restStaffRoleMockMvc.perform(get("/api/staff-roles/{id}", staffRole.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(staffRole.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingStaffRole() throws Exception {
        // Get the staffRole
        restStaffRoleMockMvc.perform(get("/api/staff-roles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStaffRole() throws Exception {
        // Initialize the database
        staffRoleRepository.saveAndFlush(staffRole);

        int databaseSizeBeforeUpdate = staffRoleRepository.findAll().size();

        // Update the staffRole
        StaffRole updatedStaffRole = staffRoleRepository.findById(staffRole.getId()).get();
        // Disconnect from session so that the updates on updatedStaffRole are not directly saved in db
        em.detach(updatedStaffRole);

        restStaffRoleMockMvc.perform(put("/api/staff-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStaffRole)))
            .andExpect(status().isOk());

        // Validate the StaffRole in the database
        List<StaffRole> staffRoleList = staffRoleRepository.findAll();
        assertThat(staffRoleList).hasSize(databaseSizeBeforeUpdate);
        StaffRole testStaffRole = staffRoleList.get(staffRoleList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingStaffRole() throws Exception {
        int databaseSizeBeforeUpdate = staffRoleRepository.findAll().size();

        // Create the StaffRole

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restStaffRoleMockMvc.perform(put("/api/staff-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(staffRole)))
            .andExpect(status().isBadRequest());

        // Validate the StaffRole in the database
        List<StaffRole> staffRoleList = staffRoleRepository.findAll();
        assertThat(staffRoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStaffRole() throws Exception {
        // Initialize the database
        staffRoleRepository.saveAndFlush(staffRole);

        int databaseSizeBeforeDelete = staffRoleRepository.findAll().size();

        // Get the staffRole
        restStaffRoleMockMvc.perform(delete("/api/staff-roles/{id}", staffRole.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<StaffRole> staffRoleList = staffRoleRepository.findAll();
        assertThat(staffRoleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StaffRole.class);
        StaffRole staffRole1 = new StaffRole();
        staffRole1.setId(1L);
        StaffRole staffRole2 = new StaffRole();
        staffRole2.setId(staffRole1.getId());
        assertThat(staffRole1).isEqualTo(staffRole2);
        staffRole2.setId(2L);
        assertThat(staffRole1).isNotEqualTo(staffRole2);
        staffRole1.setId(null);
        assertThat(staffRole1).isNotEqualTo(staffRole2);
    }
}
