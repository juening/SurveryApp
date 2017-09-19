import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFileds() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
    // <div>
    //   <Field
    //     type="text"
    //     name="title"
    //     component={SurveyField}
    //     label="Survey Title"
    //   />
    //   <Field
    //     type="text"
    //     name="subject"
    //     component={SurveyField}
    //     label="Subject Line"
    //   />
    //   <Field
    //     type="text"
    //     name="body"
    //     component={SurveyField}
    //     label="Email Body"
    //   />
    //   <Field
    //     type="text"
    //     name="emails"
    //     component={SurveyField}
    //     label="Recipient List"
    //   />
    // </div>
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFileds()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || '');
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value for ${name}.`;
    }
  });

  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
