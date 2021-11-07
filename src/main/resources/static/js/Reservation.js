function autoInicioReservation()
{
    console.log("se esta ejecutando tabla Reservación")

    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta)
        {
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);
            let $select = $("#Select-Reservation");
            $.each
            (respuesta, function (idReservation) 
            {
                $select.append('<option value='+idReservation+'></option>');
                console.log("select "+idReservation);
            }
            ); 
        }
    })
}

function autoInicioClient()
{
    console.log("se esta ejecutando tabla Cliente")

    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta)
        {
            console.log(respuesta);
            let $select = $("#Select-Client");
            $.each
            (respuesta, function (idClient, name) 
            {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                console.log("select "+name.idClient);
            }
            ); 
        }
    })
}

function autoInicioCar()
{
    console.log("se esta ejecutando tabla Car")

    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Car/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta)
        {
            console.log(respuesta);
            let $select = $("#Select-Car");
            $.each
            (respuesta, function (idCar, name) 
            {
                $select.append('<option value='+name.idCar+'>'+name.name+'</option>');
                console.log("select "+name.idCar);
            }
            ); 
        }
    })
}


function traerReservaciones()
{
    console.log("test");

    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta)
        {
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);
        }
    });
}

function pintarRespuestaReservation(respuesta)
{
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].car.name+"</td>";
        myTable+="<td> <button onclick='actualizarReservation("+respuesta[i].idReservation+")'>Actualizar Reservación</button>";
        myTable+="<td> <button onclick='borrarReservation("+respuesta[i].idReservation+")'>Borrar Reservación</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoReservation").html(myTable);
}

function guardarReservacion()
{
   
    let var2 = 
    {   
        startDate:$("#StartDate").val(),
        devolutionDate:$("#DevolutionDate").val(),
        status:$("#Status").val(),
        client:{idClient: +$("#Select-Client").val()},
        car:{idCar: +$("#Select-Car").val()},
    };
      
    let dataToSend = JSON.stringify(var2);
    console.log(var2);

    $.ajax
    ({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        
        url:"http://155.248.227.6:8080/api/Reservation/save",
        
        dataType: 'JSON',
        data: JSON.stringify(var2),

        
              
        success:function(respuesta) 
        {
            console.log(respuesta);
            console.log("Se guardo correctamente la reservación");
            alert("Se guardo correctamente la reservación");
            window.location.reload()
        },
        
        error: function(_jqXHR, _textStatus, _errorThrown) 
        {
            window.location.reload()
            alert("No se guardo correctamente la reservación");
        }
    });
}

function actualizarReservation(idElemento){
    
    if ($("#StartDate").val().length==0 || $("#DevolutionDate").val().length==0 || $("#Status").val().length==0)
    {
        alert("Todos los campos son obligatorios");
    }
    else
    {
        let myData=
        {
            idReservation:idElemento,
            startDate:$("#StartDate").val(),
            devolutionDate:$("#DevolutionDate").val(),
            status:$("#Status").val(),
            client:{idClient: +$("#Select-Client").val()},
            car:{idCar: +$("#Select-Car").val()},
        };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
    
        $.ajax
        ({
            url:"http://155.248.227.6:8080/api/Reservation/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta)
            {
                $("#StartDate").val("");
                $("#DevolutionDate").val("");
                $("#Status").val("");
                $("#Select-Client").val("");
                $("#Select-Car").val("");
                autoInicioReservation();
                alert("se ha Actualizado correctamente la reservación")
            }
        });
    }
}

function borrarReservation(idElemento)
{
    let myData=
    {
        idReservation:idElemento
    };
    
    let dataToSend=JSON.stringify(myData);
    
    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta)
        {
            $("#resultadoReservation").empty();
            autoInicioReservation();
            alert("Se ha Eliminado.")
        }
    });

}


