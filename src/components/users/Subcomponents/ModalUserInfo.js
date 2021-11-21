import React, { useState, useEffect } from "react";
import "../Styles/UserCard.css";

import {
	Button,
	Modal,
	Icon,
	Dropdown,
	Header,
	Input,
} from "semantic-ui-react";
import "../Styles/ModalAdmin.css";
import api from "../../shared_components/APIConfig";
import "../../shared_components/Styles/Boton.css";

async function fetchUser(userID) {
	var response = await fetch(api.url + "/getPaciente?id=" + userID, {
		method: "get",
		headers: { "Content-Type": "application/json" },
	});

	if (response.status !== 200) return null;
	var user = await response.json();

	return user;
}

function validateData(data) {
	return data ? data : "";
}

function ModalUserInfo(props) {
	const [state, setState] = React.useState({
		open: true,
		dimmer: "blurring",
	});

	const { open, dimmer } = state;

	const [stateUser, setStateUser] = useState({
		nombre: "",
		apellido: "",
		email: "",
		celular: "",
		sexo: "",
		estadoCivil: "",
		fechaNacimiento: null,
		edad: "",
		foto: null,
	});

	useEffect(() => {
		if (!props.userID) return;
		async function fetchData() {
			const userData = await fetchUser(props.userID);
			if (!userData) return;
			setStateUser({
				nombre: validateData(userData.nombre),
				apellido: validateData(userData.apellido),
				email: validateData(userData.email),
				celular: validateData(userData.celular),
				sexo: validateData(userData.sexo),
				estadoCivil: validateData(userData.estadoCivil),
				fechaNacimiento: validateData(userData.fechaNacimiento),
				edad: validateData(userData.edad),
				foto: userData.foto,
			});
		}
		fetchData();
	}, [props]);

	const sexoOptions = [
		{ key: "Masculino", value: "Masculino", text: "Masculino" },
		{ key: "Femenino", value: "Femenino", text: "Femenino" },
	];

	const estadoCivilOptions = [
		{ key: "Soltero", value: "Soltero", text: "Soltero" },
		{ key: "Casado", value: "Casado", text: "Casado" },
		{ key: "Divorciado", value: "Divorciado", text: "Divorciado" },
		{ key: "Viudo", value: "Viudo", text: "Viudo" },
		{ key: "Otro", value: "Otro", text: "Otro" },
	];

	return (
		<div>
			<Modal
				dimmer={dimmer}
				open={open}
				onClose={() => {
					props.closeModal();
					setState({ open: false });
				}}
			>
				<Modal.Header>{"Informacion del paciente"}</Modal.Header>
				<Modal.Content image>
					<div>
						<label>
							<img
								className="fotoUsuarioModal"
								style={{cursor: "default"}}
								src={
									stateUser.foto
										? stateUser.foto
										:  "/defaultUser.png"
								}
								alt="Foto"
							/>
						</label>
					</div>

					<Modal.Description className="descriptionRG">
						<Header style={{ marginLeft: "10.5%" }}>
							Datos de Paciente
						</Header>
						<div className="containerUserRG">
							<div className="blockModal">
								<div className="block1RG">
									<Input
										style={{
											width: "100%",
											height: "100%",
										}}
										autoComplete="off"
										size="large"
										icon="address card"
										iconPosition="left"
										placeholder="Nombre(s)"
										name="nombre"
										value={stateUser.nombre}
										disabled
									/>
								</div>
								<div className="block2RG">
									<Input
										style={{
											width: "100%",
											height: "100%",
										}}
										autoComplete="off"
										size="large"
										icon="address book"
										iconPosition="left"
										placeholder="Apellido(s)"
										name="apellido"
										value={stateUser.apellido}
										disabled
									/>
								</div>
							</div>

							<div className="blockModal">
								<div className="block1RG">
									<Input
										style={{
											width: "100%",
											height: "100%",
										}}
										autoComplete="off"
										size="large"
										icon="envelope"
										iconPosition="left"
										placeholder="Correo"
										name="email"
										value={stateUser.email}
										disabled
									/>
								</div>
								<div className="block2RG">
									<Input
										style={{
											width: "100%",
											height: "100%",
										}}
										autoComplete="off"
										size="large"
										icon="call"
										iconPosition="left"
										placeholder="Celular"
										name="celular"
										value={stateUser.celular}
										disabled
									/>
								</div>
							</div>

							<div className="blockModal">
								<div className="block1RG">
									<Dropdown
										style={{
											width: "100%",
											height: "100%",
										}}
										button
										name="sexo"
										selection
										className="icon selectRol"
										labeled
										icon="group"
										options={sexoOptions}
										placeholder="Sexo"
										value={stateUser.sexo}
										disabled
									/>
								</div>
								<div className="block2RG">
									<Dropdown
										style={{
											width: "100%",
											height: "100%",
										}}
										button
										name="estadoCivil"
										selection
										className="icon selectRol"
										labeled
										icon="group"
										options={estadoCivilOptions}
										placeholder="Estado Civil"
										value={stateUser.estadoCivil}
										disabled
									/>
								</div>
							</div>
							<div className="blockModal">
								<div className="block1RG">
									<Input
										style={{
											width: "100%",
											height: "100%",
										}}
										autoComplete="off"
										size="large"
										icon="address card"
										iconPosition="left"
										placeholder="Fecha nacimiento"
										name="fechaNacimiento"
										value={stateUser.fechaNacimiento}
										disabled
									/>
								</div>
								<div className="block2RG">
									<Input
										style={{
											width: "100%",
											height: "100%",
										}}
										autoComplete="off"
										size="large"
										icon="address book"
										iconPosition="left"
										placeholder="Edad"
										name="edad"
										value={stateUser.edad}
										disabled
									/>
								</div>
							</div>
						</div>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button
						style={{
							borderRadius: "0.4rem",
							margin: "0% 2% 0% 0%",
						}}
						color="red"
						inverted
						onClick={() => {
							props.closeModal();
							setState({ open: false });
						}}
					>
						<Icon name="cancel" /> Cerrar
					</Button>
				</Modal.Actions>
			</Modal>
		</div>
	);
}

export default ModalUserInfo;
