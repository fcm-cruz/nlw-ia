import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value
  // console.log("URL do video", videoURL)

  if (!videoURL.includes("shorts")) {
    // console.log("Esse video não parece ser um shorts.")
    return (content.textContent = "Esse video não parece ser um shorts.")
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")
  // console.log(videoID)

  content.textContent = "Obtendo o texto do audio"

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})

// https://wwyoutube.com/shorts/s4UBtoDVS14?si=jkkkhhas
// https://wwyoutube.com/shorts/TFGAMLL68CA