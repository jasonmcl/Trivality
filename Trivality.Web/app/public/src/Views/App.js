import React, { Component } from "react";
import logo from "../logo.svg";
import "../Styles/App.css";
import axios from "axios";
import {Button, Icon} from "antd";

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
                    <img
						src={logo}
						className="App-logo"
						alt="logo"
					/>
					<h1 className="App-title">Welcome</h1>
				</header>
			</div>
		);
	}
}

export default App;
