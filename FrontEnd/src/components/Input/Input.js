import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import "./input.scss";

function CustomInput({
  id,
  name,
  label,
  handleChange,
  icon: Icon,
  errorMessage,
}) {
  return (
    <div className="register-form-main-container">
      <FormControl className="register-form-container">
        <InputLabel
          htmlFor={id}
          style={{
            fontSize: 24,
            margin: -5,
          }}
        >
          {label}
        </InputLabel>
        <Input
          type={name.includes("password") ? "password" : "text"}
          className="register-input"
          onChange={handleChange}
          name={name}
          id={id}
          startAdornment={
            <InputAdornment position="start">
              <Icon
                style={{
                  height: 25,
                  width: 25,
                }}
              />
            </InputAdornment>
          }
        />
        <div className="Input-field-error-message">{errorMessage}</div>
      </FormControl>
    </div>
  );
}

export default CustomInput;
