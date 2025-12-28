package com.GymManagement.System.repository;

import com.GymManagement.System.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByPaymentStatus(String status);
    List<Order> findByUserId(Long userId);
}
