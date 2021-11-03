
package com.retos.rentacar.servicios;

import com.retos.rentacar.modelo.Reservation;
import com.retos.rentacar.modelo.custom.ConteoClient;
import com.retos.rentacar.modelo.custom.SubtotalesStatus;
import com.retos.rentacar.repositorio.ReservationRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationServices { //clase para la administración de los servicios de la clase Reservación
    @Autowired
    private ReservationRepository metodosCrudReservation; //métodos CRUD para Reservación
    
    public List<Reservation> getAll(){  //lista para obtener todos los datos de la clase Reservación
         return metodosCrudReservation.getAll();
    }
    
    public Optional<Reservation> getReservation(int idReservation){ //lista que recupera según id
        return metodosCrudReservation.getReservation(idReservation); 
    }
    
    
    public Reservation save(Reservation reservation){ //almacena la información de un registro
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
   
    public Reservation update(Reservation reservation){ //almacena los datos modificados
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
                return evt.get();
                }
            else{
                return reservation;
            }
        }
        else{
            return reservation;
                }
        }
    
    public boolean deleteReservation (int IdReservation) { //elimina la información según un id
        Boolean aBoolean = getReservation(IdReservation).map(reservation ->{
            metodosCrudReservation.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
 public List<ConteoClient> getTopClientes(){ //lista con el conteo de reservaciones por cliente
       return metodosCrudReservation.getTopClientes();
    }
   
    public SubtotalesStatus getStatusReport(){ //lista que almacena las reservaciones según status
        List<Reservation> completed = metodosCrudReservation.getReservacionByStatus("completed");
        List<Reservation> cancelled = metodosCrudReservation.getReservacionByStatus("cancelled");
        
        SubtotalesStatus subtStatus = new SubtotalesStatus(completed.size(), cancelled.size());
        return subtStatus;
    }
    
    public List<Reservation> getReservacionTiempo(String d1, String d2){ //lista que almacena las reservaciones según fecha
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date startDateIni=new Date();
        Date startDateFin=new Date();
        
         try
            {
                startDateIni = parser.parse(d1);
                startDateFin = parser.parse(d2);
	    }
         catch(ParseException evt)
            {
                evt.printStackTrace();
	    }
                if(startDateIni.before(startDateFin))
                {
	            return metodosCrudReservation.getReservacionTiempo(startDateIni, startDateFin);
	        }   
                else
                {
	            return new ArrayList<>();
                } 
        
            }
}
