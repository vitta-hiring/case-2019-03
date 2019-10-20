import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

i18n.use(XHR)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init();

export default i18n;
