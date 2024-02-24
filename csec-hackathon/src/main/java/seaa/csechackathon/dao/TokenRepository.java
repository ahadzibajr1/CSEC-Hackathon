package seaa.csechackathon.dao;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import seaa.csechackathon.model.Token;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends CrudRepository<Token,Integer> {
    @Query("SELECT t FROM Token t INNER JOIN User u ON t.user.id = u.id WHERE u.id=:userId AND (t.expired=FALSE OR t.revoked=FALSE)")
    List<Token> findAllValidTokensByUser(Integer userId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Token t WHERE (t.expired=TRUE OR t.revoked=TRUE)")
    void deleteInvalidTokens();

    Optional<Token> findByToken(String token);
}
