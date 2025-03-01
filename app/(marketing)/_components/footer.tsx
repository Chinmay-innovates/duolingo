import { Flag } from "./flag";

export const Footer = () => {
	return (
		<footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
			<div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
				<Flag src="/hr.svg" alt="Croatian" countryName="Croatian" />
				<Flag src="/es.svg" alt="Spanish" countryName="Spanish" />
				<Flag src="/fr.svg" alt="French" countryName="French" />
				<Flag src="/it.svg" alt="Italian" countryName="Italian" />
				<Flag src="/jp.svg" alt="Japanese" countryName="Japanese" />
			</div>
		</footer>
	);
};
