import Mailing from '../../src/controllers/Mailing';

export default async (req, res) => {
    if(req.method === "POST"){
        try{
            let x = await Mailing.sendEmail(req.body);
            console.log(x);
            res.status(200).json({message: "ok"});
        }catch(e){
            console.log(e);
            res.status(500).json({
                res: "Error",
                error: true,
            })
        }
    }
    else res.status(500).json({
        res: "Error, Ruta para request tipo POST solamente",
        error: false
    })
    
}

export const config = {
    api: {
        externalResolver: true,
    }
}