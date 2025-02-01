import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"

export default function QuizQuestion({
  question,
  onAnswer,
  userAnswer,
  currentQuestion,
  totalQuestions,
  onNextQuestion,
  onPreviousQuestion,
  isLastQuestion,
  onSubmitQuiz,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(userAnswer)
  const [showResult, setShowResult] = useState(false)
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    setSelectedAnswer(userAnswer)
    setShowResult(false)
    setCountdown(3)
  }, [userAnswer])

  const handleAnswer = (answer) => {
    if (!userAnswer) {
      setSelectedAnswer(answer)
      onAnswer(answer)
      setShowResult(true)

      const correctOption = question.options.find((opt) => opt.is_correct)
      if (correctOption && answer === correctOption.description) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
    }
  }

  useEffect(() => {
    let timer
    if (showResult && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (countdown === 0) {
      onNextQuestion()
    }
    return () => clearTimeout(timer)
  }, [showResult, countdown, onNextQuestion])

  const getOptionClass = (option) => {
    if (!showResult) return ""
    if (option === question.options.find((opt) => opt.is_correct)?.description) {
      return "bg-green-500 text-white"
    }
    if (option === selectedAnswer) {
      return "bg-red-500 text-white"
    }
    return ""
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl">
        <p className="text-xl mb-6 text-gray-100">{question.description}</p>
        <div className="space-y-4 mb-6">
          <AnimatePresence>
            {question.options.map((option) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant={selectedAnswer === option.description ? "default" : "outline"}
                  className={`w-full text-left justify-start text-lg py-4 ${getOptionClass(option.description)}`}
                  onClick={() => handleAnswer(option.description)}
                  disabled={!!userAnswer}
                >
                  {option.description}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {showResult && (
          <div className="mt-6 p-4 bg-white/20 rounded-lg">
            <p className="text-lg font-semibold mb-2">Correct Answer:</p>
            <p className="text-green-400">{question.options.find((opt) => opt.is_correct)?.description}</p>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={onPreviousQuestion}
          disabled={currentQuestion === 1}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
        >
          Previous
        </Button>
        {isLastQuestion ? (
          <Button
            onClick={onSubmitQuiz}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            onClick={onNextQuestion}
            className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 text-white"
          >
            Next Question
          </Button>
        )}
      </div>
      {showResult && <p className="text-center mt-4 text-xl font-bold">Next question in: {countdown}</p>}
    </div>
  )
}

