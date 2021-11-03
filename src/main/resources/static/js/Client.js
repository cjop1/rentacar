function autoInicioClient(){
    console.log("se esta ejecutando tabla Cliente")
    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta)
        {
            console.log(respuesta);
            pintarRespuestaClient(respuesta);
            let $select = $("#Select-Client");
            $.each(respuesta, function (_id, name) 
            {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    })
}

function pintarRespuestaClient(respuesta)
{
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++)
    {
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick=' actualizarClient("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarClient("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoClient").html(myTable);
}

function guardarClient()
{
    let var2 = 
    {
        email:$("#ClientEmail").val(),
        password:$("#ClientPassword").val(),
        name:$("#ClientName").val(),
        age:$("#ClientAge").val(),
    };
      
    $.ajax
    ({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://155.248.227.6:8080/api/Client/save",
              
        success:function(_respuesta) 
        {
            console.log(_respuesta);
            console.log("Se guardo correctamente la Client");
            alert("Se guardo correctamente la Client");
            window.location.reload()
        },
        
        error: function(_jqXHR, _textStatus, _errorThrown) 
        {
            window.location.reload()
            alert("No se guardo correctamente el Client");
        }
    });
}

/**
 * 
 * 
 * CRUD faltante
 */



 function actualizarClient(idElemento)
 {
    let myData=
    {
        idClient:idElemento,
        email:$("#ClientEmail").val(),
        password:$("#ClientPassword").val(),
        name:$("#ClientName").val(),
        age:$("#ClientAge").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://155.248.227.6:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(_respuesta){
            $("#ClientEmail").val("");
            $("#ClientPassword").val("");
            $("#ClientName").val("");
            $("#ClientAge").val("");
            autoInicioClient();
            alert("Se ha actualizado correctamente el client")

        }

    });
}

function borrarClient(idElemento){
    let myData=
    {
        id:idElemento,
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://155.248.227.6:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        dataType:"JSON",
        success:function(respuesta){
            $("#resultadoClient").empty();
            autoInicioClient();
            alert("Se ha borrado correctamente el client")
        }
    });
}  
