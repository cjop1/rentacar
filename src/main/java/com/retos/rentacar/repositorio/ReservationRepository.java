package com.retos.rentacar.repositorio;

import com.retos.rentacar.interfaces.ReservationInterface;
import com.retos.rentacar.modelo.Reservation;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository
public class ReservationRepository {
    @Autowired
    private ReservationInterface crudReservation;
    
    public List<Reservation> getAll(){
        return (List<Reservation>) crudReservation.findAll();
    }
    public Optional <Reservation> getReservation(int id){
        return crudReservation.findById(id);
    }
    
    public Reservation save(Reservation reservation){
        return crudReservation.save(reservation);
    }
    public void delete(Reservation reservation){
        crudReservation.delete(reservation);
    }
    
}
