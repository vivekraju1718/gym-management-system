package com.GymManagement.System.service;

import com.GymManagement.System.dto.MembershipCheckoutRequestDto;
import com.GymManagement.System.entity.Membership;
import com.GymManagement.System.entity.User;
import com.GymManagement.System.entity.UserMembership;
import com.GymManagement.System.repository.MembershipRepository;
import com.GymManagement.System.repository.UserMembershipRepository;
import com.GymManagement.System.repository.UserRepository;
import com.GymManagement.System.util.StripeCustomerUtil;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
@Service
public class StripeService {

    private final MembershipRepository membershipRepo;
    private final UserMembershipRepository userMembershipRepo;
    private final UserRepository userRepo;
    private final StripeCustomerUtil stripeUtil;

    public StripeService(MembershipRepository m, UserMembershipRepository um, UserRepository u, StripeCustomerUtil util){
        this.membershipRepo = m;
        this.userMembershipRepo = um;
        this.userRepo = u;
        this.stripeUtil = util;
    }

    public String createMembershipCheckout(MembershipCheckoutRequestDto req, String email) throws Exception {

        User user = userRepo.findByUsername(email).orElseThrow();
        var customer = stripeUtil.getOrCreate(user);

        Membership plan = membershipRepo.findById(req.getMembershipId()).orElseThrow();

        Session session = Session.create(
                SessionCreateParams.builder()
                        .setCustomer(customer.getId())   // 🔒 PRIVATE CUSTOMER
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:5173/payment-success")
                        .setCancelUrl("http://localhost:5173/payment-failed")
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency("inr")
                                                        .setUnitAmount((long) req.getUserPaidPrice() * 100)
                                                        .setProductData(
                                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                        .setName(plan.getPlanName()).build())
                                                        .build())
                                        .build())
                        .build());

        UserMembership um = new UserMembership();
        um.setUserId(user.getId());
        um.setUserEmail(user.getUsername());
        um.setMembershipId(plan.getId());
        um.setPlanName(plan.getPlanName());
        um.setPlanMonths(plan.getMonths());
        um.setPlanPrice(plan.getPrice());
        um.setUserPaidPrice(req.getUserPaidPrice());
        um.setStartDate(LocalDate.now());
        um.setEndDate(LocalDate.now().plusMonths(plan.getMonths()));
        um.setStatus("ACTIVE");

        userMembershipRepo.save(um);

        return session.getUrl();
    }
}
