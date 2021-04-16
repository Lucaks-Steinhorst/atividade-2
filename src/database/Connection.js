
import mongoose from 'mongoose';

class Connection {
  constructor() {
    this.mongodb();
  }
  mongodb() {
    const uri = "mongodb+srv://ADMIN:6jDnXfHBRqbmsHO0@clusteradsbackend.3hqje.mongodb.net/adsbackend?retryWrites=true&w=majority";
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log("Conexão com o MongoDb realizada com sucesso!");
    }).catch((exception) => {
      console.log("Erro: Conexão com MongoDB não foi realizada com sucesso" + exception);
    });
  }
}

export default new Connection();