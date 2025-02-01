import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function DetailReview({ questions, userAnswers, onBack }) {

  const removeStars = (text) => {
    return text.replace(/\*\*/g, "").replace(/\*/g, "")
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Detailed Quiz Review
      </h2>
      {questions.map((question, index) => {
        const userAnswer = userAnswers.find((ua) => ua?.questionId === question.id)?.answer
        const correctAnswer = question.options.find((opt) => opt.is_correct)?.description
        const isCorrect = userAnswer === correctAnswer

        return (
          <motion.div
            key={question.id}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 ${isCorrect ? "bg-green-500" : "bg-red-500"} transform rotate-45 translate-x-12 -translate-y-12`}
            ></div>
            <div className="absolute top-[16px] right-[-10px] text-white font-bold transform rotate-45">
              {isCorrect ? "Correct" : "Incorrect"}
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Question {index + 1}: {question.description}
            </h3>
            <div className="space-y-2 mb-4">
              {question.options.map((option) => {
                const isUserAnswer = option.description === userAnswer
                const isCorrectAnswer = option.is_correct

                let borderClass = ""
                let labelClass = ""
                if (isUserAnswer || isCorrectAnswer) {
                  borderClass = isCorrectAnswer ? "border-green-500" : "border-red-500"
                  labelClass = isCorrectAnswer ? "bg-green-500" : "bg-red-500"
                }

                return (
                  <div key={option.id} className={`p-3 rounded-lg border-2 ${borderClass} relative`}>
                    {(isUserAnswer || isCorrectAnswer) && (
                      <div className={`absolute top-0 right-0 ${labelClass} text-white text-xs px-2 py-1 rounded-bl rounded-tr`}>
                        {isCorrectAnswer ? "Correct Answer" : "Your Answer"}
                      </div>
                    )}
                    {option.description}
                  </div>
                )
              })}
            </div>
            {question.detailed_solution && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg">
                <h4 className="text-lg font-semibold mb-2 text-green-400">Solution:</h4>
                <p className="text-gray-200">{removeStars(question.detailed_solution)}</p>
              </div>
            )}
          </motion.div>
        )
      })}
      <div className="flex justify-center mt-8">
        <Button
          onClick={onBack}
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xl py-4 px-8 rounded-full hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
        >
          Back to Results
        </Button>
      </div>
    </div>
  )
}

