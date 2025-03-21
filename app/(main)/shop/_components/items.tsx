"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { refillHearts } from "@/server/userprogress";
import { MAX_HEARTS, POINTS_TO_REFILL } from "@/constants";
import { createStripeUrl } from "@/server/usersubscription";

interface ItemsProps {
	hearts: number;
	points: number;
	hasActiveSubscription: boolean;
}

export const Items = ({
	hasActiveSubscription,
	hearts,
	points,
}: ItemsProps) => {
	const [isPending, startTransition] = useTransition();

	const onRefillHearts = () => {
		if (isPending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL) return;

		startTransition(() => {
			refillHearts()
				.then(() => toast.success("Hearts refilled"))
				.catch(() => toast.error("Something went wrong"));
		});
	};

	const onUpgrade = () => {
		startTransition(() => {
			createStripeUrl()
				.then((response) => {
					if (response.data) {
						window.location.href = response.data;
					}
				})
				.catch(() => toast.error("Something went wrong"));
		});
	};
	return (
		<ul className="w-full">
			<div className="flex items-center w-full p-4 gap-x-4 border-t-2">
				<Image src={"/heart.svg"} alt="Heart" height={60} width={60} />
				<div className="flex-1">
					<p className="text-neutral-700 text-base lg:text-xl font-bold">
						Refill hearts
					</p>
				</div>
				<Button
					disabled={
						isPending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL
					}
					onClick={onRefillHearts}
				>
					{hearts === MAX_HEARTS ? (
						"Full"
					) : (
						<div className="flex items-center">
							<Image src={"/points.svg"} alt="Points" height={20} width={20} />
							<p>{POINTS_TO_REFILL}</p>
						</div>
					)}
				</Button>
			</div>
			<div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
				<Image src={"/unlimited.svg"} alt="Unlimited" height={60} width={60} />
				<div className="flex-1">
					<p className="text-neutral-700 text-base lg:text-xl font-bold">
						Unlimited hearts
					</p>
				</div>
				<Button onClick={onUpgrade} disabled={isPending}>
					{hasActiveSubscription ? "Settings" : "Upgrade"}
				</Button>
			</div>
		</ul>
	);
};
