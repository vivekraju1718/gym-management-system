package com.GymManagement.System.controller;

import com.GymManagement.System.entity.Product;
import com.GymManagement.System.repository.ProductRepository;
import com.GymManagement.System.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository repository;
    private final ProductService service;

    @GetMapping
    public List<Product> getAll() {
        return repository.findAll();
    }

    @GetMapping("/category/{category}")
    public List<Product> getByCategory(@PathVariable String category) {
        return service.getProductsByCategory(category);
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id){
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
}
