# Bread-Lock-API
livesite: https://breadlock.herokuapp.com/  

### Authors: 

David Guthmann  
github: https://github.com/Dguthmann/  

Robert Dalton  
github: https://github.com/dadwanteat  

Jae Kim  
github: https://github.com/JSK321/  

Shunpin Tseng  
github: https://github.com/Shunpintseng/


## List of Contents

server.js  
package.json  
README.md  
LICENSE  
seedModels.js  
### config  
config.json  
### controllers  
checkAuth.js
customer-controller.js  
foodbank-controller.js  
index.js  
order-controller.js  
orderitem-controller.js  
pantry-controller.js  
stock-controller.js  
### fixtures  
foodbankSeeds.json  
pantrySeeds.json  
stockSeeds.json  
### models  
customer.js  
foodbank.js  
index.js  
order.js  
orderitem.js  
pantry.js  
stock.js  
 


## Installation
you will need the following additional npms to run this project:  
bcrypt  
cors  
dotenv  
express  
jsonwebtoken  
mysql2  
nodemon  
sequelize  
sequelize-fixtures  


## Basic Overview of Project
Breadlock Api is a the database accessed by the breadlock application for foodbank services.  For more information about the breadlock application see: https://github.com/JSK321/Bread-Lock


## Resources Used

Joe Rehfuss for helping with prop bubbling and the form used to make the basic foodbank seeding data.    
Aslan Ghodsian helping with the fetch requests handling locally.


## Further Development Plans

Administrative controls for foodbank employees for editing of pantries or change in information such as address.  