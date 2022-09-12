package kr.co.handshake.common.application;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@Service
public class RestFactoryService {
    private final RestTemplate restTemplate = new RestTemplate();

    public HashMap request(String url) {
        HashMap map = restTemplate.getForEntity(url, HashMap.class).getBody();
        log.info("Entity : " + map);
        log.info("Data : " + map.get("resolve"));
        Map<String, List<String>> newMap = (Map<String, List<String>>) map.get("resolve");
        log.info("newMap : " + newMap.get("Corner1"));
        return map;
    }
}
