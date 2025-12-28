package com.GymManagement.System.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @Column(name="username", unique=true, nullable=false)
    private String username;

    @Column(nullable=false)
    private String password;

    @OneToOne(mappedBy="user", cascade=CascadeType.ALL, orphanRemoval=true)
    private Address address;
    @Column(name="STRIPE_CUSTOMER_ID")
    private String stripeCustomerId;


    @OneToMany(mappedBy="user", fetch=FetchType.EAGER,
            cascade=CascadeType.ALL, orphanRemoval=true)
    private Set<Role> roles;
}
