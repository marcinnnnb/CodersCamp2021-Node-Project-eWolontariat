const jwt = require('jsonwebtoken');

exports.loggedUser = function (req, res, next) {

    const token = req.header('auth-token');
    console.log(token)

    if (!token) return res.status(401).send({message:'Odmowa dostępu. Operacja możliwa tylko dla zalogowanego użytkownika.'});

    try {
        let user;
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=> {
            if(err) {
                throw new Error('Nieprawidłowy Token');
            } else {
                user = decoded
            }
        });
        if(user._id !== req.params.id){return res.status(401).send('Odmowa dostępu. Bak możliwości zmiany danych dla tego użytkownika')}

        req.user = user;
        next();
    }
    catch (error) {
        res.status(400).send({message:error.message})
    }
}


/*exports.loggedUser = function (req, res, next) {

    const token = req.header('auth-token');
    console.log(token)

    if (!token) return res.status(401).send({message:'Odmowa dostępu. Operacja możliwa tylko dla zalogowanego użytkownika.'});

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        const userId = verified._id 
        console.log(req.params.id)
        console.log(verified)
        if(userId !== req.params.id){return res.status(401).send('Odmowa dostępu. Bak możliwości zmiany danych dla tego użytkownika')}

        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).send({message:error.message})
    }
}*/



