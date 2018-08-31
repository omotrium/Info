package io.github.info.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Role.
 */
@Entity
@Table(name = "role")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "uaa_id")
    private String uaaId;

    @OneToMany(mappedBy = "roles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RoleActivity> roleActivities = new HashSet<>();

    @OneToMany(mappedBy = "role")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<StaffRole> staffRoles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Role name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Role description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUaaId() {
        return uaaId;
    }

    public Role uaaId(String uaaId) {
        this.uaaId = uaaId;
        return this;
    }

    public void setUaaId(String uaaId) {
        this.uaaId = uaaId;
    }

    public Set<RoleActivity> getRoleActivities() {
        return roleActivities;
    }

    public Role roleActivities(Set<RoleActivity> roleActivities) {
        this.roleActivities = roleActivities;
        return this;
    }

    public Role addRoleActivity(RoleActivity roleActivity) {
        this.roleActivities.add(roleActivity);
        roleActivity.setRoles(this);
        return this;
    }

    public Role removeRoleActivity(RoleActivity roleActivity) {
        this.roleActivities.remove(roleActivity);
        roleActivity.setRoles(null);
        return this;
    }

    public void setRoleActivities(Set<RoleActivity> roleActivities) {
        this.roleActivities = roleActivities;
    }

    public Set<StaffRole> getStaffRoles() {
        return staffRoles;
    }

    public Role staffRoles(Set<StaffRole> staffRoles) {
        this.staffRoles = staffRoles;
        return this;
    }

    public Role addStaffRole(StaffRole staffRole) {
        this.staffRoles.add(staffRole);
        staffRole.setRole(this);
        return this;
    }

    public Role removeStaffRole(StaffRole staffRole) {
        this.staffRoles.remove(staffRole);
        staffRole.setRole(null);
        return this;
    }

    public void setStaffRoles(Set<StaffRole> staffRoles) {
        this.staffRoles = staffRoles;
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
        Role role = (Role) o;
        if (role.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), role.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Role{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", uaaId='" + getUaaId() + "'" +
            "}";
    }
}
