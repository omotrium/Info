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
 * A Activity.
 */
@Entity
@Table(name = "activity")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Activity implements Serializable {

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

    @OneToMany(mappedBy = "activity")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RoleActivity> roleActivities = new HashSet<>();

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

    public Activity name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Activity description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUaaId() {
        return uaaId;
    }

    public Activity uaaId(String uaaId) {
        this.uaaId = uaaId;
        return this;
    }

    public void setUaaId(String uaaId) {
        this.uaaId = uaaId;
    }

    public Set<RoleActivity> getRoleActivities() {
        return roleActivities;
    }

    public Activity roleActivities(Set<RoleActivity> roleActivities) {
        this.roleActivities = roleActivities;
        return this;
    }

    public Activity addRoleActivity(RoleActivity roleActivity) {
        this.roleActivities.add(roleActivity);
        roleActivity.setActivity(this);
        return this;
    }

    public Activity removeRoleActivity(RoleActivity roleActivity) {
        this.roleActivities.remove(roleActivity);
        roleActivity.setActivity(null);
        return this;
    }

    public void setRoleActivities(Set<RoleActivity> roleActivities) {
        this.roleActivities = roleActivities;
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
        Activity activity = (Activity) o;
        if (activity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), activity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Activity{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", uaaId='" + getUaaId() + "'" +
            "}";
    }
}
