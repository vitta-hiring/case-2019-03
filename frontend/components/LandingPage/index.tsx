import { Row, Col } from "antd";
import { useMediaQuery } from "react-responsive";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  card: {
    width: 400,
    height: ({ routePath }: any) => (routePath === "/signup" ? 550 : 400),
    boxShadow: "0px 0px 18px 0px rgba(50, 50, 50, 0.18)"
  },
  cardLeft: {
    background:
      "rgba(0, 0, 0, .40) no-repeat center url(https://picsum.photos/600/600)",
    backgroundBlendMode: "darken",
    borderRadius: "6px 0 0 6px"
  },
  cardRight: {
    backgroundColor: "white",
    borderRadius: (props: any) => (props.isSm ? "4px" : "0 6px 6px 0")
  }
});

const LandingPage = props => {
  const router = useRouter();
  const isSm = useMediaQuery({ query: "(max-width: 947px)" }, undefined, isSm =>
    setMediaQuery(isSm)
  );
  const [mediaQuery, setMediaQuery] = useState(isSm);
  const [routePath, setRoutePath] = useState(router.pathname);
  const classes = useStyles({ isSm: mediaQuery, routePath });

  useEffect(() => {
    const handleRouteChange = url => {
      setRoutePath(url);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  });

  return (
    <div style={{ height: "100%" }}>
      <Row
        style={{ height: "100%" }}
        type="flex"
        justify="center"
        align="middle"
      >
        <Col
          className={`${classes.card} ${classes.cardLeft}`}
          xs={0}
          sm={0}
          md={0}
          lg={12}
          xl={12}
        >
          <div></div>
        </Col>
        <Col
          className={`${classes.card} ${classes.cardRight}`}
          xs={24}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          {props.children}
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
