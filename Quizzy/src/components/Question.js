import Option from "./Option";

function Question({ question, index, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Option
        question={question}
        index={index}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  );
}

export default Question;
