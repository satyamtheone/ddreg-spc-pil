import NavigatorPage from "./navigatorPage";

export type SpcSearchParams = {
  referenceId?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SpcSearchParams>;
}) {
  const params = await searchParams;

  return <NavigatorPage params={params} />;
}
