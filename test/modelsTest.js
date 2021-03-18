const assert = require('chai').assert;
const Card = require('../models/card');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://Dilshaad:h80mGOG0WNFafYBN@cluster0.1xgor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'); 

mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });

//Called hooks which runs before something.
beforeEach((done) => {
    mongoose.connection.collections.cards.drop(() => {
         //this function runs after the drop is completed
        done(); //go ahead everything is done now.
    }); 
});

describe('Used to check all the mongoose operations working', () => {
    let card;
    
    it('creates a card', (done) => {

        // Creating the card
        card = new Card({ title: "Featurevv",
                          description: "A descripvvtion",
                          category: "Deploy"  });

        card.save() //takes some time and returns a promise
            .then(() => {
                assert(!card.isNew); //if card is saved to db it is not new
                done();
            });
    });

    // Creating dummy data before checking with the find
    beforeEach((done) => {
        card = new Card({ title: "Feature1",
                          description: "A description",
                          category: "Testing"  });
        card.save()
          .then(() => done());
      });
    
    // To check if it can find the data in the database
    it('finds cards with the category as Testing', (done) => {
        Card.findOne({ category : 'Testing' })
            .then((data) => {
                assert(data.category === 'Testing'); 
                done();
            });
    })


});