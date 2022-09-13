package kr.co.handshake.common.advice;

import kr.co.handshake.common.application.ResponseService;
import kr.co.handshake.common.domain.CommonResult;
import kr.co.handshake.common.exception.RestCommunicationException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice
@RequiredArgsConstructor
public class CommonRestControllerAdvice {

    private final ResponseService responseService;
    private final MessageSource messageSource;

    /***
     * -9999
     * default Exception
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult defaultException(HttpServletRequest request, Exception e) {
        e.printStackTrace();
        return responseService.getFailResult(
                Integer.parseInt(getMessage("unKnown.code")), getMessage("unKnown.msg")
        );
    }

    /**
     *
     * -1000
     * rest Communication Exception
     */
    @ExceptionHandler(RestCommunicationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected CommonResult restCommunicationException(Exception e) {
        e.printStackTrace();
        return responseService.getFailResult(
                Integer.parseInt(getMessage("restCommunicationException.code")), getMessage("restCommunicationException.msg")
        );
    }

    private String getMessage(String code) {
        return getMessage(code, null);
    }

    private String getMessage(String code, Object[] args) {
        return messageSource.getMessage(code, args, LocaleContextHolder.getLocale());
    }
}
