import { Result, Button } from "antd";

function Error({ statusCode }) {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Desculpe, esta página que você visitou não existe."
      extra={<Button type="primary">Voltar</Button>}
    />
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
