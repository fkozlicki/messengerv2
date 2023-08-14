package com.messenger.messengerserver.repository;

import com.messenger.messengerserver.model.Message;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface MessagesRepository extends PagingAndSortingRepository<Message, Integer> {
    List<Message> findAllByConversationId(Integer conversationId, Pageable pageable);
}
