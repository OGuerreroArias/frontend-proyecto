
const VOLUNTEER_URL = "http://localhost:8080/volunteer?email="
const ONG_URl ="http://localhost:8080/ong?email="
const getUserByEmail = async (email: string) => {

	let data: any;

	// probar con ong y volunteer
	const volunteerResponse = await fetch(VOLUNTEER_URL + email);
	const volunteerData = await volunteerResponse.json();
	console.log("🚀 ~ file: auth.service.ts ~ line 9 ~ getUserByEmail ~ volunteerData", volunteerData.id) 

	const ongResponse = await fetch(ONG_URl + email);
	const ongData = await ongResponse.json();
	// console.log("🚀 ~ file: auth.service.ts ~ line 13 ~ getUserByEmail ~ ongData", ongData)

	if(volunteerData?.id) {
		console.log("🚀 ~ file: auth.service.ts ~ line 20 ~ getUserByEmail ~ volunteerData?.id", volunteerData?.id)
		return volunteerData
	}

	if(ongData?.id) {
		console.log("🚀 ~ file: auth.service.ts ~ line 25 ~ getUserByEmail ~ ongData?.id", ongData?.id)
		return ongData
	}

}

export const authService = {
	getUserByEmail
}

// const volunteer = {
	// 	id: 1,
	// 	email: "volunteer@hotmail.com",
	// 	name: "Voluntario",
	// 	lastName: "1",
	// 	dni: "12345678",
	// 	experience: "Experiencia...",
	// }

	// const ong = {
	// 	id: 2,
	// 	email: "ong@hotmail.com",
	// 	name: "Ong"
	// }

	// if (email === volunteer.email)
	// 	return volunteer
	// else if (email === ong.email)
	// 	return ong