package seaa.csechackathon.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import seaa.csechackathon.model.User;

public class AuthResponse  {
    @JsonProperty("accessToken")
    private String accessToken;
    @JsonProperty("refreshToken")
    private String refreshToken;
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;

    public AuthResponse() {
    }

    public AuthResponse(String accessToken, String refreshToken, User user) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.id=user.getId();
        this.firstName = user.getFirstname();
        this.lastName = user.getLastname();
        this.role = user.getRole().getName();
        this.email= user.getEmail();
    }
}
