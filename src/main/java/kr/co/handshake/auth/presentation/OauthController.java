package kr.co.handshake.auth.presentation;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.co.handshake.auth.application.OauthService;
import kr.co.handshake.user.dto.UserLoginDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

import static kr.co.handshake.auth.advice.LoggedInInterceptor.createJWTCookie;

@Api(tags = {"2. Oauth Controller"})
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/v1/api/oauth")
public class OauthController {
    private final OauthService oauthService;

    @ApiOperation(value = "회원 로그인 후 token 발급", notes = "Generate Token After User Login ")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginDto userLoginDto, HttpServletResponse response) {
        response.addCookie(createJWTCookie(oauthService.login(userLoginDto).getToken()));

        return ResponseEntity.ok().body(oauthService.login(userLoginDto).getToken());
    }

    @ApiOperation(value = "발급 토큰 logout 처리", notes = "Modify Token Into Logout")
    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        response.addCookie(createJWTCookie("logout"));

        return ResponseEntity.ok().build();
    }
}
