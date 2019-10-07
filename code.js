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
        option = document.createElement("option");
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
   // var c = url.searchParams.get("servicio");
    var alternativa = "GORDONS TONIC";
    var c= alternativa;
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

function calcRentabilidad(){
    var table = document.getElementById("Ingredientes");
    var calc;
    var suma = 0;
    for (var i = 1; i < table.rows.length - 9 ; i++) {
        calc = table.rows[i].cells;
        console.log(calc[3].innerHTML.split("$")[1]);
        cal = calc[2].innerHTML * calc[3].innerHTML.split("$")[1];
        table.rows[i].cells[4].innerHTML = cal;
        suma = suma + cal;
    }
    var i = table.rows.length - 9;
    var costopro = suma + (suma * 0.05) ;
    costopro = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(costopro);
    table.rows[i].cells[2].innerHTML = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(suma);
    table.rows[i+2].cells[1].innerHTML = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(suma * 0.05);
    table.rows[i+3].cells[1].innerHTML = costopro;
   // table.rows[i].cells[4].innerHTML = suma;
    console.log(table.rows[i].cells[1].innerHTML);


}


function myFunction() {
    var table = document.getElementById("Prod");
    var calc = table.rows[1].cells;
    var cal = calc[3].innerHTML / calc[2].innerHTML;
    console.log(cal);
    calc[4].innerHTML = cal;
    console.log(cal);
    var url_string = window.location.href
    var url = new URL(url_string);
   // var c = url.searchParams.get("servicio");
    var alternativa = "GORDONS TONIC";
    var c= alternativa;
    if (c == "JOHNNIE RED "){
        c=alternativa;
    }
    // const cal = 0;

    for (var i = 1; i < table.rows.length; i++) {
        calc = table.rows[i].cells;
        cal = calc[3].innerHTML / calc[2].innerHTML;
        cal = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(cal)
        table.rows[i].cells[4].innerHTML = cal;
    }

    var ingredientes = document.getElementById("Ingredientes");

    var i;
    for (i = ingredientes.rows.length - 10; i >= 0; i--) {
        if ( i != 0){         
            ingredientes.deleteRow(i);
        }

    }
    var nombre = "";
    var unMedida = "";
    var cant = "";
    for (var i = 1; i < table.rows.length; i++) {
        nombre = table.rows[i].cells[0].innerHTML;
        unMedida = table.rows[i].cells[1].innerHTML;
        cant = "";
        vlrUn = table.rows[i].cells[4].innerHTML;
        var x = ingredientes.rows.length - 9;
        var row = ingredientes.insertRow(x);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        cell0.innerHTML = nombre;
        cell1.innerHTML = unMedida;
        cell2.contentEditable = "true";
        cell2.style.backgroundColor ="#EEFFA1";
        cell2.innerHTML =getCantProd(nombre,c);
        cell3.innerHTML = vlrUn;
        cell4.innerHTML ="";
    }


    
    /*   var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "Hola";
        cell2.innerHTML = "NEW CELL2";*/
}

function getCantProd(nombreProducto,nombreReceta){
    var rawFile = new XMLHttpRequest();
    var cant;
    
    rawFile.open("GET", "Cantidades.txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                var linea = allText.split("\n");

                for (var i = 0; i<linea.length ; i++){

                    var separado = linea[i].split("-");
                    if(nombreReceta == separado[0]){
                        if(nombreProducto == "Precio"){
                            return separado[2];
                        }else{
                            var idprod = getIdProd(nombreProducto);
                     //       console.log(idprod);
                            products = separado[1].split(",");
                            for (var j = 0 ; j<products.length; j++ ){
                                var subnivel = products[j].split(";");
                              //  console.log(subnivel[0]);
                                if (subnivel[0]==idprod){
                                    cant = subnivel[1];
                                  //  console.log(subnivel[0] + " . " + subnivel[1]);
                                    return subnivel[1];
                                }
                            }
                        }
                    }
                                  
                }
                
            }
        }
    }
    rawFile.send(null);
    return cant;


}

function getIdProd(nombre){
    var rawFile = new XMLHttpRequest();
    var global1;
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
                    if(nombre == separado[1]){
                      //  console.log("getId " + separado[0] );
                        global1=separado[0];
                        return separado[0];
                            
                    }
           
                }
                
            }
        }
    }
    rawFile.send(null);
    return global1;
}
 //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_includes
 //https://www.w3schools.com/jsref/jsref_includes.asp
 //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_replace
 //https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/NumberFormat