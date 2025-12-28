package com.GymManagement.System.controller;

import com.GymManagement.System.entity.ContactMessage;
import com.GymManagement.System.entity.Order;
import com.GymManagement.System.entity.User;
import com.GymManagement.System.entity.UserMembership;
import com.GymManagement.System.service.ContactService;
import com.GymManagement.System.service.OrderService;
import com.GymManagement.System.service.UserMembershipService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.GymManagement.System.constants.ApplicationConstants;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/manager")

public class ManagerController {

    private final OrderService orderService;

    private final ContactService contactService;
    private final UserMembershipService service;
    @GetMapping("/memberships")
    public List<UserMembership> getAllCustomerMemberships() {
        return service.getAllMemberships();
    }
    @GetMapping("/orders/created")
    public List<Order> createdOrders() {
        return orderService.getCreatedOrders();
    }

    @PutMapping("/orders/{id}/confirm")
    public void confirm(@PathVariable Long id) {
        orderService.updateOrderStatus(id, ApplicationConstants.BOOKING_STATUS_CONFIRMED);
    }

    @PutMapping("/orders/{id}/cancel")
    public void cancel(@PathVariable Long id) {
        orderService.updateOrderStatus(id, ApplicationConstants.BOOKING_STATUS_CANCELLED);
    }

    @GetMapping("/contacts/sent")
    public List<ContactMessage> getPendingContacts(){
        return contactService.pending();
    }

    @PutMapping("/contacts/{id}/accept")
    public void acceptContact(@PathVariable Long id){
        contactService.update(id, ApplicationConstants.CONTACT_STATUS_ACCEPTED);
    }

    @PutMapping("/contacts/{id}/reject")
    public void rejectContact(@PathVariable Long id){
        contactService.update(id, ApplicationConstants.CONTACT_STATUS_REJECTED);
    }

}
