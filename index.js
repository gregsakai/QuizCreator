const mongoose = require("mongoose");

mongoose
  .connect()
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const questionSchema = new mongoose.Schema({
  question: String,
  answers: [
    {
      answer: String,
      correct: Boolean
    }
  ]
});

const Question = mongoose.model("Question", questionSchema);

async function createQuestion() {
  const question = new Question({
    question: "what is 2 * 4",
    answers: [
      { answer: 6, correct: false },
      { answer: 7, correct: false },
      { answer: 8, correct: true },
      { answer: 9, correct: false }
    ]
  });

  const result = await question.save();
  console.log(result);
}

async function getQuestions() {
  const questions = await Question.find({
    question: "what is 2 * 4"
  }).limit(10);
  console.log(questions);
}

// getQuestions();
createQuestion();
