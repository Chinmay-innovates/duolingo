import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export const Promo = () => {
	return (
		<div className="border-2 rounded-xl p-4 space-y-4">
			<div className="space-y-2">
				<div className="flex items-center gap-x-2">
					<Image src="/unlimited.svg" alt="Pro" height={25} width={25} />
					<h3 className="font-bold text-lg">Upgrade to pro</h3>
				</div>
				<p>Get unlimited hearts and more!</p>
			</div>
			<Button asChild size={"lg"} className="w-full" variant={"super"}>
				<Link href={"/shop"}>Upgrade now</Link>
			</Button>
		</div>
	);
};
