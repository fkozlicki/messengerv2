package com.messenger.messengerserver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String accessToken;
    private String refreshToken;
}
