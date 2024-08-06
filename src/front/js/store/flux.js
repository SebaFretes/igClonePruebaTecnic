const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null || localStorage.getItem('token'),
			profile: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			register: async (user) => {
				const resp = await fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(user)
				})
				const data = await resp.json()
				if (resp.ok) {
					localStorage.setItem('token', data.access_token)
					setStore({ token: data.access_token })
					return true;
				}
				else return false;
			},
			login: async (user) => {
				const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(user)
				})
				const data = await resp.json()
				if (resp.ok) {
					localStorage.setItem('token', data.access_token)
					setStore({ token: data.access_token })
					return true;
				}
				else return false;
			},
			getProfile: async (user) => {
				const store = getStore();
				const resp = await fetch(process.env.BACKEND_URL + "/api/demo", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + store.token
					},
				})
				const data = await resp.json()
				if (resp.ok) {
					setStore({ profile: data })
				}
			},
			logout: () => {
				setStore({ profile: null, token: null })
				localStorage.removeItem('token')
			},
			createPost: async (formData) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/post", {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Authorization": "Bearer " + getStore().token,
                        }
                    });
                    const data = await resp.json();
                    
                    if (resp.ok) {
                        console.log("Post created successfully:", data);
                        return true;
                    } else {
                        console.log("Failed to create post:", data);
                        return false;
                    }
                } catch (error) {
                    console.log("Error creating post:", error);
                    return false;
                }
            },
		}
	};
};

export default getState;
