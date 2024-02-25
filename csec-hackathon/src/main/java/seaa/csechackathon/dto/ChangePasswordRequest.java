package seaa.csechackathon.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ChangePasswordRequest {
    @NotBlank
    String oldPassword;

    @Size( min = 8, message = "Password must be at least 8 characters long.")
    @Pattern.List({
            @Pattern(regexp = ".*[a-z].*", message = "Password must contain at least one lowercase letter."),
            @Pattern(regexp = ".*[A-Z].*", message = "Password must contain at least one uppercase letter."),
            @Pattern(regexp = ".*\\d.*", message = "Password must contain at least one digit."),
            @Pattern(regexp = ".*[@#$%^&+=!].*", message = "Password must contain at least one of the following special characters: @#$%^&+=!")
    })
    String newPassword;

    public ChangePasswordRequest(String email, String oldPassword, String newPassword) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
