package com.GymManagement.System.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class CartCheckoutRequest {

    private List<CartItem> items;

    @Getter
    @Setter
    public static class CartItem {
        private Long productId;     // 👈 ADD THIS
        private String name;
        private Integer price;
        private Integer quantity;
    }
}
