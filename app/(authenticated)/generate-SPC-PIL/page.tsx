import SpcPilPage from "./spcPilPage";

export type SpcSearchParams = {
  countryCode?: string;
  type?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SpcSearchParams>;
}) {
  const params = await searchParams;

  return <SpcPilPage params={params} />;
}
