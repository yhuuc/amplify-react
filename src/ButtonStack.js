import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

function ButtonStack () {
    const predict = () => {
        console.log('Predicte button clicked');
        // model inference
        const visorInstance = tfvis.visor();
        visorInstance.surface({
          name: 'Audio Analysis',
          tab: 'Feature Extraction'
        })
        // insert data
        visorInstance.toggle();
      }
    
      const showPrediction = () => {
        console.log('Show Prediction button clicked');
        const visorInstance = tfvis.visor();
        visorInstance.toggle();
        // if (!visorInstance.isOpen()) {
        //   visorInstance.toggle();
        // }
      }
    return (
        <div className='Button-stack'>
            <button className='Button' type="button" onClick={predict}>Predict</button><br />
            <button className='Button' type="button" onClick={showPrediction}>Show Prediction</button>
        </div>
    );
}

export default ButtonStack;