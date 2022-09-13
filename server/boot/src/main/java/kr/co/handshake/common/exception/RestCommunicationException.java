package kr.co.handshake.common.exception;

public class RestCommunicationException extends RuntimeException{
    public RestCommunicationException() {
        super();
    }

    public RestCommunicationException(String message) {
        super(message);
    }

    public RestCommunicationException(String message, Throwable cause) {
        super(message, cause);
    }
}
