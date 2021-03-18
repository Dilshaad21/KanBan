const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

// Tests to check the API requests
describe("Check the APIs", ()=>{
    describe("Check the main get and post requests", ()=>{
        
        //For the get-data request to fetch all the cards
        it("should return all the cards", (done)=>{
            chai.request(app)
                .get('/get-data')
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                })
                done();
        })

        //For checking the POST request
        it("should return a accepted status code", (done)=>{
            let data = {
                columns:[
                    {
                        title: "Deploy",
                        cards:[{
                            title: "Dummy title",
                            description: "Dummy description",
                        }]
                    }
                ]
            };

            chai.request(app)
                .post('/post-data')
                .set('content-type', 'application/json')
                .send(data)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                })
                done();
        })
    })
})


