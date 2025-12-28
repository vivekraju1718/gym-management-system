package com.GymManagement.System.util;

import com.GymManagement.System.entity.User;
import com.GymManagement.System.repository.UserRepository;
import com.stripe.model.Customer;
import org.springframework.stereotype.Component;

@Component
public class StripeCustomerUtil {

    private final UserRepository userRepo;

    public StripeCustomerUtil(UserRepository repo){
        this.userRepo = repo;
    }

    public Customer getOrCreate(User user) throws Exception {
        if(user.getStripeCustomerId() != null)
            return Customer.retrieve(user.getStripeCustomerId());

        Customer c = Customer.create(
                com.stripe.param.CustomerCreateParams.builder()
                        .setEmail(user.getUsername())
                        .build());

        user.setStripeCustomerId(c.getId());
        userRepo.save(user);
        return c;
    }
}
