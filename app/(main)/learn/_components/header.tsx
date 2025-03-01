import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
	title: string;
}

export const Header = ({ title }: HeaderProps) => {
	return (
		<div className="top-0 sticky bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
			<Link href={"/courses"}>
				<Button variant={"ghost"} size={"sm"}>
					<ArrowLeftIcon className="size-5 stroke-2 text-neutral-400" />
				</Button>
			</Link>
			<h1 className="font-bold text-lg">{title}</h1>
			<div />
		</div>
	);
};
