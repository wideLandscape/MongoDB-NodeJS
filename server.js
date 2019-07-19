const mongoose = require('mongoose'),
  config = require('./config.json');

const Universities = require('./schemas/university.model');
const Courses = require('./schemas/course.model');

mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(
    () => {
      console.log('Database is connected');
      groupQuery();
      sumQuery();
      filterQuery();
      averageQuery();
      geoSpatialQuery();
    },
    err => {
      console.log('Can not connect to the database' + err);
    }
  );
/*
    1. Number of courses categorized by “level” i.e. {level :”X”, “number” : Y}
*/
function groupQuery() {}
/*
    2. Number of students per university in the period 2014 - 2015 {“nameUniversity” : “number”}
*/
function sumQuery() {}
/*
    3. Courses with level “excellent” with 
       university location, country and city {nameCourse : “x”, country:”y”,etc… }
*/
function filterQuery() {}
/*
    4. Average students per year for all universities
*/
function averageQuery() {}
/*
    5. Universities with the following constraints: 
    •  -5.65 < x < -5.69, 
    • -15 < y <=17,
*/
function geoSpatialQuery() {
  const polygon = {
    type: 'Polygon',
    coordinates: [
      [[-5.65, -15], [-5.69, -15], [-5.69, 17], [-5.65, 17], [-5.65, -15]]
    ]
  };

  return Universities.find({
    location: {
      $geoWithin: {
        $geometry: polygon
      }
    }
  })
    .then(docs => docs.forEach(doc => console.log(doc.name)))
    .catch(err => console.log(err));
}
