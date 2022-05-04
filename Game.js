class Game {
    constructor() {

    }

    //Obtiene estado del juego
    getState() {
        //gameState en la base de datos
        var gameStateRef = database.ref('gameState');

        //Obtener valor de gamestate en la variable
        gameStateRef.on("value",function(data){
           gameState = data.val();
        })
    
    }
    
    //Actualizar estado
    update(state) {
        database.ref('/').update({
          gameState: state
        });
    }

    async start() {
        //Si aun no inicia
        if (gameState == 0) {
            //Se crea nuevo jugador
            player = new Player();

            var playerCountRef = await database.ref("playerCount").once("value");

            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();

                player.getCount();
            }

            //Se crea el formulario y se muestra
            form = new Form();
            form.display();
        }

        player1 = createSprite(100, 200);
        player2 = createSprite(300, 300);

    }


    play() {
        form.hide();
        
        //Título al llenar formulario 
        text("Inicia el juego", 520, 600);

        //Player porque se refiere a toda la clase
        Player.getPlayerInfo();

        if (allPlayers !== undefined) {

            //Posiciona al jugador que entra
            var displayPosition = 40;

            displayPosition+-20;
            textSize(15);

            text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, displayPosition);


           for (var plr in allPlayers)  {

                //Color de debajo
                if (plr == "player" + player.index) {
                    fill("lightblue");

                } else {
                    fill("black");
                }

            }
        }

        //Si ya hay jugadores y se presiona flecha
        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance+=50;
            player.update();
        } 
    }


}