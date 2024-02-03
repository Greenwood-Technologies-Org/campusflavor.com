import { Banner, BannerProps } from "@/components/banner";

export default function Competitions() {
    const data = {
        rotatingBannerItems: [
            "Winners get their desgin on merch for free!",
            "Submissions Open: March 18th - Mar 25th",
            "Voting Open: March 26th - Mar 28th",
            "Winners Announced: March 29th",
            "Win cash prizes!",
            "Voting opens in 7 days!",
        ],
    };

    return (
        <main className="w-full flex flex-col flex-grow items-center">
            <Banner rotatingBannerItems={data.rotatingBannerItems}></Banner>
        </main>
    );
}
