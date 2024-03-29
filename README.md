# MongoDB-NodeJS

Install dependencies

```
npm install

```

Import files into MongoDB-NodeJS database

```
// windows
& 'C:\Program Files\MongoDB\Server\4.0\bin\mongoimport.exe' --db="MongoDB-NodeJS" --collection="courses" --file=".\University\courses.json"
& 'C:\Program Files\MongoDB\Server\4.0\bin\mongoimport.exe' --db="MongoDB-NodeJS" --collection="universities" --file=".\University\universities.json"
```

Run MongoDB:

```
// windows
& 'C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe' --dbpath=".\data\db"
```

Run the server

```

npm run server

```

## Query examples:

```


/*
    1. Number of courses categorized by “level” i.e. {level :”X”, “number” : Y}
*/
  return Courses.aggregate([
    [{ $group: { _id: '$level', number: { $sum: 1 } } }]
  ])
```

```
/*
    2. Number of students per university in the period 2014 - 2015 {“nameUniversity” : “number”}
*/

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
```

```
/*
    3. Courses with level "Excelent" with
       university location, country and city {nameCourse : “x”, country:”y”,etc… }
*/

  return Courses.find({ level: 'Excelent' })
    .populate('info', { students: 0 })

```

```
/*
    4. Average students per year for all universities
*/

  return Universities.aggregate([
    [
      { $unwind: '$students' },
      { $group: { _id: null, number: { $avg: '$students.number' } } }
    ]
  ])
```

```
/*
    5. Universities with the following constraints:
    •  -5.65 < x < -5.69,
    • -15 < y <=17,
*/

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

```
