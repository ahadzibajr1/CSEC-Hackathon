package seaa.csechackathon.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import seaa.csechackathon.model.TestResult;

import java.util.List;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult,Integer> {
    @Query("SELECT tr FROM TestResult tr WHERE tr.code=:code")
    public TestResult findByCode(Integer code);
}
