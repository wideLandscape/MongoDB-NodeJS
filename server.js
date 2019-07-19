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
    async () => {
      console.log('Database is connected');
      groupQuery();
      sumQuery();
      filterQuery();
      averageQuery();
      await geoSpatialQuery();
      console.log('end');
    },
    err => {
      console.log('Can not connect to the database' + err);
    }
  );
/*
    1. Number of courses categorized by “level” i.e. {level :”X”, “number” : Y}
*/
function groupQuery() {
  return Courses.aggregate([
    [{ $group: { _id: '$level', number: { $sum: 1 } } }]
  ])
    .then(docs =>
      docs.forEach(doc =>
        console.log('Course level: ' + doc._id, '-> Q.ty: ' + doc.number)
      )
    )
    .catch(err => console.log(err));
}
/*
    2. Number of students per university in the period 2014 - 2015 {“nameUniversity” : “number”}
*/
function sumQuery() {
  return Universities.aggregate([
    [
      { $unwind: '$students' },
      {
        $match: {
          'students.year': { $gte: 2014, $lte: 2015 }
        }
      },
      { $group: { _id: '$name', number: { $sum: '$students.number' } } }
    ]
  ])
    .then(docs =>
      docs.forEach(doc =>
        console.log(
          'Number of students per university of ' +
            doc._id +
            ' in the period 2014 - 2015:',
          doc.number
        )
      )
    )
    .catch(err => console.log(err));
}
/*
    3. Courses with level “excellent” with 
       university location, country and city {nameCourse : “x”, country:”y”,etc… }
*/
function filterQuery() {}
/*
    4. Average students per year for all universities
*/
function averageQuery() {
  return Universities.aggregate([
    [
      { $unwind: '$students' },
      { $group: { _id: null, number: { $avg: '$students.number' } } }
    ]
  ])
    .then(docs =>
      docs.forEach(doc =>
        console.log(
          'Average students per year for all universities:',
          doc.number
        )
      )
    )
    .catch(err => console.log(err));
}
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
    .then(docs => {
      console.log('Universities within the geospatial constraints:');
      docs.forEach(doc => {
        console.log(doc.name);
      });
    })
    .catch(err => console.log(err));
}
