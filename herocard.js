var restify = require('restify');
var builder = require('botbuilder');

// Levantar restify
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// No te preocupes por estas credenciales por ahora, luego las usaremos para conectar los canales.
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

// Ahora utilizamos un UniversalBot
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Dialogos
bot.dialog('/', [
    function (session) {
        var heroCard = new builder.HeroCard(session)
            .title('Corporacion de estudios tecnologicos del norte del valle')
            .subtitle('Área de ciencias informáticas, tecnológicas y afines')
            .text('Siguenos en nuestras redes Twitter: @cotecnova facebook: cotecnova cartago')
            .images([
                builder.CardImage.create(session, 'https://www.google.com.co/search?biw=1366&bih=613&tbm=isch&sa=1&ei=jY73WfLvB4PnmAGeorXgAw&q=ingenieria+de+sistemas&oq=ingenieria+de+&gs_l=psy-ab.1.0.0l10.670.2594.0.4216.8.8.0.0.0.0.226.1166.0j7j1.8.0....0...1.1.64.psy-ab..0.8.1164...0i67k1.0.qa6vV_LFf44#imgrc=heEj--V7HXpfGM:')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'http://www.cotecnova.edu.co/index.php/tecnologia-en-sistemas-de-informacion/', 'Estudia')
            ]);

        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(heroCard);
        session.send(msj);
    }
]);