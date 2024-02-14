/**
 * Requirement- To create a basic database using Files and folders
 * Each folder can container any number of files and each files can
 * container n number of lines.
 * We need to perform crud operations on all these folder, files and
 * lines
 */
const fs = require("fs");
const path = require("path");

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
  validString(stringToCheck){
    // Regular expression to match strings with at least one letter and containing only letters and numbers
    const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
    // Check if the string matches the regular expression and does not start with a number
    return regex.test(stringToCheck) && isNaN(parseInt(stringToCheck[0]));
  };

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
    let folderDirectory = ".\\";
    folderDirectory = folderDirectory + folderName;
    console.log(folderDirectory);

    //If folder name already exists throw error else create
    try {
      if (!fs.existsSync(folderDirectory)) {
        fs.mkdirSync(folderDirectory);
        console.log("folder created");
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
    let folderDirectory = ".\\";
    folderDirectory = folderDirectory + folderName;
    console.log(folderDirectory);

    fs.readdir(folderDirectory, (err, files) => {
      if (err) {
        console.error("Error listing directory contents:", err);
        return;
      }
      console.log("Contents of the directory:", files);
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

    // Split the old folder path by spaces and join with directory separator to handle spaces in folder name
    const oldFolderPath = oldFolder.split(" ").join(path.sep);

    // Get the current working directory
    const currentDirectory = process.cwd();

    // Construct the absolute path of the old folder
    const absoluteOldFolderPath = path.resolve(currentDirectory, oldFolderPath);

    // Rename the folder
    fs.rename(absoluteOldFolderPath, newFolder, (error) => {
      if (error) {
        console.error("Error renaming folder:", error);
        return;
      }
      console.log("Folder renamed successfully:", oldFolder, "to", newFolder);
    });
  }

  /**Delete the folder create previously
   * @param {string} folderName to delete
   * @throws {Error} if the folderName not found
   */
  deleteFolder(folderName) {
    fs.rmdir(folderName, { recursive: true }, (err) => {
      if (err) {
        console.error("Error removing directory:", err);
        return;
      }
      console.log("Directory removed successfully:", folderName);
    });
  }

  /**Create a file inside Directory
   * @param {string} DirectoryName Name of directory
   * @param {string} fileName name of file to create
   * @throws {Error} if the file name is not valid
   */
  createFileInDirectory(directoryName, fileName) {
    //check if the file name is valid or not
    if (!this.validString(fileName)) {
      throw new Error("file name not valid");
    }

    // Construct the file path
    const filePath = path.join(directoryName, `${fileName}.txt`);

    // Create the file
    fs.writeFile(filePath, "", (error) => {
      if (error) {
        console.error("Error creating file:", error);
        return;
      }
      console.log("File created successfully:", filePath);
    });
  }

  /**Read file inside the directory
   * @param {string} directoryName directory inside which file is there
   * @param {string} fileName file to read
   * @throws {Error} if the file name is not valid or not present
   */
  readFileInDirectory(directoryName, fileName) {
    // Construct the file path with .txt extension
    const filePath = path.join(directoryName, `${fileName}.txt`);

    // Read the file
    fs.readFile(filePath, "utf8", (error, data) => {
      if (error) {
        console.error("Error reading file:", error);
        return;
      }
      console.log("Contents of the file:", data);
    });
  }

  /**Update fileName in directory
   * @param {string} DirectoryName directory name in which file is there
   * @param {string} oldFileName file to change
   * @param {string} newFileName new name of file
   * @throws {Error} if the file is not there or it is invalid
   */
  updateFileInDirectory(directoryName, oldFileName, newFileName) {
    //check if the new file name is valid or not
    if(!this.validString(newFileName)){
      throw new Error("new file name is not valid")
    }

    // Construct the old and new file paths with .txt extension
    const oldFilePath = path.join(directoryName, `${oldFileName}.txt`);
    const newFilePath = path.join(directoryName, `${newFileName}.txt`);

    // Rename the file
    fs.rename(oldFilePath, newFilePath, (error) => {
        if (error) {
            console.error('Error renaming file:', error);
            return;
        }
        console.log('File renamed successfully:', oldFileName, 'to', newFileName);
    });
}

  /**Delete the file inside the folder
   * @param {string} directoryName folder where file is located
   * @param {string} fileName file to be deleted
  */
  deleteFileInDirectory(directoryName, fileName) {
    // Construct the file path with .txt extension
    const filePath = path.join(directoryName, `${fileName}.txt`);

    // Delete the file
    fs.unlink(filePath, (error) => {
        if (error) {
            console.error('Error deleting file:', error);
            return;
        }
        console.log('File deleted successfully:', fileName);
    });
}
}

//Testing create folder method
let db_gaurav = new Mydatabase("orewa");

// db_gaurav.createFolder("insta chhhiil")
// db_gaurav.readFolder("insta chhhiil")
// db_gaurav.updateFolder("insta cchhii","ill")
// db_gaurav.deleteFolder("il")
// db_gaurav.createFileInDirectory("ill","oreno")
// db_gaurav.readFileInDirectory("ill", "oreno");
// db_gaurav.updateFileInDirectory('ill','oreno','orewa')
db_gaurav.deleteFileInDirectory('ill','orewa')

