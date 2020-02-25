import { Row, Col, Form, Input, Icon, Checkbox, Button } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import Title from "antd/lib/typography/Title";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { AuthTypes } from "../../store/ducks/auth/types";
import { useRouter } from "next/router";
import { SignUpTypes } from "../../store/ducks/signup/types";
import { useState } from "react";

const useStyles = makeStyles({
  form: {
    // padding: 20,
    width: "300px",
    maxWidth: "300px",
    marginBottom: -10
  }
});

type Props = {
  form: WrappedFormUtils;
};

const Signup = ({ form }: Props) => {
  const { getFieldDecorator, validateFields } = form;
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [formState, setFormState] = useState({
    confirmDirty: false
  });

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const {confirm, ...others} = values
        dispatch({
          type: SignUpTypes.SIGNUP_REQUEST,
          payload: others
        });
      }
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setFormState({ confirmDirty: formState.confirmDirty || !!value });
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Suas senhas não estão iguais!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && formState.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        placeContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Title level={4}>Signup</Title>
      <Form onSubmit={handleSubmit} className={classes.form}>
        <Form.Item>
          {getFieldDecorator("firstName", {
            rules: [{ required: true, message: "Por favor preencha seu nome!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Primeiro nome"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("lastName", {
            rules: [
              { required: true, message: "Por favor preencha seu último nome!" }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Último nome"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "Por favor insira um email válido!"
              },
              {
                required: true,
                message: "Por favor informe seu email!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Por favor informe sua senha!"
              },
              {
                validator: validateToNextPassword
              }
            ]
          })(<Input.Password prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Password" />)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Por favor confirme seu password!"
              },
              {
                validator: compareToFirstPassword
              }
            ]
          })(<Input.Password prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Confirme o password" onBlur={handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="button"
            onClick={handleSubmit}
            style={{ width: "100%" }}
          >
            Registrar
          </Button>
          Ou <a onClick={() => router.push("/")}>entre agora!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create({ name: "signup_form" })(Signup);
