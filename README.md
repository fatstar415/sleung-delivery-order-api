# sleung-delivery-order-api
Basic delivery orders endpoint

##### Environment variables
Create ```.env``` file in root folder of project and add the following variables

```
APP_PORT
DB_HOST
DB_USER
DB_PASS
DB_NAME
MAX_UPLOAD_SIZE=1048576 # recommand 1MB
GOOGLE_API_KEY
```

##### start.sh
start.sh is there to initialse the database although I find no use for it, as I initalse the database in ```docker-compose.yml``` and using npm package ```sequelize```.

##### Build command
> docker build -t sleung_delivery .

##### Run locally
> docker-compose up -d
