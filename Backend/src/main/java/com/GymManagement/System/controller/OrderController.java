package com.GymManagement.System.controller;

import com.GymManagement.System.entity.Order;
import com.GymManagement.System.entity.User;
import com.GymManagement.System.service.OrderService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }
    @GetMapping("/my")
    public List<Order> myOrders() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        Long id = user.getId();

        System.out.println("====== DEBUG ======");
        System.out.println("USER ID = " + id);

        List<Order> orders = service.getMyOrders(id);

        System.out.println("ORDERS COUNT = " + orders.size());

        for (Order o : orders) {
            System.out.println("ORDER FOUND ID = " + o.getOrderId());
        }

        return orders;
    }

}
