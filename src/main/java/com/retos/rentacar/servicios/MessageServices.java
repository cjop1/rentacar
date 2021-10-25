
package com.retos.rentacar.servicios;

import com.retos.rentacar.modelo.Message;
import com.retos.rentacar.repositorio.MessageRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageServices {
    @Autowired
    private MessageRepository metodosCrudMessage;
    
    public List<Message> getAll(){
         return metodosCrudMessage.getAll();
    }
    
    public Optional<Message> getMessage(int idMessage){
        return metodosCrudMessage.getMessage(idMessage);
    }
    
    
    public Message save(Message message){
        if(message.getIdMessage()==null){
            return metodosCrudMessage.save(message);
        }else{
            Optional<Message> evt=metodosCrudMessage.getMessage(message.getIdMessage());
            if(evt.isEmpty()){
            return metodosCrudMessage.save(message);
            }else{
                return message;
            }
        
        
        }
    
    }
    
            public Message update(Message message){
        if(message.getIdMessage()!=null){
            Optional<Message> evt=metodosCrudMessage.getMessage(message.getIdMessage());
            if(!evt.isEmpty()){
                if(message.getMessageText()!=null){
                    evt.get().setMessageText(message.getMessageText());
                    }
                metodosCrudMessage.save(evt.get());
                return evt.get();
                }
            else{
                return message;
            }
        }
        else{
            return message;
                }
        }

    
        public boolean deleteMessage (int IdMessage) {
        Boolean aBoolean = getMessage(IdMessage).map(message ->{
            metodosCrudMessage.delete(message);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
}
