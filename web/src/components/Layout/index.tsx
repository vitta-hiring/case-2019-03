import React, { Suspense, useState, useEffect } from "react";
import {
	ConfigProvider as Provider,
	Layout as AntdLayout,
	Button,
	Icon,
	Spin
} from "antd";
import { useTranslation } from "react-i18next";

import { usePrevious } from "../../utils/hooks";
import Logo from "../Logo";
import Menu from "../Menu";
import SelectLanguage from "../SelectLanguage";
import SelectUser from "../SelectUser";

import styles from "./theme/index.module.scss";

const { Content, Footer, Header, Sider } = AntdLayout;

const parseStringLocale = (locale: "en" | "pt") => {
	switch (locale) {
		case "pt":
			return "pt_BR";
		default:
			return "en_US";
	}
};

type Props = { logged: boolean };

const Page: React.FC<Props> = ({ children, logged }) => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		i18n: { language }
	} = useTranslation();
	const previousLanguage = usePrevious(language);
	const [locale, setLocale] = useState({
		locale: parseStringLocale(language as "en" | "pt")
	});

	useEffect(() => {
		fetchLocale(parseStringLocale(language as "en" | "pt"));
	}, []);

	useEffect(() => {
		if (previousLanguage && language !== previousLanguage) {
			fetchLocale(parseStringLocale(language as "en" | "pt"));
		}
	}, [language]);

	const toggle = () => setCollapsed(!collapsed);

	const fetchLocale = async (antdStringLocale: "en_US" | "pt_BR") => {
		const module = await import(`antd/es/locale/${antdStringLocale}`);
		if (module && module.default && module.default.locale) {
			setLocale(module.default);
		}
	};

	return (
		<Provider locale={locale}>
			<AntdLayout className={styles.container}>
				{(logged && (
					<Sider
						trigger={null}
						className={styles.sider}
						collapsible
						collapsed={collapsed}
					>
						<Logo />
						<Menu />
					</Sider>
				)) ||
					null}
				<AntdLayout>
					<Header className={styles.header}>
						{(logged && (
							<>
								<Button
									className={styles.trigger}
									onClick={toggle}
									type="link"
								>
									<Icon
										type={
											collapsed
												? "menu-unfold"
												: "menu-fold"
										}
									/>
								</Button>
								<SelectUser />
							</>
						)) ||
							null}
						<SelectLanguage />
					</Header>
					<Content className={styles.content}>{children}</Content>
					<Footer className={styles.footer}>©2019</Footer>
				</AntdLayout>
			</AntdLayout>
		</Provider>
	);
};

const Loader = () => (
	<div className={styles.loader}>
		<Spin indicator={<Icon type="loading" spin />} />
	</div>
);

const Layout: React.FC<Props> = ({ children, logged }) => (
	<Suspense fallback={<Loader />}>
		<Page logged={logged}>{children}</Page>
	</Suspense>
);

export default Layout;
