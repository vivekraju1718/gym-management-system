package com.GymManagement.System.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "user_memberships")
@Getter
@Setter
public class UserMembership extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_MEMBERSHIP_ID")
    private Long id;

    @Column(name = "USER_ID", nullable = false)
    private Long userId;

    @Column(name = "USER_EMAIL", nullable = false)
    private String userEmail;

    @Column(name = "MEMBERSHIP_ID", nullable = false)
    private Long membershipId;

    @Column(name = "PLAN_NAME")
    private String planName;

    @Column(name = "PLAN_MONTHS")
    private Integer planMonths;

    @Column(name = "PLAN_PRICE")
    private Integer planPrice;

    @Column(name = "USER_PAID_PRICE")
    private Integer userPaidPrice;

    @Column(name = "START_DATE")
    private LocalDate startDate;

    @Column(name = "END_DATE")
    private LocalDate endDate;

    @Column(name = "STATUS")
    private String status;   // ACTIVE / EXPIRED
}
