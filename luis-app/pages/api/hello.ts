// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { exec } from 'child_process';
import type { NextApiRequest, NextApiResponse } from 'next';
// import player from 'play-sound';
// const { createAudio } = require('node-mp3-player');

type Data = {
	name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	console.log('hello');

	// exec(
	// 	"vlc -Idummy --play-and-exit --no-video --no-repeat --no-loop --no-random --no-sout-video --no-sout-audio --sout-keep --sout '#transcode{acodec=mp3,ab=128,channels=2,samplerate=44100}:std{access=file,mux=raw,dst=hello.mp3}' C:\\Users\\computadora\\Desktop\\Luis\\luis-app\\public\\lala.mp3",
	// 	(error, stdout, stderr) => {
	// 		console.log('error', error);
	// 	} 
	// );

	// child_process.spawn('vlc',['-I dummy','--dummy-quiet'])

	exec(
		// '"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe" "-I dummy"  "C:\\Users\\computadora\\Desktop\\Luis\\luis-app\\public\\lala.mp3"',
		// '"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe" "-I dummy" "--play-and-exit" "--no-video" "--no-repeat" "--no-loop" "--no-random" "--no-sout-video" "--no-sout-audio" "--sout-keep" "--gain=800" "--volume-step=256" "C:\\Users\\computadora\\Desktop\\Luis\\luis-app\\public\\lala.mp3"',
		//'"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe" "-I dummy" "--play-and-exit" "--no-video" "--no-repeat" "--no-loop" "--no-random" "--no-sout-video" "--no-sout-audio" "--sout-keep" "--gain=8" "--volume-step=256" "public/lala.mp3"',
		'"mpg123" "public/lala2.mp3"',
		(error, stdout, stderr) => {
			console.log('error', error);
		}
	);

	// console.log(__dirname);

	// const Audio = createAudio();

	// (async () => {
	// 	// const myFile = await Audio(`${__dirname}/../../../../public/lala.mp3`);
	// 	const myFile = await Audio(`C:\\Users\\computadora\\Desktop\\Luis\\luis-app\\public\\lala.mp3`);
	// 	await myFile.volume(0.5);
	// 	const currentVolume = await myFile.volume(); // 0.5
	// 	await myFile.loop();
	// 	await myFile.stop();
	// })();

	// player({
	// 	player: 'mpg123',
	// }).play('public/lala.mp3', function (err) {
	// 	if (err) throw err;
	// });

	res.status(200).json({ name: 'John Doe' });
}
