import Mailing from '../../src/controllers/Mailing';

export default async (req, res) => {
    if(req.method === "POST"){
        console.log(req.body);
        try{
            await Mailing.sendEmail(req.body, res).catch(console.error).then(e => res.status(200).json({
                error: 0,
                res: "mensaje enviado correctamente",
            }));
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