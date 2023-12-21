const mongoose = require('mongoose');

const DbConnect = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(
      'mongodb+srv://einsteen13:ZorYLGrctRqEzQxj@cluster0.dtyamyn.mongodb.net/?retryWrites=true&w=majority',
      connectionParams
    );

    console.log('Successfully established a connection to the database.');
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  DbConnect,
  mongoose,
};
