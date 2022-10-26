//https://github.com/MikeyParton/react-speech-kit
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
//https://blog.openreplay.com/make-your-app-speak-with-react-speech-kit/
//https://www.geeksforgeeks.org/create-a-text-to-speech-application-using-reactjs/

import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useSpeechSynthesis } from 'react-speech-kit';

const TextPage = () => {
	const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
	const [text, setText] = useState('A Roberto le Gusta la Batata');
	const [voiceIndex, setVoiceIndex] = useState<number>(6);

	return (
		<div
			style={{
				width: 'calc( 100vw - 32px )',
				display: 'flex',
				flexDirection: 'column',
				margin: 'auto',
			}}
		>
			<textarea
				value={text}
				onChange={event => setText(event.target.value)}
				style={{
					height: 'calc( 100vh - 150px)',
				}}
			/>
			<select
				style={{
					width: '100%',
					height: '50px',
					margin: '10px 0',
				}}
				name='voice'
				value={voiceIndex || ''}
				onChange={e => {
					setVoiceIndex(e.target.value as any);
				}}
			>
				{voices.map((option: SpeechSynthesisVoice, index: number) => (
					<option key={option.voiceURI} value={index}>
						{`${option.lang} - ${option.name} ${option.default ? '- Default' : ''}`}
					</option>
				))}
			</select>
			<button
				onClick={() => speak({ text, voice: voices[voiceIndex] })}
				style={{
					width: '100%',
					height: '50px',
					margin: '10px 0',
					backgroundColor: 'red',
					color: 'white',
				}}
			>
				Speak
			</button>
		</div>
	);
};

export default TextPage;
