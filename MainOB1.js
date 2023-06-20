/**
 * @fileOverview Main script where the application takes off
 * @author sergey tamarovskiy
 * @version 1.0.0
 */

const Parser = require('./Parser.js');
const Element = require('./Element.js');

const obj = new Parser('import.csv');

const elemObj = obj.parseString('testname,ventil,Q1.0,I1.0');
let elem = new Element(elemObj.name, elemObj.type, elemObj.input, elemObj.output);

elem.chooseTitle()
console.log(elem.getText());

const allElements = obj.parseFile();

allElements.forEach(elem => {

    console.log(elem)
})
