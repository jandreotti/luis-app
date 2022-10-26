//https://www.geeksforgeeks.org/how-to-convert-text-to-speech-in-node-js/
//https://npm.runkit.com/gtts

import type { NextApiRequest, NextApiResponse } from 'next';
const gTTS = require('gtts');

//@ts-ignore
// import gTTS from 'gTTS';
import os from 'os';
import path from 'path';
import { exec } from 'child_process';

type Data = {
	message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return speak(req, res);

		default:
			return res.status(400).json({ message: 'BAD REQUEST ' });
	}
}
function speak(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { text, ip } = req.body;
	console.log(text);

	//  var speech = 'A roberto le gusta la batata';
	var gtts = new gTTS(text, 'es');
	const tempDir = os.tmpdir();

	const tempUrl = tempDir + path.sep + 'Escrito.mp3';

	//@ts-ignore
	gtts.save(tempUrl, function (err, result) {
		if (err) {
			throw new Error(err);
		}

		exec(
			// '"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe" "-I dummy"  "C:\\Users\\computadora\\Desktop\\Luis\\luis-app\\public\\lala.mp3"',
			// '"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe" "-I dummy" "--play-and-exit" "--no-video" "--no-repeat" "--no-loop" "--no-random" "--no-sout-video" "--no-sout-audio" "--sout-keep" "--gain=800" "--volume-step=256" "C:\\Users\\computadora\\Desktop\\Luis\\luis-app\\public\\lala.mp3"',
			//`"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe" "-I dummy" "--play-and-exit" "--no-video" "--no-repeat" "--no-loop" "--no-random" "--no-sout-video" "--no-sout-audio" "--sout-keep" "--gain=800" "--volume-step=256" "${filepath}"`,
			`"mpg123" "${tempUrl}"`,
			(error, stdout, stderr) => {
				if (error) console.log('error', error);

				console.log(`\n\n
---------------------------------
IP: ${ip}
Speak: ${text}`);
			}
		);

		return res.status(200).json({ message: 'OK' });
	});
}
