import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'React Simple CRUD Application',
      act: 0,
      index: '',
      datas: [],
      onlyRich: false
    }
    this.myFormRef = React.createRef();
    this.nameRef = React.createRef();
    this.addressRef = React.createRef();
    this.deptRef = React.createRef();
    this.salaryRef = React.createRef();
    this.nextId = 1;
  }

  fSubmit = (e) => {
    e.preventDefault();

    let name = this.nameRef.current.value.trim();
    let address = this.addressRef.current.value.trim();
    let dept = this.deptRef.current.value.trim();
    let salary = this.salaryRef.current.value.trim();

    // ignore incomplete rows and non-numeric salaries (they break sort/filter)
    if (!name || !address || !dept || salary === '' || isNaN(Number(salary))) {
      return;
    }
    salary = Number(salary);

    if (this.state.act === 0) {
      //new
      let data = {
        id: this.nextId++, name, address, dept, salary
      }
      this.setState((prev) => ({ datas: [...prev.datas, data] }));
    } else {
      //update (by id, so sorting/filtering while editing can't hit the wrong row)
      let id = this.state.index;
      this.setState((prev) => ({
        datas: prev.datas.map((data) =>
          data.id === id ? { ...data, name, address, dept, salary } : data
        )
      }));
    }

    this.setState({
      act: 0,
      index: ''
    });

    this.myFormRef.current.reset();
    this.nameRef.current.focus();
  }

  fRemove = (id) => {
    this.setState((prev) => ({
      datas: prev.datas.filter((data) => data.id !== id),
      // removing any row resets the form below, so leave edit mode too;
      // otherwise the next submit would update a row that no longer exists
      act: 0,
      index: ''
    }));

    this.myFormRef.current.reset();
    this.nameRef.current.focus();
  }

  fEdit = (id) => {
    let data = this.state.datas.find((d) => d.id === id);
    this.nameRef.current.value = data.name;
    this.addressRef.current.value = data.address;
    this.deptRef.current.value = data.dept;
    this.salaryRef.current.value = data.salary;


    this.setState({
      act: 1,
      index: id
    });

    this.nameRef.current.focus();
  }

  fsort = (e) => {
    let obj = [...this.state.datas];
    obj.sort((a, b) => a.salary - b.salary);
    this.setState({
      datas: obj
    });
  }

  // toggle a view filter instead of deleting everyone earning <= 2500
  ffilter = (e) => {
    this.setState((prev) => ({
      onlyRich: !prev.onlyRich
    }));
  }

  render() {
    let datas = this.state.onlyRich
      ? this.state.datas.filter(high => high.salary > 2500)
      : this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>

        <div className="options">

          <button onClick={(e) => this.fsort(e)} className="features"> Sort Ascending by salary 👀 </button>
          <button onClick={(e) => this.ffilter(e)} className="features">
            {this.state.onlyRich ? ' show all Employees ' : ' filter rich Employees 🤑 '}
          </button>

        </div>


        <form ref={this.myFormRef} className="myForm" onSubmit={this.fSubmit}>
          <label htmlFor="emp-name" className="visually-hidden">Name</label>
          <input id="emp-name" type="text" ref={this.nameRef} placeholder="your name" className="formField" required />
          <label htmlFor="emp-address" className="visually-hidden">Address</label>
          <input id="emp-address" type="text" ref={this.addressRef} placeholder="your address" className="formField" required />
          <label htmlFor="emp-dept" className="visually-hidden">Department</label>
          <input id="emp-dept" type="text" ref={this.deptRef} placeholder="your department" className="formField" required />
          <label htmlFor="emp-salary" className="visually-hidden">Salary</label>
          <input id="emp-salary" type="number" min="0" step="any" ref={this.salaryRef} placeholder="your salary" className="formField" required />

          <button type="submit" className="myButton">submit </button>
        </form>
        <ul className="myListWrapper">
          {datas.map((data, i) =>
            <li key={data.id} className="myList">
              {i + 1}. {data.name} , {data.address} , {data.dept} , {data.salary}
              <div>
                <button onClick={() => this.fRemove(data.id)} className="myListButton">remove </button>
                <button onClick={() => this.fEdit(data.id)} className="myListButton green">edit </button>
              </div>
            </li>
          )}
        </ul>

      </div>
    );
  }
}

export default App;