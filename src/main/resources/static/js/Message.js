function autoInicioMessage(){
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
            $.each(respuesta, function (_id, name) 
            {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    })
}


function pintarRespuestaMessage(respuesta)
{
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++)
    {
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td> <button onclick=' actualizarMessage("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMessage("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMessage").html(myTable);
}

function guardarMessage()
{
    let var2 = 
        {
            messageText:$("#messageText").val(),
            idCliente:{idCliente: +$("#Select-Cliente").val()},
            idCar:{idCar: +$("#Select-Car").val()},
        };
    
    $.ajax
    ({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://155.248.227.6:8080/api/Message/save",
       
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

function actualizarMessage(idElemento)
{
    let myData=
    {
        idMessage:idElemento,
        messageText:$("#messagetext").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://155.248.227.6:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(_respuesta){ 
            $("#messageText").val("");
            autoInicioMessage();
            alert("se ha Actualizado correctamente el Mensaje")
        }
    });
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
        success:function(_respuesta)
        {
            $("#resultadoMessage").empty();
            autoInicioMessage();
            alert("Se ha Eliminado el mensaje")
        }
    });
}