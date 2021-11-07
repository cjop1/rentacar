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
            pintarRespuestaCar(respuesta);
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

function autoInicioGama()
{
    console.log("se esta ejecutando tabla Gama")

    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Gama/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta)
        {
            console.log(respuesta);
            let $select = $("#Select-Gama");
            $.each
            (respuesta, function (idGama, name) 
            {
                $select.append('<option value='+name.idGama+'>'+name.name+'</option>');
                console.log("select "+name.idGama);
            }
            ); 
        }
    })
}


function traerCarros()
{
    console.log("test");

    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Car/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta)
        {
            console.log(respuesta);
            pintarRespuestaCar(respuesta);
        }
    });
}

function pintarRespuestaCar(respuesta)
{
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].gama.name+"</td>";
        myTable+="<td> <button onclick='actualizarCar("+respuesta[i].idCar+")'>Actualizar Carro</button>";
        myTable+="<td> <button onclick='borrarCar("+respuesta[i].idCar+")'>Borrar Carro</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoCar").html(myTable);
}

function guardarCarro()
{
   
    let var2 = 
    {   
        name:$("#CarName").val(),   
        brand:$("#CarBrand").val(),
        year:$("#CarYear").val(),
        description:$("#CarDescription").val(),
        gama:{idGama: +$("#Select-Gama").val()},
    };
      
    let dataToSend = JSON.stringify(var2);
    console.log(var2);

    $.ajax
    ({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        
        url:"http://155.248.227.6:8080/api/Car/save",
        
        dataType: 'JSON',
        //data: dataToSend,
        data: JSON.stringify(var2),

        
              
        success:function(respuesta) 
        {
            console.log(respuesta);
            console.log("Se guardo correctamente el vehículo");
            alert("Se guardo correctamente el vehículo");
            window.location.reload()
        },
        
        error: function(_jqXHR, _textStatus, _errorThrown) 
        {
            window.location.reload()
            alert("No se guardo correctamente el vehículo");
        }
    });
}

function actualizarCar(idElemento)
{
if ($("#CarName").val().length==0 || $("#CarBrand").val().length==0 || $("#CarYear").val().length==0 || $("#CarDescription").val().length==0)
{
    alert("Todos los campos son obligatorios");
}
    else
    {
        let myData=
        {
            idCar:idElemento,
            name:$("#CarName").val(),
            brand:$("#CarBrand").val(),
            year:$("#CarYear").val(),
            description:$("#CarDescription").val(),
            gama:{idGama: +$("#Select-Gama").val()},
        };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
    
        $.ajax
        ({
            url:"http://155.248.227.6:8080/api/Car/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta)
            {
                $("#CarName").val("");
                $("#CarBrand").val("");
                $("#CarYear").val("");
                $("#CarDescription").val("");
                $("#Select-Gama").val("");
                autoInicioCar();
                alert("Se ha actualizado correctamente el vehículo")
            }
        });
    }
}

function borrarCar(idElemento)
{
    let myData=
    {
        idCar:idElemento
    };
    
    let dataToSend=JSON.stringify(myData);
    
    $.ajax
    ({
        url:"http://155.248.227.6:8080/api/Car/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta)
        {
            $("#resultadoCar").empty();
            autoInicioCar();
            alert("Se ha Eliminado.")
        }
    });

}

