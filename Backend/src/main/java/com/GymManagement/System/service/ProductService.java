package com.GymManagement.System.service;

import com.GymManagement.System.entity.Product;

import com.GymManagement.System.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public List<Product> getProductsByCategory(String category) {
        return repository.findByCategoryIgnoreCase(category);
    }
}
