package com.messenger.messengerserver.service;

import com.messenger.messengerserver.model.Conversation;
import com.messenger.messengerserver.repository.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {
    @Autowired
    private ConversationRepository conversationRepository;
    @Autowired
    private UserService userService;

    public Integer getConversationId(Integer senderId, Integer receiverId) {
        Optional<Conversation> chatRoom = conversationRepository.findConversationsByByUsers(senderId, receiverId);

        if (chatRoom.isPresent()) {
            return chatRoom.get().getId();
        }

        Conversation newChatRoom = new Conversation();

        newChatRoom.setUserOne(userService.getUserById(senderId));
        newChatRoom.setUserTwo(userService.getUserById(receiverId));

        Conversation savedChatRoom = conversationRepository.save(newChatRoom);

        return savedChatRoom.getId();
    }

    public Conversation getByConversationId(Integer id) {
        return conversationRepository.findById(id).orElse(null);
    }

    public List<Conversation> getAllUserConversations(Integer userId) {
        return conversationRepository.findConversationsByUserId(userId).orElse(null);
    }

    public Conversation getConversationByUsers(Integer userOneId, Integer userTwoId) {
        return conversationRepository.findConversationsByByUsers(userOneId, userTwoId).orElse(null);
    }

}
