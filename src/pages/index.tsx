import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

const tags = [
  '-',
  '*',
] as const;

const sentences = [
  'Dias desde que eu me decidi que era só *-você-*',
  'Dias que eu passei sonhando com *-você-*',
  'Dias que meu -coração- esperou pelo -seu-',
  'Dias imaginando como seria estar com *-você-*',
  'Dias que passei sabendo que não aceitaria ninguém além de *-você-*',
  'Dias trabalhando para ser uma pessoa melhor para *-você-*',
  'Dias que eu levantei da cama e me imaginei acordando -ao seu lado-',
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
];

export default function Home() {
  const [sentence, setSentence] = useState<string>('');
  const [data, setData] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showCompliment, setShowCompliment] = useState(false);
  const [compliment, setCompliment] = useState('');
  const [complimentCoordinate, setComplimentCoordinate] = useState({ x: 0, y: 0 });

  const getRandom = () => {
    const random = Math.floor(Math.random() * sentences.length);
    setSentence(renderSentence(sentences[random]));
  }

  const updateData = () => {
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
  }

  const getSentenceItem = (tag: typeof tags[number], content: string) => {
    switch(tag) {
      case '-':
        return `<a class='${styles.special}'>${content}</a>`;
      case '*':
        return `<div id='herCompliment' class='${styles.herComplimentContainer}'>${content}</div>`;
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
    const random = Math.floor(Math.random() * compliments.length);
    setCompliment(compliments[random]);
    const randomX = Math.floor(Math.random() * (window.innerWidth - 200));
    const randomY = Math.floor(Math.random() * (window.innerHeight - 200));
    setComplimentCoordinate({ x: randomX, y: randomY });
    setShowCompliment(true);
  }

  const onMouseLeave = () => {
    setShowCompliment(false);
  }

  useEffect(() => {
    const herCompliment = document.getElementById('herCompliment');
    herCompliment?.addEventListener('mouseenter', onMouseEnter);
    herCompliment?.addEventListener('mouseleave', onMouseLeave);

    return () => {
      herCompliment?.removeEventListener('mouseenter', onMouseEnter);
      herCompliment?.removeEventListener('mouseleave', onMouseLeave);
    }
  }, [sentence]);

  useEffect(() => {
    updateData();
    getRandom();

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
        <div className={styles.title} dangerouslySetInnerHTML={{ __html: sentence }}>
        </div>
        <div style={{ opacity: showCompliment ? '1':  '0', top: complimentCoordinate.y, left: complimentCoordinate.x }} className={styles.herCompliment}>{compliment}</div>
        <div className={styles.daysContainer}>
          <a className={styles.daysNumber}>{data.days}</a>
          <a className={styles.days}>{data.days !== 1 ? 'dias' : 'dia' }</a>
        </div>
        <div className={styles.timeWrapper}>
          <div className={styles.timeContainer}>
            <a className={styles.timeNumber}>{data.hours.toString().padStart(2, "0")}</a>
            <a className={styles.time}>{data.hours !== 1 ? 'horas' : 'hora'}</a>
          </div>
          <div className={styles.timeContainer}>
            <a className={styles.timeNumber}>{data.minutes.toString().padStart(2, "0")}</a>
            <a className={styles.time}>{data.minutes !== 1 ? 'minutos' : 'minuto'}</a>
          </div>
          <div className={styles.timeContainer}>
            <a className={styles.timeNumber}>{data.seconds.toString().padStart(2, "0")}</a>
            <a className={styles.time}>{data.seconds !== 1 ? 'segundos' : 'segundo'}</a>
          </div>
        </div>
        <a className={styles.since}>Desde 01/02/2023 17:00:00</a>
      </main>
    </>
  )
}
