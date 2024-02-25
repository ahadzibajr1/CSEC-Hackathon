package seaa.csechackathon.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ResetPasswordWithTokenRequest {
    private String token;


    @Size( min = 8, message = "Password must be at least 8 characters long.")
    @Pattern.List({
            @Pattern(regexp = ".*[a-z].*", message = "Password must contain at least one lowercase letter."),
            @Pattern(regexp = ".*[A-Z].*", message = "Password must contain at least one uppercase letter."),
            @Pattern(regexp = ".*\\d.*", message = "Password must contain at least one digit."),
            @Pattern(regexp = ".*[@#$%^&+=!].*", message = "Password must contain at least one of the following special characters: @#$%^&+=!")
    })
    private String password;

    public ResetPasswordWithTokenRequest(String token, String password) {
        this.token = token;
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
