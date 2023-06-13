package com.messenger.messengerserver.controller;

import com.messenger.messengerserver.dto.MessagePayload;
import com.messenger.messengerserver.model.Conversation;
import com.messenger.messengerserver.model.Message;
import com.messenger.messengerserver.service.ConversationService;
import com.messenger.messengerserver.service.MessageService;
import com.messenger.messengerserver.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/conversation")
@CrossOrigin(origins = "http://locahost:3000")
public class ConversationController {
    private MessageService messageService;
    private ConversationService conversationService;
    private UserService userService;
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/conversation")
    public void sendMessage(@Payload MessagePayload message) {
        Integer conversationId = conversationService.getConversationId(message.getSenderId(), message.getReceiverId());

        Message newMessage = new Message();
        newMessage.setConversation(conversationService.getByConversationId(conversationId));
        newMessage.setSender(userService.getUserById(message.getSenderId()));
        newMessage.setReceiver(userService.getUserById(message.getReceiverId()));
        newMessage.setContent(message.getContent());
        newMessage.setCreatedAt(LocalDateTime.now());

        messageService.save(newMessage);
        messagingTemplate.convertAndSendToUser(
                message.getReceiverId().toString(),
                "/queue/messages",
                newMessage
        );
    }

    @GetMapping
    public ResponseEntity<?> getUserConversation(
            @RequestParam("userOneId") Integer userOneId,
            @RequestParam("userTwoId") Integer userTwoId
    ) {
        Conversation conversation = conversationService.getConversationByUsers(userOneId, userTwoId);
        return ResponseEntity.ok(conversation);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getUserConversations(@RequestParam("userId") Integer userId) {
        List<Conversation> conversations = conversationService.getAllUserConversations(userId);

        return ResponseEntity.ok(conversations);
    }
}
