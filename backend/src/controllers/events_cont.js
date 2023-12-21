const OurEventModel=require('../models/events_model')


exports.createOurEvent=async(req,res)=>{

    const data=req.body
    console.log(data)

    try {
        
        const newEvent = new OurEventModel({
  
          eName:data.eName,
          venue:data.venue,
          eType:data.eType,
          eDate:data.eDate,
          eTime:data.eTime,
          EventCoordinator:data.EventCoordinator
          
        });
    
        
        await newEvent.save();
    
        res.status(201).json({ message: 'success' });

        console.log('Success')

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'err' });

        console.log('Err')
      }

}

exports.fetchAllEvents = async (req, res) => {
    try {
      const events = await OurEventModel.find(); 
  
      res.status(200).json(events);
      console.log('Success')
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error' });
    }
  };

  exports.dltEventById = async(req, res) => {

    const OurEventId = req.query.OurEventId;

    console.log(OurEventId)
  
    try {
      const dltEvent = await OurEventModel.findByIdAndDelete(OurEventId);
  
      if (dltEvent) {
        console.log('success')
        res.status(200).json({ message: 'success' });

      } else {
        res.status(404).json({ message: '404' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'err' });
    }
  };

  exports.fetchEventsByEmail = async (req, res) => {
    
    const alumniEmail = req.query.alumni;
  
    try {
      const events = await OurEventModel.find({ EventCoordinator: alumniEmail });
  
      res.status(200).json(events);

    } catch (error) {

      console.error(error);
      res.status(500).json({ message: 'err' });
      
    }
  };

  exports.fetchAboutEvents = async (req, res) => {
    try {
      // Fetch the latest top 3 events based on the eDate column
      const events = await OurEventModel.find()
        .sort({ eDate: -1 }) // Sort by eDate in descending order (latest first)
        .limit(3); // Limit the results to 3 events
  
      res.status(200).json(events);
      console.log('Success');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error' });
    }
  };
  