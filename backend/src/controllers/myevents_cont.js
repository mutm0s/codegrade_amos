const MyEventsModel=require('../models/myevents_model')

exports.myEventCont = async (req, res) => {

    const ourData = req.body; 
  
    try {
      
      const myEvent = new MyEventsModel({

        email:ourData.email,
        eventIdObj:ourData.eventIdObj,
        category:ourData.category
        
      });
  
     
      await myEvent.save();
  
      res.status(201).json({ message: 'Success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'err' });
    }
  };

  exports.fetchMyEvents = async (req, res) => {
    const alumniEmail = req.query.alumni;
  
    try {
      const myFavoriteEvents = await MyEventsModel
        .find({ email: alumniEmail, category: 'fav' })
        .populate('eventIdObj');
  
      res.status(200).json(myFavoriteEvents);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error' });
    }
  };

  exports.fetchConfirmedEvents = async (req, res) => {

    const alumniEmail = req.query.alumni;
  
    try {
      const myFavoriteEvents = await MyEventsModel
        .find({ email: alumniEmail, category: 'confirmed' })
        .populate('eventIdObj');
  
      res.status(200).json(myFavoriteEvents);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error' });
    }
  };
  
  
  