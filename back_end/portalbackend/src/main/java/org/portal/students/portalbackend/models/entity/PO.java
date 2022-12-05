package org.portal.students.portalbackend.models.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.portal.students.portalbackend.config.security.SessionHelper;
import org.portal.students.portalbackend.utils.AppUtils;
import org.portal.students.portalbackend.utils.IDUtils;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlTransient;
import java.time.LocalDateTime;


@XmlTransient
@Getter
@Setter
@MappedSuperclass
public abstract class PO {

    @Id
    @JsonIgnore
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;


    @NotNull
    @JsonIgnore
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Africa/Nairobi")
    @Column(name = "created_at")
    private LocalDateTime created;

    @NotNull
    @JsonIgnore
    @Column(name = "created_by",length=60)
    private String createdBy;

    @Nullable
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Africa/Nairobi")
    @Column(name = "updated_at")
    private LocalDateTime updated;

    @Nullable
    @JsonIgnore
    @Column(name = "updated_by", length=60)
    private String updatedBy;


    @Nullable
    @JsonIgnore
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Africa/Nairobi")
    @Column(name = "deleted_at")
    private LocalDateTime deleted;

    @Nullable
    @JsonIgnore
    @Column(name = "deleted_by", length=60)
    private String deletedBy;

    @JsonIgnore
    @Column(name = "refId", length = 16)
    protected String refId;

    @PrePersist
    public void onPrePersist(){
        setCreated(LocalDateTime.now());
        var user = SessionHelper.getCurrentUser();
        this.setCreatedBy(user.getKeycloakId());
        if(AppUtils.StringUtils.isNullOrEmpty(refId)){
            refId = IDUtils.generateId();
        }
    }

    @PreUpdate
    public void onPreUpdate(){
        this.setUpdated(LocalDateTime.now());
        var user = SessionHelper.getCurrentUser();
        this.setUpdatedBy(user.getKeycloakId());
    }

    @JsonIgnore
    @XmlTransient
    @Column(columnDefinition="tinyint(1) default 1")
    private int isActive=1;
}
