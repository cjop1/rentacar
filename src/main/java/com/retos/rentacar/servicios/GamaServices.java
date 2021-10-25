/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.retos.rentacar.servicios;

import com.retos.rentacar.modelo.Gama;
import com.retos.rentacar.repositorio.GamaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GamaServices {
     @Autowired
    private GamaRepository metodosCrudGama;
    
    public List<Gama> getAll(){
         return metodosCrudGama.getAll();
    }
    
    public Optional<Gama> getGama(int idGama){
        return metodosCrudGama.getGama(idGama);
    }
    public Gama save(Gama gama){
        if(gama.getIdGama()==null){
            return metodosCrudGama.save(gama);
        }else{
            Optional<Gama> evt=metodosCrudGama.getGama(gama.getIdGama());
            if(evt.isEmpty()){
            return metodosCrudGama.save(gama);
            }else
                {return gama;
            }
        }
    }

        public Gama update(Gama gama){
        if(gama.getIdGama()!=null){
            Optional<Gama> evt=metodosCrudGama.getGama(gama.getIdGama());
            if(!evt.isEmpty()){
                if(gama.getName()!=null){
                    evt.get().setName(gama.getName());
                    }
                if(gama.getDescription()!=null){
                    evt.get().setDescription(gama.getDescription());
                    }
                metodosCrudGama.save(evt.get());
                return evt.get();
                }
            else{
                return gama;
            }
        }
        else{
            return gama;
                }
        }
    
    
    public boolean deleteGama (int Id) {
        Boolean aBoolean = getGama(Id).map(gama ->{
            metodosCrudGama.delete(gama);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
}