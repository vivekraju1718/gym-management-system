package com.GymManagement.System.service;

import com.GymManagement.System.entity.Order;
import com.GymManagement.System.repository.OrderRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import com.GymManagement.System.constants.ApplicationConstants;
@Service
public class OrderService {

    private final OrderRepository repo;

    public OrderService(OrderRepository repo) {
        this.repo = repo;
    }

    public List<Order> getMyOrders(Long userId) {   // 🔥 accept ID
        return repo.findByUserId(userId);
    }
    public List<Order> getCreatedOrders() {
        return repo.findByPaymentStatus(ApplicationConstants.BOOKING_STATUS_CREATED);
    }

    public Order updateOrderStatus(Long id, String status) {
        Order o = repo.findById(id).orElseThrow();
        o.setPaymentStatus(status);
        return repo.save(o);
    }

}
