package kr.co.handshake.web.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class WebRestControllerAdvice {

    @ExceptionHandler({Exception.class})
    public ResponseEntity<?> notFound() {
        return ResponseEntity.notFound().build();
    }
}
