//eventoDeportivo Services -----------------------
function apply(models) {
	
	var eventoDeportivoController = models.models.eventoDeportivo.controller;

	//Adds a family member in eventoDeportivo, ciudadano and usuario
	eventoDeportivoController.post('/addUsuario', function(req, res, done) {
	   
	    var eventoDeportivoModel = eventoDeportivoController.model();
	    var usuarioModel = models.models.usuario.controller.model();
	    var ciudadanoModel = models.models.ciudadano.controller.model();

	   

	    ciudadanoModel.findOneAndUpdate(
	            {'_id': req.body.ciudadanoId},
	            { 'eventoDeportivo': req.body.eventoDeportivoId },
	            function(err, data) {
	                if (err) {
	                  return handleError(err, res, done);
	                }
	    });


	    var newUsuario = new usuarioModel({
	        'eventoDeportivo':   req.body.eventoDeportivoId,
	        'ciudadano': req.body.ciudadanoId,
	        'parentesco':  req.body.parentesco,
	        'fechaAlta':   Date.now()
	    });

	    newUsuario.save(function(err, usuario) {
	        if (err) {
	          handleError(err, res, done);
	          return;
	        }
	        if (usuario) {
	            eventoDeportivoModel.findOne({'_id': req.body.eventoDeportivoId}).exec(function(err, eventoDeportivo) {
	                if (err) {
	                  handleError(err, res, done);
	                  return;
	                }
	                if (eventoDeportivo) {
	                    eventoDeportivo.usuarios.push(usuario._id);
	                    eventoDeportivo.save();

	                    console.log("  Added member:" +usuario._id);

	                    returnJson(res, {'success': 'ok'});
	                }
	            });                    
	        }
	    });
	    
	});

	//Removes a family member in eventoDeportivo, ciudadano and usuario
	eventoDeportivoController.post('/removeUsuario', function(req, res, done) {
	    var eventoDeportivoModel = eventoDeportivoController.model();
	    var usuarioModel = models.models.usuario.controller.model();
	    var ciudadanoModel = models.models.ciudadano.controller.model();

	    ciudadanoModel.findOneAndUpdate(
	            {'_id': req.body.ciudadanoId},
	            { 'eventoDeportivo': null },
	            function(err, data) {
	                if (err) {
	                  return handleError(err, res, done);
	                }
	    });

	    usuarioModel.findOne({
	        'eventoDeportivo'  : req.body.eventoDeportivoId, 
	        'ciudadano': req.body.ciudadanoId  }).exec (function(err, usuario) {
	        if (err) {
	          handleError(err, res, done);
	          return;
	        }
	        if (usuario) {
	            usuario.remove();

	            eventoDeportivoModel.findOne({"_id": req.body.eventoDeportivoId}).exec (function(err, eventoDeportivo) {
	                if (err) {
	                    handleError(err, res, done);
	                    return;
	                }
	                if (eventoDeportivo) {
	                    eventoDeportivo.usuarios = eventoDeportivo.usuarios.filter(function(usuarioItem) {
	                        if (usuarioItem._id != usuario._id) {
	                            return usuarioItem; 
	                        }
	                    });
	                    eventoDeportivo.save();
	                    console.log("  removeUsuario done: " + usuario._id); 

	                    returnJson(res, {'success': 'ok'});
	                }
	            });
	        }    
	    });
	});

	//Retrieves a family & members
	eventoDeportivoController.get('/eventoDeportivoUsuarios/:id', function(req, res, done) {
	    var eventoDeportivoId = req.params.id;
	    var eventoDeportivoModel = eventoDeportivoController.model();
	    var usuarioModel = models.models.usuario.controller.model();

	    eventoDeportivoModel.findOne({"_id": eventoDeportivoId}).exec (function(err, eventoDeportivo) {
	        if (err) {
	            handleError(err, res, done);
	            return;
	        }
	        if (eventoDeportivo) {
	            usuarioModel.find({'eventoDeportivo'  : eventoDeportivoId })
	                        .populate('ciudadano')
	                        .sort('fechaAlta')
	                        .exec(function(err, usuarios) {
	                if (err) {
	                  handleError(err, res, done);
	                  return;
	                }
	                if (usuarios) {

	                    var msg = {
	                        "eventoDeportivo": eventoDeportivo,
	                        "usuarioseventoDeportivo": usuarios
	                    };
	                    //console.log(JSON.stringify(msg, null, 2));
	                    //console.log(JSON.stringify(usuarios, null, 2));

	                    returnJson(res, msg);
	                }
	            });
	        }
	    });
	});

	function returnJson(res, msg, statusCode) {
	    statusCode = statusCode || 200;

	    res.status(statusCode)
	        .json(msg)
	        .end();  
	}

}

module.exports.apply = apply;
