import Head from "next/head"
import styles from "@/styles/Home.module.css"
import {
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"
import {getRandomNum} from "@/utils/random.util"
import {catPictures} from "@/utils/catPictures.util"
import {StaticImageData} from "next/image"
import {sleep} from "@/utils/sleep.util"
import meme from "../images/memes/ligia_meme.jpg"
import eyeIcon from "../images/icons/eye.png"

const tags = [
  "-",
  "*",
  "❤️",
  "&",
  "l1",
  "l2",
  "l3",
  "l4",
  "l5",
  "l6",
  "l7",
] as const

const fullILoveYouSentence: string =
  "Euteamooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooovocêéumadeusaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaminhaprincesamaravilhosaaaaaaaaaaaaaaaaaaaaaaaaaaavamosebeijaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️"
const treasureLyrics: {
  delay: number
  lyrics: string
  stack?: boolean
  stagger?: boolean
}[] = [
  {
    delay: 0,
    lyrics: "treasure",
  },
  {
    delay: 2000,
    lyrics: "that",
  },
  {
    delay: 500,
    lyrics: " is",
    stack: true,
  },
  {
    delay: 600,
    lyrics: " what",
    stack: true,
  },
  {
    delay: 500,
    lyrics: " you",
    stack: true,
  },
  {
    delay: 400,
    lyrics: " are",
    stack: true,
  },
  {
    delay: 1700,
    lyrics: "honey",
  },
  {
    delay: 400,
    lyrics: ` you're`,
    stack: true,
  },
  {
    delay: 600,
    lyrics: " my",
    stack: true,
  },
  {
    delay: 500,
    lyrics: " golden",
    stack: true,
  },
  {
    delay: 800,
    lyrics: " star",
    stack: true,
  },
  {
    delay: 1700,
    lyrics: "You",
  },
  {
    delay: 100,
    lyrics: " know",
    stack: true,
  },
  {
    delay: 100,
    lyrics: " you",
    stack: true,
  },
  {
    delay: 100,
    lyrics: " can",
    stack: true,
  },
  {
    delay: 300,
    lyrics: " make",
    stack: true,
  },
  {
    delay: 500,
    lyrics: " my",
    stack: true,
  },
  {
    delay: 500,
    lyrics: " wish",
    stack: true,
  },
  {
    delay: 500,
    lyrics: " come",
    stack: true,
  },
  {
    delay: 400,
    lyrics: " true",
    stack: true,
  },
  {
    delay: 1700,
    lyrics: "If",
  },
  {
    delay: 300,
    lyrics: " you",
    stack: true,
  },
  {
    delay: 100,
    lyrics: " let",
    stack: true,
  },
  {
    delay: 700,
    lyrics: " me",
    stack: true,
  },
  {
    delay: 300,
    lyrics: " treasure",
    stack: true,
  },
  {
    delay: 900,
    lyrics: " you",
    stack: true,
  },
  {
    delay: 1600,
    lyrics: "If",
  },
  {
    delay: 200,
    lyrics: " you",
    stack: true,
  },
  {
    delay: 400,
    lyrics: " let",
    stack: true,
  },
  {
    delay: 500,
    lyrics: " me",
    stack: true,
  },
  {
    delay: 400,
    lyrics: " treasure",
    stack: true,
  },
  {
    delay: 1100,
    lyrics: " you",
    stack: true,
  },
  {
    delay: 800,
    lyrics: "Oh",
  },
  {
    delay: 700,
    lyrics:
      "Oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooohhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    stagger: true,
  },
]

const rainText: string = "❤️"
const rainParticleCount: number = 50

const sentences: string[] = [
  "Dias desde que eu me decidi que era só *-você-*",
  "Dias que eu passei sonhando com *-você-*",
  "Dias que meu ❤️-coração-❤️ esperou pelo seu",
  "Dias imaginando como seria estar com *-você-*",
  "Dias que passei sabendo que não aceitaria ninguém além de *-você-*",
  "Dil5al5s l3tl3rabalhandl7ol7 para sl1el1r l2ul2ma pl4el4ssoa l6ml6elhor para *-você-*",
  "Dias que eu levantei da cama e me imaginei acordando &-ao seu lado-&",
]

const compliments: string[] = [
  "Deusa",
  "Linda",
  "Maravilhosa",
  "Inteligente",
  "Sensual",
  "Rainha",
  "Princesa",
  "Charmosa",
  "Sonho",
  "Fofa",
  "Engenheira",
  "Gata",
  "A melhor",
  "Vamo se beija",
]

export default function Home() {
  const [data, setData] = useState({days: 0, hours: 0, minutes: 0, seconds: 0})
  const [showCompliment, setShowCompliment] = useState(false)
  const [complimentCoordinate, setComplimentCoordinate] = useState({x: 0, y: 0})
  const [catPicCoordinate, setCatPicCoordinate] = useState({x: 0, y: 0})
  const [catPicOpacity, setCatPicOpacity] = useState(0)
  const [catPicCoordinate2, setCatPicCoordinate2] = useState({x: 0, y: 0})
  const [catPicOpacity2, setCatPicOpacity2] = useState(0)
  const [showMeme, setShowMeme] = useState(false)
  const [secondsBg, setSecondsBg] = useState(0)
  const [minutesBg, setMinutesBg] = useState(0)
  const [hoursBg, setHoursBg] = useState(0)
  const [showTimeAnimation, setShowTimeAnimation] = useState(true)
  const [_iLoveYouSentence, setILoveYouSentence] = useState("")
  const [iLoveYouSentenceFontSize, setILoveYouSentenceFontSize] = useState(30)
  const [iLoveYouSentenceBottom, setILoveYouSentenceBottom] = useState("20px")
  const [rainParticles, setRainParticles] = useState<ReactNode[]>([])
  const ongoingRain = useRef(false)
  const sentence = useRef("")
  const compliment = useRef("")
  const trigger = useRef("")
  const rainTrigger = useRef("")
  const iLoveYouSentence = useRef("")
  const imageUpdaterId = useRef([0, 1])
  const stopWriting = useRef(false)
  const catPic = useRef<StaticImageData>()
  const catPic2 = useRef<StaticImageData>()

  const getRandom = (): number => {
    if (!!sentence.current) return -1
    const lastSentence = localStorage.getItem("sentence")
    let random = getRandomNum(0, sentences.length)
    if (!!lastSentence) {
      while (sentences[random] === lastSentence) {
        random = getRandomNum(0, sentences.length)
      }
    }
    localStorage.setItem("sentence", sentences[random])
    sentence.current = renderSentence(sentences[random])
    return random
  }

  const updateData = async () => {
    const then = new Date()
    then.setFullYear(2023)
    then.setMonth(1)
    then.setDate(1)
    then.setHours(17, 0, 0)
    const now = new Date()
    let diff = now.getTime() - then.getTime()
    const getSeconds = 1000
    const getMinutes = getSeconds * 60
    const getHours = getMinutes * 60
    const getDays = getHours * 24
    const days = Math.floor(diff / getDays)
    diff = diff % getDays
    const hours = Math.floor(diff / getHours)
    diff = diff % getHours
    const minutes = Math.floor(diff / getMinutes)
    diff = diff % getMinutes
    const seconds = Math.floor(diff / getSeconds)
    setData({
      days,
      hours,
      minutes,
      seconds,
    })
    setSecondsBg(0)
    setMinutesBg((seconds / 60) * 100)
    setHoursBg((minutes / 60) * 100)
    await sleep(100)
    setSecondsBg(100)
  }

  const getSentenceItem = (tag: typeof tags[number], content: string) => {
    switch (tag) {
      case "-":
        return `<a class='${styles.special}'>${content}</a>`
      case "*":
        return `<div id='herCompliment' class='${styles.herComplimentContainer}'>${content}</div>`
      case "❤️":
        return `<div class='${styles.heart}'>${content}</div>`
      case "&":
        return `<div id='meme' class='${styles.brainMeme}'>${content}</div>`
      case "l1":
        return `<div id='iloveyou1' class='${styles.iLoveYou}'>${content}</div>`
      case "l2":
        return `<div id='iloveyou2' class='${styles.iLoveYou}'>${content}</div>`
      case "l3":
        return `<div id='iloveyou3' class='${styles.iLoveYou}'>${content}</div>`
      case "l4":
        return `<div id='iloveyou4' class='${styles.iLoveYou}'>${content}</div>`
      case "l5":
        return `<div id='iloveyou5' class='${styles.iLoveYou}'>${content}</div>`
      case "l6":
        return `<div id='iloveyou6' class='${styles.iLoveYou}'>${content}</div>`
      case "l7":
        return `<div id='iloveyou7' class='${styles.iLoveYou}'>${content}</div>`
      default:
        return content
    }
  }

  const renderSentence = (input: string) => {
    let rawInput = input
    tags.forEach((tag, index) => {
      const tagRegexp = new RegExp(`\\\\\\${tag}`, "g")
      rawInput = rawInput.replace(tagRegexp, `:${index}:`)
      const items = rawInput.split(tag)
      if (items.length % 2 === 0)
        rawInput = rawInput.replace(new RegExp(`:${index}:`, "g"), tag)
      else {
        const final = items.map((item, index) => {
          if (index % 2 === 0)
            return item.replace(new RegExp(`:${index}:`, "g"), tag)
          else
            return getSentenceItem(
              tag,
              item.replace(new RegExp(`:${index}:`, "g"), tag)
            )
        })
        rawInput = final.join("")
      }
    })
    return rawInput
  }

  const onMouseEnter = () => {
    let random = getRandomNum(0, compliments.length)
    while (compliments[random] === compliment.current) {
      random = getRandomNum(0, compliments.length)
    }
    compliment.current = compliments[random]
    const randomX = getRandomNum(0, window.innerWidth - 200)
    const randomY = getRandomNum(0, window.innerHeight - 200)
    setComplimentCoordinate({x: randomX, y: randomY})
    setShowCompliment(true)
  }

  const onMouseLeave = () => {
    setShowCompliment(false)
  }

  const memeMouseEnter = () => {
    setShowMeme(true)
  }

  const memeMouseLeave = () => {
    setShowMeme(false)
  }

  const updateILoveYouSentence = async (index: number) => {
    if (index != iLoveYouSentence.current.length) return
    const letter = document.getElementById(`iloveyou${index + 1}`)
    const nextLetter = document.getElementById(`iloveyou${index + 2}`)
    setILoveYouSentence(
      (iLoveYouSentence.current + letter?.textContent).replace(/^e/, "E")
    )
    iLoveYouSentence.current += letter?.textContent
    if (nextLetter) {
      nextLetter.style.cursor = "pointer"
    }
    if (letter) {
      letter.style.cursor = "text"
      letter.style.color = "red"
    }
    if (index === 6) {
      setILoveYouSentenceBottom("40px")
      ongoingRain.current = true
      renderRain()
      const audio = document.getElementById("treasure") as HTMLAudioElement
      audio.play()
      startILoveYouInfiniteSentence()
      const sleepPromise = sleep(7000)
      await sleep(500)
      let currFontSize = 30
      while (currFontSize < 100) {
        currFontSize += 0.5
        setILoveYouSentenceFontSize(currFontSize)
        await sleep(20)
      }
      await Promise.all([sleepPromise])
      stopWriting.current = true
      setILoveYouSentenceBottom("50%")
      let lyrics = ""
      let curr, i, o
      for (i = 0; i < treasureLyrics.length; i++) {
        if (i == treasureLyrics.length - 1) {
          setILoveYouSentenceBottom("100px")
        }
        curr = treasureLyrics[i]
        await sleep(curr.delay)
        if (!curr.stack) {
          lyrics = ""
        }
        if (curr.stagger) {
          for (o = 0; o < curr.lyrics.length; o++) {
            lyrics += curr.lyrics[o]
            setILoveYouSentence(lyrics)
            await sleep(10)
          }
        } else {
          lyrics += curr.lyrics
          setILoveYouSentence(lyrics)
        }
      }
      iLoveYouSentence.current = ""
      for (i = 0; i <= index; i++) {
        curr = document.getElementById(`iloveyou${i + 1}`) as HTMLElement
        if (i !== 0) curr.style.cursor = "text"
        else curr.style.cursor = "pointer"
        curr.style.color = "black"
      }
      stopWriting.current = false
      ongoingRain.current = false
      setILoveYouSentence("")
      setILoveYouSentenceBottom("20px")
      setILoveYouSentenceFontSize(30)
    }
  }

  const startILoveYouInfiniteSentence = async (): Promise<boolean> => {
    return new Promise<boolean>(async (res) => {
      let currSentence = "Euteamo"
      while (
        currSentence.length < fullILoveYouSentence.length &&
        !stopWriting.current
      ) {
        currSentence += fullILoveYouSentence[currSentence.length]
        setILoveYouSentence(currSentence)
        await sleep(15)
      }
      res(true)
    })
  }

  const renderRain = async () => {
    const rainParticlesRefs: HTMLElement[] = []
    let i: number, particle
    for (i = 0; i < rainParticleCount; i++) {
      particle = document.getElementById(`rainParticle${i}`)
      if (particle === null) {
        rainTrigger.current += "a"
        return
      }
      rainParticlesRefs.push(particle)
      particle.style.top = "-50px"
      particle.style.visibility = "visible"
    }

    let randomLeft, randomDelay
    while (ongoingRain.current) {
      for (i = 0; i < rainParticlesRefs.length; i++) {
        if (!ongoingRain.current) return;
        const curr = rainParticlesRefs[i];
        if (
          curr.offsetTop < window.innerHeight &&
          curr.offsetTop > 0
        ) {
          await sleep(100)
          continue
        }
        randomDelay = getRandomNum(0, 200)
        await sleep(randomDelay)
        randomLeft = getRandomNum(0, window.innerWidth)
        curr.style.left = `${randomLeft}px`
        curr.style.transition = "top 4000ms linear"
        curr.style.top = `${window.innerHeight}px`
        setTimeout(() => {
          curr.style.transition = "none"
          curr.style.top = "-50px"
        }, 4000)
      }
    }
  }

  useEffect(() => {
    const herCompliment = document.getElementById("herCompliment")
    const herMeme = document.getElementById("meme")
    const loveSentence: (HTMLElement | null)[] = []
    for (let i = 1; i <= 7; i++) {
      loveSentence.push(document.getElementById(`iloveyou${i}`))
    }

    const checkArr = [herCompliment, herMeme, ...loveSentence]
    if (checkArr.every((item) => item === null)) {
      trigger.current = trigger.current + "a"
    } else {
      herCompliment?.addEventListener("mouseenter", onMouseEnter)
      herCompliment?.addEventListener("mouseleave", onMouseLeave)
      herMeme?.addEventListener("mouseenter", memeMouseEnter)
      herMeme?.addEventListener("mouseleave", memeMouseLeave)
      loveSentence.forEach((loveLetter, index) => {
        loveLetter?.addEventListener("click", () =>
          updateILoveYouSentence(index)
        )
        if (index === 0 && loveLetter) loveLetter.style.cursor = "pointer"
      })

      return () => {
        herCompliment?.removeEventListener("mouseenter", onMouseEnter)
        herCompliment?.removeEventListener("mouseleave", onMouseLeave)
        herMeme?.removeEventListener("mouseenter", memeMouseEnter)
        herMeme?.removeEventListener("mouseleave", memeMouseLeave)

        loveSentence.forEach((loveLetter, index) => {
          loveLetter?.removeEventListener("click", () =>
            updateILoveYouSentence(index)
          )
        })
      }
    }
  }, [trigger.current])

  const catPicturesStarter = async () => {
    let size = 200
    if (window.outerWidth <= 500) {
      size = 100
    }
    const id1 = Math.random() * 1000
    const id2 = Math.random() * 1000
    imageUpdaterId.current = [id1, id2]

    startCatPics(
      [catPic, catPic2],
      catPic,
      setCatPicCoordinate,
      setCatPicOpacity,
      size,
      id1
    )
    await sleep(6000)
    startCatPics(
      [catPic, catPic2],
      catPic2,
      setCatPicCoordinate2,
      setCatPicOpacity2,
      size,
      id2
    )
  }

  const startCatPics = async (
    catPicArray: MutableRefObject<StaticImageData | undefined>[],
    actualCatPic: MutableRefObject<StaticImageData | undefined>,
    setCoordinate: (value: SetStateAction<{x: number; y: number}>) => void,
    setOpacity: (value: SetStateAction<number>) => void,
    size: number,
    id: number
  ) => {
    while (1 && imageUpdaterId.current.includes(id)) {
      let random = getRandomNum(0, catPictures.length)
      while (
        catPicArray.some(
          (catPicItem) => catPicItem.current === catPictures[random]
        )
      ) {
        random = getRandomNum(0, catPictures.length)
      }
      actualCatPic.current = catPictures[random]
      const randomX = getRandomNum(size * 2, window.innerWidth - size * 2)
      const randomY = getRandomNum(size * 2, window.innerHeight - size * 2)
      const randomX2 = getRandomNum(randomX - size, randomX + size)
      const randomY2 = getRandomNum(randomY - size, randomY + size)
      setCoordinate({x: randomX, y: randomY})
      await sleep(6000)
      setOpacity(1)
      setCoordinate({x: randomX2, y: randomY2})
      await sleep(3000)
      setOpacity(0)
      await sleep(3000)
    }
  }

  const toggleShowTimeAnimation = () => {
    localStorage.setItem(
      "showTimeAnimation",
      showTimeAnimation ? "false" : "true"
    )
    setShowTimeAnimation(!showTimeAnimation)
  }

  const renderRainParticles = () => {
    const newRainParticles: ReactNode[] = []
    for (let i = 0; i < rainParticleCount; i++) {
      newRainParticles.push(
        <div className={styles.rainParticle} id={`rainParticle${i}`} key={i}>
          {rainText}
        </div>
      )
    }
    setRainParticles(newRainParticles)
  }

  useEffect(() => {
    updateData()
    const random = getRandom()
    catPicturesStarter()
    if (random === 5) renderRainParticles()

    const showAnimation = localStorage.getItem("showTimeAnimation")
    if (showAnimation === null)
      localStorage.setItem("showTimeAnimation", "true")
    else {
      const newShowAnimation = showAnimation === "true"
      setShowTimeAnimation(newShowAnimation)
    }

    const unreg = setInterval(updateData, 1000)

    return () => {
      clearInterval(unreg)
    }
  }, [])

  return (
    <>
      <Head>
        <title>_</title>
        <meta name="description" content="❤️❤️❤️" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/heart.ico" />
      </Head>
      <main className={styles.main}>
        <audio id="treasure" src="/treasure.mp3" />
        <div className={styles.titleContainer}>
          <div
            className={styles.title}
            dangerouslySetInnerHTML={{__html: sentence.current}}
          />
          {sentence.current.includes("ao seu lado") && (
            <img
              src={meme.src}
              className={styles.brainMemeImg}
              style={{opacity: showMeme ? "1" : "0"}}
            />
          )}
        </div>
        <div
          style={{
            opacity: showCompliment ? "1" : "0",
            top: complimentCoordinate.y,
            left: complimentCoordinate.x,
          }}
          className={styles.herCompliment}
        >
          {compliment.current}
        </div>
        <div className={styles.daysContainer}>
          <a className={styles.daysNumber}>{data.days}</a>
          <a className={styles.days}>{data.days !== 1 ? "dias" : "dia"}</a>
        </div>
        <div className={styles.timeWrapper}>
          <div className={styles.timeContainer}>
            <div className={styles.timeNumber}>
              <div
                className={styles.timeBackground}
                style={{
                  width: `${showTimeAnimation ? hoursBg : 0}%`,
                  transition: "width 500ms ease-out",
                }}
              />
              <div style={{position: "relative"}}>
                {data.hours.toString().padStart(2, "0")}
              </div>
            </div>
            <a className={styles.time}>{data.hours !== 1 ? "horas" : "hora"}</a>
          </div>
          <div className={styles.timeContainer}>
            <div className={styles.timeNumber}>
              <div
                className={styles.timeBackground}
                style={{
                  width: `${showTimeAnimation ? minutesBg : 0}%`,
                  transition: "width 500ms ease-out",
                }}
              />
              <div style={{position: "relative"}}>
                {data.minutes.toString().padStart(2, "0")}
              </div>
            </div>
            <a className={styles.time}>
              {data.minutes !== 1 ? "minutos" : "minuto"}
            </a>
          </div>
          <div className={styles.timeContainer}>
            <div className={styles.timeNumber}>
              <div
                className={styles.timeBackground}
                style={{
                  width: `${showTimeAnimation ? secondsBg : 0}%`,
                  transition:
                    secondsBg === 100 ? "width 900ms ease-out" : undefined,
                }}
              />
              <div style={{position: "relative"}}>
                {data.seconds.toString().padStart(2, "0")}
              </div>
            </div>
            <a className={styles.time}>
              {data.seconds !== 1 ? "segundos" : "segundo"}
            </a>
          </div>
          <div
            className={styles.eyeIconContainer}
            onClick={toggleShowTimeAnimation}
          >
            <img
              src={eyeIcon.src}
              className={styles.eyeIcon}
              style={{
                filter: showTimeAnimation ? "contrast(100%)" : "contrast(0%)",
              }}
            />
          </div>
        </div>
        <a className={styles.since}>Desde 01/02/2023 17:00:00</a>
        <div
          className={styles.catPic}
          style={{
            top: catPicCoordinate.y,
            left: catPicCoordinate.x,
            opacity: catPicOpacity,
          }}
        >
          <img className={styles.catPicImg} src={catPic.current?.src} />
        </div>
        <div
          className={styles.catPic}
          style={{
            top: catPicCoordinate2.y,
            left: catPicCoordinate2.x,
            opacity: catPicOpacity2,
          }}
        >
          <img className={styles.catPicImg} src={catPic2.current?.src} />
        </div>
        {_iLoveYouSentence.length > 0 && (
          <div
            className={styles.iLoveYouContainer}
            style={{
              bottom: iLoveYouSentenceBottom,
              fontSize: iLoveYouSentenceFontSize,
            }}
          >
            {_iLoveYouSentence}
          </div>
        )}
        <div className={styles.rainContainer}>{rainParticles}</div>
      </main>
    </>
  )
}
