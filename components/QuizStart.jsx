import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Book, Clock, FileQuestion } from "lucide-react"

export default function QuizStart({ onStart, quizTitle, quizTopic, duration, totalQuestion }) {
  return (
    <div className="text-center space-y-8">
      <motion.h1
        className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {quizTitle}
      </motion.h1>
      <motion.div className="flex flex-col gap-3 ps-36 pb-0 mb-0">
        <motion.div className="flex max-w-max gap-x-4 items-center justify-center m-0 p-0">
            <Book className="w-7 h-7 mr-2 text-green-300" />
            <p className="text-lg font-semibold text-green-300">{quizTopic}</p>
        </motion.div>
        <motion.div className="flex max-w-max gap-x-4 items-center m-0 p-0">
            <Clock className="w-7 h-7 text-blue-400 m-0 p-0" />
            <p className="text-lg font-semibold text-blue-400">15 min</p>
        </motion.div>
        <motion.div className="flex max-w-max gap-x-4 items-center m-0 p-0">
            <FileQuestion className="w-6 h-6 mr-2 text-yellow-300" />
            <p className="text-lg font-semibold text-yellow-300">{totalQuestion} questions</p>
        </motion.div>
      </motion.div>
      <motion.p
        className="mb-8 text-lg text-gray-300 text-start ms-36"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Are you ready to test your knowledge?
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button
          onClick={onStart}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl py-6 px-12 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          Start Quiz
        </Button>
      </motion.div>
    </div>
  )
}

