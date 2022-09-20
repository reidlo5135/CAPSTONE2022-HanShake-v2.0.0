package kr.co.handshake.common.application;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Log4j2
@Service
public class RestFactoryService {
    private final RestTemplate restTemplate = new RestTemplate();

    public Map request(String url) {
        try {
            Map responseMap = (Map<String, List<String>>) restTemplate.getForEntity(url, Map.class).getBody().get("resolve");
            log.info("newMap : " + responseMap);
            return responseMap;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
