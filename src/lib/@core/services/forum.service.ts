export interface ITopicCard {
	comments: ITopicComment[],
	content: string
	creation_date: string
	id: number
	title: string
}

export interface ITopicComment {
	content: string;
	creationDate: string;
	id: number;
	ongAuthor: IOng | null;
	volunteerAuthor: IVolunteer | null;
}

export interface IOng {
	description: string; // x
	email: string; // x
	id: number;
	locale: string; // x
	name: string; // x
	password: string;
	role: number;
}

export interface IVolunteer {
	birthDate: string;
	dni: string; // x
	email: string; // x
	experience: number; // x
	firstName: string;
	genre: number;
	id: number;
	lastName: string; // x
	name: string; // x
	password: string;
	role: number;
}

// export let topicCards: any[] = [
// 	{
// 		id: 0,
// 		title: "Topico 1",
// 		content: "string",
// 		creation_date: "2022-11-21T08:21:49.724Z",
// 		comments: [
// 			{
// 				content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam tempore magni sunt earum accusantium eius deserunt eligendi. Nemo, modi a?",
// 				creationDate: "2022-11-21T08:21:49.724Z",
// 				id: 1,
// 				ongAuthor: {
// 					description: "string",
// 					email: "string",
// 					id: 1,
// 					locale: "string",
// 					name: "string",
// 					password: "string",
// 					role: 0
// 				},
// 				volunteerAuthor: null
// 			}
// 		]
// 	},
// 	{
// 		id: 1,
// 		title: "Topico 2",
// 		content: "string",
// 		comments: [
// 			{
// 				id: 937069698,
// 				content: "string",
// 				creationDate: "2022-11-21T08:58:32.433",
// 				ongAuthor: {
// 					id: 1197985365,
// 					name: "string",
// 					email: "string",
// 					password: "{noop}string",
// 					role: 0,
// 					locale: "string",
// 					description: "string",
// 				},
// 				volunteerAuthor: null
// 			}
// 		],
// 		creation_date: "2022-11-21T08:55:03.339"
// 	}
// ]

const GET_TOPICOS = "http://localhost:8080/foro/publications"  // put topico 
const GET_TOPICO_BY_ID = "http://localhost:8080/foro/publications/"  //get topico 
const POST_COMMIT_TOPIC = "http://localhost:8080/foro/publications/"
const POST_COMMIT_TOPIC2 = "/comments"  // coementar un topico por Id  // 370021309 es el id del topico"

const getAllTopicCards = async (): Promise<any> => {
	const response = await fetch(GET_TOPICOS,{
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "GET, POST, PUT, DELETE, OPTIONS",
		},
	})
	return response.json();
}

const getTopicCard = async (id: string): Promise<any> => {
	const response = await fetch(GET_TOPICO_BY_ID + id)
	return response.json();
}

// const createTopic = async (topicCard: any): Promise<any> => {
// 	const reponse = await fetch(, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			"Access-Control-Allow-Origin": "*",
// 		},
// 		body: JSON.stringify(topicCard)
// 	})
// 	return reponse.json();
// }

const createTopicComment = async(setTopicCards: any, topicComment: any, topicId: number): Promise<any> => {

	const response = await fetch(POST_COMMIT_TOPIC + topicId + POST_COMMIT_TOPIC2, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		body: JSON.stringify(topicComment)
	})
	
	return response.json();
}

export const forumService = {
	getAllTopicCards: () => getAllTopicCards(),
	getTopicCard: (id: string) => getTopicCard(id),
	// createTopic: (topicCard: any) => createTopic(topicCard),
	createTopicComment: (setTopicCards: any, topicComment: any, topicId: number) => createTopicComment(setTopicCards, topicComment, topicId)
}
