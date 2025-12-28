package com.GymManagement.System.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "addresses")
public class Address extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;   // <-- REQUIRED

  // FK column

    @Column(name = "door_no", nullable = false, length = 50)
    private String doorNo;

    @Column(name = "street", nullable = false, length = 150)
    private String street;

    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @Column(name = "state", nullable = false, length = 100)
    private String state;

    @Column(name = "pincode", nullable = false, length = 10)
    private String pincode;


    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="user_id", nullable = false, unique = true)
    private User user;
}
