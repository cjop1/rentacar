
package com.retos.rentacar.servicios;

import com.retos.rentacar.modelo.Reservation;
import com.retos.rentacar.repositorio.ReservationRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationServices {
    @Autowired
    private ReservationRepository metodosCrudReservation;
    
    public List<Reservation> getAll(){
         return metodosCrudReservation.getAll();
    }
    
    public Optional<Reservation> getReservation(int idReservation){
        return metodosCrudReservation.getReservation(idReservation);
    }
    
    
    public Reservation save(Reservation reservation){
        if(reservation.getIdReservation()==null){
            return metodosCrudReservation.save(reservation);
        }else{
            Optional<Reservation> evt=metodosCrudReservation.getReservation(reservation.getIdReservation());
            if(evt.isEmpty()){
            return metodosCrudReservation.save(reservation);
            }else{
                return reservation;
            }
        
        
        }
    
    }
   
    public Reservation update(Reservation reservation){
        if(reservation.getIdReservation()!=null){
            Optional<Reservation> evt=metodosCrudReservation.getReservation(reservation.getIdReservation());
            if(!evt.isEmpty()){
                if(reservation.getStartDate()!=null){
                    evt.get().setStartDate(reservation.getStartDate());
                    }
                if(reservation.getDevolutionDate()!=null){
                    evt.get().setDevolutionDate(reservation.getDevolutionDate());
                    }
                metodosCrudReservation.save(evt.get());
                return reservation;
                }
            else{
                return reservation;
            }
        }
        else{
            return reservation;
                }
        }
    
    public boolean deleteReservation (int IdReservation) {
        Boolean aBoolean = getReservation(IdReservation).map(reservation ->{
            metodosCrudReservation.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
}
