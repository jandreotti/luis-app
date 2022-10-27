import { Box, Button, TextareaAutosize, TextField } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// const gTTS = require('gtts');

//@ts-ignore
// import gTTS from 'gTTS';

interface Props {
	ip: string;
}

const Text2Page: NextPage<Props> = ({ ip }) => {
	const [text, setText] = useState('A Roberto le Gusta la Batata');
	const inputRef = useRef<HTMLInputElement>();
	// const [focus, setFocus] = useState(false);

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

		//! VALIDACIONES
		if (!text.trim()) return;

		const res = await axios.post('/api/speak', {
			ip,
			text,
		});
		console.log(res.data.message);

		inputRef?.current?.select();
	};

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<Box
			sx={{
				width: 'calc( 100vw - 10px )',
				height: { xs: '', md: 'calc( 100vh - 10px )' },
				margin: '5px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				// backgroundColor: 'yellow',
			}}
			// height: 233,
			// width: 350,
			// maxHeight: { xs: 233, md: 167 },
			// maxWidth: { xs: 350, md: 250 },
			// display: { xs: 'none', md: 'block' },
		>
			<TextField
				// variant={focus ? 'outlined' : 'standard'}
				inputRef={inputRef}
				value={text}
				onChange={event =>
					// event.target.value.charAt(text.length) != '\n' &&
					// event.target.value.charAt(0) != '\n' &&
					setText(event.target.value.replaceAll('\n', ''))
				}
				// onChange={event => console.log(event.target.value.charAt(text.length))}

				//  onKeyDown={({ key }) => key === 'Enter' && onSpeak()}
				onKeyUp={({ key }) => key === 'Enter' && onSpeak()}
				// onKeyUp={({ key }) => key === 'Enter' && setText('')}

				inputProps={{ style: { fontSize: 40, padding: 5, lineHeight: 1, backgroundColor: 'white', color: 'black' } }} // font size of input text
				// InputLabelProps={{ style: { fontSize: 40 } }} // font size of input label

				rows={2}
				// rows={Infinity}
				label='Mensaje a enviar'
				onFocus={event => {
					event.target.select();
				}}
				// autoFocus

				multiline
				sx={{
					marginTop: 1,
					// height: 'calc( 100vh - 80px)',
					// fontSize: 80,
					// fontWeight: 'bold',
				}}
			/>

			<Box display='flex' flexDirection='column' alignItems={'center'}>
				{/* <Box
					sx={{
						margin: '0 0 0 0',
						padding: '0 0 0 0',
					}}
				> */}
				<Box
					component='img'
					// height={400}
					// width={350}
					style={{ objectFit: 'fill' }}
					sx={{
						height: 400,
						width: 350,
						// height: 233,
						// width: 350,
						maxHeight: { xs: 233, md: 400 },
						maxWidth: { xs: 350, md: 350 },
						display: { xs: 'none', md: 'block' },
						margin: '0 0 0 0',
						padding: '0 0 0 0',
						borderRadius: '100% 100% 0 0',
					}}
					alt='Charlina1'
					src='/img/charlina.jpeg'
					// src='/img/luis1.png'
					onClick={() => onSpeak()}
				/>
				{/* </Box> */}
				<Button
					// variant='outlined'
					onClick={() => onSpeak()}
					sx={{
						width: '100%',
						height: '50px',
						// margin: '10px 0',
						margin: { xs: '10px 0', md: '0' },
						backgroundColor: 'red',
						color: 'white',
						'&:hover': {
							backgroundColor: 'blue',
							color: 'white',
						},
					}}
				>
					Speak
				</Button>
			</Box>
		</Box>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps, NextPage } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const forwarded = req.headers['x-forwarded-for']?.toString();
	const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
	// const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
	return {
		props: {
			ip: ip?.substr(7) || 'NoSeSabe',
		},
	};
};

export default Text2Page;
