package kr.co.handshake.user.dto;

import kr.co.handshake.auth.WebToken;
import kr.co.handshake.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.HashMap;
import java.util.Map;

@Getter
@ToString
@NoArgsConstructor
public class UserInfoDto {
    public static final String ID_KEY = "id";
    public static final String EMAIL_KEY = "email";
    public static final String NICK_NAME_KEY = "nickName";
    public static final String INTRODUCTION_KEY = "introduction";

    private Long id;
    private String email;
    private String nickName;
    private String introduction;

    @Builder
    public UserInfoDto(Long id, String email, String nickName, String introduction) {
        this.id = id;
        this.email = email;
        this.nickName = nickName;
        this.introduction = introduction;
    }

    public static UserInfoDto from(User user) {
        return UserInfoDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickName(user.getNickName())
                .introduction(user.getIntroduction())
                .build();
    }

    public static UserInfoDto from(WebToken token) {
        return UserInfoDto.builder()
                .id(Long.parseLong(token.getPayload(ID_KEY)))
                .email(token.getPayload(EMAIL_KEY))
                .nickName(token.getPayload(NICK_NAME_KEY))
                .introduction(token.getPayload(INTRODUCTION_KEY))
                .build();
    }

    public Map<String, String> toMap() {
        Map<String, String> result = new HashMap<>();
        result.put(ID_KEY, this.id.toString());
        result.put(EMAIL_KEY, this.email);
        result.put(NICK_NAME_KEY, this.nickName);

        return result;
    }
}
