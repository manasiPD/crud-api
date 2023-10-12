const express = require('express');
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Listening on port 3000');
})

// database for example
var contacts = [
    {
        id: "1",
        name: "Manasi Sonar",
        age: "21"
    }
]

// at this endpoint we get the data that is it read the data
app.get('/contact', (req, res) => {
    res.send({
        success: true,
        message: 'data fetched successfully',
        data: contacts
    })
})

// at this endpoint of post method name and age requested will be sotred in the variable
app.post('/contact', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
  // if the user does not insert name or age the error message will be shown 
  // which means both name and age are required
    if (!name || !age) {
      return res.status(400).json({
        success: false,
        message: 'Both name and age are required.',
      });
    }
  // if both name and age are present in the request body then the last id is incremented by adding 1 
  // and all the 3 id, name, and age are created and added to the contacts by push method
    contacts.push({
      id: (contacts.length + 1).toString(),
      name: name,
      age: age,
    });
  // success message
    res.status(200).json({
      success: true,
      message: 'Data added successfully',
    });
  });

// this endpoint is to delete the requested contact 
// here we will have to specify id in the url 
app.delete('/contact/:id', (req, res) => {
  // then the id is extracted from the url by req.params.id and stored it in the id variable
    var id = req.params.id;
    // this statement filter/removes the id from the data and stored in the variable and 
    // this data is then again given to the contacts variable
    var newContacts = contacts.filter(el => el.id != id);
    contacts = newContacts;
    res.send({
      success: true,
      message: 'data deleted successfully'
    });
  });

  // this is to update the contact where again user have to specify which contact to be edited
  app.put('/contact/:id', (req, res) => {
    // as the id need to be extracted from the url and stored in the variable
    var id = req.params.id;
    // and then the new name and age is extracted from the request
    var name = req.body.name;
    var age = req.body.age;

    // then the index is found by id 
    const index = contacts.findIndex(el => el.id === id);
    // if index is a +ve no.
    if (index !== -1) {
      // Check for valid name and age
      // both name and age are specified 
      if (name !== undefined || age !== undefined) {
        // Update the contact's data
        if (name !== undefined) {
          // contact is searched and updated
          contacts[index].name = name;
        }
        if (age !== undefined) {
          contacts[index].age = age;
        }
        //success message
        res.send({
          success: true,
          message: 'Data updated successfully'
        });
      } 
      // when name and age are not specified
      else {
        res.send({
          success: false,
          message: 'Validation error: Name or age is required.'
        });
      }
    } 
    // if index is -1
    else {
      res.send({
        success: false,
        message: 'Contact not found'
      });
    }
  });