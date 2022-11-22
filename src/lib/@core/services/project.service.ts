
const POST_URL = 'http://localhost:8080/projects'
const GET_PROJECTS_BY_ONG_ID = "http://localhost:8080/projects/user/"
const GET_PROJECT_BY_PROJECT_ID = 'http://localhost:8080/projects/'

const projects: any = [
	{
		id: 1540056887,
		name: "string",
		description: "string",
		location: "string",
		lat: 0,
		lng: 0,
		mission: "string",
		functions: "string",
		requirements: "string",
		creation_date: "2022-11-21T07:22:39.346",
		ong_id: {
			id: 1197985365,
			name: "string",
			email: "string",
			password: "{noop}string",
			role: 0,
			locale: "string",
			description: "string",
		},
		photo_urls: "https://via.placeholder.com/300",
	},
];

const getProjectsByOngId = async(id: string) => {
	const response = await fetch(GET_PROJECTS_BY_ONG_ID + id)
	return response.json()
};

const getProjectById = async (id: string) => {
	const response = await fetch(GET_PROJECT_BY_PROJECT_ID + id)
	return response.json()
};

const getProjects = async () => {
	const response = await fetch("http://localhost:8080/projects")
	return response.json();
}

const create = async(project: any) => {
	console.log("🚀 ~ file: project.service.ts ~ line 37 ~ create ~ project", project)
	const response = await fetch( POST_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: "POST",
    body: JSON.stringify(project)
})
	return response.json()
};

export const projectService = {
	getProjects,
	getProjectsByOngId: (id: string) => getProjectsByOngId(id),
	getProjectById: (id: string) => getProjectById(id),
	create: (project: any) => create(project),
};
