const Clarifai = require('clarifai');

//  .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
const app = new Clarifai.App({
  apiKey: 'f158f642d33c40f0bfc1612359c2fc6d'
 });
 
const HandleApiCall = (req,res) => {
  app.models.predict('f76196b43bbd45c99b4f3cd8e8b40a8a', req.body.input)
  .then(data => {
    res.json(data)
  })
  .catch(err => res.status(400).json('Unable to work with API'))
}


const HandleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
  }

module.exports = {
    HandleImage,
    HandleApiCall
}