package com.messenger.messengerserver.dto;

import com.messenger.messengerserver.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConversationResponse {
    private User userOne;
    private User userTwo;
    private MessageResponse lastMessage;
}
