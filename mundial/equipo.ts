export class Equipo{
    public nombreEquipo:string;
    public codigoEquipo:string;
    public golPartido:number = 0;
    public golTiempoSuplementario:number=0;
    public golesTotales:number=0;
    public puntosTotales:number=0;

    constructor(nombre:string, codigo:string){
        this.nombreEquipo=nombre;
        this.codigoEquipo=codigo;
    }
    //Goles
    public sumarGolPartido(){
        this.golPartido=this.golPartido + 1;
    }
    public sumarGolSuplementario(){
        this.golTiempoSuplementario=this.golTiempoSuplementario + 1;
    }
    public golesTotalesEquipo(){//Sumar Gol Total
        this.golesTotales= this.golesTotales + this.golPartido;
        this.golPartido = 0;
        this.golTiempoSuplementario = 0;
    }
    //Puntos
    public puntosTotalesGrupo(puntos:number){
        this.puntosTotales=this.puntosTotales + puntos;
    }
}