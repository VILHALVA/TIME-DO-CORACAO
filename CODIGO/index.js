var restify = require('restify');
var builder = require('botbuilder');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s Aplicação está executando na porta %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId:'',
    appPassword: ''
});

server.post("/api/messages", connector.listen());

const bot = new builder.UniversalBot(connector);

bot.dialog("/", [
  session => {
    builder.Prompts.text(session, "Oi! Qual é o seu nome?");
  },

  (session, results) => {
    let nome = results.response;
    session.send(`Oi! ${nome}`);

    session.beginDialog("/perguntarTimeCoracao");
  }
]);

bot.dialog("/perguntarTimeCoracao", [
  session => {
    builder.Prompts.text(session, "Qual é o seu time de Futebol do Coração?");
  },

  (session, results) => {
    let timeCoracao = results.response;
    session.endDialog(`Vamos torcer no Campeonato Brasileiro para o time do **${timeCoracao}** em 2018!`);

    session.beginDialog("/perguntarLugarPreferido");
  }
]);

bot.dialog("/perguntarLugarPreferido", [
  session => {
    builder.Prompts.text(session, "Qual é o seu lugar preferido?");
  },

  (session, results) => {
    let lugar = results.response;
    session.endDialog(`Amamos o **${lugar}**! É simplesmente uma cidade muito bonita!`);
  }
]);