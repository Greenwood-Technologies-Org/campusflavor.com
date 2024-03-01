import Link from "next/link";

export default function SubmitInfo() {
    return (
        <div className="w-full flex flex-col flex-grow items-center pt-11">
            <h1 className="text-3xl font-medium">Submission Info</h1>

            <div className="grid grid-cols-2 grid-rows-3 gap-8 h-screen w-full p-4">
                <div className="bg-red-500 text-white p-4">1</div>
                <div className="bg-green-500 text-white p-4">2</div>
                <div className="bg-blue-500 text-white p-4">3</div>
                <div className="bg-yellow-500 text-white p-4">4</div>
                <div className="bg-purple-500 text-white p-4">5</div>
                <div className="bg-pink-500 text-white p-4">6</div>
            </div>

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
