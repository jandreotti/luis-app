import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { exec } from 'child_process';

type Data = {
	message: string;
};

//! Para decirle a next que no serialice lo que viene en la peticion
export const config = {
	api: { bodyParser: false }, //Esto le dice a next -> NO PARSEES EL BODY. Dejalo asi como viene.  -> Se usa un paquete de terceros para obtener la imagen del body => formidable
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return parseFile(req, res);

		default:
			return res.status(400).json({ message: 'BAD REQUEST ' });
	}
}
const parseFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	console.log(1);
	return new Promise((resolve, reject) => {
		const form = new formidable.IncomingForm(); //preparo el objeto de formidable para analizar el objeto de formulario que viene en la request

		form.parse(req, async (err, fields, files) => {
			// console.log({ err, fields, files });

			if (err) {
				return reject(err);
			}

			const resultado = await playAudio(files.file as formidable.File);
			// resolve({ fields, files });
			// const path=files.file.filepath

			// yo se que siempre file es uno y no un arreglo porque estoy mandando de a uno.
			// const secure_url = await saveFile(files.file as formidable.File);
			// resolve(true);
			// resolve(secure_url); // Si todo sale bien voy a devolver la imagen URL de la imagen cargada en cloudinary
		});
	});
};

const playAudio = async (file: formidable.File) => {
	// console.log(2);
	const filepath = file.filepath;

	exec(
		// '"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe" "-I dummy"  "C:\\Users\\computadora\\Desktop\\Luis\\luis-app\\public\\lala.mp3"',
		// '"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe" "-I dummy" "--play-and-exit" "--no-video" "--no-repeat" "--no-loop" "--no-random" "--no-sout-video" "--no-sout-audio" "--sout-keep" "--gain=800" "--volume-step=256" "C:\\Users\\computadora\\Desktop\\Luis\\luis-app\\public\\lala.mp3"',
		//`"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe" "-I dummy" "--play-and-exit" "--no-video" "--no-repeat" "--no-loop" "--no-random" "--no-sout-video" "--no-sout-audio" "--sout-keep" "--gain=800" "--volume-step=256" "${filepath}"`,
		`"mpg123" "${filepath}"`,
		(error, stdout, stderr) => {
			console.log('error', error);
			console.log('Reproducido');
		}
	);
};
