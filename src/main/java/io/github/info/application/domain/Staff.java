package io.github.info.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Staff.
 */
@Entity
@Table(name = "staff")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Staff implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "username")
    private String username;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "account_status")
    private String accountStatus;

    @Column(name = "jhi_password")
    private String password;

    @Column(name = "verified_by")
    private String verifiedBy;

    @Column(name = "login_count")
    private String loginCount;

    @OneToMany(mappedBy = "staff")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ApplicationUser> applicationUsers = new HashSet<>();

    @OneToMany(mappedBy = "staff")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<StaffRole> staffRoles = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("staffs")
    private Organisation organisations;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("staffs")
    private InternalGroup internalGroup;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("staffs")
    private UserType userTypes;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Staff firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Staff lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public Staff username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public Staff email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAccountStatus() {
        return accountStatus;
    }

    public Staff accountStatus(String accountStatus) {
        this.accountStatus = accountStatus;
        return this;
    }

    public void setAccountStatus(String accountStatus) {
        this.accountStatus = accountStatus;
    }

    public String getPassword() {
        return password;
    }

    public Staff password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getVerifiedBy() {
        return verifiedBy;
    }

    public Staff verifiedBy(String verifiedBy) {
        this.verifiedBy = verifiedBy;
        return this;
    }

    public void setVerifiedBy(String verifiedBy) {
        this.verifiedBy = verifiedBy;
    }

    public String getLoginCount() {
        return loginCount;
    }

    public Staff loginCount(String loginCount) {
        this.loginCount = loginCount;
        return this;
    }

    public void setLoginCount(String loginCount) {
        this.loginCount = loginCount;
    }

    public Set<ApplicationUser> getApplicationUsers() {
        return applicationUsers;
    }

    public Staff applicationUsers(Set<ApplicationUser> applicationUsers) {
        this.applicationUsers = applicationUsers;
        return this;
    }

    public Staff addApplicationUser(ApplicationUser applicationUser) {
        this.applicationUsers.add(applicationUser);
        applicationUser.setStaff(this);
        return this;
    }

    public Staff removeApplicationUser(ApplicationUser applicationUser) {
        this.applicationUsers.remove(applicationUser);
        applicationUser.setStaff(null);
        return this;
    }

    public void setApplicationUsers(Set<ApplicationUser> applicationUsers) {
        this.applicationUsers = applicationUsers;
    }

    public Set<StaffRole> getStaffRoles() {
        return staffRoles;
    }

    public Staff staffRoles(Set<StaffRole> staffRoles) {
        this.staffRoles = staffRoles;
        return this;
    }

    public Staff addStaffRole(StaffRole staffRole) {
        this.staffRoles.add(staffRole);
        staffRole.setStaff(this);
        return this;
    }

    public Staff removeStaffRole(StaffRole staffRole) {
        this.staffRoles.remove(staffRole);
        staffRole.setStaff(null);
        return this;
    }

    public void setStaffRoles(Set<StaffRole> staffRoles) {
        this.staffRoles = staffRoles;
    }

    public Organisation getOrganisations() {
        return organisations;
    }

    public Staff organisations(Organisation organisation) {
        this.organisations = organisation;
        return this;
    }

    public void setOrganisations(Organisation organisation) {
        this.organisations = organisation;
    }

    public InternalGroup getInternalGroup() {
        return internalGroup;
    }

    public Staff internalGroup(InternalGroup internalGroup) {
        this.internalGroup = internalGroup;
        return this;
    }

    public void setInternalGroup(InternalGroup internalGroup) {
        this.internalGroup = internalGroup;
    }

    public UserType getUserTypes() {
        return userTypes;
    }

    public Staff userTypes(UserType userType) {
        this.userTypes = userType;
        return this;
    }

    public void setUserTypes(UserType userType) {
        this.userTypes = userType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Staff staff = (Staff) o;
        if (staff.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), staff.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Staff{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", username='" + getUsername() + "'" +
            ", email='" + getEmail() + "'" +
            ", accountStatus='" + getAccountStatus() + "'" +
            ", password='" + getPassword() + "'" +
            ", verifiedBy='" + getVerifiedBy() + "'" +
            ", loginCount='" + getLoginCount() + "'" +
            "}";
    }
}
