function autoInicioClient()
{
    console.log("se esta ejecutando tabla Client")

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


function traerClientes()
{
    console.log("test");

    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta)
        {
            console.log(respuesta);
            pintarRespuestaClient(respuesta);
        }
    });
}

function pintarRespuestaClient(respuesta)
{
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick='actualizarClient("+respuesta[i].idClient+")'>Actualizar Cliente</button>";
        myTable+="<td> <button onclick='borrarClient("+respuesta[i].idClient+")'>Borrar Cliente</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoClient").html(myTable);
}

function guardarCliente()
{
   
    if ($("#ClientEmail").val().length==0 || $("#ClientPassword").val().length==0 || $("#ClientName").val().length==0 || $("#ClientAge").val().length==0)
    {
        alert("Todos los campos son obligatorios");
    }
    else
    {
        let var2 = {
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
       
            success:function(response) 
            {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                window.location.reload()
            },
        
            error: function(jqXHR, textStatus, errorThrown) 
            {
                window.location.reload()
                alert("No se guardo correctamente");
            }
        });
    }

}

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
    
    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta)
        {
            $("#ClientEmail").val("");
            $("#ClientPasswordd").val("");
            $("#ClientName").val("");
            $("#ClientAge").val("");
            autoInicioClient();
            alert("Se ha actualizado correctamente el cliente")
        }

    });
}

function borrarClient(idElemento)
{
    let myData=
    {
        idClient:idElemento
    };
    
    let dataToSend=JSON.stringify(myData);
    
    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta)
        {
            $("#resultadoClient").empty();
            autoInicioClient();
            alert("Se ha Eliminado.")
        }
    });

}
