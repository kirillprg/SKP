/**
 * @fileOverview Class hold the logic for parsing cvs file that consists of elements
 * @author sergey tamarovskiy
 * @version 1.0.0
 */

/** @const {Object} [needed to be able to open a csv file] */
const fs = require("fs");

class Parser {
  /**
   * Initiation of instance for Parser class
   * @param {String} adress - adress of a file or name
   */
  constructor(adress) {
    this.adress = adress;
  }

  /**
   * Method to get adress of current object
   * @return {String} adress - adress of a file or name
   */
  getAdress() {
    return this.adress;
  }

  /**
   * Method to parse the needed file
   * @return {Array} lineObjArr - array of all parsed objects from a file.
   * example of an object
   * {name: String,type: String, input: String, output: String}
   */
  parseFile() {
    let lineObjArr = [];
    const data = fs.readFileSync(this.adress).toLocaleString();

    const rows = data.split("\n"); // SPLIT ROWS
    rows.forEach((row) => {
      let columns = row.split(","); //SPLIT COLUMNS
      columns = this.fixLastObjInArr(columns);
      if (columns) {
        lineObjArr.push(this.makeObjFromArr(columns));
      }
    });
    return lineObjArr;
  }

  /**
   * Method to remove the last object in array, so it doesnt have \r\n|\n|\r
   * @param {Array} linesArr - array that represent 1 line from a parsed file
   * @return {Array} linesArr - same array but with the last elements that is fixed
   */
  fixLastObjInArr(linesArr) {
    // if line is empty then we get only 1 element is array, hence no need to add it to the fuinal array
    if (linesArr.length < 2) {
      return null;
    }
    const lastElemPosition = linesArr.length - 1;
    linesArr[lastElemPosition] = linesArr[lastElemPosition].replace(
      /(\r\n|\n|\r)/gm,
      ""
    );

    return linesArr;
  }

  /**
   * Method creates an object from gievn array
   * @param {Array} lineArr - array that represent 1 line from a parsed file
   * @return {Object} pasrsedLineObj - object that represents 1 line from a file
   */
  makeObjFromArr(lineArr) {
    const pasrsedLineObj = {
      name: lineArr[0],
      type: lineArr[1],
      input: lineArr[2],
      output: lineArr[3],
    };
    return pasrsedLineObj;
  }

  /**
   * Method parses and creates an object from given string
   * @param {String} line - string that represent 1 line from a parsed file
   * @return {Object} pasrsedLine - object that represents 1 line from a file
   */
  parseString(line) {
    const pasrsedLine = {
      name: "",
      type: "",
      input: "",
      output: "",
    };

    if (line.length < 1) {
      return pasrsedLine;
    }
    let counter = 0;
    let lastPosition = 0;
    for (let i = 0; i < line.length; i++) {
      if (line[i] == ",") {
        switch (counter) {
          case 0:
            pasrsedLine.name = line.slice(lastPosition, i);
            lastPosition = i + 1;
            break;
          case 1:
            pasrsedLine.type = line.slice(lastPosition, i);
            lastPosition = i + 1;
            break;
          case 2:
            pasrsedLine.output = line.slice(lastPosition, i);
            lastPosition = i + 1;
            break;
          default:
            console.log("unacceptable counter is ", counter);
            break;
        }
        counter++;
      }
      if (i == line.length - 1) {
        console.log(line[line.length - 2]);
        if (line[line.length] == "r") {
          pasrsedLine.input = line.slice(lastPosition, line.length - 2);
        } else {
          pasrsedLine.input = line.slice(lastPosition, line.length);
        }
      }
    }

    return pasrsedLine;
  }
}

module.exports = Parser;
