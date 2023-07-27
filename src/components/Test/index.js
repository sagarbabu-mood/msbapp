import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Result from '../Result'

const questions = [
  {
    question: 'Which HTML element is used to display a horizontal line?',
    answers: ['<line>', '<break>', '<hr>', '<horizontal>'],
    correctAnswer: 2, // Index of the correct answer in the 'answers' array
  },
  {
    question: 'Which HTML element is used to define a table row?',
    answers: ['<table>', '<tr>', '<td>', '<th>'],
    correctAnswer: 1,
  },
  {
    question: 'What is the correct HTML element for inserting a line break?',
    answers: ['<break>', '<lb>', '<br>', '<line>'],
    correctAnswer: 2,
  },
  {
    question:
      'Which attribute is used to specify that an input field must be filled out?',
    answers: ['required', 'validate', 'placeholder', 'mandatory'],
    correctAnswer: 0,
  },
  {
    question: 'What is the correct HTML element for playing video files?',
    answers: ['<video>', '<media>', '<movie>', '<play>'],
    correctAnswer: 0,
  },
  {
    question: 'Which HTML element defines the title of a document?',
    answers: ['<meta>', '<title>', '<head>', '<header>'],
    correctAnswer: 1,
  },
  {
    question: 'Which character is used to indicate an end tag in HTML?',
    answers: ['*', '/', '%', '#'],
    correctAnswer: 1,
  },
  {
    question: 'What is the correct HTML element for inserting an image?',
    answers: ['<img>', '<image>', '<picture>', '<src>'],
    correctAnswer: 0,
  },
  {
    question: 'Which HTML element is used to define a list item?',
    answers: ['<list>', '<li>', '<ul>', '<ol>'],
    correctAnswer: 1,
  },
  {
    question:
      'Which attribute specifies an alternate text for an image, if the image cannot be displayed?',
    answers: ['alt', 'src', 'title', 'image'],
    correctAnswer: 0,
  },
]

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showInstructions: true,
      instructionsTimer: 8,
      mcqTimer: 240, // 4 minutes in seconds
      score: 0,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      isTimeOut: false,
      questions, // Same as before (question data array)
    }
    this.instructionsTimerInterval = null
    this.mcqTimerInterval = null
  }

  componentDidMount() {
    this.instructionsTimerInterval = setInterval(() => {
      this.setState(
        prevState => ({instructionsTimer: prevState.instructionsTimer - 1}),
        () => {
          if (this.state.instructionsTimer === 0) {
            clearInterval(this.instructionsTimerInterval)
            this.setState({showInstructions: false}, () => {
              this.startMCQTimer()
            })
          }
        },
      )
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.instructionsTimerInterval)
    clearInterval(this.mcqTimerInterval)
  }

  handleLogout = () => {
    Cookies.remove('sagar_token')
    const {history} = this.props
    history.push('/login')
  }

  startMCQTimer = () => {
    this.mcqTimerInterval = setInterval(() => {
      this.setState(
        prevState => ({mcqTimer: prevState.mcqTimer - 1}),
        () => {
          if (this.state.mcqTimer === 0) {
            clearInterval(this.mcqTimerInterval)
            this.setState({isTimeOut: true})
          }
        },
      )
    }, 1000)
  }

  handleAnswerSelection = answerIndex => {
    this.setState({selectedAnswer: answerIndex})
  }

  handleNextQuestion = () => {
    const {questions, currentQuestionIndex, selectedAnswer} = this.state
    const currentQuestion = questions[currentQuestionIndex]

    if (selectedAnswer === currentQuestion.correctAnswer) {
      this.setState(prevState => ({score: prevState.score + 2}))
    }

    this.setState(prevState => ({
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      selectedAnswer: null,
    }))
  }

  render() {
    const {
      showInstructions,
      instructionsTimer,
      mcqTimer,
      currentQuestionIndex,
      selectedAnswer,
      score,
      isTimeOut,
      questions,
    } = this.state

    if (isTimeOut || currentQuestionIndex >= questions.length) {
      return <Result score={score} />
    }

    const currentQuestion = questions[currentQuestionIndex]

    return (
      <div className="test-container">
        {showInstructions && (
          <div className="instructions-card">
            <h2>Instructions</h2>
            <p>10 questions</p>
            <p>4 minutes</p>
            <p>Type: HTML</p>
            <p>For each correct answer: 2 points</p>
            <p>No negative marking for wrong answers</p>
            <div className="instructions-timer">
              {instructionsTimer} seconds
            </div>
          </div>
        )}

        {!showInstructions && (
          <div className="test-card">
            <header>
              {isTimeOut ? (
                <div className="time-out-message">
                  Time out! Go to Home page
                </div>
              ) : (
                <>
                  <div className="timer">
                    Time Remaining: {Math.floor(mcqTimer / 60)} minutes{' '}
                    {mcqTimer % 60} seconds
                  </div>
                  <div className="score">Score: {score}</div>
                </>
              )}
            </header>

            {!isTimeOut && (
              <div className="question-container">
                <h2 className="test-title">
                  Question {currentQuestionIndex + 1}
                </h2>
                <p className="test-question">{currentQuestion.question}</p>
                <div className="test-answers">
                  {currentQuestion.answers.map((answer, index) => (
                    <div key={index} className="test-answer">
                      <input
                        id={index}
                        type="radio"
                        name="answer"
                        checked={selectedAnswer === index}
                        onChange={() => this.handleAnswerSelection(index)}
                      />
                      <label htmlFor={index} className="test-answer-label">
                        {answer}
                      </label>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={this.handleNextQuestion}
                  className="next-button"
                  disabled={selectedAnswer === null}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default Test
