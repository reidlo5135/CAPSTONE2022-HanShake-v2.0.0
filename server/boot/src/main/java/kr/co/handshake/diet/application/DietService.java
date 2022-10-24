package kr.co.handshake.diet.application;

import kr.co.handshake.common.application.ResponseService;
import kr.co.handshake.common.application.RestFactoryService;
import kr.co.handshake.common.domain.ListResult;
import kr.co.handshake.common.exception.RestCommunicationException;
import kr.co.handshake.diet.DayEnum;
import kr.co.handshake.diet.domain.DietRepository;
import kr.co.handshake.diet.dto.DietResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @Transactional(readOnly = true)
    public ListResult<DietResponseDto> findDietAll() {
        List<DietResponseDto> list = dietRepository.findAll().stream().map(DietResponseDto::new).collect(Collectors.toList());
        if(list.isEmpty()) throw new NullPointerException();

        return responseService.getListResult(list);
    }

    @Transactional
    public void requestAndSaveAllDiet() {
        Map<String, List<String>> responseMap = restFactoryService.request(ALL_DIET_URL);
        if(responseMap == null || responseMap.isEmpty()) throw new RestCommunicationException();
        for(Map.Entry<String, List<String>> elem : responseMap.entrySet()) {
            List<String> menuList = elem.getValue();
            for(int i=0;i<menuList.size();i++) {
                DietResponseDto dietResponseDto = new DietResponseDto(elem.getKey(), menuList.get(i), DayEnum.values()[i]);
                dietRepository.save(dietResponseDto.toEntity());
            }
        }
    }
}
