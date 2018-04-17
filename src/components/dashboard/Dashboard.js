import React, { Component } from "react";
import styles from "./dashboard.css";
import FormField from "../widgets/formFields/FormFields";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { firebaseTeams, firebaseArticles, firebase } from "../../firebase";
import Uploader from "../widgets/fileUploader/FileUploader";

export class Dashboard extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    postError: "",
    loading: false,
    formData: {
      author: {
        element: "input",
        value: "",
        config: {
          name: "author_input",
          type: "text",
          placeholder: "Enter your name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      title: {
        element: "input",
        value: "",
        config: {
          name: "title_input",
          type: "text",
          placeholder: "Enter the title"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      body: {
        element: "texteditor",
        value: "",
        valid: true
      },
      team: {
        element: "select",
        value: "",
        config: {
          name: "team_input",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      image: {
        element: "image",
        value: "",
        valid: true
      }
    }
  };

  componentDidMount() {
    this.loadTeams();
  }

  loadTeams = () => {
    firebaseTeams.once("value").then(snapshot => {
      let team = [];

      snapshot.forEach(childSnapshot => {
        team.push({
          id: childSnapshot.val().teamId,
          name: childSnapshot.val().city
        });
      });

      const newFormData = { ...this.state.formData };
      const newElement = { ...newFormData["team"] };
      newElement.config.options = team;
      newFormData["team"] = newElement;

      this.setState({
        formData: newFormData
      });
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
    }

    for (let key in this.state.formData) {
      console.log(key);
      formIsValid = this.state.formData[key].valid && formIsValid;
      console.log(formIsValid);
    }

    if (formIsValid) {
      this.setState({
        loading: true,
        postError: ""
      });

      firebaseArticles
        .orderByChild("id")
        .limitToLast(1)
        .once("value")
        .then(snapshot => {
          let articleId = null;
          snapshot.forEach(childSnapshot => {
            articleId = childSnapshot.val().id;
          });
          dataToSubmit["date"] = firebase.database.ServerValue.TIMESTAMP;
          dataToSubmit["id"] = ++articleId;
          dataToSubmit["team"] = parseInt(dataToSubmit["team"], 10);

          firebaseArticles
            .push(dataToSubmit)
            .then(article => {
              this.props.history.push(`/articles/${article.key}`);
            })
            .catch(err => {
              this.setState({
                postError: err.message
              });
            });
        });
    } else {
      this.setState({
        postError: "Something went wrong"
      });
    }
  };

  submitButton = () =>
    this.state.loading ? (
      "loading..."
    ) : (
      <div>
        <button onClick={event => this.submitForm(event)}>Add Post</button>
      </div>
    );

  validate = element => {
    let error = [true, ""];

    if (element.validation && element.validation.required) {
      const valid = element.value.trim() !== "";
      const message = `${!valid ? "This field is required" : ""}`;

      error = !valid ? [valid, message] : error;
    }

    return error;
  };

  updateForm = (element, content = "") => {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };
    newElement.value = content === "" ? element.event.target.value : content;

    if (element.blur) {
      let validate = this.validate(newElement);
      newElement.valid = validate[0];
      newElement.validationMessage = validate[1];
    }
    newElement.touched = element.blur;
    newFormData[element.id] = newElement;

    this.setState({ formData: newFormData });
  };

  showError = () =>
    this.state.postError ? (
      <div className={styles.errorMessage}>{this.state.postError}</div>
    ) : (
      ""
    );

  onEditorStateChange = editorState => {
    let contentState = editorState.getCurrentContent();
    // let rawState = convertToRaw(contentState);

    let html = stateToHTML(contentState);

    this.updateForm({ id: "body" }, html);

    this.setState({
      editorState
    });
  };

  storeFilename = filename => {
    this.updateForm({ id: "image" }, filename);
  };

  render() {
    return (
      <div className={styles.postContainer}>
        <form onSubmit={this.submitForm}>
          <h2>Add Post</h2>

          <Uploader filename={filename => this.storeFilename(filename)} />

          <FormField
            id="author"
            formData={this.state.formData.author}
            change={element => this.updateForm(element)}
          />

          <FormField
            id="title"
            formData={this.state.formData.title}
            change={element => this.updateForm(element)}
          />

          <Editor
            editorState={this.state.editorState}
            wrapperClassName="myEditor-wrapper"
            editorClassName="myEditor-editor"
            onEditorStateChange={this.onEditorStateChange}
          />

          <FormField
            id="team"
            formData={this.state.formData.team}
            change={element => this.updateForm(element)}
          />

          {this.submitButton()}
          {this.showError()}
        </form>
      </div>
    );
  }
}

export default Dashboard;
