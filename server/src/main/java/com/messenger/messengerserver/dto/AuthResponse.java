package com.messenger.messengerserver.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class AuthResponse extends RefreshResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;

    public AuthResponse(String accessToken, String refreshToken, Integer id, String firstName, String lastName,
                        String email) {
        super(accessToken, refreshToken);
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

}
