/**
 * Requirement- To create a basic database using Files and folders
 * Each folder can container any number of files and each files can
 * container n number of lines.
 * We need to perform crud operations on all these folder, files and
 * lines
 */
const fs = require("fs");
const path = require("path");
const prompt = require('prompt-sync')();

// Class to declare the database name and methods to perform crud operations
class Mydatabase {
  // constructor takes name of database as input and initialise the class
  constructor(name = null) {
    if (name === null || !name === "string") {
      throw new Error("name is null");
    }

    this.name = name;
  }

  /**Submethod to check if the string start with char and shouldn't have space
   * @param {string} stringToCheck if it is valid or not
   * @returns {boolean} true if the string is valid else false
   */
  validString(stringToCheck) {
    // Regular expression to match strings with at least one letter and containing only letters and numbers
    const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
    // Check if the string matches the regular expression and does not start with a number
    let ansToReturn =
      regex.test(stringToCheck) && isNaN(parseInt(stringToCheck[0]));

    //check if the string have any "/" forward slash
    for (
      let indexOfString = 0;
      indexOfString < stringToCheck.length;
      indexOfString++
    ) {
      if (
        stringToCheck[indexOfString] === `/` ||
        stringToCheck[indexOfString] === `\\`
      ) {
        console.log("string contains "/" remove it")
        return false;
      }
    }
    return ansToReturn;
  }

  /**Method to create Folder
   * @param {string} folderName of folder
   * @throws {Error} if name is not string type
   * @throws {Error} if folder already exists
   * @throws {Error} if the folder is already created for db
   */
  createFolder(folderName) {
    // check if the folderName valid
    if (!this.validString(folderName)) {
      throw new Error("name of folder not valid");
    }

    // Create folder with name given by user (folderName)
    let folderDirectory = `./database/`;
    folderDirectory = folderDirectory + folderName;
    console.log(folderDirectory);

    //If folder name already exists throw error else create
    try {
      if (!fs.existsSync(folderDirectory)) {
        fs.mkdirSync(folderDirectory);
        console.log("folder created");
        return true
      }
    } catch (err) {
      console.error(err);
    }
  }

  /**method to read the folder if it exists
   * @param {string} folderName it should start with char
   * and can have number or space within it
   * Note- space is allowed if we want to acess directory
   * inside directory
   */
  readFolder(folderName) {
    // check if the folderName valid
    if (!this.validString(folderName)) {
      throw new Error("name of folder not valid");
    }

    // Create folder with name given by user (folderName)
    let folderDirectory = `./database/`;
    folderDirectory = folderDirectory + folderName;

    fs.readdir(folderDirectory, (err, files) => {
      if (err) {
        console.error("Error listing directory contents:", err);
        return;
      }
      console.log("Contents of the directory:", files);
      return true
    });
  }

  /**Rename older folder to new folder
   * @param {string} oldFolder old folder name
   * @param {string} newFolder new folder name
   */
  updateFolder(oldFolder, newFolder) {
    //check for new folder name is valid or not
    if (!this.validString(newFolder)) {
      throw new Error("name of folder not valid");
    }

    // Provide relative path to old folder and new folder 
    oldFolder = `./database/${oldFolder}`
    newFolder=`./database/${newFolder}`

    // Rename the folder
    fs.rename(oldFolder, newFolder, (error) => {
      if (error) {
        console.error("Error renaming folder:", error);
        return;
      }
      console.log("Folder renamed successfully:", oldFolder, "to", newFolder);
      return true
    });
  }

  /**Delete the folder create previously
   * @param {string} folderName to delete
   * @throws {Error} if the folderName not found
   */
  deleteFolder(folderName) {
    // change the path to relative folder location
    folderName=`./database/${folderName}`

    // delete the folder if found else throw error
    fs.rmdir(folderName, { recursive: true }, (err) => {
      if (err) {
        console.error("Error removing directory:", err);
        return;
      }
      console.log("Directory removed successfully:", folderName);
      return true
    });
  }

  /**Create a file inside Directory
   * @param {string} DirectoryName Name of directory
   * @param {string} fileName name of file to create
   * @throws {Error} if the file name is not valid
   */
  createFileInDirectory(directoryName, fileName) {
    //check if the directory exists or not
    this.readFolder(directoryName)

    //check if the file name is valid or not
    if (!this.validString(fileName)) {
      throw new Error("file name not valid");
    }

    // Construct the file path
    const filePath = path.join(`./database`,directoryName, `${fileName}.json`);
    console.log("oreno"+filePath)

    // Create the file
    fs.writeFile(filePath, "[]", (error) => {
      if (error) {
        console.error("Error creating file:", error);
        return;
      }
      console.log("File created successfully:", filePath);
      return true
    });
  }

  /**Read file inside the directory
   * @param {string} directoryName directory inside which file is there
   * @param {string} fileName file to read
   * @throws {Error} if the file name is not valid or not present
   */
  readFileInDirectory(directoryName, fileName) {
    //check if the directory exists or not
    this.readFolder(directoryName)

    // Construct the file path with .txt extension
    const filePath = path.join(`./database/`,directoryName, `/${fileName}.json`);

    // Read the file
    fs.readFile(filePath, "utf8", (error, data) => {
      if (error) {
        console.error("Error reading file:", error);
        return;
      }
      console.log("Contents of the file:", data);
      return true;
    });
  }

  /**Update fileName in directory
   * @param {string} DirectoryName directory name in which file is there
   * @param {string} oldFileName file to change
   * @param {string} newFileName new name of file
   * @throws {Error} if the file is not there or it is invalid
   */
  updateFileInDirectory(directoryName, oldFileName, newFileName) {
    //check if the directory is present or not
    this.readFolder(folderDirectory)

    //check if the new file name is valid or not
    if (!this.validString(newFileName)) {
      throw new Error("new file name is not valid");
    }

    // Construct the old and new file paths with .txt extension
    const oldFilePath = path.join(`./database`,directoryName, `${oldFileName}.json`);
    const newFilePath = path.join(`./database`,directoryName, `${newFileName}.json`);

    // Rename the file
    fs.rename(oldFilePath, newFilePath, (error) => {
      if (error) {
        console.error("Error renaming file:", error);
        return;
      }
      console.log("File renamed successfully:", oldFileName, "to", newFileName);
    });
  }

  /**Delete the file inside the folder
   * @param {string} directoryName folder where file is located
   * @param {string} fileName file to be deleted
   */
  deleteFileInDirectory(directoryName, fileName) {
    //check if the directory is present or not
    this.readFolder(directoryName)

    // Construct the file path with .txt extension
    const filePath = path.join(`./database`,directoryName, `${fileName}.json`);

    // Delete the file
    fs.unlink(filePath, (error) => {
      if (error) {
        console.error("Error deleting file:", error);
        return;
      }
      console.log("File deleted successfully:", fileName);
    });
  }

  /**helper Method to take one record input from user
   * @return {Array} to be inserted inside the json file
  */
  inputRecord(){
    //initialize the record to insert and key and value
    let recordToInsert={}
    let key=1
    let value=1
    
    // take input while user don't want to exit if -1 is given for key then exit
    while(1){
      //Input key
      key=prompt("Enter the value of key or -1 to stop Entering Data: ")

      //if key value is -1 then break the while loop
      if(key==-1) return recordToInsert;

      //if key is string or int then take otherwise reject
      if(!typeof key==='number' || !typeof key==='string'){
        console.log("key can either be number or string")
        continue;
      }

      // input the value for key
      value=prompt("Enter value: ")

      // insert the key value pair inside recordToInsert
      recordToInsert[key.toString()] = value
    }
    return recordToInsert
  }

  /** Write record inside the file
   * @param {string} directoryName name of directory in which file is  there
   * @param {string} fileName name of file in which data to be inserted
   * @throws {Error} if the file or folder is not present
  */
  createRecord(directoryName,fileName){
    //check wheather the folder is present or not
      this.readFolder(directoryName)

    //check wheather the folder is present or not
    // Construct the file path with .txt extension
    const filePath = path.join(`./database/`,directoryName, `/${fileName}.json`);

    // Read the file
    fs.readFile(filePath, "utf8", (error, data) => {
      if (error) {
        console.error("Error reading file:", error);
        return;
      }
    });

    // take all the json data from file
    let allRecords = require(`./database/${directoryName}/${fileName}.json`);

    // taking input the new record till the user wants
    let dataToInsert=this.inputRecord()

    // Adding new data to allRecords object 
      allRecords.push(dataToInsert);
 
    // Writing to a file 
      fs.writeFile(
      `./database/${directoryName}/${fileName}.json`,
      JSON.stringify(allRecords),
      err => {
        // Checking for errors 
        if (err) throw err;
 
        // Success 
        console.log("Done writing");
      });

  }

  /**read the record  from files
   * @param {string} directoryName name of directory in which file is  there
   * @param {string} fileName name of file in which data to be inserted
   * @throws {Error} if the file or folder is not present
  */
  readRecord(directoryName,fileName){
    //check wheather the folder and file are present or not
    this.readFolder(directoryName)

    //check wheather the folder is present or not
    // Construct the file path with .txt extension
    const filePath = path.join(`./database/`,directoryName, `/${fileName}.json`);

    // Read the file
    fs.readFile(filePath, "utf8", (error, data) => {
      if (error) {
        console.error("Error reading file:", error);
        return;
      }
    });

    //input key and value
    let key= prompt("Enter key: ")
    let value= prompt("Enter value: ")

    //  check if key and value both are string or not
    if(!typeof key==='string' || !typeof value==='string'){
      throw new Error("given query to search is not valid type")
    }

    //take all the json data from file
    let allData = require(`./database/${directoryName}/${fileName}.json`);

    // Loop through each object in the JSON data
    allData.forEach((object, index) => {

    // Check if the key exists in the current object
    if (object.hasOwnProperty(`${key}`)) {
    // If the value exists, print it
    if(object[key]==value){
      console.log(object)
    }
  }
});
}

/**update record inside the file
*  @param {string} directoryName name of directory in which file is  there
* @param {string} fileName name of file in which data to be inserted
* @throws {Error} if the file or folder is not present
*/
updateRecord(directoryName,fileName){
   //check wheather the folder and file are present or not
   this.readFolder(directoryName)

   // Construct the file path with .txt extension
   const filePath = path.join(`./database/`,directoryName, `/${fileName}.json`);

   // Read the file
   fs.readFile(filePath, "utf8", (error, data) => {
     if (error) {
       console.error("Error reading file:", error);
       return;
     }
   });

  //input key and value from user
   let key=prompt("Enter key: ")
   let value=prompt("Enter the value: ")

  //  check if key and value both are string or not
  if(!typeof key==='string' || !typeof value==='string'){
    throw new Error("given query to search is not valid type")}

  // taking input the new value for the key
  let dataToInsert=prompt("Enter the new value for current key")

  // take all the json data from file
  let allData = require(`./database/${directoryName}/${fileName}.json`);
  console.log(allData)

  // Loop through each object in the JSON data
  allData.forEach((object, index) => {

  // Check if the key exists in the current object
  if (object.hasOwnProperty(`${key}`)) {

  // If the value exists, print it
  console.log(object)
    if(object[key]==value){
      // console.log(index)
      object[key]=dataToInsert
    }
  }
});
console.log(allData)
  //write the entire json again in the file
  fs.writeFile(
    `./database/${directoryName}/${fileName}.json`,
    JSON.stringify(allData),
    err => {
      // Checking for errors 
      if (err) throw err;

      // Success 
      console.log("Updation Successfull");
    });

}

/**Delete the record inside file
* @param {string} directoryName name of directory in which file is  there
* @param {string} fileName name of file in which data to be inserted
* @throws {Error} if the file or folder is not present
*/
deleteRecord(directoryName,fileName){
   //check wheather the folder and file are present or not
   this.readFolder(directoryName)

   // Construct the file path with .txt extension
   const filePath = path.join(`./database/`,directoryName, `/${fileName}.json`);

   // Read the file
   fs.readFile(filePath, "utf8", (error, data) => {
     if (error) {
       console.error("Error reading file:", error);
       return;
     }
   });

  //input key and value
  let key= prompt("Enter key: ")
  let value= prompt("Enter value: ")

  //  check if key and value both are string or not
  if(!typeof key==='string' || !typeof value==='string'){
    throw new Error("given query to search is not valid type")}

    // take all the json data from file
  let allData = require(`./database/${directoryName}/${fileName}.json`);

     // Loop through each object in the JSON data
  allData.forEach((object, index) => {
    // Check if the key exists in the current object
    if (object.hasOwnProperty(`${key}`)) {
  
    // If the value exists, print it
      if(object[key]==value){
        // Remove the record from the array
        allData.splice(index, 1); 
      }
    }
  });

  console.log(allData)
   //write the entire json again in the file
   fs.writeFile(
    `./database/${directoryName}/${fileName}.json`,
    JSON.stringify(allData),
    err => {
      // Checking for errors 
      if (err) throw err;

      // Success 
      console.log("Deletion Successfull");
    });

}
  
}

//Testing create folder method
let db_gaurav = new Mydatabase("orewa");
// Testing create folder
// db_gaurav.createFolder('oreno')
// db_gaurav.createFolder('orewa')
// db_gaurav.createFolder('1orewa')
// db_gaurav.createFolder("/oreno/nawa");

// testing readfolder
// db_gaurav.readFolder("orewa")

// testing update Folder
// db_gaurav.updateFolder("oreno", "orrr");

//testing the delete folder
// db_gaurav.deleteFolder('orrr')
// db_gaurav.deleteFolder('database')

//Create a file
// db_gaurav.createFileInDirectory("orewa","oo")
// db_gaurav.readFileInDirectory("orewa","orep")

// let ans= db_gaurav.inputRecord()

// for(let i=0;i<3;i++){
//   console.log(typeof ans[i])
// }
// db_gaurav.createRecord('orewa','oo')
// db_gaurav.readFileInDirectory('orewa','oo')
db_gaurav.createRecord('orewa','oo')
// db_gaurav.updateRecord('orewa','oo')
// db_gaurav.readRecord('orewa','oo')
// db_gaurav.updateRecord('orewa','oo')
// db_gaurav.readFileInDirectory('orewa','oo')

// db_gaurav.updateRecord('orewa','oo')
// db_gaurav.deleteRecord('orewa','oo')



