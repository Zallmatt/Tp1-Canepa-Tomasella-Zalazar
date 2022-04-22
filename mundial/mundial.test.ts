import { Equipo } from "./equipo";
import { Grupo } from "./grupo";
import { Estadio } from './estadio';
import { Partido } from './partido';
import { Manager } from "./manager";
import { Arbitro } from "./arbitro";

//#region Equipo 
//1_Cuando_SeCreaUnEquipo_Deberia_CrearseConNombreYCodigo
test('Cuando_SeCreaUnEquipo_Deberia_CrearseConNombreYCodigo', () => {
    const equipo = new Equipo("Argentina", "AR");
    expect(equipo.nombreEquipo).toBe("Argentina");
    expect(equipo.codigoEquipo).toBe("AR");
});
//2_Cuando_SeComparaDosEquiposMismoNombre_Deberia_DarVerdadero
test('Cuando_SeComparaDosEquiposMismoNombre_Deberia_DarVerdadero', () => {
    const equipo1 = new Equipo("Argentina", "AR");
    const equipo2 = new Equipo("Argentina", "AR");
    expect(equipo1).toStrictEqual(equipo2);
});
//#endregion

//#region Estadio
//101_Cuando_SeCreaUnEstadio_Deberia_CrearseConNombre
test('Cuando_SeCreaUnEstadio_Deberia_CrearseConNombre', () => {
    const estadio = new Estadio("Wembley");
    expect(estadio.nombreEstadio).toBe("Wembley");
});
//#endregion

//#region Grupo
//201_Cuando_SeCreaUnGrupo_Deberia_CrearseConLetraY4Equipos
test('201_Cuando_SeCreaUnGrupo_Deberia_CrearseConLetraY4Equipos', () => {
    const gr = new Grupo("A");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))
    expect(gr.nombreGrupo).toBe("A");
    expect(gr.Equipos.length).toBe(4);
});
//202_Cuando_SeCreaUnGrupoConMasDeUnaLetra_Deberia_ArrojarUnError
test('202_Cuando_SeCreaUnGrupoConMasDeUnaLetra_Deberia_ArrojarUnError', () => {
    try {
        const g = new Grupo("AB");
    } catch (error) {

    }
})
//203_Cuando_CreacionPartidos_Deberia_CrearseLosPartidosDelGrupo
test('//203_Cuando_CreacionPartidos_Deberia_CrearseLosPartidosDelGrupo', () => {
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Argentina", "ARG"))
    gr.AgregarEquipo(new Equipo("Arabia Saudita", "AS"))
    gr.AgregarEquipo(new Equipo("Mexico", "MEX"))
    gr.AgregarEquipo(new Equipo("Polonia", "POL"))

    const local = new Equipo("Argentina", "ARG");
    const visitante = new Equipo("Arabia Saudita", "AS");

    const partido = new Partido();
    partido.creacionPartidos(1, gr, local, visitante);
    gr.grupoPartidos(partido)
    expect(gr.PartidosDeGrupo[0].equipoLocal.nombreEquipo).toBe("Argentina")
})

//204_Cuando_SePidePartido1_Deberia_DevolverElPartido1DelGrupoLocalEquipo1VisitanteEquipo2
test('204_Cuando_SePidePartido1_Deberia_DevolverElPartido1DelGrupoLocalEquipo1VisitanteEquipo2', () => {
    const gr = new Grupo("A");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local = new Equipo("Qatar", "QTR");
    const visitante = new Equipo("Ecuador", "ECU");

    const partido = new Partido();
    partido.creacionPartidos(1, gr, local, visitante);

    expect(partido.devolverPartido(partido)).toBe("Local: Qatar Visitante: Ecuador");
});

//205_Cuando_SePidePartidoX_Deberia_DevolverElPartidoXDelGrupo
test('205_Cuando_SePidePartidoX_Deberia_DevolverElPartidoXDelGrupo', () => {
    const gr = new Grupo("A");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))
    //Partido 1
    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");
    //Partido 2
    const local2 = new Equipo("Senegal", "SEN");
    const visitante2 = new Equipo("Paises Bajos", "NED");
    //Partido 3
    const local3 = new Equipo("Qatar", "QTR");
    const visitante3 = new Equipo("Senegal", "SEN");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);

    const partido2 = new Partido();
    partido2.creacionPartidos(1, gr, local2, visitante2);

    const partido3 = new Partido();
    partido3.creacionPartidos(1, gr, local3, visitante3);

    expect(partido2.devolverPartido(partido2)).toBe("Local: Senegal Visitante: Paises Bajos");
});

//206_Cuando_SePidePartidos_Deberia_DevolverListadoDeTodosLosPartidos
test('206_Cuando_SePidePartidos_Deberia_DevolverListadoDeTodosLosPartidos', () => {
    const gr = new Grupo("A");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))
    //Partido 1
    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");
    //Partido 2
    const local2 = new Equipo("Senegal", "SEN");
    const visitante2 = new Equipo("Paises Bajos", "NED");
    //Partido 3
    const local3 = new Equipo("Qatar", "QTR");
    const visitante3 = new Equipo("Senegal", "SEN");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);

    const partido2 = new Partido();
    partido2.creacionPartidos(1, gr, local2, visitante2);

    const partido3 = new Partido();
    partido3.creacionPartidos(1, gr, local3, visitante3);

    const expect1: Array<Partido>=[partido1,partido2,partido3];

    gr.grupoPartidos(partido1);
    gr.grupoPartidos(partido2);
    gr.grupoPartidos(partido3);

    expect(expect1).toStrictEqual(gr.PartidosDeGrupo);
});
//207_Cuando_Ranking_Deberia_DevolverListadoDeEquiposEnOrdenDePuntos
test('207_Cuando_Ranking_Deberia_DevolverListadoDeEquiposEnOrdenDePuntos', () => {
    const g = new Grupo("C");
    g.AgregarEquipo(new Equipo("Argentina", "AR"));
    g.AgregarEquipo(new Equipo("Mexico", "MX"));
    g.AgregarEquipo(new Equipo("Arabia Saudita", "AS"));
    g.AgregarEquipo(new Equipo("Polonia", "PO"));
    
    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.finPartido();

    const visitante2 = new Equipo("Arabia Saudita", "AS");


    const partido2 = new Partido();
    partido2.creacionPartidos(1, g, local1, visitante2);
    
    partido2.sumaGolLocal();
    partido2.sumaGolVisitante();
    partido2.finPartido();

    const visitante3 = new Equipo("Polonia", "PO");

    const partido3 = new Partido();
    partido3.creacionPartidos(1, g, local1, visitante3);
    partido3.sumaGolVisitante();
    partido3.finPartido();

    g.grupoPartidos(partido1);
    g.grupoPartidos(partido2);
    g.grupoPartidos(partido3);

    expect(g.ranking()[2].nombreEquipo).toBe("Arabia Saudita");
});
//208_Cuando_PuntosPorEquipo_Deberia_DevolverLosPuntosDelEquipoPasadoComoParametro
test('208_Cuando_PuntosPorEquipo_Deberia_DevolverLosPuntosDelEquipoPasadoComoParametro', () => {
    const g = new Grupo("C");
    g.AgregarEquipo(new Equipo("Argentina", "AR"));
    g.AgregarEquipo(new Equipo("Mexico", "MX"));
    g.AgregarEquipo(new Equipo("Arabia Saudita", "AS"));
    g.AgregarEquipo(new Equipo("Polonia", "PO"));
    
    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.finPartido();

    const visitante2 = new Equipo("Arabia Saudita", "AS");


    const partido2 = new Partido();
    partido2.creacionPartidos(1, g, local1, visitante2);
    partido2.sumaGolLocal();
    partido2.sumaGolVisitante();
    partido2.finPartido();

    const visitante3 = new Equipo("Polonia", "PO");

    const partido3 = new Partido();
    partido3.creacionPartidos(1, g, local1, visitante3);
    partido3.sumaGolVisitante();
    partido3.finPartido();

    g.grupoPartidos(partido1);
    g.grupoPartidos(partido2);
    g.grupoPartidos(partido3);

    expect(g.puntosPorEquipo(local1)).toBe(4);
});
//209_Cuando_PuntosPorCodigoEquipo_Deberia_DevolverLosPuntosDelEquipoPasadoComoParametro
test('209_Cuando_PuntosPorCodigoEquipo_Deberia_DevolverLosPuntosDelEquipoPasadoComoParametro', () => {
    const g = new Grupo("C");
    g.AgregarEquipo(new Equipo("Argentina", "AR"));
    g.AgregarEquipo(new Equipo("Mexico", "MX"));
    g.AgregarEquipo(new Equipo("Arabia Saudita", "AS"));
    g.AgregarEquipo(new Equipo("Polonia", "PO"));

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, g, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.finPartido();

    const visitante2 = new Equipo("Arabia Saudita", "AS");


    const partido2 = new Partido();
    partido2.creacionPartidos(1, g, local1, visitante2);

    partido2.sumaGolLocal();
    partido2.sumaGolVisitante();
    partido2.finPartido();

    const visitante3 = new Equipo("Polonia", "PO");

    const partido3 = new Partido();
    partido3.creacionPartidos(1, g, local1, visitante3);

    partido3.sumaGolVisitante();
    partido3.finPartido();

    g.grupoPartidos(partido1);
    g.grupoPartidos(partido2);
    g.grupoPartidos(partido3);

    expect(g.puntosPorCodigo("AR")).toBe(4);
});


//#endregion

//#region Partido
//301_Cuando_SeCreaUnGrupoPartido_Deberia_CrearseConEquipoLocalYVisitante
test('301_Cuando_SeCreaUnGrupoPartido_Deberia_CrearseConEquipoLocalYVisitante', () => {
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Argentina", "ARG"))
    gr.AgregarEquipo(new Equipo("Arabia Saudita", "AS"))
    gr.AgregarEquipo(new Equipo("Mexico", "MEX"))
    gr.AgregarEquipo(new Equipo("Polonia", "POL"))

    const local = new Equipo("Argentina", "ARG");
    const visitante = new Equipo("Arabia Saudita", "AS");

    const partido = new Partido();
    partido.creacionPartidos(1, gr, local, visitante);

    gr.grupoPartidos(partido)
    expect(gr.PartidosDeGrupo[0].equipoLocal.nombreEquipo).toBe("Argentina")
    expect(gr.PartidosDeGrupo[0].equipoVisitante.nombreEquipo).toBe("Arabia Saudita")
});

//302_Cuando_SeCreaUnGrupoPartidoConElMismo_Deberia_ArrojarUnError
test('302_Cuando_SeCreaUnGrupoPartidoConElMismo_Deberia_ArrojarUnError', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, local1);
    
    try {
        gr.grupoPartidos(partido1)
    } catch (error) {

    }
});

//303_Cuando_SumarGolLocal_Deberia_SumaUnGolAlLocal
test('303_Cuando_SumarGolLocal_Deberia_SumaUnGolAlLocal', ()=>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();

    expect(local1.golPartido).toBe(1)
})

//304_Cuando_SumarGolVisitante_Deberia_SumaUnGolAlVisitante
test('304_Cuando_SumarGolVisitante_Deberia_SumaUnGolAlVisitante', ()=>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolVisitante();

    expect(visitante1.golPartido).toBe(1)
})

//305_Cuando_Finalizar_Deberia_ElPartidoNoDebeRecibirMasGoles
test('305_Cuando_Finalizar_Deberia_ElPartidoNoDebeRecibirMasGoles', ()=>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.finPartidoRegular();
    partido1.sumaGolLocal();

    expect(local1.golPartido).toBe(1);
})

//306_Cuando_SumarGolVisitanteYEstaFinalizado_Deberia_ArrojarUnError
test('306_Cuando_SumarGolVisitanteYEstaFinalizado_Deberia_ArrojarUnError', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Argentina", "AR"));
    gr.AgregarEquipo(new Equipo("Mexico", "MX"));
    gr.AgregarEquipo(new Equipo("Arabia Saudita", "AS"));
    gr.AgregarEquipo(new Equipo("Polonia", "PO"));

    const local1 = new Equipo("Argentina", "AR");
    const visitante1 = new Equipo("Mexico", "MX");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.finPartidoRegular();

    expect(partido1.sumaGolLocal()).toBe("Error");
})

//307_Cuando_PuntosLocal_Deberia_DeberiaDevolverLosPuntosDelLocal
test('307_Cuando_PuntosLocal_Deberia_DeberiaDevolverLosPuntosDelLocal', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.sumaGolLocal();

    expect(partido1.puntosLocal()).toBe(3)
})

//308_Cuando_PuntosVisitante_Deberia_DeberiaDevolverLosPuntosDelVisitante
test('308_Cuando_PuntosVisitante_Deberia_DeberiaDevolverLosPuntosDelVisitante', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.sumaGolLocal();
    expect(partido1.puntosVisitante()).toBe(0)
})

//309_Cuando_PuntosLocal_Deberia_Devolver3SiGanoLocal
test('309_Cuando_PuntosLocal_Deberia_Devolver3SiGanoLocal', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.sumaGolLocal();
    expect(partido1.puntosLocal()).toBe(3);
})

//310_Cuando_PuntosLocal_Deberia_Devolver0SiGanoVisitante
test('310_Cuando_PuntosLocal_Deberia_Devolver0SiGanoVisitante', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolVisitante();
    expect(partido1.puntosLocal()).toBe(0);
})

//311_Cuando_PuntosLocal_Deberia_Devolver1SiEmpataron
test('311_Cuando_PuntosLocal_Deberia_Devolver1SiEmpataron', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolVisitante();
    partido1.sumaGolLocal();
    partido1.finPartido();;
    expect(partido1.puntosLocal()).toBe(1);
})

//312_Cuando_PuntosVisitante_Deberia_Devolver3SiGanoVisitante
test('312_Cuando_PuntosVisitante_Deberia_Devolver3SiGanoVisitante', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolVisitante();
    expect(partido1.puntosVisitante()).toBe(3);
})

//313_Cuando_PuntosVisitante_Deberia_Devolver0SiGanoLocal
test('313_Cuando_PuntosVisitante_Deberia_Devolver0SiGanoLocal', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    expect(partido1.puntosVisitante()).toBe(0);
})

//314_Cuando_PuntosVisitante_Deberia_Devolver1SiEmpataron
test('314_Cuando_PuntosVisitante_Deberia_Devolver1SiEmpataron', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.sumaGolVisitante();
    partido1.finPartido();;

    expect(partido1.puntosVisitante()).toBe(1);
})

//315_Cuando_SumarGolLocalSuplementario_Deberia_SumaUnGolAlLocal
test('315_Cuando_SumarGolLocalSuplementario_Deberia_SumaUnGolAlLocal', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.sumaGolVisitante();
    partido1.finPartidoRegular();
    partido1.sumaGolLocalSuplementario();

    expect(local1.golPartido).toBe(2);
})

//316_Cuando_SumarGolVisitanteSuplementario_Deberia_SumaUnGolAlVisitante
test('316_Cuando_SumarGolVisitanteSuplementario_Deberia_SumaUnGolAlVisitante', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.sumaGolVisitante();
    partido1.finPartidoRegular();
    partido1.sumaGolVisitanteSuplementario();
    expect(visitante1.golPartido).toBe(2);
})
//317_Cuando_ObtenerGolesLocalNormal_Deberia_DevolverLaCantidadDeGolesEnTiempoNormalDelLocal
test('317_Cuando_ObtenerGolesLocalNormal_Deberia_DevolverLaCantidadDeGolesEnTiempoNormalDelLocal', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.sumaGolVisitante();
    partido1.finPartidoRegular();
    partido1.sumaGolLocalSuplementario();
    expect(partido1.ObtenerGolesLocalNormal()).toBe(1);
})

//318_Cuando_ObtenerGolesLocalSuplementarios_Deberia_DevolverLaCantidadDeGolesEnTiempoSuplementarioDelLocal
test('318_Cuando_ObtenerGolesLocalSuplementarios_Deberia_DevolverLaCantidadDeGolesEnTiempoSuplementarioDelLocal', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.sumaGolVisitante();
    partido1.finPartidoRegular();
    partido1.sumaGolLocalSuplementario();
    expect(partido1.ObtenerGolesLocalSuplementarios()).toBe(1);
})

//319_Cuando_ObtenerGolesLocalTotal_Deberia_DevolverLaCantidadDeGolesTotalDelLocal
test('319_Cuando_ObtenerGolesLocalTotal_Deberia_DevolverLaCantidadDeGolesTotalDelLocal', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.sumaGolVisitante();
    partido1.finPartidoRegular();
    partido1.sumaGolLocalSuplementario();
    partido1.finPartido();
    expect(partido1.ObtenerGolesLocalTotal()).toBe(2);
})

//320_Cuando_ObtenerGolesVisitanteNormal_Deberia_DevolverLaCantidadDeGolesEnTiempoNormalDelVisitante
test('320_Cuando_ObtenerGolesVisitanteNormal_Deberia_DevolverLaCantidadDeGolesEnTiempoNormalDelVisitante', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.sumaGolVisitante();
    partido1.finPartidoRegular();
    partido1.sumaGolLocalSuplementario();
    expect(partido1.ObtenerGolesVisitanteNormal()).toBe(1);
})

//321_Cuando_ObtenerGolesVisitanteSuplementarios_Deberia_DevolverLaCantidadDeGolesEnTiempoSuplementarioDelVisitante
test('321_Cuando_ObtenerGolesVisitanteSuplementarios_Deberia_DevolverLaCantidadDeGolesEnTiempoSuplementarioDelVisitante', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.sumaGolVisitante();
    partido1.finPartidoRegular();
    partido1.sumaGolVisitanteSuplementario();
    expect(partido1.ObtenerGolesVisitanteSuplementarios()).toBe(1);
})

//322_Cuando_ObtenerGolesVisitanteTotal_Deberia_DevolverLaCantidadDeGolesTotalDelVisitante
test('322_Cuando_ObtenerGolesVisitanteTotal_Deberia_DevolverLaCantidadDeGolesTotalDelVisitante', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.sumaGolVisitante();
    partido1.finPartidoRegular();
    partido1.sumaGolLocalSuplementario();
    partido1.finPartido();
    expect(partido1.ObtenerGolesVisitanteTotal()).toBe(1);
})

//323_Cuando_EstaFinalizado_Deberia_DevolverTrueSiElPartidoFinalizo
test('323_Cuando_EstaFinalizado_Deberia_DevolverTrueSiElPartidoFinalizo', () =>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolLocal();
    partido1.sumaGolVisitante();
    partido1.finPartidoRegular();
    partido1.finPartido();
    expect(partido1.finalizarPartidoTotal).toBe(true);

})
//#endregion

//#region Manager
//401_Cuando_SeCreaManager_Deberia_TenerUnNombre
test('401_Cuando_SeCreaManager_Deberia_TenerUnNombre', () => {
    const man = new Manager("Manager1");

    expect(man.nombre).toBe("Manager1");
});

//402_Cuando_AgregarGrupos_Deberia_TenerUnGrupo
test('402_Cuando_AgregarGrupos_Deberia_TenerUnGrupo', () => {
    const manag = new Manager("Manager1");
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Argentina", "ARG"))
    gr.AgregarEquipo(new Equipo("Arabia Saudita", "AS"))
    gr.AgregarEquipo(new Equipo("Mexico", "MEX"))
    gr.AgregarEquipo(new Equipo("Polonia", "POL"))
    manag.agregarGrupo(gr)

    expect(manag.grupo[0].Equipos[0].nombreEquipo).toBe("Argentina");
});

//403_Cuando_SeCreaManager_Deberia_CrearOctavos
test('403_Cuando_SeCreaManager_Deberia_CrearOctavos', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    expect.arrayContaining(man.crearOctavos());
});

//404_Cuando_SeCreaManager_Deberia_CrearCuartos
test('404_Cuando_SeCreaManager_Deberia_CrearCuartos', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    expect.arrayContaining(man.crearCuartos());
});

//405_Cuando_SeCreaManager_Deberia_CrearSemi
test('405_Cuando_SeCreaManager_Deberia_CrearSemi', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    man.crearCuartos();
    expect.arrayContaining(man.crearSemi());
});

//406_Cuando_SeCreaManager_Deberia_CrearTercerPuesto
test('406_Cuando_SeCreaManager_Deberia_CrearTercerPuesto', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    man.crearCuartos();
    man.crearSemi();
    expect.arrayContaining(man.crearTercerPuesto());
});

//407_Cuando_SeCreaManager_Deberia_CrearFinal
test('407_Cuando_SeCreaManager_Deberia_CrearFinal', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    man.crearCuartos();
    man.crearSemi();
    expect.arrayContaining(man.crearFinal());
});

//#endregion

//#region FaseFinal
test('501_Cuando_Partidos_Deberia_DevolverLosPartidosDeOctavos', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    expect.arrayContaining(man.crearOctavos());
});

test('601_Cuando_Partidos_Deberia_DevolverLosPartidosDeCuartos', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    expect.arrayContaining(man.crearCuartos());
});

test('701_Cuando_Partidos_Deberia_DevolverLosPartidosDeSemi', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    expect.arrayContaining(man.crearCuartos());
});

test('801_Cuando_Partidos_Deberia_DevolverLosPartidosDeTercerPuesto', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    man.crearCuartos();
    man.crearSemi();
    expect.arrayContaining(man.crearTercerPuesto());
});

test('901_Cuando_Partidos_Deberia_DevolverLosPartidosDeFinal', () => {
    const man = new Manager("Manager1");
    man.generargrupo();
    man.crearOctavos();
    man.crearCuartos();
    man.crearSemi();
    expect.arrayContaining(man.crearFinal());
});
//#endregion

//#region TP1
//13_[PARTIDO] Se debe poder hacer que en un partido un equipo no se presente y automáticamente gana el equipo contrario (sin goles a ninguno)
test('13_', ()=>{
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Argentina", "ARG"))
    gr.AgregarEquipo(new Equipo("Arabia Saudita", "AS"))
    gr.AgregarEquipo(new Equipo("Mexico", "MEX"))
    gr.AgregarEquipo(new Equipo("Polonia", "POL"))

    const local = new Equipo("Argentina", "ARG");
    const visitante = new Equipo("Arabia Saudita", "AS");

    const partido = new Partido();
    partido.creacionPartidos(1, gr, local, visitante);
    partido.partidoAbandonadoLocal();

    expect(gr.puntosPorEquipo(local)).toBe(0);
    expect(gr.puntosPorEquipo(visitante)).toBe(3);
    expect(partido.ObtenerGolesLocalTotal()).toBe(0);
    expect(partido.ObtenerGolesVisitanteTotal()).toBe(0);

});
//#endregion
test('16_Un partido tiene un grupo de árbitros o jueces (3 en cancha y 3 en el VAR', () => {
    const gr = new Grupo("C");
    gr.AgregarEquipo(new Equipo("Qatar", "QTR"))
    gr.AgregarEquipo(new Equipo("Ecuador", "ECU"))
    gr.AgregarEquipo(new Equipo("Senegal", "SEN"))
    gr.AgregarEquipo(new Equipo("Paises Bajos", "NED"))

    const local1 = new Equipo("Qatar", "QTR");
    const visitante1 = new Equipo("Ecuador", "ECU");

    const partido1 = new Partido();
    partido1.AgregarArbitroC(new Arbitro("Roman"));
    partido1.AgregarArbitroC(new Arbitro("Enzo"));
    partido1.AgregarArbitroC(new Arbitro("German"));
    partido1.AgregarArbitroV(new Arbitro("Martin"));
    partido1.AgregarArbitroV(new Arbitro("Nicolas"));
    partido1.AgregarArbitroV(new Arbitro("Juan"));

    partido1.creacionPartidos(1, gr, local1, visitante1);
    partido1.sumaGolVisitante();

    expect(partido1.arbitrosC.length).toBe(3);
    expect(partido1.arbitrosV.length).toBe(3);
    expect(partido1.arbitrosC[0].nombreArbitro).toBe("Roman");
});