package kr.co.handshake.user.dto;

import kr.co.handshake.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class UserUpdateDto {
    private String nickName;
    private String introduction;

    @Builder
    public UserUpdateDto(String nickName, String introduction) {
        this.nickName = nickName;
        this.introduction = introduction;
    }

    public User toEntity() {
        return User.builder()
                .nickName(nickName)
                .introduction(introduction)
                .build();
    }
}
