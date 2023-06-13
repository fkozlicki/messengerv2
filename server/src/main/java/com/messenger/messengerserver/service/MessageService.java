package com.messenger.messengerserver.service;

import com.messenger.messengerserver.model.Message;
import com.messenger.messengerserver.repository.MessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MessageService {
    private MessageRepository messageRepository;


    public Message save(Message message) {
        return messageRepository.save(message);
    }
}
