package com.GymManagement.System.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "contact_messages")
@Getter
@Setter
public class ContactMessage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CONTACT_ID")
    private Long contactId;

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "USER_EMAIL")
    private String userEmail;

    @Column(name = "SUBJECT")
    private String subject;

    @Column(name = "MESSAGE", columnDefinition = "TEXT")
    private String message;

    @Column(name = "STATUS")
    private String status;
}
