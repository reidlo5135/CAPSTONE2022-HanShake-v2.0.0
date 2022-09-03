package kr.co.handshake.common;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CommonRestControllerAdvice {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> responseBadRequest(Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
