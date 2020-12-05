import Mailing from '../../src/controllers/Mailing';

export default async (req, res) => {
    if(req.method === "POST"){
        console.log(req.body);
        try{
            await Mailing.sendEmail(req.body);
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