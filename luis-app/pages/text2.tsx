import axios from 'axios';
import React, { useState } from 'react';

// const gTTS = require('gtts');

//@ts-ignore
// import gTTS from 'gTTS';

const Text2Page = () => {
	const [text, setText] = useState('A Roberto le Gusta la Batata');

	const onSpeak = async () => {
		// const url = 'https://translate.google.com/translate_tts?ie=UTF-8&q=lalala&tl=es-es&client=tw-ob';
		// const resp = await axios.get('https://translate.google.com/translate_tts?ie=UTF-8&q=lalala&tl=es-es&client=tw-ob');
		// console.log({ resp });

		// fetch(url)
		// 	.then(res => console.log({ res }))
		// 	.catch(err => console.log({ err }));

		// const resp = await axios.get(url, {
		// responseType: 'document',
		// headers: {
		// 	'Content-Type': 'audio/wav',
		// 	'Access-Control-Allow-Origin': '*',
		// },
		// });

		// const blob = new Blob([data], {
		// 	type: 'audio/wav',
		// });

		// console.log(resp);
		const res = axios.post('/api/speak', {
			text,
		});
	};

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

			<button
				onClick={() => onSpeak()}
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

export default Text2Page;
