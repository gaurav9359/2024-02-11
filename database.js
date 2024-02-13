/**
 * Requirement- To create a basic database using Files and folders
 * Each folder can container any number of files and each files can
 * container n number of lines.
 * We need to perform crud operations on all these folder, files and
 * lines
 */
const fs = require("node:fs");

// Class to declare the database name and methods to perform crud operations
class Mydatabase {
  static folder_made=null
  // constructor takes name of database as input and initialise the class
  constructor(name = null) {
    if (name === null || !name==="string") {
      throw new Error("name is null");
    }

    this.name = name;
  }

  /**Method to create Folder
   * @param {string} folderName of folder
   * @throws {Error} if name is not string type
   * @throws {Error} if folder already exists
   * @throws {Error} if the folder is already created for db
   */
    createFolder(folderName) {
    //If folder name is not string type throw error
    if(!(typeof folderName === 'string')){
        throw new Error("Folder name should be string");
    }

    // Create folder with name given by user (folderName)
    let folderDirectory = ".\\"
    folderDirectory=folderDirectory+folderName
    

    //if folder is already create for db then return with error
    console.log(this.folder_made)
    if(this.folder_made!==null){
      throw new Error(`${this.folder_made} directory already exists for this database`)
    }

    //If folder name already exists throw error else create
    try {
      if (!fs.existsSync(folderDirectory) ) {
        fs.mkdirSync(folderDirectory);
        console.log("folder created")
        this.folder_made=folderName
      }
    } catch (err) {
      console.error(err);
    }
  }
}

//Testing create folder method
let db_gaurav= new Mydatabase("orewa")
db_gaurav.createFolder("gaurav")


let orewa= new Mydatabase("orewa2")
orewa.createFolder("insta")

