import React from "react";

import Context from "./context";
import WSContext from "../websocket/context";

interface AuthProps {
	children: JSX.Element | JSX.Element[];
}

const AuthProvider: React.FC<AuthProps> = ({ children }) => {
	const wsContext = React.useContext(WSContext);

	const [token, setToken] = React.useState("");
	const [user, setUser] = React.useState();

	const register = async (param: any) => {
		if (!param.isSubmitting) {
			param.setIsSubmitting(true);
			param.setServerErrors([]);

			const response = await fetch(
				`${process.env.REACT_NATIVE_GC_APP_URL}/patient/register`,
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify(param.body),
				}
			);

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

			const response = await fetch(
				`${process.env.REACT_NATIVE_GC_APP_URL}/patient/login`,
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify(param.authInfo),
				}
			);

			if (response.ok && response.status === 200) {
				const user = await response.json();
				setUser(user.User);
				setToken(user.Token);
				const connection = new WebSocket(
					`wss://uwezo-app-323117.uc.r.appspot.com/chat?tokenString=${user.Token}`
				);
				connection.onopen = () => {
					wsContext.setConn(connection);
					console.log("connected");
				};
				param.navigation.navigate("Root");
			} else {
				param.setServerErrors([response.statusText]);
			}
		}
		param.setIsSubmitting(false);
	};

	const logout = async ({ navigation }: any) => {
		const response = await fetch(
			`${process.env.REACT_NATIVE_GC_APP_URL}/patient/logout`,
			{
				method: "GET",
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);

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
