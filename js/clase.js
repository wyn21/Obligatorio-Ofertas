//Nicolás Toscano (220264) Juan Manuel Mera (273527)
class Empleado{
	constructor(Nombre, Cedula, Departamento, Edad){
		this.Nombre=Nombre;
		this.Cedula=Cedula;
		this.Departamento=Departamento;
		this.Edad=Edad;
	}
	toString(){
		return this.Nombre + "(" + this.Cedula + ") ";
	}
	compararNombres(otro){
		return this.Nombre.localeCompare(otro.Nombre);
	}
}

class Rubro{
	constructor(nombre, Descripcion){
		this.nombre=nombre;
		this.Descripcion=Descripcion;
	}
	toString(){
		return this.nombre;
	}
}

class Oferta{
	constructor(funcionario, trabajo, Detalle, Precio){
		this.funcionario=funcionario;
		this.trabajo=trabajo;
		this.Detalle=Detalle;
		this.Precio=Precio;
	}
	toString(){
		return  this.trabajo + " " + this.Detalle + " " + this.Precio + " " + this.funcionario.Nombre;
	}
	compararPrecio(otro){
		return this.Precio - otro.Precio;
	}
	compararDepartamento(otro){
		return this.funcionario.Departamento.localeCompare(otro.funcionario.Departamento);
	}
}
	
	
class Sistema{
	constructor(){
		this.listaEmpleados=[];
		this.listaRubros=[];
		this.listaOfertas=[];
	}
	agregarEmpleado(unEmpleo){
		this.listaEmpleados.push(unEmpleo);
	}
	agregarRubro(unRubro){
		this.listaRubros.push(unRubro);
	}
	agregarOferta(unaOferta){
		this.listaOfertas.push(unaOferta);
	}
	eliminar(posicion){
		if(posicion>=0 && posicion<this.listaOfertas.length){
			this.listaOfertas.splice(posicion,1);
		}
	}
	toString(){
		return "Empleados" + this.listaEmpleados + "Rubros" + this.listaRubros + "Ofertas" + this.listaOfertas;
	}
	ordenar(){
		this.listaOfertas.sort(function(a,b){return a.compararPrecio(b)});
	}
	ordenarDepartamento(){
		this.listaOfertas.sort(function(a,b){return a.compararDepartamento(b)});
	}
	ordenarNombres(){
		this.listaEmpleados.sort(function(a,b){return a.compararNombres(b)});
	}
	estaCedula(cedula){
		let esta=false;
		for(let elem of this.listaEmpleados){
			if(elem.Cedula == cedula){
				esta=true;
			}
		}
		return esta;
	}
	estaRubro(rubros){
		let esta=false;
		for(let elem of this.listaRubros){
			if(elem.nombre == rubros){
				esta=true;
			}
		}
		return esta;
	}
	estaOferta(emple,rub,deta){
		let esta= false;
		for(let elem of this.listaOfertas){
			if(elem.funcionario==emple && elem.trabajo==rub && elem.Detalle==deta){
				esta=true;
			}
		}
		return esta;
	}
}
