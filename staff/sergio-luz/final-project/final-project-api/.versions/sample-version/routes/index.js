const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const jwt = require('jsonwebtoken')
const bearerTokenParser = require('../utils/bearer-token-parser')
const jwtVerifier = require('./jwt-verifier')
const routeHandler = require('./route-handler')
const {multer}=require('multer')

const jsonBodyParser = bodyParser.json()

const router = express.Router()

const { env: { JWT_SECRET } } = process


router.post('/users', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { name, surname, username, password } = req.body

        return logic.registerUser(name, surname, username, password)
            .then(() => {
                res.status(201)

                res.json({
                    message: `${username} successfully nregistered`
                })
            })
    }, res)
})

router.post('/auth', jsonBodyParser, (req, res) => {
    routeHandler(() => {
        const { username, password } = req.body

        return logic.authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, JWT_SECRET)

                res.json({
                    data: {
                        id,
                        token
                    }
                })
            })
    }, res)
})

router.get('/users/:id', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.retrieveUser(id)
            .then(user =>
                res.json({
                    data: user
                })
            )
    }, res)
})

router.patch('/users/:id', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { params: { id }, sub, body: { name, surname, username, newPassword, password } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.updateUser(id, name ? name : null, surname ? surname : null, username ? username : null, newPassword ? newPassword : null, password)
            .then(() =>
                res.json({
                    message: 'user updated'
                })
            )
    }, res)
})

router.put('/users/:id/buddies', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id }, body: { buddy } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.addBuddy(id, buddy)
            .then(() => res.json({
                message: 'buddy added'
            }))
    })
})

router.delete('/users/:id/buddies', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id }, body: { buddy } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.deleteBuddy(id, buddy)
            .then(() => res.json({
                message: 'buddy deleted'
            }))
    })
})

router.get('/users/:id/buddies', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id }, body: { buddy } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.listBuddies(id)
            .then(buddies => res.json({
                data: buddies
            }))
    })
})

router.post('/users/:id/postits', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id }, body: { text, status } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.addPostit(id, text, status)
            .then(() => res.json({
                message: 'postit added'
            }))

    }, res)
})

router.get('/users/:id/postits', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.listPostits(id)
            .then(postits => res.json({
                data: postits
            }))
    }, res)
})

router.get('/users/:id/assigned', [bearerTokenParser, jwtVerifier], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.listAssignedPostits(id)
            .then(postits => res.json({
                data: postits
            }))
    }, res)
})

router.put('/users/:id/postits/:postitId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id, postitId }, body: { text, status } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.modifyPostit(id, postitId, text, status)
            .then(() => res.json({
                message: 'postit modified'
            }))
    }, res)
})

router.delete('/users/:id/postits/:postitId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id, postitId } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.removePostit(id, postitId)
            .then(() => res.json({
                message: 'postit removed'
            }))
    }, res)

})

router.patch('/users/:id/postits/:postitId', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id, postitId }, body: { buddy } } = req

        if (id !== sub) throw Error('token sub does not match user id')

        return logic.assignCollaborator(id, postitId, buddy)
            .then(() => res.json({
                message: 'postit assigned'
            }))
    }, res)
})

router.post('/users/:id/image', [bearerTokenParser, jwtVerifier, jsonBodyParser], (req, res) => {
    routeHandler(() => {
        const { sub, params: { id }, body: { file } } = req
        debugger

        if (id != sub) throw Error('token sub does not match user id')

        return logic.upladImage(id, file)
            .then(() => res.json({
                message: 'image uploaded'
            }))
            .catch(() => res.json({
                message: 'error'
            }))
    }, res)
})

router.post('/upload',[bearerTokenParser,jwtVerifier, jsonBodyParser],(req, res) => {
    routeHandler(()=>{

        debugger
        var tempPath = req.body.data.recfile;
        var extension = req.files[0].originalname.split('.').pop();
        var targetPath = path.resolve(__dirname, '../public/uploads/');
    
        var is = fs.createReadStream(tempPath);
        var os = fs.createWriteStream(targetPath);
        is.pipe(os);
        // file write error
        is.on('error', function (err) {
            if (err) {
                console.log(err);
            }
        });
        // file end
        is.on('end', function () {
            //delete file from temp folder
            fs.unlink(tempPath, function (err) {
                if (err) {
                    return res.send(500, 'Something went wrong');
                }
            });
        });
        var x = '/uploads/';
        imgs.unshift({ imageName: extension, imageURL: x, extension: '.png', created: Date.now() });
        res.json({ message: 'ok' });
    }, res)
});


module.exports = router