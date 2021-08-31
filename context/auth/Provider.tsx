import React from "react";

import Context from "./context";
import WS from "../websocket/ws";

interface AuthProps {
	children: JSX.Element | JSX.Element[];
}

const AuthProvider: React.FC<AuthProps> = ({ children }) => {
	const [token, setToken] = React.useState("");
	const [user, setUser] = React.useState();

	const register = async (param: any) => {
		if (!param.isSubmitting) {
			param.setIsSubmitting(true);
			param.setServerErrors([]);

			const response = await fetch(`http://localhost:8000/patient/register`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(param.body),
			});

			if (response.ok && response.status === 201) {
				await response.json();
				param.navigation.navigate("Login");
			} else {
				param.setServerErrors([response.statusText]);
			}
		}
		param.setIsSubmitting(false);
	};

	const login = async (param: any) => {
		if (!param.isSubmitting) {
			param.setIsSubmitting(true);
			param.setServerErrors([]);

			const response = await fetch(`http://localhost:8000/patient/login`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(param.authInfo),
			});

			if (response.ok && response.status === 200) {
				const user = await response.json();
				setUser(user.User);
				setToken(user.Token);
				WS.init(`ws://localhost:/chat?tokenString=${user.Token}`);

				WS.onOpen(console.log);
				WS.onClose(console.log);
				param.navigation.navigate("Root");
			} else {
				param.setServerErrors([response.statusText]);
			}
		}
		param.setIsSubmitting(false);
	};

	const logout = async ({ navigation }: any) => {
		const response = await fetch(`http://localhost:8000/patient/logout`, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + token,
			},
		});

		if (response.ok && response.status === 200) {
			const t = await response.text();
			setToken(t);
			navigation.navigate("LandingPage");
		} else {
			console.log(response.statusText);
		}
	};

	return (
		<Context.Provider
			value={{
				Token: token,
				User: user,

				register,
				login,
				logout,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default AuthProvider;
