//Nicolás Toscano (220264) Juan Manuel Mera (273527)
let sistema = new Sistema();


window.addEventListener("load",inicio);
function inicio(){
	document.getElementById("agregarEmp").addEventListener("click", agregarEmpleado);
	document.getElementById("agregarRub").addEventListener("click", agregarRubro);
	document.getElementById("agregarOf").addEventListener("click", incluirOferta);
	document.getElementById("borrarOf").addEventListener("click", borrarOferta);
	document.getElementById("idBotonConsultar").addEventListener("click", ponerTabla);
	document.getElementById("idBotonConsultar").addEventListener("click",cargarTabla);
	document.getElementById("idBotonConsultar").addEventListener("click", rubrosConMasOfertas);
	document.getElementById("pCreciente").addEventListener("click", ordenarPrecio);
	document.getElementById("nomDepCreciente").addEventListener("click", ordenDepartamento);
	document.getElementById("idBotonConsultar").addEventListener("click",rubrosSinOfertas);
}

function agregarEmpleado(){
	let miform = document.getElementById("formEmpleado");
	if (miform.reportValidity()){
		let nombre = document.getElementById("GET-nombre").value;
		let cedula = document.getElementById("GET-cedula").value;
		let departamento = document.getElementById("idDepart").value;
		let edad = document.getElementById("Get-edad").value;
		if(!sistema.estaCedula(cedula)){
			sistema.agregarEmpleado(new Empleado(nombre, cedula, departamento, edad));
			document.getElementById("formEmpleado").reset();
			cargarEmpleado();
		}
		else{
			alert("Cedula repetida");
		}
	}
}

function agregarRubro(){
	let miform = document.getElementById("formRubro");
	if (miform.reportValidity()){
		let nombre = document.getElementById("idNombre").value;
		let descripcion = document.getElementById("GET-descripcion").value;
		if(!sistema.estaRubro(nombre)){
			sistema.agregarRubro(new Rubro(nombre, descripcion));
			document.getElementById("formRubro").reset();
			cargarRubro();
			consultasRubro();
		}
		else{
			alert("Rubro repetido");
		}
	}
}

function incluirOferta(){
	let miform = document.getElementById("formOferta");
	if(miform.reportValidity()){
		let empleado = document.getElementById("idEmpleado").value;
		let rubro = document.getElementById("Rubro").value;
		let funcionario = ubicarFuncionario(empleado);//es igual al ejemplo del libro, agarro lo que dice en la pagina y lo busco con un for 
		let trabajo = ubicarRubro(rubro);//es igual al ejemplo del libro, agarro lo que dice en la pagina y lo busco con un for 
		let detalle = document.getElementById("GET-detalle").value;
		let precio = document.getElementById("GET-precio").value;
		if(!sistema.estaOferta(funcionario,trabajo,detalle)){
			sistema.agregarOferta(new Oferta(funcionario,trabajo,detalle,precio));
			document.getElementById("formOferta").reset();
			cargarOferta();
		}
		else{
			alert("Oferta repetida");
		}
	}
}

function ubicarFuncionario(empleado){
	let emple = document.getElementById("idEmpleado").value;
	let cualFuncionario;
	let lista=sistema.listaEmpleados;
	let elemento = emple.slice(0,emple.indexOf("("));
	for (let elem of lista){
		if(elemento==elem.Nombre){
			cualFuncionario=elem;//puse que agarre al objeto
		}
	}
	return cualFuncionario;
}

function ubicarRubro(rubro){
	let cualRubro;
	let lista = sistema.listaRubros;
	for(let elem of lista){
		if (elem.nombre==rubro){
			cualRubro=elem;
		}
	}
	return cualRubro;
}

function cargarOferta(){
	let combo = document.getElementById("idOferta");
	combo.innerHTML="";
	let datos = sistema.listaOfertas;
	for(let elem of datos){
		let nodo = document.createElement("option");
		let nodoT = document.createTextNode(elem);
		nodo.appendChild(nodoT);
		combo.appendChild(nodo);
	}
}

function cargarEmpleado(){
	let combo = document.getElementById("idEmpleado");
	combo.innerHTML="";
	let datos = sistema.listaEmpleados;
	for(let elem of datos){
		let nodo = document.createElement("option");
		let nodoT = document.createTextNode(elem);
		nodo.appendChild(nodoT);
		combo.appendChild(nodo);
	}
}

function cargarRubro(){
	let combo = document.getElementById("Rubro");
	combo.innerHTML="";
	let datos = sistema.listaRubros;
	for(let elem of datos){
		let nodo = document.createElement("option");
		let nodoT = document.createTextNode(elem);
		nodo.appendChild(nodoT);
		combo.appendChild(nodo);
	}
}

function borrarOferta(){
	let elegido = document.getElementById("idOferta").selectedIndex;
	sistema.eliminar(elegido);
	cargarOferta();
}

function consultasRubro(){
	let combo = document.getElementById("idRubro");
	combo.innerHTML="";
	let datos = sistema.listaRubros;
	for(let elem of datos){
		let nodo = document.createElement("option");
		let nodoT = document.createTextNode(elem.nombre);
		nodo.appendChild(nodoT);
		combo.appendChild(nodo);
	}
}

function ordenarPrecio(){
	sistema.ordenar();
}

function promedioPrecio(){
		let rubro=document.getElementById("idRubro").value;
		let precio=0;
		let cont=0;
		for(let elem of sistema.listaOfertas){
			if(elem.trabajo==rubro){
				precio+=parseInt(elem.Precio);
				cont++;
			}
		}
		let retorno ="0";
		if(cont>0){
			retorno=precio/cont;
		}
		return Math.trunc(retorno);
	}

function ponerTabla(){
	let titulo= document.getElementById("idRubro").value;
	let tabla = document.getElementById("idTablaConsulta");
	tabla.innerHTML="";
	let ofertas = sistema.listaOfertas;
	let caption = tabla.createCaption();
	caption.innerHTML="Rubro: " + titulo + " Promedio: " + promedioPrecio();
	let cabezal=tabla.createTHead();
	let filaCabezal =cabezal.insertRow();
	let cell = filaCabezal.insertCell();
	cell.innerHTML="Nombre Empleado";
	let cell2 = filaCabezal.insertCell();
	cell2.innerHTML="Departamento";
	let cell3 = filaCabezal.insertCell();
	cell3.innerHTML="Detalle de la oferta";
	let cell4 = filaCabezal.insertCell();
	cell4.innerHTML="Precio";
	let cell5 = filaCabezal.insertCell();
	cell5.innerHTML="Tipo";
	let radiobutonseleccionado = Array.from(document.getElementsByName("orden")).find(r => r.checked).value;//sacado de https://stackoverflow.com/a/41037200
	if(radiobutonseleccionado=="precio"){
		ordenarPrecio();
	}
	else if(radiobutonseleccionado==("departamento")){
		ordenDepartamento();
	}
	for (let elem of ofertas){
		if (elem.trabajo.nombre==titulo){
			filaCabezal=cabezal.insertRow();
			cell = filaCabezal.insertCell();
			cell2 = filaCabezal.insertCell();
			cell3 = filaCabezal.insertCell();
			cell4 = filaCabezal.insertCell();
			cell5 = filaCabezal.insertCell();
			cell.innerHTML=elem.funcionario.Nombre;
			cell2.innerHTML=elem.funcionario.Departamento;
			cell3.innerHTML=elem.Detalle;
			cell4.innerHTML=elem.Precio;
			cell5.innerHTML=rangoPrecios(elem.trabajo.nombre, elem.Detalle);
		}
	}
}



function cargarTabla(){
	let tabla= document.getElementById("tablaEmpleados");
	tabla.innerHTML="";
	let empleados = sistema.listaEmpleados;
	let cabezal=tabla.createTHead();
	let filaCabezal =cabezal.insertRow();
	let cell = filaCabezal.insertCell();
	cell.innerHTML="Nombre Empleado";
	let cell2 = filaCabezal.insertCell();
	cell2.innerHTML="Cedula";
	let cell3 = filaCabezal.insertCell();
	cell3.innerHTML="Departamento";
	let cell4 = filaCabezal.insertCell();
	cell4.innerHTML="Edad";
	let cell5 = filaCabezal.insertCell();
	cell5.innerHTML="Cantidad de ofertas";
	sistema.ordenarNombres();
	for (let elem of empleados){//hacer una funcion por fuera
		filaCabezal=cabezal.insertRow();
		cell = filaCabezal.insertCell();
		cell2 = filaCabezal.insertCell();
		cell3 = filaCabezal.insertCell();
		cell4 = filaCabezal.insertCell();
		cell5 = filaCabezal.insertCell();
		cell.innerHTML=elem.Nombre;
		cell2.innerHTML=elem.Cedula;
		cell3.innerHTML=elem.Departamento;
		cell4.innerHTML=elem.Edad;
		cell5.innerHTML=cantidadDeOfertas(elem.Cedula);
	}	
}

function cantidadDeOfertas(cedula){
	let cont = 0;
	for (let elementos of sistema.listaEmpleados){
		if(cedula==elementos.Cedula){
			for(let elem of sistema.listaOfertas){
				if (elementos.Nombre==elem.funcionario.Nombre){
					cont++;
				}
			}
			return cont;
		}
	}
}

function rangoPrecios(nombreRubro, detalleOferta){
	let simbolo = "";
	let max = 0;
	let min = Number.MAX_SAFE_INTEGER;
	let lista = [];
	for(let elem of sistema.listaOfertas){
		if(elem.trabajo.nombre==nombreRubro){
			lista.push(elem);
		}
	}
	for(let rubroLista of lista){
		if (parseInt(rubroLista.Precio)>=max){
			max=parseInt(rubroLista.Precio);
		}
		if(parseInt(rubroLista.Precio)<=min){
			min=parseInt(rubroLista.Precio);
		}
	}
			
			
	let rango = parseInt(max)-parseInt(min);
		for(let elemento of lista){
			if(detalleOferta == elemento.Detalle){			
				let valor = parseInt(elemento.Precio);
				if(rango==0){
					simbolo=" - ";
				}
				else if(valor>(rango*75/100)){
					simbolo="$$$$";
				}
				else if ((valor>(rango*50/100)) && (valor<=(rango*75/100))){
					simbolo="$$$";
				}
				else if ((valor>(rango*25/100)) && (valor<=(rango*50/100))){
					simbolo="$$";
				}
				else if (valor<=(rango*25/100)){
					simbolo="$";
				}
			}
		}
	return simbolo;
}

	
function rubrosSinOfertas(){
	let lista=document.getElementById("listaRubros2");
	lista.innerHTML="";
	let listaSinDatos = true//marquito
	for(let elem of sistema.listaRubros){
		let esta = false;
		for(let elemento of sistema.listaOfertas){
			if (elem.nombre == elemento.trabajo){
				esta=true;
			}
		}
		if (esta==false){
			let nodo=document.createElement("li");
			let nodoT=document.createTextNode(elem.nombre + " " + elem.Descripcion);
			nodo.appendChild(nodoT);
			lista.appendChild(nodo);
		}
		listaSinDatos = listaSinDatos && esta;
	}
	if(listaSinDatos==true){
			let nodo=document.createElement("li");
			let nodoT=document.createTextNode("Sin datos");
			nodo.appendChild(nodoT);
			lista.appendChild(nodo);
	}
}


function ordenDepartamento(){
	sistema.ordenarDepartamento();
}	

function rubrosConMasOfertas(){
	let lista = document.getElementById("listaRubros");
	let max=0;
	let maxRubro = "";
	lista.innerHTML="";
	nodo=document.createElement("li");
	nodoT=document.createTextNode("Sin datos");
	nodo.appendChild(nodoT);
	lista.appendChild(nodo);
	for(let elem of sistema.listaRubros){
		let cont = 0;
		for(let elementos of sistema.listaOfertas){
			if(elem.nombre == elementos.trabajo){
				cont++;
			}
		}
		if(cont>max){
			max=cont;
			maxRubro=elem.nombre;
			lista.innerHTML="";
			let nodo=document.createElement("li");
			let nodoT=document.createTextNode(maxRubro + " " + elem.Descripcion);
			nodo.appendChild(nodoT);
			lista.appendChild(nodo);
		}
		else{
			if(cont>0 && cont==max){
				maxRubro=elem.nombre;
				nodo=document.createElement("li");
				nodoT=document.createTextNode(maxRubro + " " + elem.Descripcion);
				nodo.appendChild(nodoT);
				lista.appendChild(nodo);
			}
		}
	}
}

	

	
