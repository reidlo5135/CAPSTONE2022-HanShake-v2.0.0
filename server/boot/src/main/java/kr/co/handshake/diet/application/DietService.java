package kr.co.handshake.diet.application;

import kr.co.handshake.common.application.ResponseService;
import kr.co.handshake.common.domain.SingleResult;
import kr.co.handshake.diet.domain.DietRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class DietService {
    private final DietRepository dietRepository;
    private final ResponseService responseService;

    public SingleResult<String> testRequest() {
        final HttpHeaders httpHeaders = new HttpHeaders();

        RestTemplate restTemplate = new RestTemplate();
        return responseService.getSingleResult(
                restTemplate.exchange("http://localhost:5000/v2/api/diet/", HttpMethod.GET, new HttpEntity<>(httpHeaders), String.class).getBody()
        );
    }
}
