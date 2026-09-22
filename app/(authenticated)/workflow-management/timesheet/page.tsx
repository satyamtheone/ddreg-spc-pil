import TimeSheet from "./timeSheet";

export type TimeSheetSearchParams = {
  userId?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<TimeSheetSearchParams>;
}) {
  const params = await searchParams;

  return <TimeSheet params={params} />;
}
