import { Arbitro } from "./arbitro";
import { Equipo } from "./equipo";
import { Grupo } from "./grupo";


export class Partido {
    public numPartido: Number;
    public grupo: Grupo;
    public equipoLocal: Equipo;
    public equipoVisitante: Equipo;
    public finalizarPartidoRegular: boolean = false;
    public finalizarPartidoTotal: boolean = false;
    public abandonar = false;
    public ganador:Equipo;
    public arbitrosC: Array<Arbitro> = [];
    public arbitrosV: Array<Arbitro> = [];



    public AgregarArbitroV(arbitros:Arbitro) {//Nombre/Codigo
        if(arbitros.nombreArbitro !=""){
            const aux= new Arbitro(arbitros.nombreArbitro);
            this.arbitrosV.push(aux);
            return true;
        }

    }
    public AgregarArbitroC(arbitros:Arbitro) {//Nombre/Codigo
        if(arbitros.nombreArbitro !=""){
            const aux= new Arbitro(arbitros.nombreArbitro);
            this.arbitrosC.push(aux);
            return true;
        }

    }
    public ObtenerArbitros(){
        for(let i = 0; i<3; i++){
            this.arbitrosC[i].nombreArbitro;
        }
    }

    constructor() {
    }

    public creacionPartidos(pNum: Number, pGrupo: Grupo, pLocal: Equipo, pVisitante: Equipo) {
        if (pLocal != pVisitante) {
            for (let i = 0; i < 4; i++) {
                if (pGrupo.Equipos[i].nombreEquipo == pLocal.nombreEquipo) {
                    for (let j = 0; j < 4; j++) {
                        if (pGrupo.Equipos[j].nombreEquipo == pVisitante.nombreEquipo) {
                            this.numPartido = pNum;
                            this.grupo = pGrupo;
                            this.equipoLocal = pLocal;
                            this.equipoVisitante = pVisitante;
                            this.finalizarPartidoTotal = false;
                        }
                    }
                }
            }
        }
    }

    public creacionPartidos2(pNum: Number, pLocal: Equipo, pVisitante: Equipo) {
        if (pLocal != pVisitante) {
            this.numPartido = pNum;
            this.equipoLocal = pLocal;
            this.equipoVisitante = pVisitante;
            this.finalizarPartidoTotal = false;
        }
    }
    //Partidos
    public devolverPartido(partido: Partido): string {
        return "Local: " + partido.equipoLocal.nombreEquipo + " Visitante: " + partido.equipoVisitante.nombreEquipo;
    }

    public partidoAbandonadoLocal() {
        this.abandonar=true;
        if (this.abandonar == true) {
            this.finalizarPartidoTotal = true;
            if (this.finalizarPartidoTotal == true) {
              this.ganador=this.equipoVisitante;
            }
        }

    }

    public partidoAbandonadoVisitante() {
        this.abandonar=true;
        if (this.abandonar == true) {
            this.finalizarPartidoTotal = true;
            if (this.finalizarPartidoTotal == true) {
                this.ganador=this.equipoLocal;
            }
        }

    }

    //Goles
    public sumaGolLocal() {
        if (this.finalizarPartidoRegular == false) {
            this.equipoLocal.sumarGolPartido();
        } else {
            return "Error";
        }
    }
    public sumaGolVisitante() {
        if (this.finalizarPartidoRegular == false) {
            this.equipoVisitante.sumarGolPartido();
        } else {
            return "Error";
        }
    }
    //GolesSuplementario
    public sumaGolLocalSuplementario() {
        if (this.finalizarPartidoRegular == true && this.finalizarPartidoTotal == false) {
            this.equipoLocal.sumarGolPartido();
            this.equipoLocal.sumarGolSuplementario();
        }
    }
    public sumaGolVisitanteSuplementario() {
        if (this.finalizarPartidoRegular == true && this.finalizarPartidoTotal == false) {
            this.equipoVisitante.sumarGolPartido();
            this.equipoVisitante.sumarGolSuplementario();
        }
    }
    //GolesNormal
    public ObtenerGolesLocalNormal() {
        let aux: number;
        aux = this.equipoLocal.golPartido - this.equipoLocal.golTiempoSuplementario
        return aux
    }
    public ObtenerGolesVisitanteNormal() {
        let aux: number;
        aux = this.equipoVisitante.golPartido - this.equipoVisitante.golTiempoSuplementario
        return aux
    }
    //Conteo Goles Suplementarios
    public ObtenerGolesLocalSuplementarios() {
        return this.equipoLocal.golTiempoSuplementario;
    }
    public ObtenerGolesVisitanteSuplementarios() {
        return this.equipoVisitante.golTiempoSuplementario;
    }
    //Goles Total
    public ObtenerGolesLocalTotal() {
        return this.equipoLocal.golesTotales;
    }
    public ObtenerGolesVisitanteTotal() {
        return this.equipoVisitante.golesTotales;
    }

    //Partido Terminado
    public finPartidoRegular() {
        this.finalizarPartidoRegular = true;
    }
    public finPartido() {
        this.finalizarPartidoTotal = true;
        if (this.finalizarPartidoTotal == true) {
            this.puntosLocal();
            this.puntosVisitante();
            this.equipoLocal.golesTotalesEquipo();
            this.equipoVisitante.golesTotalesEquipo();
            for (let i = 0; i < 4; i++) {
                if (this.grupo.Equipos[i].nombreEquipo == this.equipoLocal.nombreEquipo) {
                    this.grupo.Equipos[i] = this.equipoLocal;
                }
            }
            for (let j = 0; j < 4; j++) {
                if (this.grupo.Equipos[j].nombreEquipo == this.equipoVisitante.nombreEquipo) {
                    this.grupo.Equipos[j] = this.equipoVisitante;
                }
            }
        }
    }
    //Puntos obtenidos
    public puntosLocal() {
        if (this.equipoLocal.golPartido > this.equipoVisitante.golPartido) {
            this.equipoLocal.puntosTotalesGrupo(3);
            return 3;
        } else if (this.equipoLocal.golPartido == this.equipoVisitante.golPartido) {
            this.equipoLocal.puntosTotalesGrupo(1);
            return 1;
        } else {
            return 0;
        }
    }
    public puntosVisitante() {
        if (this.equipoLocal.golPartido < this.equipoVisitante.golPartido) {
            this.equipoVisitante.puntosTotalesGrupo(3);
            return 3;
        } else if (this.equipoLocal.golPartido == this.equipoVisitante.golPartido) {
            this.equipoVisitante.puntosTotalesGrupo(1);
            return 1;
        } else {
            return 0;
        }
    }



}