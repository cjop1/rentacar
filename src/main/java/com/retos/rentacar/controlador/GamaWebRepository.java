
package com.retos.rentacar.controlador;

import com.retos.rentacar.modelo.Gama;
import com.retos.rentacar.servicios.GamaServices;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/Gama")
@CrossOrigin(origins = "*", methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class GamaWebRepository {
    
    @Autowired
    private GamaServices servicios;
    @GetMapping("/all")
    public List <Gama> getGama(){
        return servicios.getAll();
    }
    @GetMapping("/{id}")
    public Optional<Gama> getGama(@PathVariable("id") int idGama) {
        return servicios.getGama(idGama);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Gama save(@RequestBody Gama gama) {
        return servicios.save(gama);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Gama update(@RequestBody Gama gama) {
        return servicios.update(gama);
    }    
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable ("id") int id) {
        return servicios.deleteGama(id);
    }
}
