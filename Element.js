const { monitorEventLoopDelay } = require("perf_hooks");






class Element {
    constructor(name, type, input, output,) {
      this.name = name;
      this.type = type;
      this.input = input;
      this.output = output;
      this.callTitle = '';
                        // this.typeTitle = ' \"SSW_MOTOR\", \"SSW_MOTOR_DB\" ';
     }
                        //create and describe all possible elements, such as motor, senxor etc. Create methods to return type/name/input/output/=.
                        //Create mehtods to construct text for each elements
                        // kuda etu xujetu vstavit shtob ona vezde rabotala??




                                  /*

                                  prost kak primer vpixnul sjuda
                                  NETWORK
                                  TITLE = motor1
                                        CALL "SSW_MOTOR", "SSW_MOTOR_DB"
                                        (  INPUT_OK                    := "Tag_27" , 
                                          INPUT_MotorStarted          := "Tag_28"
                                        );

                                  */


//p

    getName(){
      return this.name;
    };
//method  to choose text according to type


    chooseTitle(){
      
      switch(this.type){       
        case "motor" :
          this.callTitle =  '\"SSW_MOTOR\", \"SSW_MOTOR_DB\"';
          break;
        case "ventil" :
          this.callTitle =  '\"SSW_VENTIL\", \"SSW_VENTIL_DB\"';
          break;
        case "sensor" :
          this.callTitle =  '\"SSW_LS_OK\", \"SSW_LS_OK_DB\"';
          break;
        default:
          this.callTitle = "lame title, dolbaeb"
          break;
      }

     

    }

    getText(){
      let text = `Network \n Title = ${this.name} \n CALL ${this.callTitle}  \n ( Input_OK := ${this.input}, \n Output_start := ${this.output} \n );`
      return text;
    };

}

module.exports = Element;
