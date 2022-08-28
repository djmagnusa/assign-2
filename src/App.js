import React, {useState} from 'react';
import './App.css';

var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIAR5OIGF52VTJ3LKVE", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();


const App = () => {

  const [phoneNo, setPhoneNo] = useState('initial');
  const [customerData, setCustomerData] = useState({});

  let details; 

  let fetchDetails = function () {
    
    var params = {
        TableName: "customers",
        Key: {
            "phone_no": phoneNo
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            console.log("Sucess - " + JSON.stringify(err, null, 2));
        }
        else {

            let customerData = data.Item;

            details = {
              "phoneNo": customerData.phone_no,
              "firstname": customerData.firstname,
              "lastname": customerData.lastname,
              "age": customerData.age,
              "address": customerData.address
            }

            setCustomerData(details);

            console.log("Success - " + JSON.stringify(data, null, 2));
            // console.log(showDetails);
            
        }
    })
  }
  const handleChange = (event) => {
    setPhoneNo(event.target.value);

  }

  return (

    <div className="wrapper">

      <div className="input-container">
          <label>Enter phone no of the customer </label>
          <input
            id="phoneno"
            name="phoneno" 
            type="text"
            onChange={handleChange}
          />

          <button 
            type="submit" 
            onClick={fetchDetails}
          >
            Get customer
          </button>
      </div>
      
      <div className="details-container ">
        <h3>Showing results for "{customerData.phoneNo}"</h3>

        <div className="customer-info">
          <p>First Name: {customerData.firstname}</p>
          <p>Last Name: {customerData.lastname}</p>
          <p>Phone No: {customerData.phoneNo}</p>
          <p>Age: {customerData.age}</p>
          <p>Address: {customerData.address}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
