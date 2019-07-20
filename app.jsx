class App extends React.Component {
  state = {
    newTask: "",
    myTasks: ["task-1", "task-2"],
    error: ""
  };

  newTask = e => {
    this.setState({
      newTask: e.target.value,
      error: ""
    });
  };
  addnewTask = e => {
    e.preventDefault();
    if (this.state.newTask === "") {
      this.setState({ error: "true" });
    } else this.setState(preState => preState.myTasks.push(this.state.newTask));
    this.setState({
      newTask: ""
    });
  };

  removeTask = index => {
    this.setState({
      myTasks: [
        ...this.state.myTasks.slice(0, index),
        ...this.state.myTasks.slice(index + 1)
      ]
    });
  };

  render() {
    return (
      <div className="container">
        <Header title="Tasks" />
        <Form
          input={this.newTask}
          addTask={this.addnewTask}
          value={this.state.newTask}
          error={this.state.error}
        />
        <ul className="list-group mt-2">
          {this.state.myTasks.map((t, index) => (
            <Tasks key={index} task={t} remove={() => this.removeTask(index)} />
          ))}
        </ul>
      </div>
    );
  }
}

const Header = props => {
  return (
    <div className="bg-light mt-2 text-center">
      <h1 className="display-4">
        <i className="fas fa-tasks text-info mr-2" />
        {props.title}
        <span className="text-info ml-2">To-Do</span>
      </h1>
    </div>
  );
};

const Form = props => {
  return (
    <form onSubmit={props.addTask}>
      <div className="from-group">
        <label htmlFor="input" className="lead text-light">
          Task
        </label>
        <input
          type="text"
          name="input"
          onChange={props.input}
          value={props.value}
          placeholder="Type your task herer ..."
          className={props.error ? "form-control is-invalid " : "form-control"}
        />
        <div className="invalid-feedback bg-dark p-2">Task required</div>
        <button type="submit" className="btn btn-success btn-block mt-2">
          Add Task
        </button>
      </div>
    </form>
  );
};
const Tasks = props => {
  return (
    <div>
      <li className="list-group-item lead">
        {props.task}
        <button
          onClick={props.remove}
          className="btn  btn-sm btn-danger float-right"
        >
          x
        </button>
      </li>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
