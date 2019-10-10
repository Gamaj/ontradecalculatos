function estratos() {



    var x = document.getElementById("Subsegmento").value;

    var y = document.getElementById("estrato");



    if (x == "1" || x == "3" || x == "9") {
        if (y.options.length != 2) {
            y.remove(1);
        }

    } else {
        if (y.options.length < 3) {
            y.remove(1);
            var option = document.createElement("option");
            option.text = "2 y 3";
            option.value = "1";
            y.add(option);
            option = document.createElement("option");
            option.text = "4, 5 y 6";
            option.value = "2";
            y.add(option);
        }
    }



}



function servicios() {

    var x = document.getElementById("SourceOfVolume").value;
    var y = document.getElementById("Marca");
    var estr = document.getElementById("estrato").value;
    var serv = document.getElementById("servicios");
    //console.log("Fuera: "+y.options.length);
    var i;
    for (i = serv.options.length - 1; i >= 0; i--) {

        serv.remove(i);

    }
    var option = document.createElement("option");
    option.text = "Seleccione Servicio";
    option.selected = "true";
    serv.add(option);
    for (i = y.options.length - 1; i >= 0; i--) {

        y.remove(i);

    }
    var option = document.createElement("option");
    option.text = "Seleccione Marca";
    option.selected = "true";
    y.add(option);
    var allText = informacionMarcas();
    var linea = allText.split("|");

    for (var i = 0; i < linea.length; i++) {

        var separado = linea[i].split(";");
        if (x == separado[1] && (estr== separado[2] || separado[2] == "3" )) {

            var option = document.createElement("option");
            option.text = separado[0];
            y.add(option);

        }

    }


}

function cargaServicios(){
    var x = document.getElementById("SourceOfVolume").value;
    var y = document.getElementById("Marca").value;
    var estr = document.getElementById("estrato").value;
    var serv = document.getElementById("servicios");
    var linea = informacionServicios();
    for (i = serv.options.length - 1; i >= 0; i--) {

        serv.remove(i);

    }
    var option = document.createElement("option");
    option.text = "Seleccione Servicio";
    option.selected = "true";
    serv.add(option);

  //  console.log(lineas);
  //  var linea = lineas.split("|");
    for (var i = 0; i<linea.length;i++){
        var variable = linea[i].split(";");
        if (y == variable[0] && x == variable[4] && (estr== variable[5] || variable[5] == "3" )){
            var option = document.createElement("option");
            option.text = variable[1];  
            serv.add(option);

        }
            

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

    var alternativa = "JOHNNIE RED & LEMON";

    var c= alternativa;

    if (c == "JOHNNIE RED ") {

        c = alternativa;

    } else if (c == "BOTLL B") {
        c = "BOTLL B&W"
    }

    addSourceOfVolume();

    calcularRentabilidadSOF();

    console.log(c);

    rawFile.open("GET", "receta.txt", false);

    rawFile.onreadystatechange = function () {

        if (rawFile.readyState === 4) {

            if (rawFile.status === 200 || rawFile.status == 0) {

                var allText = rawFile.responseText;

                var linea = allText.split("\n");

                for (var i = 0; i < linea.length; i++) {



                    var separado = linea[i].split(";");

                    if (c == separado[1]) {

                        addReceta(separado[3]);

                        searchProducts(separado[2]);

                        addImages(separado[6]);

                    }



                }



            }

        }

    }


    rawFile.send(null);
    myFunction();

}

function addSourceOfVolume() {

    var url_string = window.location.href

    var url = new URL(url_string);

   // var c = url.searchParams.get("servicio");
    var costosource = "10000";
    var preciosource = "20000";  
    var rawFile = new XMLHttpRequest();

    var url_string = window.location.href

    var url = new URL(url_string);

    //var c = url.searchParams.get("source");

    var c = "Cerveza";
    if (c == "Cerveza"){
        c = "1";
    }else if (c=="Destilado Nacional"){
        c = "2";
    }else if (c=="Destilaado Importado"){
        c = "3";
    }

    rawFile.open("GET", "sourceOfVolume.txt", false);

    rawFile.onreadystatechange = function () {

        if (rawFile.readyState === 4) {

            if (rawFile.status === 200 || rawFile.status == 0) {

                var allText = rawFile.responseText;

                var linea = allText.split("\n");

                for (var i = 0; i < linea.length; i++) {



                    var separado = linea[i].split(";");

                    if (c == separado[0]) {

                        var table = document.getElementById("SofVolume");

                        table.rows[0].cells[0].innerHTML = "RENTABILIDAD " + separado[5];

                        var row = table.insertRow(2);

                        var cell1 = row.insertCell(0);

                        var cell2 = row.insertCell(1);

                        var cell3 = row.insertCell(2);

                        var cell4 = row.insertCell(3);

                        var cell5 = row.insertCell(4);

                        var cell6 = row.insertCell(5);

                        cell1.innerHTML = separado[1];

                        cell2.innerHTML = costosource;

                        cell2.contentEditable = "true";

                        cell2.style.backgroundColor = "#EEFFA1";

                        cell3.innerHTML = separado[3];

                        cell4.innerHTML = separado[4];

                        cell4.contentEditable = "true";

                        cell4.style.backgroundColor = "#EEFFA1";

                        cell5.innerHTML = Math.round(costosource / separado[4]);

                        cell6.innerHTML = costosource;



                        document.getElementById("SofVolume").rows[10].cells[1].innerHTML = preciosource;

                        document.getElementById("observaciones").innerHTML = separado[7];


                    }

                }



            }

        }

    }

    rawFile.send(null);





}



function addReceta(preparacion) {

    var table = document.getElementById("Ingredientes");

    table.rows[2].cells[0].innerHTML = preparacion;

}

function searchProducts(x) {

    var rawFile = new XMLHttpRequest();

    rawFile.open("GET", "Prodcuto.csv", false);

    rawFile.onreadystatechange = function () {

        if (rawFile.readyState === 4) {

            if (rawFile.status === 200 || rawFile.status == 0) {

                var allText = rawFile.responseText;

                var linea = allText.split("\n");

                for (var i = 0; i < linea.length; i++) {



                    var separado = linea[i].split(",");

                    for (var j = 0; j < x.length; j++) {



                        if (x[j] == separado[0]) {

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

function addRowProd(elementos) {

    var table = document.getElementById("Prod");

    var i = table.rows.length;

    var producto = elementos[1];

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

    cell4.style.backgroundColor = "#EEFFA1";

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



function readTextFile() {

    var rawFile = new XMLHttpRequest();

    rawFile.open("GET", "testing.txt", false);

    rawFile.onreadystatechange = function () {

        if (rawFile.readyState === 4) {

            if (rawFile.status === 200 || rawFile.status == 0) {

                var allText = rawFile.responseText;

                console.log(allText);

            }

        }

    }

    rawFile.send(null);

}



function calcRentabilidad() {

    var table = document.getElementById("Ingredientes");

    var calc;

    var suma = 0;

    for (var i = 1; i < table.rows.length - 9; i++) {

        calc = table.rows[i].cells;

        console.log(calc[3].innerHTML.split("$")[1]);

        cal = calc[2].innerHTML * calc[3].innerHTML.split("$")[1];

        table.rows[i].cells[4].innerHTML = cal;

        suma = suma + cal;

    }

    var i = table.rows.length - 9;

    var costopro = suma + (suma * 0.05);

    //  costopro = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(costopro);

    table.rows[i].cells[2].innerHTML = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(suma);

    table.rows[i + 2].cells[1].innerHTML = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(suma * 0.05);

    table.rows[i + 3].cells[1].innerHTML = costopro;

    // table.rows[i].cells[4].innerHTML = suma;

    console.log(table.rows[i].cells[1].innerHTML);





}





function myFunction() {

    var table = document.getElementById("Prod");
    console.log(table);
    var calc = table.rows[1].cells;

    var cal = Math.round(calc[3].innerHTML / calc[2].innerHTML);

    console.log(cal);

    calc[4].innerHTML = cal;

    console.log(cal);

    var url_string = window.location.href

    var url = new URL(url_string);

   // var c = url.searchParams.get("servicio");

    var alternativa = "JOHNNIE RED & LEMON";

    var c = alternativa;

    if (c == "JOHNNIE RED ") {

        c = alternativa;

    }

    // const cal = 0;



    for (var i = 1; i < table.rows.length; i++) {

        calc = table.rows[i].cells;

        cal = Math.round(calc[3].innerHTML / calc[2].innerHTML);

        cal = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(cal)

        table.rows[i].cells[4].innerHTML = cal;

    }



    var ingredientes = document.getElementById("Ingredientes");



    var i;

    for (i = ingredientes.rows.length - 10; i >= 0; i--) {

        if (i != 0) {

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

        cell2.style.backgroundColor = "#EEFFA1";

        cell2.innerHTML = getCantProd(nombre, c);

        cell3.innerHTML = vlrUn;

        cell4.innerHTML = "";

    }



    var i = ingredientes.rows.length - 9;

    calcRentabilidad();

    var precio = getCantProd("Precio", c);

    ingredientes.rows[i + 4].cells[1].innerHTML = precio;

    ingredientes.rows[i + 4].cells[1].contentEditable = "true";

    ingredientes.rows[i + 4].cells[1].style.backgroundColor = "#EEFFA1";



    ingredientes.rows[i + 5].cells[1].innerHTML = precio * 0.08;

    ingredientes.rows[i + 6].cells[1].innerHTML = precio - ingredientes.rows[i + 5].cells[1].innerHTML - ingredientes.rows[i + 3].cells[1].innerHTML;

    var tableComparacion = document.getElementById("Comparacion");
    tableComparacion.rows[0].cells[0].innerHTML = "RENTABILIDAD " + c +  tableComparacion.rows[0].cells[0].innerHTML;
    tableComparacion.rows[1].cells[0].innerHTML = c;
    tableComparacion.rows[2].cells[0].innerHTML = ingredientes.rows[i + 6].cells[1].innerHTML;

    ingredientes.rows[i + 7].cells[1].innerHTML = Math.round((ingredientes.rows[i + 3].cells[1].innerHTML / precio) * 100) + "%";

    ingredientes.rows[i + 8].cells[1].innerHTML = Math.round((ingredientes.rows[i + 6].cells[1].innerHTML / precio) * 100) + "%";

 /*   var tableComparacion = document.getElementById("Comparacion");
    var tableGanancia = document.getElementById("Ganancia");
    tableGanancia.rows[1].cells[0].innerHTML = Math.round(tableComparacion.rows[1].cells[0].innerHTML/tableComparacion.rows[1].cells[1].innerHTML);


    /*   var row = table.insertRow(0);

        var cell1 = row.insertCell(0);

        var cell2 = row.insertCell(1);

        cell1.innerHTML = "Hola";

        cell2.innerHTML = "NEW CELL2";*/

}

function reCalcular() {

    var ingredientes = document.getElementById("Ingredientes");

    calcRentabilidad();

    var i = ingredientes.rows.length - 9;

    var precio = ingredientes.rows[i + 4].cells[1].innerHTML;

    ingredientes.rows[i + 4].cells[1].contentEditable = "true";

    ingredientes.rows[i + 4].cells[1].style.backgroundColor = "#EEFFA1";

    ingredientes.rows[i + 5].cells[1].innerHTML = precio * 0.08;

    ingredientes.rows[i + 6].cells[1].innerHTML = precio - ingredientes.rows[i + 5].cells[1].innerHTML - ingredientes.rows[i + 3].cells[1].innerHTML;

    ingredientes.rows[i + 7].cells[1].innerHTML = Math.round((ingredientes.rows[i + 3].cells[1].innerHTML / precio) * 100) + "%";

    ingredientes.rows[i + 8].cells[1].innerHTML = Math.round((ingredientes.rows[i + 6].cells[1].innerHTML / precio) * 100) + "%";
   

}

function calcularRentabilidadSOF() {

    var ingredientes = document.getElementById("SofVolume");

    var calc;

    var suma = 0;

   // console.log(ingredientes.rows.length);

    var i = ingredientes.rows.length - 9;

    var unidadA = ingredientes.rows[2].cells[1].innerHTML;
    var cantidad = ingredientes.rows[2].cells[3].innerHTM;
    ingredientes.rows[2].cells[4].innerHTM = unidadA / cantidad;

    suma = ingredientes.rows[2].cells[4].innerHTML * ingredientes.rows[2].cells[3].innerHTML;
    ingredientes.rows[2].cells[5].innerHTML = suma;
    var costopro = Math.round(suma) + Math.round(suma * 0.05);


    //  costopro = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(costopro);

    ingredientes.rows[i].cells[2].innerHTML = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(suma);

    ingredientes.rows[i + 2].cells[1].innerHTML = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' }).format(suma * 0.05);

    ingredientes.rows[i + 3].cells[1].innerHTML = costopro;

    //calcRentabilidad();

    var i = ingredientes.rows.length - 9;

    var precio = ingredientes.rows[i + 4].cells[1].innerHTML;

    ingredientes.rows[i + 4].cells[1].contentEditable = "true";

    ingredientes.rows[i + 4].cells[1].style.backgroundColor = "#EEFFA1";

    ingredientes.rows[i + 5].cells[1].innerHTML = precio * 0.08;

    ingredientes.rows[i + 6].cells[1].innerHTML = precio - ingredientes.rows[i + 5].cells[1].innerHTML - ingredientes.rows[i + 3].cells[1].innerHTML;

    var url_string = window.location.href

    var url = new URL(url_string);

   // var c = url.searchParams.get("servicio");
    var c = "Cerveza";
    var tableComparacion = document.getElementById("Comparacion");
    var cambio = " vs " + c.toUpperCase();
    tableComparacion.rows[0].cells[0].innerHTML = cambio ;
    tableComparacion.rows[1].cells[1].innerHTML = c.toUpperCase();
    tableComparacion.rows[2].cells[1].innerHTML = ingredientes.rows[i + 6].cells[1].innerHTML;
    ingredientes.rows[i + 7].cells[1].innerHTML = Math.round((ingredientes.rows[i + 3].cells[1].innerHTML / precio) * 100) + "%";
    ingredientes.rows[i + 8].cells[1].innerHTML = Math.round((ingredientes.rows[i + 6].cells[1].innerHTML / precio) * 100) + "%";

    var tableGanancia = document.getElementById("Ganancia");
    tableGanancia.rows[1].cells[0].innerHTML = Math.round(tableComparacion.rows[1].cells[0].innerHTML/tableComparacion.rows[1].cells[1].innerHTML);

}



function getCantProd(nombreProducto, nombreReceta) {

    var rawFile = new XMLHttpRequest();

    var cant;



    rawFile.open("GET", "Cantidades.txt", false);

    rawFile.onreadystatechange = function () {

        if (rawFile.readyState === 4) {

            if (rawFile.status === 200 || rawFile.status == 0) {

                var allText = rawFile.responseText;

                var linea = allText.split("\n");



                for (var i = 0; i < linea.length; i++) {



                    var separado = linea[i].split("-");

                    if (nombreReceta == separado[0]) {

                        if (nombreProducto == "Precio") {

                            cant = separado[2];

                            return separado[2];

                        } else {

                            var idprod = getIdProd(nombreProducto);

                            //       console.log(idprod);

                            products = separado[1].split(",");

                            for (var j = 0; j < products.length; j++) {

                                var subnivel = products[j].split(";");

                                //  console.log(subnivel[0]);

                                if (subnivel[0] == idprod) {

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



function getIdProd(nombre) {

    var rawFile = new XMLHttpRequest();

    var global1;

    rawFile.open("GET", "Prodcuto.csv", false);

    rawFile.onreadystatechange = function () {

        if (rawFile.readyState === 4) {

            if (rawFile.status === 200 || rawFile.status == 0) {

                var allText = rawFile.responseText;

                var linea = allText.split("\n");

                for (var i = 0; i < linea.length; i++) {



                    var separado = linea[i].split(",");

                    if (nombre == separado[1]) {

                        //  console.log("getId " + separado[0] );

                        global1 = separado[0];

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

function informacionMarcas() {
    var todo = "JOHNNIE WALKER;Cerveza;3|GORDONS;Cerveza;3|SMIRNOFF;Destilado Nacional;3|BLACK & WHITE;Destilado Nacional;1";
    return todo;
}
function informacionServicios(){
    var info = "JOHNNIE WALKER;JOHNNIE RED & LEMON;1,2,3;- Llene el vaso con cubos de hielo <br> - Vierta 50 ml de Johnnie Walker Red Label <br>- Llene hasta el tope con gaseosa de lima <br>- Decore con una rodaja de limón <br>;Cerveza;3";
    var info2 = "GORDONS;GORDONS TONIC;4,5,3;- En un vaso largo o copa globo agrega hielo hasta el tope <br>- Luego agregue 50 ml de Gin Gordon's London Dry y <br>complete con agua tónica <br>- Decore con una rodaja de limón <br>;Cerveza;3";
    var info3 = "SMIRNOFF;BOTLL SMIRNOFF X1;6;;Destilado Nacional;3";
    var info4 = "BLACK & WHITE;BOTLL B&W;7;;Destilado Nacional;1";

    var completo = [info,info2 , info3 , info4];
    return completo;
}
function cuadroRentabilidad(){

}
function addImages(img){
    var imgDiageo = document.getElementById("imgDiageo");
    var imgSoV = document.getElementById("imgSoV");
    imgDiageo.src=img;

    var url_string = window.location.href

    var url = new URL(url_string);

   // var c = url.searchParams.get("source");
    var c = "Cerveza" ;

    if (c == "Cerveza"){
        imgSoV.src = "Poker.png";
    }else if (c == "Destilado Nacional"){

        imgSoV.src = "DestNacional.png";
    }else{


    }
  


}
