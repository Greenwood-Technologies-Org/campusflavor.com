import { Banner, BannerProps } from "@/components/banner"

export default function Competitions() {
    const data = {
        rotatingBannerItems: ["Item 1", "Item 2", "Item 3", "Item 4"],
    }

    return (
        <main className="w-full flex flex-col flex-grow items-center">
            <Banner rotatingBannerItems={data.rotatingBannerItems}></Banner>
        </main>
    )
}
