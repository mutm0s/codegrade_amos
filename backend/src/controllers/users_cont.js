const User = require('../models/users_model'); 

exports.UserDetailsCont=async(req,res)=>{


   
    const data=req.body
     console.log(req.body)

    try {
        
        const newUser = new User({
  
          email:data.email,
          names:data.names,
          privileges:data.privileges,
          program:data.program,
          gy:data.gy,
          type:data.type
          
        });
    
        
        await newUser.save();
    
        res.status(201).json({ message: 'success' });

        console.log('Success')

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'err' });

        console.log('Err')
      }

}


exports.fetchUsers = async (req, res) => {
  try {
    const allUsers = await User.find(); 

    console.log('Success')

    res.status(200).json(allUsers);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Err' });
  }
};

exports.dltAlumniById = async(req, res) => {
  const alumniId = req.query.alumniId;

  try {
    const deletedAlumni = await User.findByIdAndDelete(alumniId);

    if (deletedAlumni) {

      res.status(200).json({ message: 'sucess' });

    } else {

      res.status(404).json({ message: '4040' });

    }
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'err' });

  }
};

exports.alumniRole = async (req, res) => {

  const alumniEmail = req.query.alumni;

  try {
    const alumni = await User.findOne({ email: alumniEmail });

    if (alumni) {
      
      const privileges= alumni.privileges; 

      res.status(200).json({ message: 'AlumniExists', role: privileges });
      console.log("Alumni Exists",privileges);
    } else {
      // User does not exist
      res.status(404).json({ message: 'AlumniNotFound' });
      console.log("Alumni Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'err' });
  }
};