process.env.NODE_ENV = "test";

var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe("Photos", function () {
  // Close the server after all tests are done
  after(function (done) {
    server.close();
    done();
  });

  it("should list ALL photos on / GET", function (done) {
    this.timeout(60000); // Set timeout for the test
    chai
      .request(server)
      .get("/")
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.html;
        res.body.should.be.a("object");
        done();
      });
  });
});
