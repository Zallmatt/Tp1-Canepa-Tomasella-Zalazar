import { Equipo } from './equipo';
import { Partido } from './partido';

export class Grupo {
    public nombreGrupo: string;
    public Equipos: Array<Equipo> = [];
    public PartidosDeGrupo: Array<Partido> = [];
    public puestos:number[] = [0, 0, 0, 0]; 
    public Rank: Array<Equipo> = [];
    public puntos: number=0;

    constructor(nombre: string) {
        if(nombre.length < 2){
            this.nombreGrupo = nombre;
        }
    }

    public AgregarEquipo(equipos:Equipo) {//Nombre/Codigo
        if(equipos.nombreEquipo !="" && equipos.codigoEquipo !="" ){
            const aux= new Equipo(equipos.nombreEquipo, equipos.codigoEquipo);
            this.Equipos.push(aux)
            return true;
        }
        
    }
    
    public grupoPartidos(Partido:Partido){//agregar partido
        if(Partido!=null){
            this.PartidosDeGrupo.push(Partido);
        }
    }

    public devolverPartidosDelGrupo(numPartido: number):Partido{
        if(this.PartidosDeGrupo[numPartido - 1] != null){
            return this.PartidosDeGrupo[numPartido - 1]
        }
    }

    public listaPartidos():Partido[]{
        let i=0;
        for(i=0;i<this.PartidosDeGrupo.length;i++){
            console.log("Partido: "+this.PartidosDeGrupo[i].numPartido + "Local: "+this.PartidosDeGrupo[i].equipoLocal + "Visitante: "+ this.PartidosDeGrupo[i].equipoVisitante);
            return this.PartidosDeGrupo;
        }
    }

    public puntosPorEquipo(pEquipo: Equipo){
        return pEquipo.puntosTotales;
    }

    public puntosPorCodigo(pCodigo: string){
        let i = 0;
        for(i=0;i<4;i++){
            if(this.Equipos[i].codigoEquipo== pCodigo){
                return this.Equipos[i].puntosTotales;
            }
        }
    }

    public ranking(): Equipo[] {
        for (const i of this.Equipos) {
                if (i.puntosTotales > this.puestos[0]) {
                    this.puestos[0] = i.puntosTotales;
                    this.Rank[1] = this.Rank[0];
                    this.Rank[0] = i;
                } else if (i.puntosTotales > this.puestos[1]) {
                    this.puestos[1] = i.puntosTotales;
                    this.Rank[2] = this.Rank[1];
                    this.Rank[1] = i;
                } else if (i.puntosTotales > this.puestos[2]) {
                    this.puestos[2] = i.puntosTotales;
                    this.Rank[3] = this.Rank[2];
                    this.Rank[2] = i;
                } else {
                    this.puestos[3] = i.puntosTotales;
                    this.Rank[3] = i;
                }
            }
        return this.Rank;
    }

    public creacionAutomaticaPartidos(){
        let a = 0;
        let b = 2

        for (let e = 0; e <= b ; e++) {
            if(e == 0){
                for(let i = 0; i <= b; i++){
                    a += 1;
                    let aux = new Partido();
                    aux.creacionPartidos(a, this, this.Equipos[0], this.Equipos[i+1]);
                    aux.sumaGolLocal();
                    aux.finPartido();
                    this.grupoPartidos(aux);
                }
            }
            else if(e == 1){
                for(let i = 1; i <= b; i++){
                    a += 1;
                    let aux = new Partido();
                    aux.creacionPartidos(a, this, this.Equipos[1], this.Equipos[i+1]);
                    aux.sumaGolLocal();
                    aux.sumaGolVisitante();
                    aux.finPartido();
                    this.grupoPartidos(aux);
                }
            }
            else{
                a += 1;
                let aux = new Partido();
                aux.creacionPartidos(a, this, this.Equipos[2], this.Equipos[3]);
                aux.sumaGolVisitante();
                aux.finPartido();
                this.grupoPartidos(aux);
            }
        }
    }
}
    



