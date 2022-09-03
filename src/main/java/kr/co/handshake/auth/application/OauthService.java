package kr.co.handshake.auth.application;

import kr.co.handshake.auth.WebToken;
import kr.co.handshake.auth.exception.OauthException;
import kr.co.handshake.auth.exception.UserAccountException;
import kr.co.handshake.user.application.UserService;
import kr.co.handshake.user.domain.AccountStatus;
import kr.co.handshake.user.domain.User;
import kr.co.handshake.user.dto.UserInfoDto;
import kr.co.handshake.user.dto.UserLoginDto;
import kr.co.handshake.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OauthService {
    public static final long LOGIN_VALID_SECOND = 30 * 60;
    private final UserService userService;

    public boolean oauth(String token) {
        return WebToken.from(token).validToken(LOGIN_VALID_SECOND);
    }

    public WebToken login(UserLoginDto userLoginDto) {
        try {
            User user = userService.authenticate(userLoginDto);
            UserInfoDto userInfoDto = checkStatus(user);

            return WebToken.create(userInfoDto.toMap());
        } catch (UserNotFoundException e) {
            throw new OauthException();
        }
    }

    private UserInfoDto checkStatus(User user) {
        if (user.getStatus() == AccountStatus.ACTIVE) {
            return UserInfoDto.from(user);
        }
        throw new UserAccountException();
    }

    public WebToken renewLogin(String token) {
        return WebToken.from(token).renewToken(token, UserInfoDto.ID_KEY, UserInfoDto.EMAIL_KEY, UserInfoDto.NICK_NAME_KEY);
    }
}