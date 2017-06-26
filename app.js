//importar as config do servidor
var app = require('./config/server');

//parametrizar a porta de escuta
var server = app.listen(3000, function (){
    console.log('Server ON');
});

var io = require('socket.io').listen(server);
app.set('io',io);
// criar a conexão por websocket
io.on('connection', function (socket){
    console.log('Usuário conectou');

    socket.on('disconnect', function()
    {
        console.log('Usuário desconectou');        
    })

    socket.on('msgParaServidor', function (data){
        
        //Eventos de dialogos
            //msg para TODOS enxergarem
        socket.broadcast.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem});
            //msg para VOCÊ enxergar
        socket.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem});

        //Lista de participantes
        if(parseInt(data.apelido_atualizado) ==0)
        {
           
             socket.broadcast.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            );
            //msg para VOCÊ enxergar
            socket.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            ); 
        }
    })
});