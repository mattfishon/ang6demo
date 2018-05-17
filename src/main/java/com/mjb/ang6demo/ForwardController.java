package com.mjb.ang6demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardController {

    @RequestMapping(value = {"/transit", "/login", "/visitor"})
    public String redirect() {
        // Forward to home page so that route is preserved.
        return "forward:/";
    }
} 