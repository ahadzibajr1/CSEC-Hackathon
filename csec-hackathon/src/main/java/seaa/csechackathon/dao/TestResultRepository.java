package seaa.csechackathon.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import seaa.csechackathon.model.TestResult;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult,Integer> {
}
