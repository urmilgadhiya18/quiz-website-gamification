export async function fetchQuizData() {
  const response = await fetch("/api/quiz")
  if (!response.ok) {
    throw new Error("Failed to fetch quiz data")
  }
  return response.json()
}

