"use client"

import { ChevronIcon, MenuIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { useEffect, useRef, useState } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Textarea } from "@nextui-org/input";
import ChattingLog from "@/components/chattingLog";
import { Progress } from "@nextui-org/progress";

const initialMessage = [
	{
		speaker: 'human',
		description: 'who are you'
	},
	{
		speaker: 'bot',
		description: 'I am a bot. how can I help you?'
	},
	{
		speaker: 'human',
		description: 'who are you'
	},
	{
		speaker: 'bot',
		description: 'I am a bot. how can I help you?'
	},
	{
		speaker: 'human',
		description: 'who are you'
	},
	{
		speaker: 'bot',
		description: 'I am a bot. how can I help you?'
	},
	{
		speaker: 'human',
		description: 'who are you'
	},
	{
		speaker: 'bot',
		description: 'I am a bot. how can I help you?'
	},
	{
		speaker: 'human',
		description: 'who are you'
	},
	{
		speaker: 'bot',
		description: 'I am a bot. how can I help you?'
	},
	{
		speaker: 'human',
		description: 'who are you'
	},
	{
		speaker: 'bot',
		description: 'I am a bot. how can I help you?'
	},
	{
		speaker: 'human',
		description: 'who are you'
	},
	{
		speaker: 'bot',
		description: 'I am a bot. how can I help you?'
	},
	{
		speaker: 'human',
		description: 'who are you'
	},
	{
		speaker: 'bot',
		description: 'I am a bot. how can I help you?'
	},
	{
		speaker: 'human',
		description: 'who are you'
	},
	{
		speaker: 'bot',
		description: 'I am a bot. how can I help you?'
	},
	{
		speaker: 'human',
		description: 'who are you'
	},
	{
		speaker: 'bot',
		description: 'I am a bot. how can I help you?'
	},
	{
		speaker: 'human',
		description: 'who are you'
	},
	{
		speaker: 'bot',
		description: 'I am a bot. how can I help you?'
	},
]

export interface messageType {
	speaker: string,
	description: string
}

const Prompts = [
	{ title: 'Music Career Advice', prompt: ['How can I start my music career?', 'How often should I release new music?', 'How can I use social media to promote my music?'] },
	{ title: 'Release Strategy', prompt: ['What skills should a musician develop apart from playing instruments?', 'What is the importance of a pre-release campaign?', 'What are some effective online advertising strategies for musicians?'] },
	{ title: 'Digital Marketing', prompt: ['How do I protect my music rights?', 'How do I choose a distribution platform?', 'How do I optimize my website for music promotion?'] },
	{ title: 'Industry Networking', prompt: ['How can I connect with other artists in my genre?', 'What strategies can help in building a fan base?', 'How can I get my music featured on playlists?'] },
	{ title: 'Fanbase Building', prompt: ['What are the beneﬁts of attending music conferences?', 'How can I engage fans on social media?', 'What is the role of a music publicist?'] },
	{ title: 'Music and Entertainment Matters', prompt: ['How do I approach music labels for collaboration?', 'What are the beneﬁts of having a fan club or community?', 'How do I monetize my music through live shows?'] },
	{ title: 'Release Strategy', prompt: ['Q: How do I create a buzz before releasing a single?', 'Q: How do I use SEO to enhance my online presence?', 'Q: How can I get radio airplay for my songs?'] },
	{ title: 'Digital Marketing', prompt: ['Q: What should I include in my EPK (Electronic Press Kit)?', 'Q: What is the role of email marketing in music promotion?', 'Q: How can I ﬁnd a mentor in the music industry?'] },
	{ title: 'Industry Networking', prompt: ['Q: How to choose a release date for my album?', 'Q: How can I use YouTube effectively for music promotion?', 'Q: What are some strategies for successful collaboration with other artists?'] },

]

export interface promptType {
	title: string,
	prompt: string[]
}

export default function Home() {
	const [showPrompts, setShowPrompts] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [message, setMessage] = useState(initialMessage as messageType[])
	const [newMessage, setNewMessage] = useState('')
	const [promptPageNum, setPageNum] = useState(1)
	const sendBtnRef = useRef<HTMLButtonElement | null>(null)
	const sendBtnRef2 = useRef<HTMLButtonElement | null>(null)
	const inputRef = useRef<HTMLTextAreaElement | null>(null)
	const chatContainerRef = useRef<HTMLTextAreaElement | null>(null)
  const [log, setLog] = useState([message[0]])

	const handle = () => {
		setShowModal(prev => !prev)
		setShowPrompts(prev => !prev)
	}
	const handleKey = (e: any) => {

		if (e.keyCode == 13) {
			e.preventDefault()
			sendBtnRef && sendBtnRef.current && sendBtnRef.current.click()
			inputRef && inputRef.current && inputRef.current.focus()
		}
	}
	const handleSubmit = () => {
		if (newMessage.trim() != '') {
			setMessage(prev => [...prev, {
				speaker: 'human',
				description: newMessage
			}])
			setNewMessage('')
		}
	}
	const handlePrevious = () => {
		if (promptPageNum <= 1) {
			setPageNum(Prompts.length / 3)
		} else setPageNum(promptPageNum - 1)
	}
	const handleNext = () => {
		if (promptPageNum >= Prompts.length / 3) {
			setPageNum(1)
		} else setPageNum(promptPageNum + 1)
	}
	const handlePrompt = (prompt: string) => {
		setMessage(prev => [...prev, {
			speaker: 'human',
			description: prompt
		}])
		inputRef && inputRef.current && inputRef.current.focus()
	}
	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [message, log]);
	return (
		<section className="flex flex-row items-center justify-between w-full h-screen">
			<div className={`flex flex-row w-80 duration-700 bg-green-300 items-center justify-center h-full`}>sidebar</div>
			<div className="relative flex flex-grow justify-center items-center pt-20 pb-10 lg:ml-0 -ml-80 w-full h-full duration-700 ease-in-out flex-col bg-white">
				<Button
					ref={sendBtnRef2}
					isIconOnly
					className={`absolute w-10 h-10 bg-transparent top-5 left-5 lg:opacity-0 lg:pointer-events-none`}
					onClick={() => console.log('hello')}
					startContent={
						<MenuIcon />
					}
				/>
				<ScrollShadow ref={chatContainerRef} hideScrollBar className="h-full max-w-5xl w-full px-16" size={15}>
					<div className="w-full">
						<div className="flex flex-row gap-1 items-center justify-center">
							<h1>prompts</h1>
							<ChevronIcon className={`${showPrompts ? `rotate-90` : `-rotate-90`} cursor-pointer`} onClick={handle} />
							{promptPageNum}
						</div>
						<div className={`${showPrompts ? `flex` : `hidden`} relative duration-700 transition-all flex-row items-center p-3 gap-2 bg-white w-full`}>
							<Button isIconOnly onClick={handlePrevious} className="absolute left-0 -translate-x-[120%]">{"<"}</Button>
							<div className="w-full flex flex-col gap-5">
								<div className="w-full grid grid-cols-3 gap-5 gap-y-7">
									{Prompts.slice((promptPageNum - 1) * 3, promptPageNum * 3).map((item, i) => (
										<div key={item.title + i} className="flex flex-col gap-7">
											<div className="text-center text-lg font-medium">{item.title}</div>
											{item.prompt.map((prompt, i) => (
												<div onClick={() => handlePrompt(prompt)} key={prompt + i} className="bg-white w-full min-h-20 h-full shadow-lg rounded-lg px-2 py-4 whitespace-wrap cursor-pointer">
													<span className="line-clamp-2">{'Q: ' + prompt}</span>
												</div>
											))}
										</div>
									))}
								</div>
								<Progress size="sm" aria-label="Loading..." value={promptPageNum * 100 / (Prompts.length / 3)} />
							</div>
							<Button isIconOnly onClick={handleNext} className="absolute right-0 translate-x-[120%]">{">"}</Button>
						</div>
						<ChattingLog log={log} setLog={setLog} message={message} />
					</div>
				</ScrollShadow>
				<div className="max-w-5xl px-20 py-3 w-full h-auto flex gap-2">
					<Textarea
						ref={inputRef}
						variant={"bordered"}
						// label="Description"
						labelPlacement="outside"
						minRows={1}
						radius="full"
						placeholder="Enter your description"
						className="col-span-12 md:col-span-6 mb-6 md:mb-0"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						onKeyDown={handleKey}
					/>
					<Button ref={sendBtnRef} radius="full" color="primary" onClick={handleSubmit}>Send</Button>
				</div>
			</div>

			{/* <div className="flex gap-3">
				<Link
					isExternal
					href={siteConfig.links.docs}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Documentation
				</Link>
				<Link
					isExternal
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div> */}

			{/* <div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						Get started by editing <Code color="primary">app/page.tsx</Code>
					</span>
				</Snippet>
			</div> */}
		</section>
	);
}
