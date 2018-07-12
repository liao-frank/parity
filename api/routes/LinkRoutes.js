const Link = require(__dirname + '/../models/Link.js');


const getResponder = (res, name='data') => {
  return (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
    else {
      res.json({
        [name]: result
      });
    }
  };
};

const respondError = (res, msg) => {
  res.status(500).json({
    error: msg
  });
};

module.exports = (app) => {

  // index
  app.get('/api/links', (req, res) => {
    const responder = getResponder(res, 'links');
    Link.all(responder);
  });

  // show, by both halves
  app.get('/api/link/:leftId/:rightId', (req, res) => {
    const responder = getResponder(res, 'link');
    Link.find({ leftId, rightId }, responder);
  });

  // show, by one half
  app.get('/api/link/:half/:id', (req, res) => {
    const responder = getResponder(res, 'link');
    const { half, id } = req.params;
    if (half === 'left') {
      Link.findByLeft(id, responder);
    }
    else if (half === 'right') {
      Link.findByRight(id, responder);
    }
  });

  // create
  app.post('/api/link/', (req, res) => {
    if (!req.body || !req.body.link) {
      respondError(res, 'invalid body specified');
    }
    else {
      const { leftId, rightId } = req.body.link;
      if (!leftId || !rightId ) {
        respondError(res, 'invalid link specified');
      }
      else {
        const responder = getResponder(res);
        Link.save({ leftId, rightId }, responder);
      }
    }
  });
};
