import React, { useState } from "react";
import ReactDOM from "react-dom";

const Display = (props) => {
  return (
    <>
      <p>
        {props.text} {props.count}
      </p>
    </>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = ({ good, bad, neutral }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <Display text="good" count={good} />
      <Display text="neutral" count={neutral} />
      <Display text="bad" count={bad} />
      <Display text="all" count={good + neutral + bad} />
      <Display text="average" count={(good - bad) / (good + neutral + bad)} />
      <Display
        text="positive"
        count={(good / (good + neutral + bad)) * 100 + " %"}
      />
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)}></Button>
      <Button
        text="neutral"
        handleClick={() => setNeutral(neutral + 1)}
      ></Button>
      <Button text="bad" handleClick={() => setBad(bad + 1)}></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
