import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { Clock, Target, Award } from "lucide-react"

export default function QuizResults({
  score,
  totalQuestions,
  onRestart,
  onShowDetailReview,
  duration,
}) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const accuracy = Math.round((score / totalQuestions) * 100)
  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60

  useEffect(() => {
    if (percentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [percentage])

  return (
    <div className="text-center space-y-8">
      <motion.h2
        className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Quiz Completed!
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Clock className="w-12 h-12 mx-auto mb-4 text-blue-400" />
          <h3 className="text-xl font-semibold mb-2">Duration</h3>
          <p className="text-3xl font-bold text-blue-400">
            {minutes}m {seconds}s
          </p>
        </motion.div>
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Target className="w-12 h-12 mx-auto mb-4 text-green-400" />
          <h3 className="text-xl font-semibold mb-2">Score</h3>
          <p className="text-3xl font-bold text-green-400">
            {score} / {totalQuestions}
          </p>
        </motion.div>
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Award className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
          <h3 className="text-xl font-semibold mb-2">Accuracy</h3>
          <p className="text-3xl font-bold text-yellow-400">{accuracy}%</p>
        </motion.div>
      </div>
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p className="text-lg text-white flex justify-around font-semibold">
          <span className="text-yellow-400">Total Questions: {totalQuestions}</span>
          <span className="text-green-400">Correct: {score}</span>
          <span className="text-red-400">Incorrect: {totalQuestions - score}</span>
        </p>
      </motion.div>
      <motion.p
        className="text-2xl mb-8 text-gray-200"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {percentage >= 80
          ? "Outstanding! You're a quiz master!"
          : percentage >= 60
            ? "Great job! You have a solid knowledge base."
            : "Keep learning! You're on the right track."}
      </motion.p>
      <motion.div
        className="space-x-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Button
          onClick={onRestart}
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xl py-6 px-12 rounded-full hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
        >
          Restart Quiz
        </Button>
        <Button
          onClick={onShowDetailReview}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-teal-600 text-white text-xl py-6 px-12 rounded-full hover:from-blue-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
        >
          Detail Review
        </Button>
      </motion.div>
    </div>
  )
}

