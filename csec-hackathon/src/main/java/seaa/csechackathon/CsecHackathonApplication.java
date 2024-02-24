package seaa.csechackathon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import seaa.csechackathon.dao.TokenRepository;

@EnableJpaRepositories(basePackages = { "seaa.csechackathon.dao"})
@EntityScan(basePackages = {"seaa.csechackathon.model"})
@SpringBootApplication
public class CsecHackathonApplication implements CommandLineRunner {

	@Autowired
	TokenRepository tokenRepository;

	public static void main(String[] args) {
		SpringApplication.run(CsecHackathonApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception
	{
		deleteExpiredTokens();
	}

	private void deleteExpiredTokens() {
		tokenRepository.deleteInvalidTokens();
	}

}
