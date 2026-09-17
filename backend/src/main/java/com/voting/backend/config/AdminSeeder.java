
package com.voting.backend.config;

import com.voting.backend.entity.Role;
import com.voting.backend.entity.User;
import com.voting.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminSeeder {

    @Bean
    CommandLineRunner createAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            String adminEmail = "admin@voting.com";

            if (!userRepository.existsByEmail(adminEmail)) {

                User admin = new User();

                admin.setFirstName("System");
                admin.setLastName("Administrator");
                admin.setUsername("admin");

                admin.setEmail(adminEmail);

                admin.setPassword(
                        passwordEncoder.encode("Admin@123")
                );

                admin.setRole(Role.ADMIN);
                admin.setHasVoted(false);

                userRepository.save(admin);

                System.out.println(
                        "======================================"
                );

                System.out.println(
                        "ADMIN ACCOUNT CREATED"
                );

                System.out.println(
                        "Email: admin@voting.com"
                );

                System.out.println(
                        "Password: Admin@123"
                );

                System.out.println(
                        "Role: ADMIN"
                );

                System.out.println(
                        "======================================"
                );

            } else {

                System.out.println(
                        "Admin account already exists."
                );
            }
        };
    }
}

