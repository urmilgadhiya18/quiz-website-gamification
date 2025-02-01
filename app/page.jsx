"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import QuizStart from "@/components/QuizStart"
import QuizQuestion from "@/components/QuizQuestion"
import QuizResults from "@/components/QuizResults"
import DetailReview from "@/components/DetailReview"
import { fetchQuizData } from "@/lib/api"
import { LoaderCircle, Clock } from "lucide-react"

export default function Home() {
  const [quizData, setQuizData] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizFinished, setQuizFinished] = useState(false)
  const [showDetailReview, setShowDetailReview] = useState(false)
  const [error, setError] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [quizDuration, setQuizDuration] = useState(0)

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizData()
        setQuizData(data)
      } catch (err) {
        setError("Failed to load quiz data. Please try again later.")
      }
    }
    loadQuizData()
  }, [])

  useEffect(() => {
    let timer
    if (quizStarted && timeRemaining !== null && timeRemaining > 0 && !quizFinished) {
      timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
        setQuizDuration((prev) => prev + 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      setQuizFinished(true)
    }
    return () => clearTimeout(timer)
  }, [quizStarted, timeRemaining, quizFinished])

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setQuizFinished(false)
    setShowDetailReview(false)
    setTimeRemaining(15 * 60) // 15 minutes
    setQuizDuration(0)
  }

  const handleAnswer = (answer) => {
    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestionIndex] = { questionId: quizData?.questions[currentQuestionIndex].id, answer }
    setUserAnswers(newUserAnswers)
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < (quizData?.questions.length ?? 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const submitQuiz = () => {
    setQuizFinished(true)
  }

  const calculateScore = () => {
    if (!quizData) return 0
    return userAnswers.reduce((score, userAnswer) => {
      const question = quizData.questions.find((q) => q.id === userAnswer.questionId)
      if (question && userAnswer.answer) {
        const correctOption = question.options.find((opt) => opt.is_correct)  
        if (correctOption && userAnswer.answer === correctOption.description) {
          return score + 1
        }
      }
      return score
    }, 0)
  }

  if (!quizData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin h-28 w-28 text-purple-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error}</p>
      </div>
    )
  }

  // if (error) {
  //   return <div className="text-center text-red-500 mt-10">{error}</div>
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-4xl bg-black/30 backdrop-blur-xl rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        {!quizFinished && timeRemaining !== null && (
          <div className="flex justify-between p-0 m-0">
          <h2 className="text-3xl font-bold pl-2 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Question {currentQuestionIndex} of {quizData?.questions_count}
          </h2>
          <div className="flex text-xl font-bold text-white gap-x-2">
            <Clock />
            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
          </div>
          </div>
        )}
        <AnimatePresence mode="wait">
          {!quizStarted && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <QuizStart onStart={startQuiz} quizTitle={quizData.title} quizTopic={quizData.topic} durtion={quizData.duration} totalQuestion={quizData.questions_count} />
            </motion.div>
          )}
          {quizStarted && !quizFinished && (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <QuizQuestion
                question={quizData.questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                userAnswer={userAnswers[currentQuestionIndex]?.answer || null}
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={quizData.questions.length}
                onNextQuestion={goToNextQuestion}
                onPreviousQuestion={goToPreviousQuestion}
                isLastQuestion={currentQuestionIndex === quizData.questions.length - 1}
                onSubmitQuiz={submitQuiz}
              />
              {/* <div className="mt-8">
                <Progress value={((currentQuestionIndex + 1) / quizData.questions.length) * 100} className="h-2" />
              </div> */}
            </motion.div>
          )}
          {quizFinished && !showDetailReview && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <QuizResults
                score={calculateScore()}
                totalQuestions={quizData.questions.length}
                onRestart={startQuiz}
                onShowDetailReview={() => setShowDetailReview(true)}
                duration={quizDuration}
              />
            </motion.div>
          )}
          {showDetailReview && (
            <motion.div
              key="detailReview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <DetailReview
                questions={quizData.questions}
                userAnswers={userAnswers}
                onBack={() => setShowDetailReview(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

