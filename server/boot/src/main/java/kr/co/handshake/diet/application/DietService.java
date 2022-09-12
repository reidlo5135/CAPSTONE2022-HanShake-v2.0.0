package kr.co.handshake.diet.application;

import kr.co.handshake.common.application.ResponseService;
import kr.co.handshake.common.application.RestFactoryService;
import kr.co.handshake.common.domain.SingleResult;
import kr.co.handshake.diet.domain.DietRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class DietService {
    private final DietRepository dietRepository;
    private final ResponseService responseService;
    private final RestFactoryService restFactoryService;

    private static final String ALL_DIET_URL = "http://localhost:5000/v2/api/diet/";

    public SingleResult<HashMap> testRequest() {
        return responseService.getSingleResult(restFactoryService.request(ALL_DIET_URL));
    }
}
