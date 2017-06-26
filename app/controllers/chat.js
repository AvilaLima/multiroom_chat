module.exports.iniciaChat = function(application,req, res){
      var postForm = req.body;
      req.assert('apelido','Nome ou apelido é obrigatório').notEmpty();      
      req.assert('apelido','Nome ou apelido deve conter entre 3 e 15 caracteres').len(3,15);

      var erros = req.validationErrors();

      if(erros)
      {
            //res.send finaliza o andamento do código caso use outro código aqui utilize return para encerrar o processo
            res.render("index",{validacao : erros});
            //return
      }
      application.get('io').emit(
      'msgParaCliente'
      ,{apelido: postForm.apelido, mensagem: 'acabou de entrar no chat'}//dados
      );

      res.render('chat', {postForm: postForm});
}