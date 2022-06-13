import React, { useRef, useState } from 'react';
import { fightClub } from './core/data';
import { TextModel } from './core/model';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import './App.css';

function App() {

  const [threshold, setThreshold] = useState(500);
  const modelRef = useRef<TextModel>();
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [evaluationResult, setEvaluationResult] = useState<number>();
  const [trainText, setTrainText] = useState(fightClub);
  const [text, setText] = useState('');

  const onTrain = () => {
    const model = new TextModel(trainText);
    modelRef.current = model;
    setInfo(`Containing: ${Object.keys(model.trainDict).length} combos.\n Your model was trained successfully.`);
  };

  const onEvaluate = () => {
    if(!modelRef.current) {
      setError('You must train your model first. Please supply training text & hit \'Train\' button.');
    } else if(!text) {
      setError('Please supply evaluation text firstly.');
    } else {
      const result = modelRef.current?.evaluateSentence(text);
      setEvaluationResult(result);
    }
  };

  return (
    <div className="app">
        <Popup open={!!evaluationResult} closeOnDocumentClick onClose={() => setEvaluationResult(0)}>
          <div className='modal'>
            <div>{`Evaluation result: ${evaluationResult}`}</div>
            <div>{`Threshold: ${threshold}`}</div>
            <div>{`Check: ${(evaluationResult || 0) > threshold ? 'Passed' : 'Failed'}`}</div>
            <button
              className='button'
              onClick={() => {
                setThreshold(evaluationResult || 500);
                setEvaluationResult(0);
              }}
            >
              Set result as threshold
            </button>
          </div>
        </Popup>
        <Popup open={!!error} closeOnDocumentClick onClose={() => setError(null)}>
          <div className='modal error-modal'>
            <div>{error}</div>
          </div>
        </Popup>
        <Popup open={!!info} closeOnDocumentClick onClose={() => setInfo(null)}>
          <div className='modal info-modal'>
            <div>{info}</div>
          </div>
        </Popup>
      <section className='input-section'>
        <textarea
          className='train-input'
          value={trainText}
          onChange={({ target }) => setTrainText(target.value)}
        />
        <button
          className='button'
          onClick={onTrain}
        >
          Train
        </button>
      </section>
      <section className='input-section'>
        <textarea
          className='train-input'
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
        <button
          className='button'
          title='Evaluate'
          onClick={onEvaluate}
        >
          Evaluate
        </button>
      </section>
    </div>
  );
}

export default App;
