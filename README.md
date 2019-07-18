# MongoDB-NodeJS

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

Install dependencies

```
npm install

```

Run the server

```

npm run server

```
