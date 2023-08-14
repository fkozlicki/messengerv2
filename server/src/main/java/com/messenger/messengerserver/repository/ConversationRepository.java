package com.messenger.messengerserver.repository;

import com.messenger.messengerserver.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Integer> {
    @Query("""
        SELECT c FROM Conversation c\s
        WHERE (c.userOne.id = :firstUserId AND c.userTwo.id = :secondUserId)\s
        OR (c.userOne.id = :secondUserId AND c.userTwo.id = :firstUserId)
    """)
    Optional<Conversation> findConversationsByByUsers(
            @Param("firstUserId") Integer firstUserId,
            @Param("secondUserId") Integer secondUserId
    );
    @Query("""
        SELECT c FROM Conversation c LEFT JOIN c.messages m \s
        WHERE c.userOne.id = :userId OR c.userTwo.id = :userId ORDER BY m.createdAt DESC
    """)
    Optional<List<Conversation>> findConversationsByUserId(@Param("userId") Integer userId);
}
