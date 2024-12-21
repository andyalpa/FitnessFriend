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
      user: null,
      token: sessionStorage.getItem("token"),
      favs: [],
    },
    actions: {

      login: async (email, password) => {
        let response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/login", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        let data = await response.json();

        if (response.ok) {
          // Store the token and user in sessionStorage and Flux store
          sessionStorage.setItem("token", data.access_token);
          sessionStorage.setItem("user", JSON.stringify(data.user));

          setStore({
            token: data.access_token,
            user: data.user,
          });
        } else {
          throw new Error("Login failed");
        }
      },

      logout: () => {
        // Remove token from sessionStorage
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user"); // Clear any user data if necessary

        // Clear the store's token and user data
        setStore({ token: null, user: null });
      },

      updateUser: async (formData) => {
        try {
          // Make the PUT request to update the user
          let response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/update", {
            method: "PUT", // Ensure it's PUT, not POST
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              height: formData.height,
              last_name: formData.last_name,
              name: formData.name,
              weight: formData.weight,
            }),
          });

          // Check if the response is OK (status code 200)
          if (response.ok) {
            let data = await response.json();
            console.log("Updated user data:", data.updated_user); // Log to ensure we have the correct data

            // Update the global store with the updated user
            setStore({ user: data.updated_user });

            return { success: true, message: "User updated successfully" };
          } else {
            const errorData = await response.json();
            console.error("Failed to update user:", errorData.error || "Unknown error");
            return { success: false, message: errorData.error || "Error updating user." };
          }
        } catch (error) {
          console.error("Error occurred while updating user:", error);
          return { success: false, message: "Error occurred while updating user." };
        }
      },


      getUser: async () => {
        let response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          let data = await response.json();
          console.log(data);
          setStore({ user: data });
        } else {
          console.error("Failed to fetch user data:", response.status);
        }
      },


      getUserFavorites: async () => {
        try {
          const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/favorites", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setStore({ favs: data }); // Store favorites in the state  
          }
        } catch (error) {
          console.error("Failed to fetch favorites:", error);
        }
      },


      addFav: async (fav, type) => {
        try {
          let name, image, id;

          if (type === "meal") {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${fav.idMeal}`);
            const data = await response.json();
            console.log("Meal Data: ", data)
            name = data.meals[0].strMeal;
            image = data.meals[0].strMealThumb;
            id = fav.idMeal; // Use the original ID from the API  
          } else if (type === "workout") {
            const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${fav.id}`, {
              headers: {
                'X-RapidAPI-Key': process.env.API_KEY, // Replace with your API key  
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
              }
            });
            const data = await response.json();
            name = data.name;
            image = data.gifUrl;
            id = fav.id; // Use the original ID from the API  
          }

          const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/favorites", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify({ name, image, id, type }),
          });

          if (response.ok) {
            const data = await response.json();
            const store = getStore();
            setStore({ favs: [...store.favs, { id, name, image, type }] }); // Use the original ID from the API  
          }
        } catch (error) {
          console.error("Failed to add favorite:", error);
        }
      },



      removeFav: async (favoriteId) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/favorites/${favoriteId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );

          if (response.ok) {
            const store = getStore();
            const newFavs = store.favs.filter((fav) => fav.id !== favoriteId);
            setStore({ favs: newFavs });
          }
        } catch (error) {
          console.error("Failed to delete favorite:", error);
        }
      },




































      // exampleFunction: () => {
      //   getActions().changeColor(0, "green");
      // },
      // getMessage: async () => {
      //   try {
      //     // fetching data from the backend
      //     const resp = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/hello");
      //     const data = await resp.json();
      //     setStore({ message: data.message });
      //     // don't forget to return something, that is how the async resolves
      //     return data;
      //   } catch (error) {
      //     console.log("Error loading message from backend", error);
      //   }
      // },
      // changeColor: (index, color) => {
      //   //get the store
      //   const store = getStore();
      //   //we have to loop the entire demo array to look for the respective index
      //   //and change its color
      //   const demo = store.demo.map((elm, i) => {
      //     if (i === index) elm.background = color;
      //     return elm;
      //   });

      //   //reset the global store
      //   setStore({ demo: demo });
      // },
    },
  };
};

export default getState;