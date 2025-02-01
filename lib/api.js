// // import type { Quiz } from "@/types"

// export async function fetchQuizData() {
//   const response = await fetch('https://api.vercel.app/blog', {
//     mode: "no-cors"
//   });
// //   const response = await fetch("https://api.jsonserve.com/Uw5CrX")
//   console.log(response);
  
//   if (!response.ok) {
//     throw new Error("Failed to fetch quiz data")
//   }
//   return response.json()
// };



// import type { Quiz } from "@/types"

export async function fetchQuizData() {
  const response = await fetch("/api/quiz")
  if (!response.ok) {
    throw new Error("Failed to fetch quiz data")
  }
  return response.json()
}

