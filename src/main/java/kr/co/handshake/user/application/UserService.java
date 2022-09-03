package kr.co.handshake.user.application;

import kr.co.handshake.common.application.ResponseService;
import kr.co.handshake.common.domain.SingleResult;
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
    private final UserRepository userRepository;
    private final ResponseService responseService;

    public SingleResult<UserInfoDto> save(UserCreateDto userCreateDto) {
        try {
            return responseService.getSingleResult(UserInfoDto.from(userRepository.save(userCreateDto.toEntity())));
        } catch (Exception e) {
            throw new UserCreateException(e);
        }
    }

    public SingleResult<UserInfoDto> findInfoDtoById(long userId) {
        return responseService.getSingleResult(UserInfoDto.from(findById(userId)));
    }

    @Transactional(readOnly = true)
    public User findById(long userId) {
        return userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
    }

    @Transactional
    public SingleResult<UserInfoDto> update(UserUpdateDto userUpdateDto, long userId) {
        User findUser = findById(userId);
        findUser.update(userUpdateDto.toEntity());
        findUser.activate();

        return responseService.getSingleResult(UserInfoDto.from(findUser));
    }

    @Transactional
    public void delete(long userId) {
        userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new)
                .deactivate();
    }

    @Transactional(readOnly = true)
    public User authenticate(UserLoginDto userLoginDto) {
        User loginUser = userLoginDto.toEntity();
        return userRepository.findByEmailAndPassword(loginUser.getEmail(), loginUser.getPassword()).orElseThrow(UserNotFoundException::new);
    }

    public User findInfoDtoByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
    }
}
