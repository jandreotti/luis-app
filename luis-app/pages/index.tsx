import { NextPage } from 'next';
import React, { ChangeEvent, useRef } from 'react';
import NextLink from 'next/link';

interface Props {
	message: string;
}

const IndexPage: NextPage<Props> = ({ message }: Props) => {
	const fileInputRef = useRef<HTMLInputElement>(null); //Referencia al input de tipo file de carga de archivos

	const onFilesSelected = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;

		if (!files) return;

		console.log(files);

		for (const file of files) {
			play(file);
		}

		event.target.value = '';
	};

	const play = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		const { data } = await axios.post<{ message: string }>('/api/play', formData);
		console.log({ data });
	};

	return (
		<>
			<div
				style={{
					width: '100vw',
					height: '100vh',
					backgroundColor: 'pink',
				}}
			>
				<div
					style={{
						display: 'flex',
						// flexDirection: { xs: 'column', md: 'row' },
					}}
				>
					<Image
						// component='img'

						height={167}
						width={250}
						style={{
							height: 167,
							width: 250,
							// height: 233,
							// width: 350,
							// maxHeight: { xs: 233, md: 167 },
							// maxWidth: { xs: 350, md: 250 },
							// display: { xs: 'none', md: 'block' },
						}}
						alt='LuisImg1'
						src='/img/luis1.png'
					/>

					<label
						style={{
							fontSize: 30,
							fontWeight: 'bold',
							color: 'Red',
							margin: 'auto',
							// marginLeft: 20,
						}}
					>
						LUIS-APP
					</label>
					<Image
						// component='img'
						height={167}
						width={250}
						style={{
							height: 167,
							width: 250,
							// height: 233,
							// width: 350,
							// maxHeight: { xs: 233, md: 167 },
							// maxWidth: { xs: 350, md: 250 },
							// margin: { xs: 'auto', md: '0' },
						}}
						alt='LuisImg2'
						src='/img/luis2.jpeg'
					/>
				</div>

				{/* <Box>{message}</Box> */}

				<div
					style={{
						width: ' 100vw ',
						height: ' calc( 100vh - 264px )',
						// height: { xs: 'calc( 100vh - 310px )', md: 'calc( 100vh - 214px )' },
						backgroundColor: 'blue',

						textAlign: 'center',
					}}
				>
					<label
						style={{
							color: 'white',
							fontSize: 30,
							// fontSize: { xs: 20, md: 30 },
						}}

						// align='center'
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
							}}
						>
							Arroje su archivito de audio aqui abajito!
							<div>
								<NextLink
									href={`/text`}
									passHref
									style={{
										cursor: 'pointer',
									}}
								>
									<label
										style={{
											color: 'red',
											cursor: 'pointer',
										}}
									>
										{'Diversion ====> LOCAL '}
									</label>
								</NextLink>
								/
								<NextLink
									href={`/text2`}
									passHref
									style={{
										cursor: 'pointer',
									}}
								>
									<label
										style={{
											color: 'red',
											cursor: 'pointer',
										}}
									>
										{' SERVER'}
									</label>
								</NextLink>
							</div>
						</div>
					</label>
					<input
						// ref={fileInputRef}
						type='file'
						multiple
						// accept='image/png, image/gif, image/jpeg'
						accept='audio/*'
						// style={{ display: 'none' }}
						onChange={onFilesSelected}
						style={{
							width: '100%',
							height: '100%',
							backgroundColor: 'yellow',
						}}
						ref={fileInputRef}
					/>
				</div>
			</div>
		</>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Image from 'next/image';

// import sound from 'sound-play';
// import fs from 'fs';
// var player = require('play-sound');
// import player from 'play-sound';
// const sound = require("sound-play");

// import play from 'audio-play';
// import load from 'audio-loader';
// const load = require('audio-loader');

// import player from 'play-sound';
// import { exec } from 'child_process';

// import { playAudioFile } from 'audic';
// import Audic from 'audic';

// const vlc = require('vlc-player');

// import createVlc from '@richienb/vlc';

export const getServerSideProps: GetServerSideProps = async ctx => {
	console.log('getServerSideProps');

	// const vlc = await createVlc();

	// Play audio
	// await vlc.command('in_play', {
	// 	input: 'public/lala.mp3',
	// });

	// Pause/resume audio
	// await vlc.command('pl_pause');

	// const player = await vlc( ['public\\lala.mp3'] );

	// await playAudioFile('public/lala.mp3');

	// const audic = new Audic('public/lala.mp3');
	// const audic = new Audic('C:\\Users\\computadora\\Desktop\\Luis\\luis-app\\public\\lala.mp3');
	// const audic = new Audic('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');

	// luis-app/public/lala.mp3

	// audic.play();

	// await audic.play();

	// audic.addEventListener('ended', () => {
	// 	audic.destroy();
	// });

	// exec('vlc -I dummy public/lala.mp3')

	// player({
	// 	player: 'mpg123' ,

	// }).play('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', function(err){
	// 	if (err) throw err
	//   })

	// }).play('C:\\Users\\computadora\\Desktop\\Luis\\luis-app\\public\\lala.mp3', function (err: any) {
	// 	if (err) {
	// 		console.log({ err });
	// 	}
	// });

	// await load('public/lala.mp3').then(play);

	// sound.play('public/lala.mp3');

	// console.log({
	// 	players: player({
	// 		player: 'aplay',
	// 	}).players,
	// });

	// player({
	// 	player: 'cmdmp3',
	// }).play('public/lala.mp3', function (err: any) {
	// 	if (err) throw err;
	// });

	// fs.readFile('public/lala.mp3', function (err, data) {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log(data.toString());
	// 	}

	// 	// res.writeHead(200, { 'Content-Type': 'text/html' });
	// 	// res.write(data);
	// 	// return res.end();
	// });

	const { data } = await axios('http://localhost:3000/api/hello');

	return {
		props: {
			message: 'OK',
		},
	};
};

export default IndexPage;
