package com.GymManagement.System.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ORDER_ID")
    private Long orderId;

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "USER_EMAIL")
    private String userEmail;

    @Column(name = "TOTAL_AMOUNT")
    private Integer totalAmount;

    @Column(name = "PAYMENT_STATUS")
    private String paymentStatus;

    @Column(name = "ORDER_DATE")           // 🔥 MISSING COLUMN
    private LocalDateTime orderDate;

    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JsonManagedReference
    private List<OrderItem> items;
}
