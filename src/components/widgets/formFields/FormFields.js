import React from "react";
import styles from "./formFields.css";

const FormFields = ({ formData, change, id }) => {
  const showError = () => {
    let errorMessage = null;

    if (formData.validation && !formData.valid) {
      errorMessage = (
        <div className={styles.labelError}>{formData.validationMessage}</div>
      );
    }

    return errorMessage;
  };

  const renderTemplate = () => {
    let template = null;

    switch (formData.element) {
      case "input":
        template = (
          <div>
            <input
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id, blur: false })}
            />
            {showError()}
          </div>
        );
        break;

      case "select":
        template = (
          <div>
            <select
              value={formData.value}
              name={formData.config.name}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id, blur: false })}
            >
              {formData.config.options.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        );
        break;
      default:
        break;
    }

    return template;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormFields;
