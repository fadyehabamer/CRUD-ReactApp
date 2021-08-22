import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'React Simple CRUD Application',
      act: 0,
      index: '',
      datas: []
    }
  }

  fSubmit = (e) => {
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    let dept = this.refs.dept.value;
    let salary = this.refs.salary.value

    if (this.state.act === 0) {
      //new
      let data = {
        name, address, dept, salary
      }
      datas.push(data);
    } else {
      //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
      datas[index].dept = dept;
      datas[index].salary = salary;
    }

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;
    this.refs.dept.value = data.dept;
    this.refs.salary.value = data.salary;


    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();
  }

  fsort = (e) => {
    let obj = [...this.state.datas];
    console.log(obj)
    obj.sort((a, b) => a.salary - b.salary);
    this.setState({
      datas: obj
    });
    console.log(obj)
  }

  ffilter = (e) => {
    let filtered = this.state.datas.filter(high => high.salary > 2500)

    this.setState({
      datas: filtered
    });

  }

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>

        <div className="options">

          <button onClick={(e) => this.fsort(e)} className="features"> Sort Ascending by salary 👀 </button>
          <button onClick={(e) => this.ffilter(e)} className="features"> filter rich Employees 🤑 </button>

        </div>


        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="your name" className="formField" />
          <input type="text" ref="address" placeholder="your address" className="formField" />
          <input type="text" ref="dept" placeholder="your department" className="formField" />
          <input type="text" ref="salary" placeholder="your salary" className="formField" />

          <button onClick={(e) => this.fSubmit(e)} className="myButton">submit </button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i + 1}. {data.name} , {data.address} , {data.dept} , {data.salary}
              <div>
                <button onClick={() => this.fRemove(i)} className="myListButton">remove </button>
                <button onClick={() => this.fEdit(i)} className="myListButton green">edit </button>
              </div>
            </li>
          )}
        </pre>

      </div>
    );
  }
}

export default App;