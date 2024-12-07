const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      user: sessionStorage.getItem("user"),
      token: sessionStorage.getItem("token"),
    },
    actions: {
      // Use getActions to call a function within a fuction

      login: async (email, password) => {
        let response = await fetch(process.env.BACKEND_URL + "/login", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        let data = await response.json();
        sessionStorage.setItem("token", data.access_token);
        sessionStorage.setItem("user", data.user);
        console.log(sessionStorage.getItem("token"));
      },
      logout: () => {
        sessionStorage.setItem("token", null);
      },

      updateUser: async (email, height, name, last_name) => {
        console.log(email, height, name, last_name);
        let response = await fetch(process.env.BACKEND_URL + "/update_user", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            height: height,
            name: name,
            last_name: last_name,
          }),
        });
        let data = await response.json();
      },

      getUser: async () => {
        let response = await fetch(process.env.BACKEND_URL + "/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          let data = await response.json();
          console.log(data);
          sessionStorage.setItem("user", data);
        } else {
          console.error("Failed to fetch user data:", response.status);
        }
      },

      logout: async () => {
        sessionStorage.setItem("token", null);
      },

      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
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
    },
  };
};

export default getState;
