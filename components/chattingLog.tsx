import { messageType } from "@/app/page"
import Image from "next/image"
import userIcon from '@/public/user-line-3.svg'
import botIcon from "@/public/bot-1.svg"
import { Dispatch, useEffect, useState } from "react"
import { Statement } from "typescript"

const ChattingLog = ({ log, setLog, message }: {log: messageType[], setLog: Dispatch<React.SetStateAction<messageType[]>>, message: messageType[] }) => {
  // const [log, setLog] = useState([message[0]])
  const [number, setNumber] = useState(1)
  useEffect(() => {
    let interval: any
    interval = setInterval(() => {
      if (number < message.length) {
        setLog(prev => [...prev, message[number]])
        setNumber(prev => prev + 1)
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [number])
  return (
    <div className="flex flex-col gap-5 py-5 px-3">
      {log.map((item, i) => (
        <div key={item.description + i} className="flex flex-row gap-2 w-full">
          <div className="flex justify-center items-center rounded-full bg-white w-10 h-10">
            <Image src={item.speaker == 'bot' ? botIcon : userIcon} alt="userIcon" width={24} height={24} />
          </div>
          <h1 className="bg-white w-full shadow-lg rounded-lg p-2">{item.description}</h1>
        </div>
      ))}
    </div>
  )
}

export default ChattingLog