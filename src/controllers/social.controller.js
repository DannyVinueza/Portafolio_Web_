//Ariba del todo
const Social = require('../models/Social')
const { uploadImage, deleteImage } = require('../config/clodinary')
const fs = require('fs-extra')

const renderSocialForm = (req, res) => {
    res.render('socialnetworks/newFormSocialN')
}

const renderAllSocial = (req, res) => {
    res.render('socialnetworks/allSocial')
}

const createNewProfileSocial = async (req, res) => {
    //Desestructurar
    const { name, description, facebook, linkedin, github, instagram, tiktok, twiter } = req.body
    //Crear una nueva instancia
    const newSocial = new Social({ name, description, facebook, linkedin, github, instagram, tiktok, twiter })
    //
    newSocial.user = req.user._id
    
    //Verifica si el formulario tiene una imagen para subirla 
    //y si no tiene manda un mensaje de advertencia
    if (!(req.files?.image)) return res.send("Se requiere una imagen")
    //La invocacion de  
    const imageUpload = await uploadImage(req.files.image.tempFilePath)
    newSocial.image = {
        public_id: imageUpload.public_id,
        secure_url: imageUpload.secure_url
    }
    //Eliminar el archivo temp del directorio uploads
    await fs.unlink(req.files.image.tempFilePath)
    //Ejecutar el metodo save
    await newSocial.save()
    res.redirect('/social')
}

//Exportacion nombrada
module.exports = {
    renderSocialForm,
    renderAllSocial,
    createNewProfileSocial
}