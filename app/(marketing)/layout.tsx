import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-1 flex flex-col items-center justify-center">
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default MarketingLayout;
