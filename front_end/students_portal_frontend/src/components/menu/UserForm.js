import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getStudentQuery, getBooksQuery } from "../../GraphQL/Queries";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      studentId: "",
    };
  }
  displayStudents() {
    var data = this.props.getStudentQuery;
    if (data.loading) {
      return <option disabled>Loading user..</option>;
    } else {
      return data.authors.map((students) => {
        return (
          <option key={students.id} value={students.id}>
            {students.name}
          </option>
        );
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        studentId: this.state.studentId,
      },
      refetchQueries: [{ query: getStudentQuery }],
    });
  }
  render() {
    return (
      <form id='add-book' onSubmit={this.submitForm.bind(this)}>
        <div className='field'>
          <label>Student name:</label>
          <input
            type='text'
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div className='field'>
          <label>Student:</label>
          <select
            onChange={(e) => this.setState({ studentId: e.target.value })}>
            <option>Select User</option>
            {this.displayStudents()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(graphql(getStudentQuery, { name: "getStudentQuery" }))(
  UserForm
);
