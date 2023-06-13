package com.messenger.messengerserver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessagePayload {
    private Integer senderId;
    private Integer receiverId;
    private String content;
}
