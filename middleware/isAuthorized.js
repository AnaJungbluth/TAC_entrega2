const jwt = require("jsonwebtoken");

const isAuthorized = (req, res, next) => {
    // Obter o Token 
    const {authorization} = req.headers

    if(!authorization)
        return res.status(403).json({message:'Sem Token'})

    const token = authorization.split(' ')[1]; // Remove "Bearer " do token

    // Validar o Token
    jwt.verify(authorization, process.env.JWT_SECRET, (err, decoded) => {
        console.log(decoded)

        // Se ocorrer um erro na decodificação do token
        if(err) return res.status(401).json({message:'Token inválido'})

        req.userId = decoded.id // Insere os dados do token na requisição
        return next() // Cgama o proximo no de execução da requesição
    })
}

module.exports = isAuthorized