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
 * A AuthenticationType.
 */
@Entity
@Table(name = "authentication_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AuthenticationType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "token")
    private String token;

    @OneToMany(mappedBy = "authenticationTypes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Application> applications = new HashSet<>();

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

    public AuthenticationType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public AuthenticationType token(String token) {
        this.token = token;
        return this;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Set<Application> getApplications() {
        return applications;
    }

    public AuthenticationType applications(Set<Application> applications) {
        this.applications = applications;
        return this;
    }

    public AuthenticationType addApplications(Application application) {
        this.applications.add(application);
        application.setAuthenticationTypes(this);
        return this;
    }

    public AuthenticationType removeApplications(Application application) {
        this.applications.remove(application);
        application.setAuthenticationTypes(null);
        return this;
    }

    public void setApplications(Set<Application> applications) {
        this.applications = applications;
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
        AuthenticationType authenticationType = (AuthenticationType) o;
        if (authenticationType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), authenticationType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AuthenticationType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", token='" + getToken() + "'" +
            "}";
    }
}
