import Mailing from '../../src/controllers/Mailing';

export default (req, res) => {
    if(req.method === "POST"){
        console.log(req.body);
        try{
            Mailing.sendEmail(req.body, res);
            res.status(200).json({
                res: "Email enviado correctamente",
                error: 0
            })
        }catch(e){
            res.json({
                res: `Error al enviar email: ${e}`,
                error: 1,
            })
        }
    }
    else res.status(500).json({
        res: "Error, Ruta para request tipo POST solamente",
        error: 1
    })
    
}