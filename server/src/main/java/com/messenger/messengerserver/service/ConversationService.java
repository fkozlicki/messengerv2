package com.messenger.messengerserver.service;

import com.messenger.messengerserver.dto.ConversationResponse;
import com.messenger.messengerserver.dto.MessageResponse;
import com.messenger.messengerserver.model.Conversation;
import com.messenger.messengerserver.model.Message;
import com.messenger.messengerserver.repository.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConversationService {
    private final ConversationRepository conversationRepository;
    private final UserService userService;

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

    public List<ConversationResponse> getAllUserConversations(Integer userId) {
        Optional<List<Conversation>> conversations = conversationRepository.findConversationsByUserId(userId);
        if (conversations.isEmpty()) {
            return null;
        }
        List<ConversationResponse> _conversations = new ArrayList<>();
        for (Conversation conversation : conversations.get()) {
            Message lastMessage = conversation.getMessages().get(conversation.getMessages().size() - 1);
            _conversations.add(ConversationResponse.builder()
                    .userOne(conversation.getUserOne())
                    .userTwo(conversation.getUserTwo())
                    .lastMessage(MessageResponse.builder()
                            .senderId(lastMessage.getSender().getId())
                            .receiverId(lastMessage.getReceiver().getId())
                            .content(lastMessage.getContent())
                            .createdAt(lastMessage.getCreatedAt())
                            .build())
                    .build()
            );
        }

        return _conversations;
    }

    public Conversation getConversationByUsers(Integer userOneId, Integer userTwoId) {
        return conversationRepository.findConversationsByByUsers(userOneId, userTwoId).orElse(null);
    }

}
