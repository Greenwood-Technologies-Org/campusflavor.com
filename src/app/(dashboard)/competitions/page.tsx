import { Banner, BannerProps } from "@/components/banner";

import { rotatingBannerItems } from "@/lib/constants";
import { VotingStatus } from "@/lib/types";

export default function Competitions() {
    return (
        <main className="w-full flex flex-col flex-grow items-center">
            <Banner
                rotatingBannerItems={rotatingBannerItems}
                votingStatusParam={VotingStatus.Prevoting}
            ></Banner>
        </main>
    );
}
