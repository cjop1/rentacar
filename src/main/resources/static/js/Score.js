function autoInicioScore()
{
    console.log("se esta ejecutando tabla Reservación")

    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Score/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta)
        {
            console.log(respuesta);
            pintarRespuestaScore(respuesta);
            let $select = $("#Select-Score");
            $.each
            (respuesta, function (idScore) 
            {
                $select.append('<option value='+idScore+'></option>');
                console.log("select "+idScore);
            }
            ); 
        }
    })
}

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

function traerCalificaciones()
{
    console.log("test");

    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Score/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta)
        {
            console.log(respuesta);
            pintarRespuestaScore(respuesta);
        }
    });
}

function pintarRespuestaScore(respuesta)
{
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].score+"</td>";
        myTable+="<td>"+respuesta[i].textScore+"</td>";
        myTable+="<td>"+respuesta[i].reservation.idReservation+"</td>";
        myTable+="<td> <button onclick='actualizarScore("+respuesta[i].idScore+")'>Actualizar Calificación</button>";
        myTable+="<td> <button onclick='borrarScore("+respuesta[i].idScore+")'>Borrar Calificación</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoScore").html(myTable);
}

function guardarCalificacion()
{
   
    let var2 = 
    {   
        score:$("#Score").val(),
        textScore:$("#TextScore").val(),
        idReservation:$("#Select-Reservation").val(),
    };
      
    let dataToSend = JSON.stringify(var2);
    console.log(var2);

    $.ajax
    ({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        
        url:"http://155.248.227.6:8080/api/Score/save",
        
        dataType: 'JSON',
        data: JSON.stringify(var2),

        
              
        success:function(respuesta) 
        {
            console.log(respuesta);
            console.log("Se guardo correctamente la calificación");
            alert("Se guardo correctamente la calificación");
            window.location.reload()
        },
        
        error: function(_jqXHR, _textStatus, _errorThrown) 
        {
            window.location.reload()
            alert("No se guardo correctamente la calificación");
        }
    });
}


function actualizarScore(idElemento){
    
    if ($("#Score").val().length==0 || $("#TextScore").val().length==0)
    {
        alert("Todos los campos son obligatorios");
    }
    else
    {
        let myData=
        {
            idScore:idElemento,
            score:$("#Score").val(),
            textScore:$("#TextScore").val(),
            reservation:{idReservation: +$("#Select-Reservation").val()},
        };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
    
        $.ajax
        ({
            url:"http://155.248.227.6:8080/api/Score/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta)
            {
                $("#Score").val("");
                $("#TextScore").val("");
                $("#Select-Reservation").val("");
                autoInicioScore();
                alert("se ha Actualizado correctamente la calificación")
            }
        });
    }
}

function borrarScore(idElemento)
{
    let myData=
    {
        idScore:idElemento
    };
    
    let dataToSend=JSON.stringify(myData);
    
    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Score/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta)
        {
            $("#resultadoScore").empty();
            autoInicioScore();
            alert("Se ha Eliminado.")
        }
    });

}

