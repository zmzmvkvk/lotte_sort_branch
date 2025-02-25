import React, { useState } from "react";
import Form from "../components/Home/Form";
import Results from "../components/Home/Results";

export default function Home() {
  const [text, setText] = useState();

  const submitHandler = (text) => {
    setText(text);
  };

  return (
    <div className="p-5">
      <Form onSubmitHandler={submitHandler}></Form>
      <Results text={text} />
    </div>
  );
}
