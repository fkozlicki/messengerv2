package com.messenger.messengerserver.repository;

import com.messenger.messengerserver.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    List<Message> findByConversationId(Integer chatRoomId);
    List<Message> findBySenderIdAndReceiverId(Integer senderId, Integer receiverId);
}
