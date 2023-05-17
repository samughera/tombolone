import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
const schedina = [];
const numeriTot = [];
const numeriGenerati = [];
const clientConnessi = [];
var schedina_json;
var numeriPronti=0;






wss.on('connection', function connection(ws) {
   console.log("il server è avviato nella porta 8080");
   clientConnessi.push(ws);
    ws.on('message', function (message) {
      const data=JSON.parse(message);
      switch(data.type){
        case "creaScheda":{
          while (schedina.length < 15) {
            const nuovoNumero = Math.floor(Math.random() * 90) + 1;
            if (!schedina.includes(nuovoNumero)) {
                    schedina.push(nuovoNumero);
                }
            }
            console.log(schedina);
            ws.send(JSON.stringify({type:"scheda", "schedaT": schedina}))
            clearSchedina();
            break;
        }

        case "estrazione":{
          while (numeriGenerati.length < 1) {
            const nuovoNumero = Math.floor(Math.random() * 90) + 1;
            if(!numeriGenerati.includes(nuovoNumero)){
              if(!numeriTot.includes(nuovoNumero)){
            numeriGenerati.push(nuovoNumero);
            numeriTot.push(nuovoNumero);
          }
        }
          }
          console.log(numeriGenerati);
          ws.send(JSON.stringify({type:"numeroEstratto","numeroEstrattoT": numeriGenerati}))
          clearNumeri();
        }
        }

      })
      
    });


    function clearNumeri() {
      numeriGenerati.splice(0,numeriGenerati.length);
    }



function clearSchedina() {
  schedina.splice(0,schedina.length);
}

function RandomEstrazione (){
  while (numeriGenerati.length < 1) {
  const nuovoNumero = Math.floor(Math.random() * 90) + 1;
  if(!numeriGenerati.includes(nuovoNumero)){
  numeriGenerati.push(nuovoNumero);
}
}
return numeriGenerati;
}