const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async( req, res=response ) => {

    const eventos = await Evento.find()
                                .populate('user', 'name')

    res.json({
        ok:true,
        eventos
    })
}


const crearEvento = async( req, res=response ) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;
        
        await evento.save();

        res.json({
            ok:true,
            eventoGuardado: evento
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }
}



const actualizarEvento = async( req, res=response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );

        if( !evento ) {
            return res.status(404).json({
                ok:false,
                msg: 'Evento no existe por este id'
            })
        }

        if( evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'no tienes permisos para editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} );

        res.json({
            ok: true,
            evento: eventoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }
}

const eliminarEvento = async( req, res=response ) => {
    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Evento.findById( eventoId );

        if( !evento ) {
            return res.status(404).json({
                ok:false,
                msg: 'Evento no existe por este id'
            })
        }

        if( evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'no tienes permisos para eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete( eventoId);

        res.json({
            ok: true,
            msg: "Evento eliminado correctamente"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }
    res.json({
        ok:true,
        msg:'eliminarEvento'
    })
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}