package kr.co.handshake.diet.application;

import kr.co.handshake.common.application.ResponseService;
import kr.co.handshake.common.application.RestFactoryService;
import kr.co.handshake.common.domain.SingleResult;
import kr.co.handshake.common.exception.RestCommunicationException;
import kr.co.handshake.diet.domain.DayEnum;
import kr.co.handshake.diet.domain.DietRepository;
import kr.co.handshake.diet.dto.DietResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * @author reidlo
 * 2022-09-13
 * @version 2.0.0
 */
@Service
@RequiredArgsConstructor
public class DietService {
    private final DietRepository dietRepository;
    private final ResponseService responseService;
    private final RestFactoryService restFactoryService;

    private static final String ALL_DIET_URL = "http://localhost:5000/v2/api/diet/";

    public SingleResult<List> findAllDiet() {
        return responseService.getSingleResult(dietRepository.findAll());
    }

    @Transactional
    public void requestAndSaveAllDiet() {
        try {
            Map<String, List<String>> responseMap = restFactoryService.request(ALL_DIET_URL);
            if(responseMap.isEmpty()) throw new RestCommunicationException();
            for(Map.Entry<String, List<String>> elem : responseMap.entrySet()) {
                List<String> menuList = elem.getValue();
                for(int i=0;i< menuList.size();i++) {
                    DietResponseDto dietResponseDto = new DietResponseDto(elem.getKey(), menuList.get(i), DayEnum.values()[i]);
                    dietRepository.save(dietResponseDto.toEntity());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
