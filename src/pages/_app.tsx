import '../stylesheets/globalStylesheets.css';

function MyApp ({ Component, pageProps }) {
	return (
		<Component { ...pageProps } />
	)
};

export default MyApp;
