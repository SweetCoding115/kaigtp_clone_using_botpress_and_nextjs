"use client"

import { ChevronIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { useEffect, useRef, useState } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Textarea } from "@nextui-org/input";
import ChattingLog from "@/components/chattingLog";
import { KeyboardEvents } from "@react-types/shared";

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

export default function Home() {
	const [showPrompts, setShowPrompts] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [message, setMessage] = useState(initialMessage as messageType[])
	const [newMessage, setNewMessage] = useState('')
	const sendBtnRef = useRef<HTMLButtonElement | null>(null)
	const inputRef = useRef<HTMLTextAreaElement | null>(null)
	const chatContainerRef = useRef<HTMLTextAreaElement | null>(null)
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
			console.log(newMessage)
		}
	}
	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [message]);
	return (
		<section className="flex flex-row items-center justify-between w-full h-screen">
			<div className={`flex flex-row w-80 duration-700 bg-green-300 items-center justify-center h-full`}>sidebar</div>
			<div className="flex flex-grow justify-center items-center pt-20 pb-10 lg:ml-0 -ml-80 w-full h-full duration-700 ease-in-out flex-col">
				<ScrollShadow ref={chatContainerRef} hideScrollBar className="h-full max-w-5xl w-full px-16" size={15}>
					<div className="w-full">
						<div className="flex flex-row gap-1 items-center justify-center">
							<h1>prompts</h1>
							<ChevronIcon className={`${showPrompts ? `rotate-90` : `-rotate-90`} cursor-pointer`} onClick={handle} />
						</div>
						<div className={`${showPrompts ? `flex` : `hidden`} relative duration-700 transition-all flex-row items-center p-3 gap-2 bg-white w-full`}>
							<Button isIconOnly className="absolute left-0 -translate-x-[120%]">{"<"}</Button>
							<div className="w-full grid grid-cols-3 gap-5 gap-y-7">
								<div className="flex flex-col gap-7">
									<div className="text-center">heading</div>
									<div className="bg-white w-full h-20 shadow-lg rounded-lg">hello</div>
									<div className="bg-white w-full h-20 shadow-lg rounded-lg">hello</div>
									<div className="bg-white w-full h-20 shadow-lg rounded-lg">hello</div>
								</div>
								<div className="flex flex-col gap-7">
									<div className="text-center">heading</div>
									<div className="bg-white w-full h-20 shadow-lg rounded-lg">hello</div>
									<div className="bg-white w-full h-20 shadow-lg rounded-lg">hello</div>
									<div className="bg-white w-full h-20 shadow-lg rounded-lg">hello</div>
								</div>
								<div className="flex flex-col gap-7">
									<div className="text-center">heading</div>
									<div className="bg-white w-full h-20 shadow-lg rounded-lg">hello</div>
									<div className="bg-white w-full h-20 shadow-lg rounded-lg">hello</div>
									<div className="bg-white w-full h-20 shadow-lg rounded-lg">hello</div>
								</div>
							</div>
							<Button isIconOnly className="absolute right-0 translate-x-[120%]">{">"}</Button>
						</div>
						<ChattingLog message={message} />
					</div>
				</ScrollShadow>
				<div className="max-w-5xl px-16 py-3 w-full h-auto flex gap-2">
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
