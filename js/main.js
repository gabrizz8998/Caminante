function colocar_Pieza(){
    let seguir=true
    let piezas_colocadas= new Array();
        let casillas_ocupadas=new Array();
        let cont=0;
    while(seguir){
        
        let pieza_escogida=new Array();
        let casilla=new Array();
        let pieza_x = Math.floor((Math.random() * 8) + 1);
        let pieza_y = Math.floor((Math.random() * 2) + 1);

        pieza_escogida.push(pieza_x);
        pieza_escogida.push(pieza_y);

        let push=true;
        
        if(piezas_colocadas.length>0){
            for (let i = 0; i <piezas_colocadas.length;i++){
                if(piezas_colocadas[i][0]==pieza_x&&piezas_colocadas[i][0]==pieza_y){
                    push=false;
                }
            }
        }
        if(push){
            piezas_colocadas.push(pieza_escogida)
            console.log("introducida")
        }
        

        
        
        cont++;        
        if(cont==32){
            seguir=false;
        }
        //console.log(cont)
    }
    for (let i = 0; i <piezas_colocadas.length;i++){
        console.log(piezas_colocadas[i][0]+"   "+piezas_colocadas[i][1])
    }
}

colocar_Pieza();