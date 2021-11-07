function autoInicioMessage()
{
    console.log("se esta ejecutando tabla Message")

    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta)
        {
            console.log(respuesta);
            pintarRespuestaMessage(respuesta);
            let $select = $("#Select-Message");
            $.each
            (respuesta, function (idMessage, name) 
            {
                $select.append('<option value='+name.idMessage+'>'+name.name+'</option>');
                console.log("select "+name.idMessage);
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


function traerMensajes()
{
    console.log("test");

    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta)
        {
            console.log(respuesta);
            pintarRespuestaMessage(respuesta);
        }
    });
}

function pintarRespuestaMessage(respuesta)
{
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].car.name+"</td>";
        myTable+="<td> <button onclick='actualizarMessage("+respuesta[i].idMessage+")'>Actualizar Mensaje</button>";
        myTable+="<td> <button onclick='borrarMessage("+respuesta[i].idMessage+")'>Borrar Mensaje</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMessage").html(myTable);
}

function guardarMensaje()
{
   
    let var2 = 
    {   
        messageText:$("#MessageText").val(),
        client:{idClient: +$("#Select-Client").val()},
        car:{idCar: +$("#Select-Car").val()},
    };
      
    let dataToSend = JSON.stringify(var2);
    console.log(var2);

    $.ajax
    ({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        
        url:"http://155.248.227.6:8080/api/Message/save",
        
        dataType: 'JSON',
        data: JSON.stringify(var2),

        
              
        success:function(respuesta) 
        {
            console.log(respuesta);
            console.log("Se guardo correctamente el mensaje");
            alert("Se guardo correctamente el mensaje");
            window.location.reload()
        },
        
        error: function(_jqXHR, _textStatus, _errorThrown) 
        {
            window.location.reload()
            alert("No se guardo correctamente el mensaje");
        }
    });
}

function actualizarMessage(idElemento){
    
    if ($("#MessageText").val().length==0)
    {
        alert("Todos los campos son obligatorios");
    }
    else
    {
        let myData=
        {
            idMessage:idElemento,
            messageText:$("#MessageText").val(),
            car:{idCar: +$("#Select-Car").val()},
            client:{idClient: +$("#Select-Client").val()},

        };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
    
        $.ajax
        ({
            url:"http://155.248.227.6:8080/api/Message/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta)
            {
                $("#MessageText").val("");
                $("#Select-Car").val("");
                $("#Select-Client").val("");
                autoInicioMessage();
                alert("se ha Actualizado correctamente el mensaje")
            }
        });
    }
}

function borrarMessage(idElemento)
{
    let myData=
    {
        idMessage:idElemento
    };
    
    let dataToSend=JSON.stringify(myData);
    
    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta)
        {
            $("#resultadoMessage").empty();
            autoInicioMessage();
            alert("Se ha Eliminado.")
        }
    });

}
