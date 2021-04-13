import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        //changing the object to an array of objects so I can use .map()

        let emotionArray = [
            {type: "Anger", value: this.props.emotions.anger},
            {type: "Disgust", value: this.props.emotions.disgust},
            {type: "Fear", value: this.props.emotions.fear},
            {type: "Joy", value: this.props.emotions.joy},
            {type: "Sadness", value: this.props.emotions.sadness},
        ];
        
        //warning log recomended me to use unique keys when mapping the array as shown below
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
                {emotionArray.map((item,index)=>{
                    return (<tr key={index}>
                        <td>{item.type}</td>
                        <td>{item.value.toLocaleString("en-US",{maximumFractionDigits:6,minimumFractionDigits:6})}</td>
                    </tr>)
                })}
            </tbody>
          </table>
        </div>
      );
    }
    
}
export default EmotionTable;
