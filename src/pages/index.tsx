import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import { getRandomNum } from '@/utils/random.util';
import { catPictures } from '@/utils/catPictures.util';
import { StaticImageData } from 'next/image';
import { sleep } from '@/utils/sleep.util';
import meme from '../images/memes/ligia_meme.jpg';

const tags = [
  '-',
  '*',
  '❤️',
  '&',
] as const;

const sentences = [
  'Dias desde que eu me decidi que era só *-você-*',
  'Dias que eu passei sonhando com *-você-*',
  'Dias que meu ❤️-coração-❤️ esperou pelo seu',
  'Dias imaginando como seria estar com *-você-*',
  'Dias que passei sabendo que não aceitaria ninguém além de *-você-*',
  'Dias trabalhando para ser uma pessoa melhor para *-você-*',
  'Dias que eu levantei da cama e me imaginei acordando &-ao seu lado-&',
];

const compliments = [
  'Deusa',
  'Linda',
  'Maravilhosa',
  'Inteligente',
  'Sensual',
  'Rainha',
  'Princesa',
  'Charmosa',
  'Sonho',
  'Fofa',
  'Engenheira',
  'Gata',
  'A melhor',
  'Vamo se beija',
];

export default function Home() {
  const [data, setData] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showCompliment, setShowCompliment] = useState(false);
  const [complimentCoordinate, setComplimentCoordinate] = useState({ x: 0, y: 0 });
  const [catPicCoordinate, setCatPicCoordinate] = useState({ x: 0, y: 0 });
  const [catPicOpacity, setCatPicOpacity] = useState(0);
  const [catPicCoordinate2, setCatPicCoordinate2] = useState({ x: 0, y: 0 });
  const [catPicOpacity2, setCatPicOpacity2] = useState(0);
  const [showMeme, setShowMeme] = useState(false);
  const [secondsBg, setSecondsBg] = useState(0);
  const [minutesBg, setMinutesBg] = useState(0);
  const [hoursBg, setHoursBg] = useState(0);
  const sentence = useRef('');
  const compliment = useRef('');
  const trigger = useRef('');
  const catPic = useRef<StaticImageData>();
  const catPic2 = useRef<StaticImageData>();

  const getRandom = () => {
    if (!!sentence.current) return
    const lastSentence = localStorage.getItem('sentence');
    let random = getRandomNum(0, sentences.length);
    if (!!lastSentence) {
      while (sentences[random] === lastSentence) {
        random = getRandomNum(0, sentences.length);
      }
    }
    localStorage.setItem('sentence', sentences[random]);
    sentence.current = renderSentence(sentences[random]);
  }

  const updateData = async () => {
    const then = new Date();
    then.setFullYear(2023);
    then.setMonth(1);
    then.setDate(1);
    then.setHours(17, 0, 0);
    const now = new Date();
    let diff = now.getTime() - then.getTime();
    const getSeconds = 1000;
    const getMinutes = getSeconds * 60;
    const getHours = getMinutes * 60;
    const getDays = getHours * 24;
    const days = Math.floor(diff / getDays);
    diff = diff % getDays;
    const hours = Math.floor(diff / getHours);
    diff = diff % getHours;
    const minutes = Math.floor(diff / getMinutes);
    diff = diff % getMinutes;
    const seconds = Math.floor(diff / getSeconds);
    setData({
      days,
      hours,
      minutes,
      seconds,
    })
    setSecondsBg(0);
    setMinutesBg((seconds / 60) * 100);
    setHoursBg((minutes / 60) * 100);
    await sleep(100);
    setSecondsBg(100);
  }

  const getSentenceItem = (tag: typeof tags[number], content: string) => {
    switch(tag) {
      case '-':
        return `<a class='${styles.special}'>${content}</a>`;
      case '*':
        return `<div id='herCompliment' class='${styles.herComplimentContainer}'>${content}</div>`;
      case '❤️':
        return `<div class='${styles.heart}'>${content}</div>`;
      case '&':
        return `<div id='meme' class='${styles.brainMeme}'>${content}</div>`
      default:
        return content;
    }
  }

  const renderSentence = (input: string) => {
    let rawInput = input;
    tags.forEach((tag, index) => {
      const tagRegexp = new RegExp(`\\\\\\${tag}`, 'g');
      rawInput = rawInput.replace(tagRegexp, `:${index}:`);
      const items = rawInput.split(tag);
      if (items.length % 2 === 0) rawInput = rawInput.replace(new RegExp(`:${index}:`, 'g'), tag);
      else {
        const final = items.map((item, index) => {
          if (index % 2 === 0)
            return item.replace(new RegExp(`:${index}:`, 'g'), tag);
          else
            return getSentenceItem(tag, item.replace(new RegExp(`:${index}:`, 'g'), tag));
        });
        rawInput = final.join('');
      }
    })
    return rawInput;
  }

  const onMouseEnter = () => {
    let random = getRandomNum(0, compliments.length);
    while (compliments[random] === compliment.current) {
      random = getRandomNum(0, compliments.length);
    }
    compliment.current = compliments[random];
    const randomX = getRandomNum(0, window.innerWidth - 200);
    const randomY = getRandomNum(0, window.innerHeight - 200);
    setComplimentCoordinate({ x: randomX, y: randomY });
    setShowCompliment(true);
  }

  const onMouseLeave = () => {
    setShowCompliment(false);
  }

  const memeMouseEnter = () => {
    setShowMeme(true);
  }

  const memeMouseLeave = () => {
    setShowMeme(false);
  }

  useEffect(() => {
    const herCompliment = document.getElementById('herCompliment');
    const herMeme = document.getElementById('meme');
    if (!herCompliment && !herMeme) {
      trigger.current = trigger.current + 'a';
    } else {
      herCompliment?.addEventListener('mouseenter', onMouseEnter);
      herCompliment?.addEventListener('mouseleave', onMouseLeave);
      herMeme?.addEventListener('mouseenter', memeMouseEnter);
      herMeme?.addEventListener('mouseleave', memeMouseLeave);
      return () => {
        herCompliment?.removeEventListener('mouseenter', onMouseEnter);
        herCompliment?.removeEventListener('mouseleave', onMouseLeave);
        herMeme?.removeEventListener('mouseenter', memeMouseEnter);
        herMeme?.removeEventListener('mouseleave', memeMouseLeave);
      }
    }
  }, [trigger.current]);

  const catPicturesStarter = async () => {
    let size = 200;
    if (window.outerWidth <= 500) {
      size = 100;
    }

    startCatPics([catPic, catPic2], catPic, setCatPicCoordinate, setCatPicOpacity, size);
    await sleep(6000);
    startCatPics([catPic, catPic2], catPic2, setCatPicCoordinate2, setCatPicOpacity2, size);
  }

  const startCatPics = async (
    catPicArray: MutableRefObject<StaticImageData | undefined>[],
    actualCatPic: MutableRefObject<StaticImageData | undefined>,
    setCoordinate: (value: SetStateAction<{x: number; y: number;}>) => void,
    setOpacity: (value: SetStateAction<number>) => void,
    size: number,
  ) => {
    while (1) {
      let random = getRandomNum(0, catPictures.length);
      while (catPicArray.some(catPicItem => catPicItem.current === catPictures[random])) {
        random = getRandomNum(0, catPictures.length);
      }
      actualCatPic.current = catPictures[random];
      const randomX = getRandomNum(size * 2, window.innerWidth - size * 2);
      const randomY = getRandomNum(size * 2, window.innerHeight - size * 2);
      const randomX2 = getRandomNum(randomX - size, randomX + size);
      const randomY2 = getRandomNum(randomY - size, randomY + size);
      setCoordinate({ x: randomX, y: randomY });
      await sleep(6000);
      setOpacity(1);
      setCoordinate({ x: randomX2, y: randomY2 });
      await sleep(3000);
      setOpacity(0);
      await sleep(3000);
    }
  }

  useEffect(() => {
    updateData();
    getRandom();
    catPicturesStarter();

    const unreg = setInterval(updateData, 1000);

    return () => {
      clearInterval(unreg);
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
        <div className={styles.titleContainer}>
          <div className={styles.title} dangerouslySetInnerHTML={{ __html: sentence.current }} />
          {sentence.current.includes('ao seu lado') && <img src={meme.src} className={styles.brainMemeImg} style={{ opacity: showMeme ? '1' : '0' }} />}
        </div>
        <div style={{ opacity: showCompliment ? '1':  '0', top: complimentCoordinate.y, left: complimentCoordinate.x }} className={styles.herCompliment}>{compliment.current}</div>
        <div className={styles.daysContainer}>
          <a className={styles.daysNumber}>{data.days}</a>
          <a className={styles.days}>{data.days !== 1 ? 'dias' : 'dia' }</a>
        </div>
        <div className={styles.timeWrapper}>
          <div className={styles.timeContainer}>
            <div className={styles.timeNumber}>
              <div className={styles.timeBackground} style={{ width: `${hoursBg}%`, transition: 'width 500ms ease-out' }} />
              <div style={{ position: 'relative' }}>{data.hours.toString().padStart(2, "0")}</div>
            </div>
            <a className={styles.time}>{data.hours !== 1 ? 'horas' : 'hora'}</a>
          </div>
          <div className={styles.timeContainer}>
            <div className={styles.timeNumber}>
              <div className={styles.timeBackground} style={{ width: `${minutesBg}%`, transition: 'width 500ms ease-out' }} />
              <div style={{ position: 'relative' }}>{data.minutes.toString().padStart(2, "0")}</div>
            </div>
            <a className={styles.time}>{data.minutes !== 1 ? 'minutos' : 'minuto'}</a>
          </div>
          <div className={styles.timeContainer}>
            <div className={styles.timeNumber}>
              <div className={styles.timeBackground} style={{ width: `${secondsBg}%`, transition: secondsBg === 100 ? 'width 900ms ease-out' : undefined }} />
              <div style={{ position: 'relative' }}>{data.seconds.toString().padStart(2, "0")}</div>
            </div>
            <a className={styles.time}>{data.seconds !== 1 ? 'segundos' : 'segundo'}</a>
          </div>
        </div>
        <a className={styles.since}>Desde 01/02/2023 17:00:00</a>
        <div className={styles.catPic} style={{ top: catPicCoordinate.y, left: catPicCoordinate.x, opacity: catPicOpacity }}>
          <img className={styles.catPicImg} src={catPic.current?.src} />
        </div>
        <div className={styles.catPic} style={{ top: catPicCoordinate2.y, left: catPicCoordinate2.x, opacity: catPicOpacity2 }}>
          <img className={styles.catPicImg} src={catPic2.current?.src} />
        </div>
      </main>
    </>
  )
}
