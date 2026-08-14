import MonthCalendar from "./components/MonthCalendar";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8 py-16 px-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            HCI Conference Calendar
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Track upcoming HCI conference dates and deadlines.
          </p>
        </div>
        <MonthCalendar />
      </main>
    </div>
  );
}
