import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Items } from "./_components/items";

const ShopPage = async () => {
	const userProgressData = getUserProgress();
	const userSubscriptionData = getUserSubscription();
	const [userProgress, userSubscription] = await Promise.all([
		userProgressData,
		userSubscriptionData,
	]);

	if (!userProgress || !userProgress.activeCourse) redirect("/learn");

	const isPro = !!userSubscription?.isActive;
	return (
		<div className="flex flex-row-reverse gap-[48px] px-6">
			<StickyWrapper>
				<UserProgress
					activeCourse={userProgress.activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={isPro}
				/>
			</StickyWrapper>
			<FeedWrapper>
				<div className="w-full flex flex-col items-center">
					<Image
						src={"/shop.svg"}
						alt={"Shop"}
						width={90}
						height={90}
						className="select-none"
					/>
					<h1 className="text-center font-bold text-2xl text-neutral-800 my-6 ">
						Shop
					</h1>
					<p className="text-muted-foreground text-center text-lg mb-6">
						Spend your points to unlock exclusive rewards!
					</p>
					<Items
						hearts={userProgress.hearts}
						points={userProgress.points}
						hasActiveSubscription={isPro}
					/>
				</div>
			</FeedWrapper>
		</div>
	);
};

export default ShopPage;
