import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {

        let emotionArray = [
            {type: 'anger', amount: 0},
            {type: 'disgust', amount: 0},
            {type: 'fear', amount: 0},
            {type: 'joy', amount: 0},
            {type: 'sadness', amount: 0},
        ];

        emotionArray.forEach(item => {
            item.amount = 0;
        });
        

        let aux = {type: "zee", arg: 0};

        console.log(aux);
        console.log(emotionArray);
        console.log(this.props.emotions)

        emotionArray.map(item => {
            return item.amount 
        });

        this.props.emotions.entities.map(item => {
            emotionArray[0].amount += parseFloat(item.emotion.anger);
            emotionArray[1].amount += parseFloat(item.emotion.disgust);
            emotionArray[2].amount += parseFloat(item.emotion.fear);
            emotionArray[3].amount += parseFloat(item.emotion.joy);
            emotionArray[4].amount += parseFloat(item.emotion.sadness);
            return null
        });

        console.log(emotionArray);
        this.props.emotions.keywords.map(item => {
            emotionArray[0].amount += parseFloat(item.emotion.anger);
            emotionArray[1].amount += parseFloat(item.emotion.disgust);
            emotionArray[2].amount += parseFloat(item.emotion.fear);
            emotionArray[3].amount += parseFloat(item.emotion.joy);
            emotionArray[4].amount += parseFloat(item.emotion.sadness);
            return null
        });

        console.log(emotionArray);

        emotionArray.map(item=>{
            item.amount /= parseFloat(this.props.emotions.entities.lenght + this.props.emotions.keywords.lenght);
            return null
        });

        console.log(emotionArray);

        
        //console.log(Number(angerResult).toPrecision(4),Number(disgustResult).toPrecision(4),fearResult,joyResult,sadnessResult);
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
                
                
            {emotionArray.map(item=>{
                return (<tr>
                    <td>{item.type}</td>
                    <td>{Number(item.amount).toLocaleString(undefined,{maximumFractionDigits:6,minimumFractionDigits:6})}</td>
                </tr>)
            })}
                

            {
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
