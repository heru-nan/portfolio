import Mailing from '../../src/controllers/Mailing';

export default (req, res) => {
    if(req.method === "POST"){
        console.log(req.body);
        console.log("request _!");
        try{
            Mailing.sendEmail(req.body, res);
            
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