package com.GymManagement.System.service;

import com.GymManagement.System.dto.CartCheckoutRequest;
import com.GymManagement.System.entity.Order;
import com.GymManagement.System.entity.OrderItem;
import com.GymManagement.System.entity.User;
import com.GymManagement.System.repository.OrderItemRepository;
import com.GymManagement.System.repository.OrderRepository;
import com.GymManagement.System.repository.UserRepository;
import com.GymManagement.System.util.StripeCustomerUtil;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;
import com.GymManagement.System.constants.ApplicationConstants;@Service
public class StripeCartService {

    private final OrderRepository orderRepo;
    private final OrderItemRepository orderItemRepo;
    private final UserRepository userRepo;
    private final StripeCustomerUtil stripeUtil;

    public StripeCartService(OrderRepository o, OrderItemRepository oi, UserRepository ur, StripeCustomerUtil util){
        this.orderRepo = o;
        this.orderItemRepo = oi;
        this.userRepo = ur;
        this.stripeUtil = util;
    }

    public String checkout(CartCheckoutRequest req, Long userId, String userEmail) throws Exception {

        User user = userRepo.findById(userId).orElseThrow();
        var customer = stripeUtil.getOrCreate(user);

        SessionCreateParams.Builder builder = SessionCreateParams.builder()
                .setCustomer(customer.getId())   // 🔒 PRIVATE CUSTOMER
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/payment-success")
                .setCancelUrl("http://localhost:5173/payment-failed");

        int total = 0;
        for (var i : req.getItems()) {
            total += i.getPrice() * i.getQuantity();

            builder.addLineItem(
                    SessionCreateParams.LineItem.builder()
                            .setQuantity(Long.valueOf(i.getQuantity()))
                            .setPriceData(
                                    SessionCreateParams.LineItem.PriceData.builder()
                                            .setCurrency("inr")
                                            .setUnitAmount((long) i.getPrice() * 100)
                                            .setProductData(
                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                            .setName(i.getName()).build())
                                            .build())
                            .build());
        }

        Session session = Session.create(builder.build());

        Order order = new Order();
        order.setUserId(userId);
        order.setUserEmail(userEmail);
        order.setTotalAmount(total);
        order.setPaymentStatus(ApplicationConstants.BOOKING_STATUS_CREATED);
        orderRepo.save(order);

        for (var i : req.getItems()) {
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProductId(i.getProductId());
            item.setProductName(i.getName());
            item.setProductPrice(i.getPrice());
            item.setQuantity(i.getQuantity());
            item.setSubTotal(i.getPrice() * i.getQuantity());
            orderItemRepo.save(item);
        }

        return session.getUrl();
    }
}
