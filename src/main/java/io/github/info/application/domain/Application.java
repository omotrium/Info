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
 * A Application.
 */
@Entity
@Table(name = "application")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Application implements Serializable {

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

    @OneToMany(mappedBy = "application")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ApplicationUser> applicationUsers = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("applications")
    private AuthenticationType authenticationTypes;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("applications")
    private ApplicationClient applicationClients;

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

    public Application name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Application description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUaaId() {
        return uaaId;
    }

    public Application uaaId(String uaaId) {
        this.uaaId = uaaId;
        return this;
    }

    public void setUaaId(String uaaId) {
        this.uaaId = uaaId;
    }

    public Set<ApplicationUser> getApplicationUsers() {
        return applicationUsers;
    }

    public Application applicationUsers(Set<ApplicationUser> applicationUsers) {
        this.applicationUsers = applicationUsers;
        return this;
    }

    public Application addApplicationUser(ApplicationUser applicationUser) {
        this.applicationUsers.add(applicationUser);
        applicationUser.setApplication(this);
        return this;
    }

    public Application removeApplicationUser(ApplicationUser applicationUser) {
        this.applicationUsers.remove(applicationUser);
        applicationUser.setApplication(null);
        return this;
    }

    public void setApplicationUsers(Set<ApplicationUser> applicationUsers) {
        this.applicationUsers = applicationUsers;
    }

    public AuthenticationType getAuthenticationTypes() {
        return authenticationTypes;
    }

    public Application authenticationTypes(AuthenticationType authenticationType) {
        this.authenticationTypes = authenticationType;
        return this;
    }

    public void setAuthenticationTypes(AuthenticationType authenticationType) {
        this.authenticationTypes = authenticationType;
    }

    public ApplicationClient getApplicationClients() {
        return applicationClients;
    }

    public Application applicationClients(ApplicationClient applicationClient) {
        this.applicationClients = applicationClient;
        return this;
    }

    public void setApplicationClients(ApplicationClient applicationClient) {
        this.applicationClients = applicationClient;
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
        Application application = (Application) o;
        if (application.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), application.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Application{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", uaaId='" + getUaaId() + "'" +
            "}";
    }
}
