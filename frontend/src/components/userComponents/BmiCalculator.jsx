import '../../css/bmi.css'

import React, { Component } from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      height: "",
      weight: "",
      bmi: "",
      msg: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  calculateBMI = () => {
    let heightSq = (this.state.height / 100) * (this.state.height / 100);
    let bmi = this.state.weight / heightSq;
    let msg = "";
    if (bmi < 18.5) {
      msg = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      msg = "Normal Weight";
    } else if (bmi >= 25 && bmi <= 29.9) {
      msg = "Overweight";
    } else if (bmi >= 30) {
      msg = "Obesity";
    }
    this.setState({ msg: msg });
    this.setState({ bmi: Math.round(bmi * 100) / 100 });
  };

  handleSubmit = (e) => {
    this.calculateBMI();
    e.preventDefault();
  };

  render() {
    return (
      <div className="Bmi">
        <form className='bmiForm' onSubmit={this.handleSubmit}>
          <h2>BMI Calculator</h2>
          <div className="input-group">
            <label>Height (cm)</label>
            <input
              className="inputs"
              type="number"
              value={this.state.height}
              name="height"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-group">
            <label>Weight (kg)</label>
            <input
              className="inputs"
              type="number"
              value={this.state.weight}
              name="weight"
              onChange={this.handleChange}
            />
          </div>
          <button className="button" type="submit">
            Calculate
          </button>
          <h2 className="result">{this.state.bmi}</h2>
          <h2 className="result-msg">{this.state.msg}</h2>
        </form>
      </div>
    );
  }
}
export default App;
