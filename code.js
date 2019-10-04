function estratos() {

    var x = document.getElementById("estrato").value;
    var y = document.getElementById("Subsegmento");
    var i;
    for (i = y.options.length - 1; i >= 0; i--) {
        y.remove(i);
    }


    if (document.getElementById("estrato").value == '1') {
        var option = document.createElement("option");
        option.text = "Bar Estandár";
        y.add(option);
        option = document.createElement("option");
        option.text = "Discoteca Estandár";
        y.add(option);
        option = document.createElement("option");
        option.text = "Licobares";
        y.add(option);
        option = document.createElement("option");
        option.text = "Juegos típicos";
        y.add(option);
        option = document.createElement("option");
        option.text = "Repostería y café";
        y.add(option);
        option = document.createElement("option");
        option.text = "Restaurante Casual";
        y.add(option);
        option = document.createElement("option");
        option.text = "Restaurante Formal";
        y.add(option);
    }
    else if (document.getElementById("estrato").value == "2") {
        var option = document.createElement("option");
        option.text = "Bar Élite";
        y.add(option);
        option.text = "Bar Estandár";
        y.add(option);
        option = document.createElement("option");
        option.text = "Discoteca Élite";
        y.add(option);
        option = document.createElement("option");
        option.text = "Discoteca Estandár";
        y.add(option);
        option = document.createElement("option");
        option.text = "Licobares";
        y.add(option);
        option = document.createElement("option");
        option.text = "Juegos típicos";
        y.add(option);
        option = document.createElement("option");
        option.text = "Repostería y café";
        y.add(option);
        option = document.createElement("option");
        option.text = "Restaurante Casual";
        y.add(option);
        option = document.createElement("option");
        option.text = "Restaurante Élite";
        y.add(option);
        option = document.createElement("option");
        option.text = "Restaurante Formal";
        y.add(option);
    } else {
        option = document.createElement("option");
        option.text = "Seleccione Subsegmento";
        y.add(option);
    }

}

function servicios() {
    var x = document.getElementById("SourceOfVolume");
    var y = document.getElementById("servicios");
    var i;
    for (i = y.options.length - 1; i >= 0; i--) {
        y.remove(i);
    }
    if (x.value == '1') {
        var option = document.createElement("option");
        option.text = "JOHNNIE RED & LEMON";
        y.add(option);
        option = document.createElement("option");
        option.text = "GORDONS TONIC";
        y.add(option);
    } else if (x.value == '2') {
        var option = document.createElement("option");
        option.text = "BOTLL SMIRNOFF X1";
        y.add(option);
        option = document.createElement("option");
        option.text = "BOTLL B&W";
        y.add(option);

    } else if (x.value == '3') {

    } else {
        var option = document.createElement("option");
        option.text = "Seleccione Servicio";
        y.add(option);
    }
}

function CargaProductos() {
    var rawFile = new XMLHttpRequest();
   /* var url_string = window.location.href;
   // var url = new URL(url_string).searchParams.get('servicio');}
    var searchParams = new URL(url_string);
    var c = url.searchParams;*/
    var url_string = window.location.href
    var url = new URL(url_string);
    var c = url.searchParams.get("servicio");
    var alternativa = "JOHNNIE RED & LEMON";
    if (c == "JOHNNIE RED "){
        c=alternativa;
    }
    console.log(c);
    rawFile.open("GET", "receta.txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                var linea = allText.split("\n");
                for (var i = 0; i<linea.length ; i++){

                    var separado = linea[i].split(";");
                    if(c == separado[0]){
                        searchProducts(separado[1]);
                    }
                    
                }
                
            }
        }
    }
    rawFile.send(null);
}
function searchProducts(x){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "Prodcuto.csv", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                var linea = allText.split("\n");
                for (var i = 0; i<linea.length ; i++){

                    var separado = linea[i].split(",");
                    for(var j = 0; j<x.length; j++){

                        if(x[j] == separado[0]){
                            //console.log();
                            addRowProd(separado);
                        }

                    }              
                }
                
            }
        }
    }
    rawFile.send(null);


}
function addRowProd(elementos){
    var table = document.getElementById("Prod");
    var i = table.rows.length;
    var producto =  elementos[1];
    var unMedida = elementos[2];
    var cantidad = elementos[3];
    var precioVenta = elementos[4];
    var row = table.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = producto;
    cell2.innerHTML = unMedida;
    cell3.innerHTML = cantidad;
    cell4.contentEditable = "true";
    cell4.style.backgroundColor ="#EEFFA1";
    cell4.innerHTML = precioVenta;
    
    cell5.innerHTML = "";



}

/*
function readTextFile() {
   var archivo = fetch('testing.txt').res;
   var texto = archivo.text();
   console.log(texto);
    .then(res => res.text())
    .then(content => {
      let lines = content.split(/\n/);
      lines.forEach(line => console.log(line));
    });

}*/

function readTextFile()
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "testing.txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(allText);
            }
        }
    }
    rawFile.send(null);
}


function myFunction() {

    
    var table = document.getElementById("Prod");
    var calc = table.rows[1].cells;
    var cal = calc[3].innerHTML / calc[2].innerHTML;
    console.log(cal);
    calc[4].innerHTML = cal;
    console.log(cal);
    // const cal = 0;

    for (var i = 1; i < table.rows.length; i++) {
        calc = table.rows[i].cells;
        cal = calc[3].innerHTML / calc[2].innerHTML;
        table.rows[i].cells[4].innerHTML = cal;
    }

    /*   var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "Hola";
        cell2.innerHTML = "NEW CELL2";*/

    var url_string = window.location.href
    var url = new URL(url_string);
    var c = url.searchParams.get("servicio");
    console.log(c);
}
