import { Row, Col, Form, Input, Icon, Checkbox, Button } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import Title from "antd/lib/typography/Title";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { AuthTypes } from "../../store/ducks/auth/types";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  form: {
    padding: 20,
    width: "300px",
    maxWidth: "300px",
  }
});

type Props = {
  form: WrappedFormUtils;
};

const Signin = ({ form }: Props) => {
  const { getFieldDecorator, validateFields } = form;
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: AuthTypes.SIGNIN_REQUEST,
          payload: values
        })
      }
    });
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
      <Title level={4}>Signin</Title>
      <Form onSubmit={handleSubmit} className={classes.form}>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              { required: true, message: "Por favor preencha seu email!" }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Por favor preencha sua senha!" }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Lembrar</Checkbox>)}
          {/* <a style={{ float: "right" }} href="">
            Esqueci minha senha
          </a> */}
          <Button
            type="primary"
            htmlType="button"
            onClick={handleSubmit}
            style={{ width: "100%" }}
          >
            Signin
          </Button>
          Ou <a onClick={() => router.push('/signup') }>registre agora!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create({ name: "normal_login" })(Signin);
