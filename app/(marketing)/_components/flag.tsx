import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
	src: string;
	alt: string;
	countryName: string;
};

export const Flag = ({ src, alt, countryName }: Props) => {
	return (
		<Button size={"lg"} className="w-full" variant={"ghost"}>
			<Image
				src={src}
				alt={alt}
				height={32}
				width={40}
				className="mr-4 rounded-md"
			/>
			{countryName}
		</Button>
	);
};
