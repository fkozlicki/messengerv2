package com.messenger.messengerserver.service;

import com.messenger.messengerserver.dto.MessageResponse;
import com.messenger.messengerserver.model.Message;
import com.messenger.messengerserver.repository.MessageRepository;
import com.messenger.messengerserver.repository.MessagesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final MessagesRepository messagesRepository;

    public Message save(Message message) {
        return messageRepository.save(message);
    }


    public List<MessageResponse> getConversationMessages(Integer conversationId, Integer page, Integer size) {
        List<Message> messages = messagesRepository.findAllByConversationId(conversationId, PageRequest.of(page, size));
        List<MessageResponse> _messages = new ArrayList<>();
        for (Message message : messages) {
            _messages.add(MessageResponse.builder()
                    .senderId(message.getSender().getId())
                    .receiverId(message.getSender().getId())
                    .content(message.getContent())
                    .createdAt(message.getCreatedAt())
                    .build()
            );
        }

        return _messages;
    }
}
