package com.messenger.messengerserver.controller;

import com.messenger.messengerserver.dto.ConversationResponse;
import com.messenger.messengerserver.dto.MessagePayload;
import com.messenger.messengerserver.dto.MessageResponse;
import com.messenger.messengerserver.model.Conversation;
import com.messenger.messengerserver.model.Message;
import com.messenger.messengerserver.service.ConversationService;
import com.messenger.messengerserver.service.MessageService;
import com.messenger.messengerserver.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/conversation")
public class ConversationController {
    private final MessageService messageService;
    private final ConversationService conversationService;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/conversation")
    @MessageExceptionHandler()
    public void sendMessage(@Payload MessagePayload message) {
        Integer conversationId = conversationService.getConversationId(message.getSenderId(), message.getReceiverId());

        messageService.save(Message.builder()
                .conversation(conversationService.getByConversationId(conversationId))
                .sender(userService.getUserById(message.getSenderId()))
                .receiver(userService.getUserById(message.getReceiverId()))
                .content(message.getContent())
                .createdAt(LocalDateTime.now())
                .build());

        MessageResponse messageResponse = MessageResponse.builder()
                        .senderId(message.getSenderId())
                        .receiverId(message.getReceiverId())
                        .content(message.getContent())
                        .build();

        messagingTemplate.convertAndSendToUser(
                message.getReceiverId().toString(),
                "/queue/messages",
                messageResponse
        );
    }

    @GetMapping("/all")
    public ResponseEntity<List<ConversationResponse>> getUserConversations(@RequestParam("userId") Integer userId) {
        List<ConversationResponse> conversations = conversationService.getAllUserConversations(userId);

        if (conversations == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(conversations);
    }

    @GetMapping("/messages")
    public ResponseEntity<List<MessageResponse>> getConversationMessages(
            @RequestParam("userOneId") Integer userOneId,
            @RequestParam("userTwoId") Integer userTwoId,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "20") Integer size
    ) {
        Conversation conversation = conversationService.getConversationByUsers(userOneId, userTwoId);

        if (conversation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<MessageResponse> messages = messageService.getConversationMessages(conversation.getId(), page, size);


        return ResponseEntity.ok(messages);
    }
}
