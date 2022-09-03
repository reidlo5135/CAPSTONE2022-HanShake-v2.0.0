package kr.co.handshake.user.application;

import kr.co.handshake.user.domain.User;
import kr.co.handshake.user.domain.UserRepository;
import kr.co.handshake.user.dto.UserCreateDto;
import kr.co.handshake.user.dto.UserInfoDto;
import kr.co.handshake.user.dto.UserLoginDto;
import kr.co.handshake.user.dto.UserUpdateDto;
import kr.co.handshake.user.exception.UserCreateException;
import kr.co.handshake.user.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    public static final String LOGGED_IN_USER_SESSION_KEY = "LOGGED_IN_USER";
    private final UserRepository userRepository;

    public UserInfoDto save(UserCreateDto userCreateDto) {
        try {
            return UserInfoDto.from(userRepository.save(userCreateDto.toEntity()));
        } catch (Exception e) {
            throw new UserCreateException(e);
        }
    }

    public UserInfoDto findInfoDtoById(long userId) {
        return UserInfoDto.from(findById(userId));
    }

    public User findById(long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }

    @Transactional
    public UserInfoDto update(UserUpdateDto userUpdateDto, long userId) {
        User findUser = findById(userId);
        findUser.update(userUpdateDto.toEntity());
        findUser.activate();

        return UserInfoDto.from(findUser);
    }

    @Transactional
    public void delete(long userId) {
        userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new)
                .deactivate();
    }

    public User authenticate(UserLoginDto userLoginDto) {
        User loginUser = userLoginDto.toEntity();
        return userRepository.findByEmailAndPassword(loginUser.getEmail(), loginUser.getPassword()).orElseThrow(UserNotFoundException::new);
    }

    public User findInfoDtoByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
    }
}
