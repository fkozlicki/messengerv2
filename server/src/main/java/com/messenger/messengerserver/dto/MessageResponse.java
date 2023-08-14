package com.messenger.messengerserver.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageResponse {
    private Integer senderId;
    private Integer receiverId;
    private String content;
    private LocalDateTime createdAt;
}
