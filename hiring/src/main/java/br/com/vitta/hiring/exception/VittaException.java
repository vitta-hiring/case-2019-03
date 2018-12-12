package br.com.vitta.hiring.exception;

import org.hibernate.service.spi.ServiceException;

public class VittaException  extends ServiceException {

    public VittaException(final String msg){
        super(msg);
    }
}