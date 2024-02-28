import Link from "next/link";

export default function SubmitInfo() {
    return (
        <div className="w-full flex flex-col flex-grow items-center space-y-8 py-10">
            <p>SubmitInfo</p>
            <p>Need to add details about creating designs, avoiding trademarks, and prizes.</p>
            <Link href="/submit">
                <button
                    className="py-2 px-8 my-8 rounded-lg focus:outline-none bg-black text-white hover:bg-gray-700"
                >
                    Submit Design
                </button>
            </Link>
        </div>
    );
}
