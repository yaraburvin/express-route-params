import express from "express";
import { parse } from "path";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});

app.get("/eat/apple", (req, res) => {
  res.json({
    message: "Yum yum - you ate an apple!",
  });
});

app.get("/eat/banana", (req, res) => {
  res.json({
    message: "Yum yum - you ate a banana!",
  });
});

app.get("/eat/carrot", (req, res) => {
  res.json({
    message: "Yum yum - you ate a carrot!",
  });
});

app.get<{food:string}>("/eat/:food", (req, res) => {
  const {food} = req.params
  if (["a", "e", "i", "o", "u"].includes(food.charAt(0))) {
    res.json({
      message: `Yum yum - you ate an ${food}`
    })} else {
      res.json({
        message: `Yum yum - you ate a ${food}`
      })
    }
});


app.get<{exampleRouteParameter : string}>("/echo/:exampleRouteParameter", (req, res) => {
  const echoContent = req.params.exampleRouteParameter;
  res.json({
    echo: echoContent,
    message: `I am echoing back to you: ${echoContent}`,
  });
});

app.get<{phrase : string}>("/shout/:phrase", (req, res) => {
  const shoutContent = req.params.phrase;
  res.json({
    shout: shoutContent.toUpperCase(),
    message: `I am shouting back to you: ${shoutContent.toUpperCase()}`,
  });
});
app.get<{numOne : string; numTwo : string; numThree? : string}>("/add/:numOne/:numTwo/:numThree?", (req, res) => {
  const { numOne, numTwo, numThree } = req.params;
  if (numThree === undefined) {
    const addition = parseInt(numOne) + parseInt(numTwo)
    res.json({
      original : `${numOne} + ${numTwo}`,
      result : addition
    })
  } else {
    const addition = parseInt(numOne) + parseInt(numTwo) + parseInt(numThree)
    res.json({
      original : `${numOne} + ${numTwo} + ${numThree}`,
      result : addition
    })
  };
  
});

app.get<{numOne: string; numTwo:string}>("/multiply/:numOne/:numTwo", (req, res) => {
  /**
   * Note that `numOne` and `numTwo` are both typed as string.
   * (Hover over with your mouse to see!)
   *
   * Route params are, by default, typed as strings when they
   * are parsed by Express.
   */
  const { numOne, numTwo } = req.params;
  const multiplication = parseInt(numOne) * parseInt(numTwo);
  res.json({
    original: `${numOne} x ${numTwo}`,
    result: multiplication
  });
});

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});
