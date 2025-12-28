package com.GymManagement.System.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "membership_details")
public class Membership  extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBERSHIP_ID")
    private Long id;

    @Column(name = "PLAN_NAME", nullable = false)
    private String planName;

    @Column(name = "PLAN_MONTHS", nullable = false)
    private Integer months;

    @Column(name = "PLAN_PRICE", nullable = false)
    private Integer price;

    @Column(name = "PLAN_DISCOUNT", nullable = false)
    private Integer discount;

    @Column(name = "FINAL_PRICE", nullable = false)
    private Integer finalPrice;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "IS_ACTIVE")
    private Boolean active = true;

    @PrePersist
    public void onCreate() {
        if (price != null && discount != null)
            finalPrice = price - discount;

    }

    @PreUpdate
    public void onUpdate() {
        if (price != null && discount != null)
            finalPrice = price - discount;
    }
    // getters & setters
}
